import type {
  Course,
  GalleryImage,
  Service,
  SiteContent,
  SiteSettings,
  StudioData,
  Testimonial,
} from '../types';
import { BRAND, DEFAULT_ADMIN_PASSWORD, DEFAULT_FORMSPREE_FORM_ID } from '../config';

import heroImg from '../assets/images/ns-hero1.jpg';
import aboutImg from '../assets/images/nss1.jpg';
import ns1 from '../assets/images/ns-1.jpg';
import ns2 from '../assets/images/ns-2.jpg';
import ns3 from '../assets/images/ns-3.jpg';
import ns4 from '../assets/images/ns-4.jpg';
import ns5 from '../assets/images/ns-5.jpg';
import ns6 from '../assets/images/ns-6.jpg';
import ns10 from '../assets/images/ns-10.jpg';
import ns11 from '../assets/images/ns-11.jpg';
import ns12 from '../assets/images/ns-12.jpg';
import ns14 from '../assets/images/ns-14.jpg';
import ns15 from '../assets/images/ns-15.jpg';
import ns16 from '../assets/images/ns-16.jpg';
import ns17 from '../assets/images/ns-17.jpg';
import ns19 from '../assets/images/ns-19.jpg';
import ns21 from '../assets/images/ns-21.jpg';
import ns22 from '../assets/images/ns-22.jpg';
import ns23 from '../assets/images/ns-23.jpg';
import ns24 from '../assets/images/ns-24.jpg';
import ns25 from '../assets/images/ns-25.jpg';
import ns26 from '../assets/images/ns-26.jpg';
import nss2 from '../assets/images/nss2.jpg';
import nss3 from '../assets/images/nss3.jpg';
import nss4 from '../assets/images/nss4.jpg';
import nss5 from '../assets/images/nss5.jpg';

export const seedServices: Service[] = [
  {
    id: 'svc-manicure',
    name: 'Manicure',
    description: 'Classic shaping, cuticle care and a flawless finish.',
    price: 1200,
    duration: 45,
    category: 'nails',
    image: ns10,
    popular: true,
    active: true,
    order: 1,
  },
  {
    id: 'svc-gel-manicure',
    name: 'Gel Manicure',
    description: 'Long-lasting, high-shine gel colour with a clean finish.',
    price: 2000,
    duration: 60,
    category: 'nails',
    image: ns11,
    popular: true,
    active: true,
    order: 2,
  },
  {
    id: 'svc-acrylic',
    name: 'Acrylic Nails',
    description: 'Durable, sculpted acrylic sets tailored to your shape.',
    price: 3500,
    duration: 90,
    category: 'nails',
    image: ns12,
    popular: true,
    active: true,
    order: 3,
  },
  {
    id: 'svc-extensions',
    name: 'Nail Extensions',
    description: 'Elegant extensions for instant length and glamour.',
    price: 3500,
    duration: 120,
    category: 'nails',
    image: ns14,
    active: true,
    order: 4,
  },
  {
    id: 'svc-designs',
    name: 'Nail Designs',
    description: 'Custom nail art designed around your style.',
    price: 500,
    duration: 30,
    category: 'nails',
    image: ns15,
    active: true,
    order: 5,
  },
  {
    id: 'svc-painting',
    name: 'Nail Painting',
    description: 'Clean polish application in your chosen shade.',
    price: 800,
    duration: 30,
    category: 'nails',
    image: ns16,
    active: true,
    order: 6,
  },
  {
    id: 'svc-repair',
    name: 'Nail Repair',
    description: 'Repair and reinforce damaged nails with care.',
    price: 500,
    duration: 20,
    category: 'nails',
    image: ns17,
    active: true,
    order: 7,
  },
  {
    id: 'svc-polish-change',
    name: 'Nail Polish Changes',
    description: 'Fresh colour refresh with tidy finishing.',
    price: 600,
    duration: 25,
    category: 'nails',
    image: ns19,
    active: true,
    order: 8,
  },
  {
    id: 'svc-polish-removal',
    name: 'Polish Removal',
    description: 'Gentle gel or regular polish removal.',
    price: 400,
    duration: 20,
    category: 'nails',
    image: ns1,
    active: true,
    order: 9,
  },
  {
    id: 'svc-lashes',
    name: 'Eyelash Extensions',
    description: 'Lightweight, tailored lash sets for everyday wear.',
    price: 3500,
    duration: 120,
    category: 'lashes',
    image: ns21,
    popular: true,
    active: true,
    order: 10,
  },
  {
    id: 'svc-makeup',
    name: 'Makeup',
    description: 'Occasion and bridal-ready makeup by NALA.',
    price: 4000,
    duration: 60,
    category: 'beauty',
    image: ns22,
    popular: true,
    active: true,
    order: 11,
  },
  {
    id: 'svc-pedicure',
    name: 'Pedicure',
    description: 'Soft heels, healthy nails and a polished finish.',
    price: 2100,
    duration: 60,
    category: 'beauty',
    image: ns23,
    active: true,
    order: 12,
  },
  {
    id: 'svc-courses',
    name: 'Nails & Lashes Courses',
    description: 'Professional training for aspiring beauty artists.',
    price: null,
    priceLabel: 'On request',
    duration: null,
    durationLabel: 'Flexible',
    category: 'courses',
    image: ns24,
    active: true,
    order: 13,
  },
];

