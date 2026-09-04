export type ServiceCategory = 'nails' | 'lashes' | 'brows' | 'beauty' | 'courses';

export type GalleryCategory =
  | 'nails'
  | 'lashes'
  | 'makeup'
  | 'mani-pedi'
  | 'studios'
  | 'class';

export type BookingStatus = 'pending' | 'confirmed' | 'completed' | 'cancelled';

export type EnrollmentStatus = 'active' | 'completed' | 'withdrawn';

export type StaffRole = 'nail_tech' | 'lash_tech' | 'esthetician' | 'instructor' | 'manager';

/**
 * PUBLIC UI RULE: Never render `price` / `priceLabel` / currency on public routes.
 * Optional price fields exist only for future admin/invoicing use.
 */
export interface Service {
  id: string;
  name: string;
  description: string;
  /** @internal Admin/future invoicing only — do not render on public UI */
  price: number | null;
  /** @internal Admin/future invoicing only — do not render on public UI */
  priceLabel?: string;
  duration: number | null;
  durationLabel?: string;
  category: ServiceCategory;
  image: string;
  popular?: boolean;
  active: boolean;
  order: number;
  staffIds?: string[];
}

export interface GalleryImage {
  id: string;
  src: string;
  caption: string;
  category: GalleryCategory;
  featured: boolean;
  order: number;
}

export interface Course {
  id: string;
  name: string;
  description: string;
  duration: string;
  /** @internal Do not render on public UI — use "Contact us for enrollment" CTA */
  price: string;
  image: string;
  curriculum: string[];
  enrollmentInfo: string;
  active: boolean;
  order: number;
}

export interface Testimonial {
  id: string;
  name: string;
  text: string;
  rating: number;
  date: string;
  source?: string;
  featured: boolean;
  visible: boolean;
}

export interface Certificate {
  id: string;
  certificateNumber: string;
  studentId?: string;
  studentName: string;
  courseId?: string;
  course: string;
  courseDuration: string;
  completionDate: string;
  instructorName: string;
  signatureLabel?: string;
  createdAt: string;
}

export interface Booking {
  id: string;
  serviceIds: string[];
  serviceId: string;
  serviceName: string;
  date: string;
  time: string;
  customerName: string;
  phone: string;
  email: string;
  message: string;
  preferredArtist: string;
  staffId: string | null;
  status: BookingStatus;
  createdAt: string;
  /** @internal Do not render on public UI */
  totalPrice: number | null;
  reference: string;
}

export interface MediaItem {
  id: string;
  name: string;
  src: string;
  createdAt: string;
}

export interface WorkingHours {
  day: number; // 0=Sun … 6=Sat
  startTime: string;
  endTime: string;
  isAvailable: boolean;
}

export interface Staff {
  id: string;
  name: string;
  role: StaffRole;
  title: string;
  bio: string;
  specialties: string[];
  image: string;
  serviceIds: string[];
  workingHours: WorkingHours[];
  active: boolean;
  order: number;
}

export interface Student {
  id: string;
  name: string;
  email: string;
  phone: string;
  notes: string;
  enrolledAt: string;
  active: boolean;
}

export interface ClassSession {
  id: string;
  courseId: string;
  name: string;
  instructorId: string;
  startDate: string;
  endDate: string;
  capacity: number;
  location: string;
  active: boolean;
}

export interface Enrollment {
  id: string;
  studentId: string;
  classId: string;
  courseId: string;
  status: EnrollmentStatus;
  enrolledAt: string;
  progress: number;
  notes: string;
}

export interface OwnerUser {
  id: string;
  email: string;
  password: string;
  name: string;
  role: 'owner';
}

export interface SiteContent {
  heroTitle: string;
  heroSubtitle: string;
  heroImage: string;
  heroCtaPrimary: string;
  heroCtaSecondary: string;
  aboutHeading: string;
  aboutDescription: string;
  aboutImage: string;
  instagramHandle: string;
  instagramUrl: string;
  facebookUrl: string;
  phone: string;
  addressLine1: string;
  addressLine2: string;
  mapsUrl: string;
  hoursWeekday: string;
  hoursSaturday: string;
  googleRating: string;
  googleReviewCount: string;
}

export interface SiteSettings {
  formspreeFormId: string;
  adminPassword: string;
  adminEmail: string;
  studioName: string;
  certificatePrefix: string;
  bookingTimeSlots: string[];
}

export interface StudioData {
  services: Service[];
  gallery: GalleryImage[];
  courses: Course[];
  testimonials: Testimonial[];
  certificates: Certificate[];
  bookings: Booking[];
  media: MediaItem[];
  staff: Staff[];
  students: Student[];
  classes: ClassSession[];
  enrollments: Enrollment[];
  owner: OwnerUser;
  content: SiteContent;
  settings: SiteSettings;
  certificateCounter: number;
}

export const GALLERY_FILTERS = [
  { id: 'all', label: 'ALL' },
  { id: 'nails', label: 'NAILS' },
  { id: 'lashes', label: 'LASHES' },
  { id: 'makeup', label: 'MAKEUP' },
  { id: 'mani-pedi', label: 'MANI & PEDI' },
  { id: 'studios', label: 'STUDIOS' },
  { id: 'class', label: 'CLASS' },
] as const;

export const GALLERY_CATEGORY_OPTIONS: { value: GalleryCategory; label: string }[] = [
  { value: 'nails', label: 'Nails' },
  { value: 'lashes', label: 'Lashes' },
  { value: 'makeup', label: 'Makeup' },
  { value: 'mani-pedi', label: 'Mani & Pedi' },
  { value: 'studios', label: 'Studios' },
  { value: 'class', label: 'Class' },
];

export const SERVICE_CATEGORY_OPTIONS: { value: ServiceCategory; label: string }[] = [
  { value: 'nails', label: 'Nails' },
  { value: 'lashes', label: 'Lashes' },
  { value: 'brows', label: 'Brows' },
  { value: 'beauty', label: 'Beauty' },
  { value: 'courses', label: 'Courses' },
];
