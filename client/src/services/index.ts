import type {
  Booking,
  BookingStatus,
  Certificate,
  ClassSession,
  Course,
  Enrollment,
  GalleryImage,
  MediaItem,
  Service,
  SiteContent,
  SiteSettings,
  Staff,
  Student,
  StudioData,
} from '../types';
import { uid, nextCertificateNumber, optimizeImageFile } from '../lib/storage';
import { getStudioSnapshot, resetStudioData, updateStudioData } from './studioRepository';
import { DEFAULT_ADMIN_EMAIL, DEFAULT_ADMIN_PASSWORD } from '../config';

const delay = async <T>(value: T, ms = 80): Promise<T> => {
  await new Promise((r) => setTimeout(r, ms));
  return value;
};

export const studioService = {
  async getAll(): Promise<StudioData> {
    return delay(getStudioSnapshot());
  },
  async reset(): Promise<StudioData> {
    return delay(resetStudioData());
  },
};

export const serviceService = {
  async list(): Promise<Service[]> {
    return delay(getStudioSnapshot().services);
  },
  async upsert(service: Service): Promise<Service> {
    updateStudioData((prev) => {
      const exists = prev.services.some((s) => s.id === service.id);
      return {
        ...prev,
        services: exists
          ? prev.services.map((s) => (s.id === service.id ? service : s))
          : [...prev.services, service],
      };
    });
    return delay(service);
  },
  async remove(id: string): Promise<void> {
    updateStudioData((prev) => ({
      ...prev,
      services: prev.services.filter((s) => s.id !== id),
    }));
    await delay(undefined);
  },
};

