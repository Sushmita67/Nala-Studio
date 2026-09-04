// Dummy data for Nala Studio Beauty Salon
export interface Service {
  id: string;
  name: string;
  description: string;
  price: number;
  duration: number; // in minutes
  category: 'nails' | 'lashes' | 'pedicure' | 'facial' | 'massage' | 'course';
  image: string;
  icon: string; // Icon name for visual representation
  addons: Addon[];
  popular: boolean;
  staffIds: string[]; // Staff members who can perform this service
}

export interface Addon {
  id: string;
  name: string;
  price: number;
  duration: number;
  description: string;
}

export interface Staff {
  id: string;
  name: string;
  role: 'nail_tech' | 'lash_tech' | 'esthetician' | 'manager';
  specialties: string[];
  rating: number;
  experience: string;
  image: string;
  availability: Availability[];
  serviceIds: string[]; // Services this staff member can perform
}

export interface Availability {
  day: string;
  startTime: string;
  endTime: string;
  isAvailable: boolean;
}

export interface User {
  id: string;
  name: string;
  email: string;
  password: string; // Added for authentication testing
  phone: string;
  loyaltyPoints: number;
  membership: 'basic' | 'premium' | 'vip';
  favoriteTechs: string[];
  preferences: {
    notifications: boolean;
    darkMode: boolean;
  };
}

export interface Booking {
  id: string;
  userId: string;
  serviceId: string;
  staffId: string;
  date: string;
  time: string;
  status: 'confirmed' | 'pending' | 'cancelled' | 'completed';
  addons: string[];
  totalPrice: number;
  notes: string;
  duration: number; // Service duration in minutes
}

export interface CalendarSlot {
  id: string;
  staffId: string;
  date: string;
  time: string;
  isAvailable: boolean;
  bookingId?: string;
}

export const services: Service[] = [
  {
    id: '1',
    name: 'Nail Extensions',
    description: 'Durable, elegant and customized nail extensions that add instant glamour to your hands.',
    price: 2500,
    duration: 150,
    category: 'nails',
    image: '/images/manicure.jpg',
    icon: '💅',
    popular: true,
    staffIds: ['1', '3'],
    addons: [
      {
        id: 'a1',
        name: 'Gel Polish',
        price: 1500,
        duration: 20,
        description: 'Long-lasting gel polish application'
      },
      {
        id: 'a2',
        name: 'Nail Art',
        price: 1000,
        duration: 15,
        description: 'Custom nail art design'
      }
    ]
  },
  {
    id: '2',
    name: 'Gel Nail',
    description: 'Experience long-lasting gel polish with nourishing nail care that keeps your nails flawless.',
    price: 2000,
    duration: 60,
    category: 'nails',
    image: '/images/gel-manicure.jpg',
    icon: '💅',
    popular: true,
    staffIds: ['1', '3'],
    addons: [
      {
        id: 'a3',
        name: 'Nail Art',
        price: 1000,
        duration: 15,
        description: 'Custom nail art design'
      },
      {
        id: 'a4',
        name: 'Hand Massage',
        price: 800,
        duration: 10,
        description: 'Relaxing hand massage'
      }
    ]
  },

  {
    id: '4',
    name: 'Lash Extensions',
    description: 'Enhance your natural beauty with soft, lightweight lash extensions that add length, volume and definition.',
    price: 3450,
    duration: 130,
    category: 'lashes',
    image: '/images/lash-extensions.jpg',
    icon: '👁️',
    popular: true,
    staffIds: ['3'],
    addons: [
      {
        id: 'a7',
        name: 'Lash Lift',
        price: 2500,
        duration: 30,
        description: 'Lash lift and tint'
      }
    ]
  },
  {
    id: '5',
    name: 'Manicure',
    description: 'A soothing manicure treatment for healthy, hydrated hands and soft, elegant nails.',
    price: 1200,
    duration: 45,
    category: 'lashes',
    image: '/images/lash-lift.jpg',
    icon: '💅️',
    popular: false,
    staffIds: ['1'],
    addons: []
  },
  {
    id: '6',
    name: 'Pedicure',
    description: 'Rejuvenating pedicure care for soft heels, healthy nails and a clean finish.',
    price: 2100,
    duration: 60,
    category: 'facial',
    image: '/images/facial.jpg',
    icon: '✨',
    popular: false,
    staffIds: ['3'],
    addons: [
      {
        id: 'a8',
        name: 'Face Mask',
        price: 1500,
        duration: 20,
        description: 'Custom face mask treatment'
      }
    ]
  },

  {
    id: '3',
    name: 'Nails and Lashes Courses',
    description: 'Enjoy long-lasting toe gel polish with nourishing nail care that keeps your toes beautiful',
    price: 1500,
    duration: 60,
    category: 'course',
    image: '/images/pedicure.jpg',
    icon: '💅️',
    popular: true,
    staffIds: ['3'],
    addons: [

    ]
  }
];

