import { create } from 'zustand';
import type {
  Booking,
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
  Testimonial,
} from '../types';
import {
  bookingService,
  certificateService,
  classService,
  contentService,
  courseService,
  enrollmentService,
  galleryService,
  mediaService,
  serviceService,
  staffService,
  studentService,
  studioService,
} from '../services';
import { getStudioSnapshot, updateStudioData } from '../services/studioRepository';
import { formatDuration, formatPrice, uid } from '../lib/storage';

interface StudioStore {
  data: StudioData;
  hydrated: boolean;
  hydrate: () => void;
  refresh: () => void;
  // selectors helpers
  activeServices: () => Service[];
  activeCourses: () => Course[];
  visibleTestimonials: () => Testimonial[];
  activeStaff: () => Staff[];
  formatPrice: typeof formatPrice;
  formatDuration: typeof formatDuration;
  // mutations
  updateContent: (patch: Partial<SiteContent>) => Promise<void>;
  updateSettings: (patch: Partial<SiteSettings>) => Promise<void>;
  upsertService: (service: Service) => Promise<void>;
  deleteService: (id: string) => Promise<void>;
  upsertGalleryImage: (image: GalleryImage) => Promise<void>;
  deleteGalleryImage: (id: string) => Promise<void>;
  reorderGallery: (ids: string[]) => Promise<void>;
  upsertCourse: (course: Course) => Promise<void>;
  deleteCourse: (id: string) => Promise<void>;
  upsertTestimonial: (item: Testimonial) => void;
  deleteTestimonial: (id: string) => void;
  addBooking: (
    input: Omit<Booking, 'id' | 'createdAt' | 'status' | 'reference'> & {
      status?: Booking['status'];
      reference?: string;
    }
  ) => Promise<Booking>;
  updateBooking: (id: string, patch: Partial<Booking>) => Promise<void>;
  deleteBooking: (id: string) => Promise<void>;
  saveCertificate: (
    input: Omit<Certificate, 'id' | 'createdAt' | 'certificateNumber'> & {
      certificateNumber?: string;
    }
  ) => Promise<Certificate>;
  deleteCertificate: (id: string) => Promise<void>;
  getCertificateByNumber: (number: string) => Certificate | undefined;
  addMedia: (item: Omit<MediaItem, 'id' | 'createdAt'>) => Promise<MediaItem>;
  deleteMedia: (id: string) => Promise<void>;
  uploadImage: (file: File) => Promise<string>;
  upsertStaff: (member: Staff) => Promise<void>;
  upsertStudent: (student: Student) => Promise<void>;
  deleteStudent: (id: string) => Promise<void>;
  upsertClass: (session: ClassSession) => Promise<void>;
  deleteClass: (id: string) => Promise<void>;
  upsertEnrollment: (enrollment: Enrollment) => Promise<void>;
  deleteEnrollment: (id: string) => Promise<void>;
  resetData: () => Promise<void>;
  uid: typeof uid;
}