export const seedGallery: GalleryImage[] = [
  { id: 'gal-1', src: ns26, caption: 'NALA Studio', category: 'studios', featured: true, order: 1 },
  { id: 'gal-2', src: ns10, caption: 'Soft pink nail extensions', category: 'nails', featured: true, order: 2 },
  { id: 'gal-3', src: ns17, caption: 'Almond white with gold accents', category: 'nails', featured: true, order: 3 },
  { id: 'gal-4', src: ns19, caption: 'Long glam tip set', category: 'nails', featured: false, order: 4 },
  { id: 'gal-5', src: ns14, caption: 'Red and gold statement nails', category: 'nails', featured: false, order: 5 },
  { id: 'gal-6', src: ns15, caption: 'Classic red polish', category: 'nails', featured: false, order: 6 },
  { id: 'gal-7', src: ns11, caption: 'Soft glam almond nails', category: 'nails', featured: true, order: 7 },
  { id: 'gal-8', src: ns12, caption: 'Floral fine art', category: 'nails', featured: false, order: 8 },
  { id: 'gal-9', src: ns16, caption: 'Gel manicure finish', category: 'mani-pedi', featured: false, order: 9 },
  { id: 'gal-10', src: ns21, caption: 'Natural lash extensions', category: 'lashes', featured: true, order: 10 },
  { id: 'gal-11', src: ns22, caption: 'Soft glam makeup', category: 'makeup', featured: true, order: 11 },
  { id: 'gal-12', src: ns23, caption: 'Pedicure detail', category: 'mani-pedi', featured: false, order: 12 },
  { id: 'gal-13', src: nss2, caption: 'Studio atmosphere', category: 'studios', featured: false, order: 13 },
  { id: 'gal-14', src: nss3, caption: 'Treatment room', category: 'studios', featured: false, order: 14 },
  { id: 'gal-15', src: nss4, caption: 'Class demonstration', category: 'class', featured: true, order: 15 },
  { id: 'gal-16', src: nss5, caption: 'Beauty education session', category: 'class', featured: false, order: 16 },
  { id: 'gal-17', src: ns2, caption: 'Nail art close-up', category: 'nails', featured: false, order: 17 },
  { id: 'gal-18', src: ns3, caption: 'Nude gel set', category: 'nails', featured: false, order: 18 },
  { id: 'gal-19', src: ns4, caption: 'Bridal makeup look', category: 'makeup', featured: false, order: 19 },
  { id: 'gal-20', src: ns5, caption: 'Volume lash set', category: 'lashes', featured: false, order: 20 },
  { id: 'gal-21', src: ns6, caption: 'Studio detail', category: 'studios', featured: false, order: 21 },
  { id: 'gal-22', src: ns25, caption: 'Course work in progress', category: 'class', featured: false, order: 22 },
];

