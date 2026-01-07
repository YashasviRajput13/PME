
import { Vendor } from './types';

export const POPULAR_LOCATIONS = [
  'Mumbai', 'Delhi', 'Bangalore', 'Goa', 'Jaipur', 'Udaipur', 'Hyderabad', 'Pune', 'Chennai', 'Kolkata'
];

export const HERO_SLIDES = [
  {
    theme: 'Wedding',
    title: 'Grand Indian Weddings',
    color: 'text-orange-400',
    image: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?q=80&w=2069&auto=format&fit=crop'
  },
  {
    theme: 'Corporate',
    title: 'Tech Summits & Galas',
    color: 'text-blue-400',
    image: 'https://images.unsplash.com/photo-1540575861501-7cf05a4b125a?q=80&w=2070&auto=format&fit=crop'
  },
  {
    theme: 'Festival',
    title: 'Vibrant Cultural Festivals',
    color: 'text-yellow-400',
    image: 'https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?q=80&w=2070&auto=format&fit=crop'
  }
];

export const MOCK_VENDORS: Vendor[] = [
  {
    id: 'v1', name: 'The Taj Palace', type: 'Venue', rating: 4.9, price: 150000, location: 'Mumbai',
    description: 'Iconic luxury venue offering unmatched hospitality and grand ballrooms for royal weddings.',
    imageUrl: 'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?q=80&w=1474&auto=format&fit=crop',
    gallery: [],
    themeExpertise: ['Wedding', 'Corporate', 'Anniversary', 'Engagement'],
    features: ['Instant Booking', 'VIP Security', 'Sea View']
  },
  {
    id: 'v2', name: 'Royal Rajputana Decor', type: 'Decor', rating: 4.8, price: 45000, location: 'Jaipur',
    description: 'Specializing in traditional Rajasthani floral arrangements and heritage lighting setups.',
    imageUrl: 'https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=2070&auto=format&fit=crop',
    gallery: [],
    themeExpertise: ['Wedding', 'Engagement', 'Festival'],
    features: ['Eco-Friendly', 'Thematic Lighting']
  },
  {
    id: 'v3', name: 'Spice Route Catering', type: 'Catering', rating: 4.7, price: 2500, location: 'Delhi',
    description: 'Award-winning catering service offering authentic North Indian and Mughlai cuisines.',
    imageUrl: 'https://images.unsplash.com/photo-1555244162-803834f70033?q=80&w=1470&auto=format&fit=crop',
    gallery: [],
    themeExpertise: ['Birthday', 'Corporate', 'Anniversary'],
    features: ['Custom Menu', 'Live Counters']
  },
  {
    id: 'v4', name: 'Silicon Valley Events', type: 'Venue', rating: 4.6, price: 35000, location: 'Bangalore',
    description: 'Modern, high-tech hub perfect for corporate workshops and seminars in the heart of the city.',
    imageUrl: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?q=80&w=2070&auto=format&fit=crop',
    gallery: [],
    themeExpertise: ['Corporate', 'Workshop', 'Seminar'],
    features: ['Fiber Internet', 'AV Tech Support']
  },
  {
    id: 'v5', name: 'Udaipur Heritage Snaps', type: 'Photography', rating: 4.9, price: 60000, location: 'Udaipur',
    description: 'Cinematic wedding photography capturing the essence of the City of Lakes.',
    imageUrl: 'https://images.unsplash.com/photo-1537633552985-df8429e8048b?q=80&w=1470&auto=format&fit=crop',
    gallery: [],
    themeExpertise: ['Wedding', 'Engagement', 'Anniversary'],
    features: ['Drone Shots', '4K Video Editing']
  },
  {
    id: 'v6', name: 'Goa Sunsets Venue', type: 'Venue', rating: 4.7, price: 80000, location: 'Goa',
    description: 'Private beachside venue with spectacular sunset views for festivals and parties.',
    imageUrl: 'https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?q=80&w=2070&auto=format&fit=crop',
    gallery: [],
    themeExpertise: ['Festival', 'Birthday', 'Holiday Party', 'Concert'],
    features: ['Beach Access', 'Open Bar']
  },
  {
    id: 'v7', name: 'Hyderabadi Shahi Flavors', type: 'Catering', rating: 4.8, price: 1800, location: 'Hyderabad',
    description: 'Authentic Hyderabadi Biryani and Royal Nizami delicacies for large gatherings.',
    imageUrl: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=1470&auto=format&fit=crop',
    gallery: [],
    themeExpertise: ['Wedding', 'Birthday', 'Anniversary'],
    features: ['Traditional Service', 'Bulk Discount']
  },
  {
    id: 'v8', name: 'Delhi Digital Frames', type: 'Photography', rating: 4.5, price: 20000, location: 'Delhi',
    description: 'Dynamic event photography for corporate launches and graduations.',
    imageUrl: 'https://images.unsplash.com/photo-1520390138845-fd2d229dd553?q=80&w=1470&auto=format&fit=crop',
    gallery: [],
    themeExpertise: ['Corporate', 'Graduation', 'Seminar'],
    features: ['Same-day Edits', 'Online Gallery']
  },
  {
    id: 'v9', name: 'Neon Lights Decor', type: 'Decor', rating: 4.6, price: 15000, location: 'Pune',
    description: 'Modern neon-themed decor for birthday parties and student events.',
    imageUrl: 'https://images.unsplash.com/photo-1530103043960-ef38714abb15?q=80&w=1470&auto=format&fit=crop',
    gallery: [],
    themeExpertise: ['Birthday', 'Concert', 'Festival'],
    features: ['Budget Friendly', 'Quick Setup']
  },
  {
    id: 'v10', name: 'Bengaluru Tech Park Inn', type: 'Venue', rating: 4.5, price: 40000, location: 'Bangalore',
    description: 'Professional space within the tech corridor for quick business meets and workshops.',
    imageUrl: 'https://images.unsplash.com/photo-1431540015161-0bf868a2d407?q=80&w=1470&auto=format&fit=crop',
    gallery: [],
    themeExpertise: ['Corporate', 'Workshop', 'Seminar'],
    features: ['On-site Cafe', 'Free Parking']
  },
  {
    id: 'v11', name: 'The Leela Grand', type: 'Venue', rating: 4.9, price: 200000, location: 'Delhi',
    description: 'Opulent suites and banquets for elite corporate events and high-profile weddings.',
    imageUrl: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=1470&auto=format&fit=crop',
    gallery: [],
    themeExpertise: ['Wedding', 'Corporate', 'Anniversary'],
    features: ['Full Service', '5-Star Catering']
  },
  {
    id: 'v12', name: 'Chennai Coast Decor', type: 'Decor', rating: 4.7, price: 35000, location: 'Chennai',
    description: 'Specializing in traditional South Indian floral temple-style decor.',
    imageUrl: 'https://images.unsplash.com/photo-1512100356956-c1b47f4b8a25?q=80&w=1470&auto=format&fit=crop',
    gallery: [],
    themeExpertise: ['Wedding', 'Engagement', 'Baby Shower'],
    features: ['Organic Flowers', 'Eco-Setup']
  },
  // 10 MORE VENDORS
  {
    id: 'v13', name: 'Lumina Photography', type: 'Photography', rating: 4.9, price: 75000, location: 'Mumbai',
    description: 'Fine art event photography focusing on candid moments and cinematic storytelling.',
    imageUrl: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?q=80&w=1528&auto=format&fit=crop',
    gallery: [],
    themeExpertise: ['Wedding', 'Engagement', 'Concert'],
    features: ['Instant Preview', 'Global Coverage']
  },
  {
    id: 'v14', name: 'Coastal Delights', type: 'Catering', rating: 4.6, price: 1200, location: 'Goa',
    description: 'Beachside catering experts serving fresh seafood and authentic Goan recipes.',
    imageUrl: 'https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?q=80&w=1470&auto=format&fit=crop',
    gallery: [],
    themeExpertise: ['Festival', 'Holiday Party', 'Birthday'],
    features: ['Live Barbecue', 'Mocktail Bar']
  },
  {
    id: 'v15', name: 'Zenith Decorators', type: 'Decor', rating: 4.8, price: 55000, location: 'Delhi',
    description: 'Modern minimalist and sustainable decor designs for high-end corporate events.',
    imageUrl: 'https://images.unsplash.com/photo-1522158634183-f858e0388446?q=80&w=1470&auto=format&fit=crop',
    gallery: [],
    themeExpertise: ['Corporate', 'Seminar', 'Workshop'],
    features: ['Zero-Waste', 'Modular Design']
  },
  {
    id: 'v16', name: 'Lake City Banquets', type: 'Venue', rating: 4.7, price: 95000, location: 'Udaipur',
    description: 'Scenic lakeside banquet hall with traditional Mewari architecture and modern amenities.',
    imageUrl: 'https://images.unsplash.com/photo-1519225421980-715cb0215aed?q=80&w=1470&auto=format&fit=crop',
    gallery: [],
    themeExpertise: ['Wedding', 'Engagement', 'Anniversary'],
    features: ['Lake Front', 'Traditional Music']
  },
  {
    id: 'v17', name: 'Urban Chef Catering', type: 'Catering', rating: 4.8, price: 2200, location: 'Bangalore',
    description: 'Fusion catering specializing in Indo-Western appetizers and global dessert bars.',
    imageUrl: 'https://images.unsplash.com/photo-1551218808-94e220e084d2?q=80&w=1374&auto=format&fit=crop',
    gallery: [],
    themeExpertise: ['Birthday', 'Workshop', 'Baby Shower'],
    features: ['Vegan Options', 'Interactive Stations']
  },
  {
    id: 'v18', name: 'Golden Hour Snaps', type: 'Photography', rating: 4.7, price: 45000, location: 'Jaipur',
    description: 'Specializing in outdoor pre-wedding shoots and heritage destination photography.',
    imageUrl: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?q=80&w=1469&auto=format&fit=crop',
    gallery: [],
    themeExpertise: ['Engagement', 'Wedding', 'Festival'],
    features: ['Prop Studio', 'Aerial Photos']
  },
  {
    id: 'v19', name: 'Floral Dreams Decor', type: 'Decor', rating: 4.9, price: 65000, location: 'Hyderabad',
    description: 'Exotic floral installations and bespoke stage designs for grand celebrations.',
    imageUrl: 'https://images.unsplash.com/photo-1526047932273-341f2a7631f9?q=80&w=1480&auto=format&fit=crop',
    gallery: [],
    themeExpertise: ['Wedding', 'Baby Shower', 'Anniversary'],
    features: ['Imported Blooms', '3D Layouts']
  },
  {
    id: 'v20', name: 'The Skyline Plaza', type: 'Venue', rating: 4.6, price: 50000, location: 'Pune',
    description: 'Rooftop venue with panoramic city views, ideal for sundowners and cocktail parties.',
    imageUrl: 'https://images.unsplash.com/photo-1505373877841-8d25f7d46678?q=80&w=1412&auto=format&fit=crop',
    gallery: [],
    themeExpertise: ['Corporate', 'Holiday Party', 'Concert'],
    features: ['Poolside Area', 'Sound System']
  },
  {
    id: 'v21', name: 'Traditional Tastes', type: 'Catering', rating: 4.7, price: 1500, location: 'Chennai',
    description: 'Authentic South Indian Sadya and Chettinad specialties served with heritage flair.',
    imageUrl: 'https://images.unsplash.com/photo-1626074353765-517a681e40be?q=80&w=1374&auto=format&fit=crop',
    gallery: [],
    themeExpertise: ['Wedding', 'Festival', 'Engagement'],
    features: ['Banana Leaf Service', 'Traditional Attire']
  },
  {
    id: 'v22', name: 'Cityscape Portraits', type: 'Photography', rating: 4.5, price: 30000, location: 'Kolkata',
    description: 'Documentary style photography for community festivals and cultural gatherings.',
    imageUrl: 'https://images.unsplash.com/photo-1542038784456-1ea8e935640e?q=80&w=1470&auto=format&fit=crop',
    gallery: [],
    themeExpertise: ['Festival', 'Graduation', 'Workshop'],
    features: ['Street Style', 'Fast Delivery']
  }
];
