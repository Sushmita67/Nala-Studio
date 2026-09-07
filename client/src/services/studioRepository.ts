import { STORAGE_KEY } from '../config';
import { createSeedData } from '../data/seed';
import type { Certificate, HeroSlide, SiteContent, StudioData } from '../types';

function isObject(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

function normalizeContent(seed: SiteContent, raw?: Partial<SiteContent>): SiteContent {
  const merged = { ...seed, ...(raw || {}) };
  const slides = Array.isArray(merged.heroSlides) ? merged.heroSlides : [];
  const heroSlides: HeroSlide[] =
    slides.length > 0
      ? slides
          .map((s, i) => ({
            id: String(s.id || `slide-${i + 1}`),
            src: String(s.src || ''),
            alt: String(s.alt || 'NALA Studio'),
            order: typeof s.order === 'number' ? s.order : i + 1,
            active: s.active !== false,
          }))
          .filter((s) => s.src)
      : merged.heroImage
        ? [
            {
              id: 'slide-legacy',
              src: merged.heroImage,
              alt: 'NALA Studio',
              order: 1,
              active: true,
            },
          ]
        : seed.heroSlides;

  const firstActive = [...heroSlides].sort((a, b) => a.order - b.order).find((s) => s.active);
  return {
    ...merged,
    heroSlides,
    heroImage: firstActive?.src || merged.heroImage || seed.heroImage,
  };
}

function normalizeBooking(raw: Record<string, unknown>, index: number) {
  const serviceId = String(raw.serviceId || '');
  const serviceIds = Array.isArray(raw.serviceIds)
    ? (raw.serviceIds as string[])
    : serviceId
      ? [serviceId]
      : [];
  return {
    id: String(raw.id || `bk-legacy-${index}`),
    serviceIds,
    serviceId: serviceId || serviceIds[0] || '',
    serviceName: String(raw.serviceName || ''),
    date: String(raw.date || ''),
    time: String(raw.time || ''),
    customerName: String(raw.customerName || ''),
    phone: String(raw.phone || ''),
    email: String(raw.email || ''),
    message: String(raw.message || ''),
    preferredArtist: String(raw.preferredArtist || ''),
    staffId: (raw.staffId as string | null) ?? null,
    status: (raw.status as StudioData['bookings'][number]['status']) || 'pending',
    createdAt: String(raw.createdAt || new Date().toISOString()),
    totalPrice: (raw.totalPrice as number | null) ?? null,
    reference: String(raw.reference || `NALA-${String(index + 1).padStart(4, '0')}`),
  };
}

function normalizeCertificate(raw: Record<string, unknown>, index: number): Certificate {
  const completionDate = String(raw.completionDate || '');
  return {
    id: String(raw.id || `cert-legacy-${index}`),
    certificateNumber: String(raw.certificateNumber || ''),
    studentId: raw.studentId ? String(raw.studentId) : undefined,
    studentName: String(raw.studentName || ''),
    courseId: raw.courseId ? String(raw.courseId) : undefined,
    course: String(raw.course || ''),
    startDate: String(raw.startDate || ''),
    completionDate,
    dateAwarded: String(raw.dateAwarded || completionDate),
    courseDuration: raw.courseDuration ? String(raw.courseDuration) : undefined,
    instructorName: raw.instructorName ? String(raw.instructorName) : undefined,
    signatureLabel: raw.signatureLabel ? String(raw.signatureLabel) : undefined,
    createdAt: String(raw.createdAt || new Date().toISOString()),
  };
}

/** Repository seam — swap localStorage for API calls later without touching components. */
export function loadStudioData(): StudioData {
  const seed = createSeedData();
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return seed;
    const parsed = JSON.parse(raw) as Partial<StudioData>;
    if (!isObject(parsed)) return seed;

    return {
      ...seed,
      ...parsed,
      services: Array.isArray(parsed.services) ? parsed.services : seed.services,
      gallery: Array.isArray(parsed.gallery) ? parsed.gallery : seed.gallery,
      courses: Array.isArray(parsed.courses) ? parsed.courses : seed.courses,
      testimonials: Array.isArray(parsed.testimonials) ? parsed.testimonials : seed.testimonials,
      certificates: Array.isArray(parsed.certificates)
        ? parsed.certificates.map((c, i) =>
            normalizeCertificate(c as unknown as Record<string, unknown>, i)
          )
        : seed.certificates,
      bookings: Array.isArray(parsed.bookings)
        ? parsed.bookings.map((b, i) => normalizeBooking(b as unknown as Record<string, unknown>, i))
        : seed.bookings,
      media: Array.isArray(parsed.media) ? parsed.media : seed.media,
      staff: Array.isArray(parsed.staff) ? parsed.staff : seed.staff,
      students: Array.isArray(parsed.students) ? parsed.students : seed.students,
      classes: Array.isArray(parsed.classes) ? parsed.classes : seed.classes,
      enrollments: Array.isArray(parsed.enrollments) ? parsed.enrollments : seed.enrollments,
      owner: parsed.owner ? { ...seed.owner, ...parsed.owner } : seed.owner,
      content: normalizeContent(seed.content, parsed.content),
      settings: { ...seed.settings, ...(parsed.settings || {}) },
      certificateCounter:
        typeof parsed.certificateCounter === 'number'
          ? parsed.certificateCounter
          : seed.certificateCounter,
    };
  } catch {
    return seed;
  }
}

export function saveStudioData(data: StudioData): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

export function resetStudioData(): StudioData {
  const seed = createSeedData();
  saveStudioData(seed);
  return seed;
}

export function getStudioSnapshot(): StudioData {
  return loadStudioData();
}

export function updateStudioData(updater: (prev: StudioData) => StudioData): StudioData {
  const next = updater(loadStudioData());
  saveStudioData(next);
  return next;
}
