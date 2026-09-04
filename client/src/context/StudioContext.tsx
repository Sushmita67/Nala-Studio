import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import type {
  Booking,
  BookingStatus,
  Certificate,
  Course,
  GalleryImage,
  MediaItem,
  Service,
  SiteContent,
  SiteSettings,
  StudioData,
  Testimonial,
} from '../types';
import {
  formatDuration,
  formatPrice,
  loadStudioData,
  nextCertificateNumber,
  optimizeImageFile,
  resetStudioData,
  saveStudioData,
  uid,
} from '../lib/storage';

interface StudioContextValue {
  data: StudioData;
  services: Service[];
  activeServices: Service[];
  gallery: GalleryImage[];
  courses: Course[];
  activeCourses: Course[];
  testimonials: Testimonial[];
  visibleTestimonials: Testimonial[];
  certificates: Certificate[];
  bookings: Booking[];
  media: MediaItem[];
  content: SiteContent;
  settings: SiteSettings;
  formatPrice: typeof formatPrice;
  formatDuration: typeof formatDuration;
  updateContent: (patch: Partial<SiteContent>) => void;
  updateSettings: (patch: Partial<SiteSettings>) => void;
  upsertService: (service: Service) => void;
  deleteService: (id: string) => void;
  upsertGalleryImage: (image: GalleryImage) => void;
  deleteGalleryImage: (id: string) => void;
  reorderGallery: (orderedIds: string[]) => void;
  upsertCourse: (course: Course) => void;
  deleteCourse: (id: string) => void;
  upsertTestimonial: (item: Testimonial) => void;
  deleteTestimonial: (id: string) => void;
  addBooking: (booking: Omit<Booking, 'id' | 'createdAt' | 'status'> & { status?: BookingStatus }) => Booking;
  updateBooking: (id: string, patch: Partial<Booking>) => void;
  deleteBooking: (id: string) => void;
  saveCertificate: (cert: Omit<Certificate, 'id' | 'createdAt' | 'certificateNumber'> & { certificateNumber?: string }) => Certificate;
  deleteCertificate: (id: string) => void;
  getCertificateByNumber: (number: string) => Certificate | undefined;
  addMedia: (item: Omit<MediaItem, 'id' | 'createdAt'>) => MediaItem;
  deleteMedia: (id: string) => void;
  uploadImage: (file: File) => Promise<string>;
  resetData: () => void;
}

const StudioContext = createContext<StudioContextValue | null>(null);

