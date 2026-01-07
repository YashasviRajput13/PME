export enum UserRole {
  GUEST = 'GUEST',
  CUSTOMER = 'CUSTOMER',
  VENDOR = 'VENDOR'
}

export type EventTheme = 
  | 'Corporate' 
  | 'Wedding' 
  | 'Festival' 
  | 'Birthday' 
  | 'Anniversary' 
  | 'Baby Shower' 
  | 'Concert' 
  | 'Workshop'
  | 'Graduation'
  | 'Engagement' 
  | 'Holiday Party'
  | 'Seminar'
  | 'Kitty Party'
  | 'Housewarming'
  | 'Naming Ceremony'
  | 'Pooja'
  | 'Surprise Party'
  | 'Reunion';

export interface Vendor {
  id: string;
  name: string;
  type: 'Venue' | 'Catering' | 'Decor' | 'Photography';
  rating: number;
  price: number;
  location: string;
  description: string;
  imageUrl: string;
  gallery: string[];
  themeExpertise: EventTheme[];
  features?: string[]; // e.g., "Instant Booking", "Free Cancellation"
}

export interface RecommendationRequest {
  budget: number;
  theme: EventTheme;
  requirements: string;
  location: string;
  date: string;
}

export interface Booking {
  id: string;
  vendorId: string;
  vendorName: string;
  customerName: string;
  date: string;
  status: 'Pending' | 'Confirmed' | 'Completed';
  totalPrice: number;
}