export const staff: Staff[] = [
  // {
  //   id: '1',
  //   name: 'Ashmita Bishwakarma',
  //   role: 'nail_tech',
  //   specialties: ['Gel Manicure', 'Nail Art', 'Classic Manicure'],
  //   rating: 4.8,
  //   experience: '5 years',
  //   image: '/images/staff-priya.jpg',
  //   serviceIds: ['1', '2'],
  //   availability: [
  //     { day: 'monday', startTime: '09:00', endTime: '17:00', isAvailable: true },
  //     { day: 'tuesday', startTime: '09:00', endTime: '17:00', isAvailable: true },
  //     { day: 'wednesday', startTime: '09:00', endTime: '17:00', isAvailable: true },
  //     { day: 'thursday', startTime: '09:00', endTime: '17:00', isAvailable: true },
  //     { day: 'friday', startTime: '09:00', endTime: '17:00', isAvailable: true },
  //     { day: 'saturday', startTime: '10:00', endTime: '18:00', isAvailable: true },
  //     { day: 'sunday', startTime: '10:00', endTime: '16:00', isAvailable: false }
  //   ]
  // },

  {
    id: '3',
    name: 'Alisha',
    role: 'nail_tech',
    specialties: ['Lash Extensions', 'Lash Lift', 'Nail Extensions', 'Manicure', 'Pedicure'],
    rating: 5,
    experience: '4 years',
    image: '/images/staff-sita.jpg',
    serviceIds: ['1', '2', '3', '6'],
    availability: [
      { day: 'monday', startTime: '11:00', endTime: '17:00', isAvailable: true },
      { day: 'tuesday', startTime: '11:00', endTime: '17:00', isAvailable: true },
      { day: 'wednesday', startTime: '11:00', endTime: '17:00', isAvailable: true },
      { day: 'thursday', startTime: '11:00', endTime: '17:00', isAvailable: true },
      { day: 'friday', startTime: '11:00', endTime: '17:00', isAvailable: true },
      { day: 'saturday', startTime: '11:00', endTime: '18:00', isAvailable: true },
      { day: 'sunday', startTime: '11:00', endTime: '17:00', isAvailable: false }
    ]
  }
];

export const users: User[] = [
  {
    id: '1',
    name: 'Sushmita Bishwakarma',
    email: 'sushmita@gmail.com',
    password: 'password123', // Added for authentication testing
    phone: '+977-9841234567',
    loyaltyPoints: 450,
    membership: 'premium',
    favoriteTechs: ['1', '2'],
    preferences: {
      notifications: true,
      darkMode: false
    }
  },
  {
    id: '2',
    name: 'Emma Davis',
    email: 'emma@example.com',
    password: 'password456', // Added for authentication testing
    phone: '+977-9847654321',
    loyaltyPoints: 120,
    membership: 'basic',
    favoriteTechs: ['3'],
    preferences: {
      notifications: true,
      darkMode: true
    }
  }
];

// Generate dates for the next week
const generateNextWeekDates = () => {
  const dates = [];
  const today = new Date();
  for (let i = 1; i <= 7; i++) {
    const date = new Date(today);
    date.setDate(today.getDate() + i);
    dates.push(date.toISOString().split('T')[0]);
  }
  return dates;
};

const nextWeekDates = generateNextWeekDates();