export const StudioProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [data, setData] = useState<StudioData>(() => loadStudioData());

  useEffect(() => {
    saveStudioData(data);
  }, [data]);

  const patch = useCallback((updater: (prev: StudioData) => StudioData) => {
    setData(updater);
  }, []);

  const value = useMemo<StudioContextValue>(() => {
    const activeServices = [...data.services]
      .filter((s) => s.active)
      .sort((a, b) => a.order - b.order);
    const activeCourses = [...data.courses]
      .filter((c) => c.active)
      .sort((a, b) => a.order - b.order);
    const visibleTestimonials = data.testimonials.filter((t) => t.visible);

    return {
      data,
      services: data.services,
      activeServices,
      gallery: [...data.gallery].sort((a, b) => a.order - b.order),
      courses: data.courses,
      activeCourses,
      testimonials: data.testimonials,
      visibleTestimonials,
      certificates: data.certificates,
      bookings: [...data.bookings].sort(
        (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      ),
      media: [...data.media].sort(
        (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      ),
      content: data.content,
      settings: data.settings,
      formatPrice,
      formatDuration,
      updateContent: (contentPatch) =>
        patch((prev) => ({ ...prev, content: { ...prev.content, ...contentPatch } })),
      updateSettings: (settingsPatch) =>
        patch((prev) => ({ ...prev, settings: { ...prev.settings, ...settingsPatch } })),
      upsertService: (service) =>
        patch((prev) => {
          const exists = prev.services.some((s) => s.id === service.id);
          return {
            ...prev,
            services: exists
              ? prev.services.map((s) => (s.id === service.id ? service : s))
              : [...prev.services, service],
          };
        }),
      deleteService: (id) =>
        patch((prev) => ({ ...prev, services: prev.services.filter((s) => s.id !== id) })),
      upsertGalleryImage: (image) =>
        patch((prev) => {
          const exists = prev.gallery.some((g) => g.id === image.id);
          return {
            ...prev,
            gallery: exists
              ? prev.gallery.map((g) => (g.id === image.id ? image : g))
              : [...prev.gallery, image],
          };
        }),
      deleteGalleryImage: (id) =>
        patch((prev) => ({ ...prev, gallery: prev.gallery.filter((g) => g.id !== id) })),
      reorderGallery: (orderedIds) =>
        patch((prev) => {
          const map = new Map(prev.gallery.map((g) => [g.id, g]));
          const reordered = orderedIds
            .map((id, index) => {
              const item = map.get(id);
              return item ? { ...item, order: index + 1 } : null;
            })
            .filter(Boolean) as GalleryImage[];
          const leftovers = prev.gallery.filter((g) => !orderedIds.includes(g.id));
          return { ...prev, gallery: [...reordered, ...leftovers] };
        }),
      upsertCourse: (course) =>
        patch((prev) => {
          const exists = prev.courses.some((c) => c.id === course.id);
          return {
            ...prev,
            courses: exists
              ? prev.courses.map((c) => (c.id === course.id ? course : c))
              : [...prev.courses, course],
          };
        }),
      deleteCourse: (id) =>
        patch((prev) => ({ ...prev, courses: prev.courses.filter((c) => c.id !== id) })),
      upsertTestimonial: (item) =>
        patch((prev) => {
          const exists = prev.testimonials.some((t) => t.id === item.id);
          return {
            ...prev,
            testimonials: exists
              ? prev.testimonials.map((t) => (t.id === item.id ? item : t))
              : [...prev.testimonials, item],
          };
        }),
      deleteTestimonial: (id) =>
        patch((prev) => ({
          ...prev,
          testimonials: prev.testimonials.filter((t) => t.id !== id),
        })),
      addBooking: (bookingInput) => {
        const booking: Booking = {
          ...bookingInput,
          id: uid('bk'),
          status: bookingInput.status || 'pending',
          createdAt: new Date().toISOString(),
        };
        patch((prev) => ({ ...prev, bookings: [booking, ...prev.bookings] }));
        return booking;
      },
      updateBooking: (id, bookingPatch) =>
        patch((prev) => ({
          ...prev,
          bookings: prev.bookings.map((b) => (b.id === id ? { ...b, ...bookingPatch } : b)),
        })),
      deleteBooking: (id) =>
        patch((prev) => ({ ...prev, bookings: prev.bookings.filter((b) => b.id !== id) })),
      saveCertificate: (certInput) => {
        const counter = data.certificateCounter + 1;
        const certificateNumber =
          certInput.certificateNumber ||
          nextCertificateNumber(data.settings.certificatePrefix, counter);
        const saved: Certificate = {
          id: uid('cert'),
          certificateNumber,
          studentName: certInput.studentName,
          course: certInput.course,
          courseDuration: certInput.courseDuration,
          completionDate: certInput.completionDate,
          instructorName: certInput.instructorName,
          createdAt: new Date().toISOString(),
        };
        patch((prev) => ({
          ...prev,
          certificateCounter: Math.max(prev.certificateCounter + 1, counter),
          certificates: [saved, ...prev.certificates.filter((c) => c.id !== saved.id)],
        }));
        return saved;
      },
      deleteCertificate: (id) =>
        patch((prev) => ({
          ...prev,
          certificates: prev.certificates.filter((c) => c.id !== id),
        })),
      getCertificateByNumber: (number) =>
        data.certificates.find(
          (c) => c.certificateNumber.toLowerCase() === number.trim().toLowerCase()
        ),
      addMedia: (item) => {
        const media: MediaItem = {
          ...item,
          id: uid('media'),
          createdAt: new Date().toISOString(),
        };
        patch((prev) => ({ ...prev, media: [media, ...prev.media] }));
        return media;
      },
      deleteMedia: (id) =>
        patch((prev) => ({ ...prev, media: prev.media.filter((m) => m.id !== id) })),
      uploadImage: async (file) => {
        const src = await optimizeImageFile(file);
        const media: MediaItem = {
          id: uid('media'),
          name: file.name,
          src,
          createdAt: new Date().toISOString(),
        };
        patch((prev) => ({ ...prev, media: [media, ...prev.media] }));
        return src;
      },
      resetData: () => setData(resetStudioData()),
    };
  }, [data, patch]);

  return <StudioContext.Provider value={value}>{children}</StudioContext.Provider>;
};

export function useStudio() {
  const ctx = useContext(StudioContext);
  if (!ctx) throw new Error('useStudio must be used within StudioProvider');
  return ctx;
}
