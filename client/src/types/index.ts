export type ServiceCategory = 'nails' | 'lashes' | 'beauty' | 'courses';

export type GalleryCategory =
  | 'nails'
  | 'lashes'
  | 'makeup'
  | 'mani-pedi'
  | 'studios'
  | 'class';

export type BookingStatus = 'pending' | 'confirmed' | 'completed' | 'cancelled';

export interface Service {
  id: string;
  name: string;
  description: string;
  price: number | null;
  priceLabel?: string;
  duration: number | null;
  durationLabel?: string;
  category: ServiceCategory;
  image: string;
  popular?: boolean;
  active: boolean;
  order: number;
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
  studentName: string;
  course: string;
  courseDuration: string;
  completionDate: string;
  instructorName: string;
  createdAt: string;
}

export interface Booking {
  id: string;
  serviceId: string;
  serviceName: string;
  date: string;
  time: string;
  customerName: string;
  phone: string;
  email: string;
  message: string;
  preferredArtist: string;
  status: BookingStatus;
  createdAt: string;
  totalPrice: number | null;
}

export interface MediaItem {
  id: string;
  name: string;
  src: string;
  createdAt: string;
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