export const seedCourses: Course[] = [
  {
    id: 'course-nails',
    name: 'Professional Nail Course',
    description:
      'Learn nail preparation, gel application, extensions, shaping and nail art from working professionals at NALA Studio.',
    duration: 'Flexible',
    price: 'On request',
    image: ns24,
    curriculum: [
      'Nail anatomy, hygiene & sanitation',
      'Manicure & cuticle work',
      'Gel application and finishing',
      'Acrylic & extension techniques',
      'Shaping and structure',
      'Nail art fundamentals',
      'Client care & studio practice',
    ],
    enrollmentInfo: 'Contact the studio to discuss schedule, fees and enrollment.',
    active: true,
    order: 1,
  },
  {
    id: 'course-lashes',
    name: 'Professional Lash Course',
    description:
      'A hands-on lash extension course covering mapping, isolation, application and aftercare.',
    duration: 'Flexible',
    price: 'On request',
    image: ns21,
    curriculum: [
      'Lash health & safety',
      'Lash mapping and styling',
      'Isolation and application',
      'Retention and aftercare',
      'Removal techniques',
      'Building a lash clientele',
    ],
    enrollmentInfo: 'Contact the studio to discuss schedule, fees and enrollment.',
    active: true,
    order: 2,
  },
];

export const seedTestimonials: Testimonial[] = [
  {
    id: 'rev-1',
    name: 'Sushmita Biswakarma',
    text: 'Lovely studio and beautiful nail work — the detail and finish were exactly what I wanted.',
    rating: 5,
    date: '9 months ago',
    source: 'Google',
    featured: true,
    visible: true,
  },
  {
    id: 'rev-2',
    name: 'Google Reviewer',
    text: 'Clean, calm space and the lashes turned out so natural. Will be back.',
    rating: 5,
    date: 'Google review',
    source: 'Google',
    featured: true,
    visible: true,
  },
  {
    id: 'rev-3',
    name: 'Google Reviewer',
    text: 'Great service and really talented artists. Happy with my gel manicure.',
    rating: 5,
    date: 'Google review',
    source: 'Google',
    featured: true,
    visible: true,
  },
];

export const seedContent: SiteContent = {
  heroTitle: 'BEAUTY, CRAFTED FOR YOU.',
  heroSubtitle: 'Premium nails, lashes & beauty treatments in Kathmandu.',
  heroImage: heroImg,
  heroCtaPrimary: 'BOOK AN APPOINTMENT',
  heroCtaSecondary: 'EXPLORE SERVICES',
  aboutHeading: 'Where Beauty Meets Detail',
  aboutDescription:
    'NALA Studio is a modern beauty destination in Kathmandu specializing in nails, lashes, makeup and beauty education. Every service is personal, polished and carefully crafted — from a simple polish change to a full set of extensions, lashes or bridal makeup.',
  aboutImage: aboutImg,
  instagramHandle: '@nala.studio__',
  instagramUrl: BRAND.instagram,
  facebookUrl: BRAND.facebook,
  phone: BRAND.phone,
  addressLine1: 'Triple Seven Complex',
  addressLine2: 'Phulbari, Kathmandu, Nepal',
  mapsUrl: BRAND.mapsUrl,
  hoursWeekday: 'Sunday – Friday: 10:00 AM – 7:00 PM',
  hoursSaturday: 'Saturday: 11:00 AM – 6:00 PM',
  googleRating: '4.7',
  googleReviewCount: '27',
};

export const seedSettings: SiteSettings = {
  formspreeFormId: DEFAULT_FORMSPREE_FORM_ID,
  adminPassword: DEFAULT_ADMIN_PASSWORD,
  studioName: BRAND.name,
  certificatePrefix: 'NALA',
  bookingTimeSlots: ['10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00'],
};

export function createSeedData(): StudioData {
  return {
    services: seedServices,
    gallery: seedGallery,
    courses: seedCourses,
    testimonials: seedTestimonials,
    certificates: [],
    bookings: [],
    media: seedGallery.map((g, i) => ({
      id: `media-${i + 1}`,
      name: g.caption,
      src: g.src,
      createdAt: new Date().toISOString(),
    })),
    content: seedContent,
    settings: seedSettings,
    certificateCounter: 0,
  };
}