export const bookingService = {
  async list(): Promise<Booking[]> {
    return delay([...getStudioSnapshot().bookings].sort(
      (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    ));
  },
  async create(
    input: Omit<Booking, 'id' | 'createdAt' | 'status' | 'reference'> & {
      status?: BookingStatus;
      reference?: string;
    }
  ): Promise<Booking> {
    const booking: Booking = {
      ...input,
      id: uid('bk'),
      status: input.status || 'pending',
      createdAt: new Date().toISOString(),
      reference: input.reference || `NALA-${Date.now().toString(36).toUpperCase()}`,
      serviceIds: input.serviceIds?.length ? input.serviceIds : [input.serviceId],
      serviceId: input.serviceId || input.serviceIds?.[0] || '',
      staffId: input.staffId ?? null,
    };
    updateStudioData((prev) => ({ ...prev, bookings: [booking, ...prev.bookings] }));
    return delay(booking);
  },
  async update(id: string, patch: Partial<Booking>): Promise<Booking | null> {
    let updated: Booking | null = null;
    updateStudioData((prev) => ({
      ...prev,
      bookings: prev.bookings.map((b) => {
        if (b.id !== id) return b;
        updated = { ...b, ...patch };
        return updated;
      }),
    }));
    return delay(updated);
  },
  async remove(id: string): Promise<void> {
    updateStudioData((prev) => ({
      ...prev,
      bookings: prev.bookings.filter((b) => b.id !== id),
    }));
    await delay(undefined);
  },
  /** Available slots for a date, respecting staff hours and existing bookings */
  getAvailableSlots(date: string, staffId: string | null, slots: string[]): string[] {
    const data = getStudioSnapshot();
    const day = new Date(`${date}T12:00:00`).getDay();
    const booked = new Set(
      data.bookings
        .filter(
          (b) =>
            b.date === date &&
            b.status !== 'cancelled' &&
            (staffId ? b.staffId === staffId || b.staffId === null : true)
        )
        .map((b) => b.time)
    );

    if (!staffId) {
      return slots.filter((t) => !booked.has(t));
    }

    const staff = data.staff.find((s) => s.id === staffId);
    if (!staff) return [];
    const hours = staff.workingHours.find((h) => h.day === day);
    if (!hours?.isAvailable) return [];

    return slots.filter((t) => {
      if (booked.has(t)) return false;
      return t >= hours.startTime && t < hours.endTime;
    });
  },
};

export const staffService = {
  async list(): Promise<Staff[]> {
    return delay([...getStudioSnapshot().staff].sort((a, b) => a.order - b.order));
  },
  async upsert(member: Staff): Promise<Staff> {
    updateStudioData((prev) => {
      const exists = prev.staff.some((s) => s.id === member.id);
      return {
        ...prev,
        staff: exists
          ? prev.staff.map((s) => (s.id === member.id ? member : s))
          : [...prev.staff, member],
      };
    });
    return delay(member);
  },
};

export const studentService = {
  async list(): Promise<Student[]> {
    return delay(getStudioSnapshot().students);
  },
  async upsert(student: Student): Promise<Student> {
    updateStudioData((prev) => {
      const exists = prev.students.some((s) => s.id === student.id);
      return {
        ...prev,
        students: exists
          ? prev.students.map((s) => (s.id === student.id ? student : s))
          : [...prev.students, student],
      };
    });
    return delay(student);
  },
  async remove(id: string): Promise<void> {
    updateStudioData((prev) => ({
      ...prev,
      students: prev.students.filter((s) => s.id !== id),
      enrollments: prev.enrollments.filter((e) => e.studentId !== id),
    }));
    await delay(undefined);
  },
};

export const classService = {
  async list(): Promise<ClassSession[]> {
    return delay(getStudioSnapshot().classes);
  },
  async upsert(session: ClassSession): Promise<ClassSession> {
    updateStudioData((prev) => {
      const exists = prev.classes.some((c) => c.id === session.id);
      return {
        ...prev,
        classes: exists
          ? prev.classes.map((c) => (c.id === session.id ? session : c))
          : [...prev.classes, session],
      };
    });
    return delay(session);
  },
  async remove(id: string): Promise<void> {
    updateStudioData((prev) => ({
      ...prev,
      classes: prev.classes.filter((c) => c.id !== id),
      enrollments: prev.enrollments.filter((e) => e.classId !== id),
    }));
    await delay(undefined);
  },
};

export const enrollmentService = {
  async list(): Promise<Enrollment[]> {
    return delay(getStudioSnapshot().enrollments);
  },
  async upsert(enrollment: Enrollment): Promise<Enrollment> {
    updateStudioData((prev) => {
      const exists = prev.enrollments.some((e) => e.id === enrollment.id);
      return {
        ...prev,
        enrollments: exists
          ? prev.enrollments.map((e) => (e.id === enrollment.id ? enrollment : e))
          : [...prev.enrollments, enrollment],
      };
    });
    return delay(enrollment);
  },
  async remove(id: string): Promise<void> {
    updateStudioData((prev) => ({
      ...prev,
      enrollments: prev.enrollments.filter((e) => e.id !== id),
    }));
    await delay(undefined);
  },
};

export const certificateService = {
  async list(): Promise<Certificate[]> {
    return delay(getStudioSnapshot().certificates);
  },
  async create(
    input: Omit<Certificate, 'id' | 'createdAt' | 'certificateNumber'> & {
      certificateNumber?: string;
    }
  ): Promise<Certificate> {
    let saved!: Certificate;
    updateStudioData((prev) => {
      const counter = prev.certificateCounter + 1;
      const certificateNumber =
        input.certificateNumber ||
        nextCertificateNumber(prev.settings.certificatePrefix, counter);
      saved = {
        id: uid('cert'),
        certificateNumber,
        studentId: input.studentId,
        studentName: input.studentName,
        courseId: input.courseId,
        course: input.course,
        startDate: input.startDate,
        completionDate: input.completionDate,
        dateAwarded: input.dateAwarded || input.completionDate,
        courseDuration: input.courseDuration,
        createdAt: new Date().toISOString(),
      };
      return {
        ...prev,
        certificateCounter: counter,
        certificates: [saved, ...prev.certificates],
      };
    });
    return delay(saved);
  },
  async remove(id: string): Promise<void> {
    updateStudioData((prev) => ({
      ...prev,
      certificates: prev.certificates.filter((c) => c.id !== id),
    }));
    await delay(undefined);
  },
  findByNumber(number: string): Certificate | undefined {
    return getStudioSnapshot().certificates.find(
      (c) => c.certificateNumber.toLowerCase() === number.trim().toLowerCase()
    );
  },
};

export const contentService = {
  async updateContent(patch: Partial<SiteContent>): Promise<SiteContent> {
    let content!: SiteContent;
    updateStudioData((prev) => {
      content = { ...prev.content, ...patch };
      return { ...prev, content };
    });
    return delay(content);
  },
  async updateSettings(patch: Partial<SiteSettings>): Promise<SiteSettings> {
    let settings!: SiteSettings;
    updateStudioData((prev) => {
      settings = { ...prev.settings, ...patch };
      return { ...prev, settings };
    });
    return delay(settings);
  },
};

export const galleryService = {
  async upsert(image: GalleryImage): Promise<GalleryImage> {
    updateStudioData((prev) => {
      const exists = prev.gallery.some((g) => g.id === image.id);
      return {
        ...prev,
        gallery: exists
          ? prev.gallery.map((g) => (g.id === image.id ? image : g))
          : [...prev.gallery, image],
      };
    });
    return delay(image);
  },
  async remove(id: string): Promise<void> {
    updateStudioData((prev) => ({
      ...prev,
      gallery: prev.gallery.filter((g) => g.id !== id),
    }));
    await delay(undefined);
  },
  async reorder(orderedIds: string[]): Promise<void> {
    updateStudioData((prev) => {
      const map = new Map(prev.gallery.map((g) => [g.id, g]));
      const reordered = orderedIds
        .map((id, index) => {
          const item = map.get(id);
          return item ? { ...item, order: index + 1 } : null;
        })
        .filter(Boolean) as GalleryImage[];
      const leftovers = prev.gallery.filter((g) => !orderedIds.includes(g.id));
      return { ...prev, gallery: [...reordered, ...leftovers] };
    });
    await delay(undefined);
  },
};

export const courseService = {
  async upsert(course: Course): Promise<Course> {
    updateStudioData((prev) => {
      const exists = prev.courses.some((c) => c.id === course.id);
      return {
        ...prev,
        courses: exists
          ? prev.courses.map((c) => (c.id === course.id ? course : c))
          : [...prev.courses, course],
      };
    });
    return delay(course);
  },
  async remove(id: string): Promise<void> {
    updateStudioData((prev) => ({
      ...prev,
      courses: prev.courses.filter((c) => c.id !== id),
    }));
    await delay(undefined);
  },
};

export const mediaService = {
  async add(item: Omit<MediaItem, 'id' | 'createdAt'>): Promise<MediaItem> {
    const media: MediaItem = { ...item, id: uid('media'), createdAt: new Date().toISOString() };
    updateStudioData((prev) => ({ ...prev, media: [media, ...prev.media] }));
    return delay(media);
  },
  async remove(id: string): Promise<void> {
    updateStudioData((prev) => ({
      ...prev,
      media: prev.media.filter((m) => m.id !== id),
    }));
    await delay(undefined);
  },
  async upload(file: File): Promise<string> {
    const src = await optimizeImageFile(file);
    await mediaService.add({ name: file.name, src });
    return src;
  },
};

export const authService = {
  async login(email: string, password: string): Promise<{ ok: true } | { ok: false; error: string }> {
    const { owner, settings } = getStudioSnapshot();
    const candidates = new Set(
      [
        settings.adminEmail,
        owner.email,
        DEFAULT_ADMIN_EMAIL,
      ]
        .filter(Boolean)
        .map((e) => String(e).trim().toLowerCase())
    );
    const passwords = new Set(
      [settings.adminPassword, owner.password, DEFAULT_ADMIN_PASSWORD].filter(Boolean).map(String)
    );

    const emailOk = candidates.has(email.trim().toLowerCase());
    const passwordOk = passwords.has(password);

    if (!emailOk || !passwordOk) {
      return delay({ ok: false, error: 'Invalid email or password.' });
    }
    return delay({ ok: true });
  },
};