export const bookings: Booking[] = [
  // Existing bookings for testing availability
  {
    id: '1',
    userId: '1',
    serviceId: '2',
    staffId: '1',
    date: nextWeekDates[0], // Tomorrow
    time: '14:00',
    status: 'confirmed',
    addons: ['a3'],
    totalPrice: 4500,
    notes: 'Prefer light pink color',
    duration: 60
  },

];

export const calendarSlots: CalendarSlot[] = [
  // Monday slots
  { id: '1', staffId: '1', date: nextWeekDates[0], time: '11:00', isAvailable: true },
  { id: '2', staffId: '1', date: nextWeekDates[0], time: '12:00', isAvailable: false, bookingId: '4' },
  { id: '3', staffId: '1', date: nextWeekDates[0], time: '13:00', isAvailable: true },
  { id: '4', staffId: '1', date: nextWeekDates[0], time: '14:00', isAvailable: true },
  { id: '5', staffId: '1', date: nextWeekDates[0], time: '15:00', isAvailable: true },
  { id: '6', staffId: '1', date: nextWeekDates[0], time: '16:00', isAvailable: false, bookingId: '1' },
  { id: '7', staffId: '1', date: nextWeekDates[0], time: '17:00', isAvailable: true },
  { id: '8', staffId: '1', date: nextWeekDates[0], time: '18:00', isAvailable: true },
  
  // Tuesday slots
  { id: '9', staffId: '3', date: nextWeekDates[1], time: '11:00', isAvailable: true },
  { id: '10', staffId: '3', date: nextWeekDates[1], time: '12:00', isAvailable: false, bookingId: '2' },
  { id: '11', staffId: '3', date: nextWeekDates[1], time: '13:00', isAvailable: true },
  { id: '12', staffId: '3', date: nextWeekDates[1], time: '14:00', isAvailable: true },
  { id: '13', staffId: '3', date: nextWeekDates[1], time: '15:00', isAvailable: true },
  { id: '14', staffId: '3', date: nextWeekDates[1], time: '16:00', isAvailable: true },
  { id: '15', staffId: '3', date: nextWeekDates[1], time: '17:00', isAvailable: true },
  { id: '16', staffId: '3', date: nextWeekDates[1], time: '18:00', isAvailable: true },
];

export const testimonials = [
  {
    id: '1',
    name: 'Priya Sharma',
    rating: 5,
    comment: 'Amazing service! The nail art was exactly what I wanted. Highly recommend!',
    date: '2024-01-10'
  },
  {
    id: '2',
    name: 'Anjali Patel',
    rating: 5,
    comment: 'Best lash extensions I\'ve ever had. Very professional and clean salon.',
    date: '2024-01-08'
  },
  {
    id: '3',
    name: 'Sita Thapa',
    rating: 4,
    comment: 'Great pedicure service. The staff is very friendly and the salon is beautiful.',
    date: '2024-01-05'
  }
];