export const useStudioStore = create<StudioStore>((set, get) => ({
  data: getStudioSnapshot(),
  hydrated: false,
  hydrate: () => set({ data: getStudioSnapshot(), hydrated: true }),
  refresh: () => set({ data: getStudioSnapshot() }),
  activeServices: () =>
    [...get().data.services].filter((s) => s.active).sort((a, b) => a.order - b.order),
  activeCourses: () =>
    [...get().data.courses].filter((c) => c.active).sort((a, b) => a.order - b.order),
  visibleTestimonials: () => get().data.testimonials.filter((t) => t.visible),
  activeStaff: () =>
    [...get().data.staff].filter((s) => s.active).sort((a, b) => a.order - b.order),
  formatPrice,
  formatDuration,
  updateContent: async (patch) => {
    await contentService.updateContent(patch);
    get().refresh();
  },
  updateSettings: async (patch) => {
    await contentService.updateSettings(patch);
    get().refresh();
  },
  upsertService: async (service) => {
    await serviceService.upsert(service);
    get().refresh();
  },
  deleteService: async (id) => {
    await serviceService.remove(id);
    get().refresh();
  },
  upsertGalleryImage: async (image) => {
    await galleryService.upsert(image);
    get().refresh();
  },
  deleteGalleryImage: async (id) => {
    await galleryService.remove(id);
    get().refresh();
  },
  reorderGallery: async (ids) => {
    await galleryService.reorder(ids);
    get().refresh();
  },
  upsertCourse: async (course) => {
    await courseService.upsert(course);
    get().refresh();
  },
  deleteCourse: async (id) => {
    await courseService.remove(id);
    get().refresh();
  },
  upsertTestimonial: (item) => {
    updateStudioData((prev) => {
      const exists = prev.testimonials.some((t) => t.id === item.id);
      return {
        ...prev,
        testimonials: exists
          ? prev.testimonials.map((t) => (t.id === item.id ? item : t))
          : [...prev.testimonials, item],
      };
    });
    get().refresh();
  },
  deleteTestimonial: (id) => {
    updateStudioData((prev) => ({
      ...prev,
      testimonials: prev.testimonials.filter((t) => t.id !== id),
    }));
    get().refresh();
  },
  addBooking: async (input) => {
    const booking = await bookingService.create(input);
    get().refresh();
    return booking;
  },
  updateBooking: async (id, patch) => {
    await bookingService.update(id, patch);
    get().refresh();
  },
  deleteBooking: async (id) => {
    await bookingService.remove(id);
    get().refresh();
  },
  saveCertificate: async (input) => {
    const cert = await certificateService.create(input);
    get().refresh();
    return cert;
  },
  deleteCertificate: async (id) => {
    await certificateService.remove(id);
    get().refresh();
  },
  getCertificateByNumber: (number) => certificateService.findByNumber(number),
  addMedia: async (item) => {
    const media = await mediaService.add(item);
    get().refresh();
    return media;
  },
  deleteMedia: async (id) => {
    await mediaService.remove(id);
    get().refresh();
  },
  uploadImage: async (file) => {
    const src = await mediaService.upload(file);
    get().refresh();
    return src;
  },
  upsertStaff: async (member) => {
    await staffService.upsert(member);
    get().refresh();
  },
  upsertStudent: async (student) => {
    await studentService.upsert(student);
    get().refresh();
  },
  deleteStudent: async (id) => {
    await studentService.remove(id);
    get().refresh();
  },
  upsertClass: async (session) => {
    await classService.upsert(session);
    get().refresh();
  },
  deleteClass: async (id) => {
    await classService.remove(id);
    get().refresh();
  },
  upsertEnrollment: async (enrollment) => {
    await enrollmentService.upsert(enrollment);
    get().refresh();
  },
  deleteEnrollment: async (id) => {
    await enrollmentService.remove(id);
    get().refresh();
  },
  resetData: async () => {
    await studioService.reset();
    get().refresh();
  },
  uid,
}));

// Compatibility selectors used by existing components
export function useStudioCompat() {
  const store = useStudioStore();
  const data = store.data;
  return {
    data,
    services: data.services,
    activeServices: store.activeServices(),
    gallery: [...data.gallery].sort((a, b) => a.order - b.order),
    courses: data.courses,
    activeCourses: store.activeCourses(),
    testimonials: data.testimonials,
    visibleTestimonials: store.visibleTestimonials(),
    certificates: data.certificates,
    bookings: [...data.bookings].sort(
      (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    ),
    media: [...data.media].sort(
      (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    ),
    staff: store.activeStaff(),
    allStaff: data.staff,
    students: data.students,
    classes: data.classes,
    enrollments: data.enrollments,
    content: data.content,
    settings: data.settings,
    formatPrice: store.formatPrice,
    formatDuration: store.formatDuration,
    updateContent: store.updateContent,
    updateSettings: store.updateSettings,
    upsertService: store.upsertService,
    deleteService: store.deleteService,
    upsertGalleryImage: store.upsertGalleryImage,
    deleteGalleryImage: store.deleteGalleryImage,
    reorderGallery: store.reorderGallery,
    upsertCourse: store.upsertCourse,
    deleteCourse: store.deleteCourse,
    upsertTestimonial: store.upsertTestimonial,
    deleteTestimonial: store.deleteTestimonial,
    addBooking: store.addBooking,
    updateBooking: store.updateBooking,
    deleteBooking: store.deleteBooking,
    saveCertificate: store.saveCertificate,
    deleteCertificate: store.deleteCertificate,
    getCertificateByNumber: store.getCertificateByNumber,
    addMedia: store.addMedia,
    deleteMedia: store.deleteMedia,
    uploadImage: store.uploadImage,
    upsertStaff: store.upsertStaff,
    upsertStudent: store.upsertStudent,
    deleteStudent: store.deleteStudent,
    upsertClass: store.upsertClass,
    deleteClass: store.deleteClass,
    upsertEnrollment: store.upsertEnrollment,
    deleteEnrollment: store.deleteEnrollment,
    resetData: store.resetData,
  };
}