export const blogPosts = [
  {
    id: '1',
    title: 'Premium Nail Care',
    excerpt: 'Experience our premium nail care services including gel manicures, nail art and professional nail treatments...',
    content: 'Experience our premium nail care services including gel manicures, nail art, and professional nail treatments. Our expert technicians ensure your nails look beautiful, healthy, and long-lasting.',
    author: 'Nala Studio Team',
    date: '2024-12-20',
    image: '/assets/images/ns-24.jpg',
    tags: ['nails', 'gel manicure', 'nail care']
  },
  {
    id: '2',
    title: 'Nail Extensions',
    excerpt: 'Get long nails with our professional nail extension services, tailored to your desired look...',
    content: 'Achieve long, beautiful nails with our professional nail extension services. From natural to glamorous looks, we tailor each set to your personal style with durable, high-quality materials.',
    author: 'Nala Studio Team',
    date: '2024-11-15',
    image: '/assets/images/ns-6.jpg',
    tags: ['nail extensions', 'beauty', 'style']
  },
  {
    id: '3',
    title: 'Beauty Treatments',
    excerpt: 'Relax and rejuvenate with our range of facials, waxing, and skincare treatments...',
    content: 'Relax and refresh your skin with our beauty treatments including facial therapy, waxing, and skincare routines. Designed to give you a complete glow and confidence boost for every occasion.',
    author: 'Nala Studio Team',
    date: '2024-10-10',
    image: '/assets/images/ns-22.jpg',
    tags: ['beauty', 'facials', 'skincare']
  },
  {
    id: '4',
    title: 'Special Occasions',
    excerpt: 'Make your big day even more beautiful with our bridal and event-ready services...',
    content: 'Make your special day even more stunning with our bridal packages, party makeup, and custom nail art designs. Perfect for weddings, celebrations, and any occasion that deserves extra glamour.',
    author: 'Nala Studio Team',
    date: '2024-09-25',
    image: '/assets/images/ns-21.jpg',
    tags: ['bridal', 'makeup', 'special occasions']
  },
  {
    id: '5',
    title: 'Cuticle Care 101: Healthier Nails Between Appointments',
    excerpt: 'Small daily habits that keep your nails strong and your manicure fresher for longer...',
    content: 'Full article content with cuticle oil routines, filing tips and product suggestions.',
    author: 'Nala Studio Team',
    date: '2024-10-02',
    image: '/assets/images/ns-10.jpg',
    tags: ['nail care', 'home care', 'tips']
  },
  // {
  //   id: '6',
  //   title: 'How To Make Lash Extensions Last Longer',
  //   excerpt: 'Pro aftercare and sleeping tips to extend your lash fill cycle...',
  //   content: 'Full article content on cleansing, makeup choices and pillowcase tips for retention.',
  //   author: 'Nala Studio Team',
  //   date: '2024-09-15',
  //   image: '/assets/images/ns-6.jpg',
  //   tags: ['lash extensions', 'aftercare', 'retention']
  // },
  {
    id: '7',
    title: 'The Ultimate Pre-Appointment Checklist',
    excerpt: 'Arrive prepared for flawless nails and lashes with this quick checklist...',
    content: 'Full article content covering preparation, what to avoid, and timing tips.',
    author: 'Nala Studio Team',
    date: '2024-08-20',
    image: '/assets/images/ns-hero1.jpg',
    tags: ['checklist', 'nails', 'lashes']
  }
];

export const membershipPlans = [
  {
    id: 'basic',
    name: 'Basic',
    price: 0,
    benefits: ['5% discount on services', 'Birthday special', 'Newsletter access'],
    color: 'bg-pink-100'
  },
  {
    id: 'premium',
    name: 'Premium',
    price: 99,
    benefits: ['15% discount on services', 'Free add-ons', 'Priority booking', 'Monthly gift'],
    color: 'bg-pink-200'
  },
  {
    id: 'vip',
    name: 'VIP',
    price: 199,
    benefits: ['25% discount on services', 'All add-ons included', 'Exclusive events', 'Personal stylist'],
    color: 'bg-pink-300'
  }
];

// Helper functions for booking system
export const getAvailableStaffForService = (serviceId: string): Staff[] => {
  const service = services.find(s => s.id === serviceId);
  if (!service) return [];
  return staff.filter(s => service.staffIds.includes(s.id));
};

export const getServiceById = (serviceId: string): Service | undefined => {
  return services.find(s => s.id === serviceId);
};

export const getStaffById = (staffId: string): Staff | undefined => {
  return staff.find(s => s.id === staffId);
};

export const isStaffAvailable = (staffId: string, date: string, time: string, duration: number): boolean => {
  // Check if staff has any conflicting bookings
  const conflictingBookings = bookings.filter(booking => {
    if (booking.staffId !== staffId || booking.date !== date) return false;
    
    const bookingStart = new Date(`${date}T${booking.time}`);
    const bookingEnd = new Date(bookingStart.getTime() + (booking.duration + 15) * 60000); // +15 min break
    
    const requestedStart = new Date(`${date}T${time}`);
    const requestedEnd = new Date(requestedStart.getTime() + (duration + 15) * 60000); // +15 min break
    
    return bookingStart < requestedEnd && bookingEnd > requestedStart;
  });
  
  return conflictingBookings.length === 0;
};

// Debug: Log exports to verify they're working
console.log('dummyData.ts loaded, exports available:', { 
  users: typeof users, 
  services: typeof services,
  servicesLength: services.length,
  popularServices: services.filter(s => s.popular).length
}); 