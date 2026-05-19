import { Room, User, ResortSettings } from '../types';

export const initialRooms: Room[] = [
  {
    id: 'room-1',
    name: 'Room 1',
    type: 'Cottage',
    capacity: 5,
    price: 2800,
    description: 'Comfortable and relaxing cottage. Features a private veranda with garden views, air conditioning, and premium bedding.',
    imageUrl: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=800&q=80',
    status: 'Available',
    amenities: ['Free Wi-Fi', 'Air Conditioning', 'Private Veranda', 'Ensuite Bathroom', 'Mini Fridge']
  },
  {
    id: 'room-2',
    name: 'Room 2',
    type: 'Lodge',
    capacity: 4,
    price: 1800,
    description: 'Cozy lodge room. Perfect for small families or friend groups looking for a rustic yet comfortable stay near the beach.',
    imageUrl: 'https://images.unsplash.com/photo-1618773928121-c32242e63f39?auto=format&fit=crop&w=800&q=80',
    status: 'Available',
    amenities: ['Free Wi-Fi', 'Ceiling Fan', 'Queen Size Beds', 'Hot Shower', 'Cable TV']
  },
  {
    id: 'room-3',
    name: 'Room 3',
    type: 'Cottage',
    capacity: 6,
    price: 3400,
    description: 'Spacious family cottage. Designed for group getaways with spacious living quarters and direct access to the resort pool.',
    imageUrl: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80',
    status: 'Available',
    amenities: ['Free Wi-Fi', 'Air Conditioning', 'Kitchenette', 'Pool Access', 'Smart TV', 'Dining Table']
  },
  {
    id: 'room-4',
    name: 'Room 4',
    type: 'Lodge',
    capacity: 6,
    price: 4500,
    description: 'Luxury lodge room. Experience premium comfort with elegant wooden furnishings, panoramic balcony, and top-tier amenities.',
    imageUrl: 'https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=800&q=80',
    status: 'Available',
    amenities: ['Free High-Speed Wi-Fi', 'Inverter AC', 'Ocean View Balcony', 'Bathtub', 'Complimentary Breakfast', 'Mini Bar']
  },
  {
    id: 'room-5',
    name: 'Room 5 - Intimate Cottage',
    type: 'Cottage',
    capacity: 2,
    price: 1600,
    description: 'Perfect romantic getaway for two with scenic beachfront views and a serene private deck.',
    imageUrl: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=800&q=80',
    status: 'Available',
    amenities: ['Free Wi-Fi', 'King Bed', 'Private Deck', 'Sunset View']
  },
  {
    id: 'room-6',
    name: 'Room 6 - Grand Villa Lodge',
    type: 'Lodge',
    capacity: 8,
    price: 5500,
    description: 'Our largest accommodation offering private plunge pool access, dual master bedrooms, and an expansive living area.',
    imageUrl: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=800&q=80',
    status: 'Available',
    amenities: ['Free Wi-Fi', 'Plunge Pool', 'Full Kitchen', 'BBQ Grill', 'Private Parking']
  }
];

export const initialUsers: User[] = [
  {
    id: 'u-admin',
    name: 'Brealls Admin',
    email: 'admin@brealls.com',
    role: 'admin'
  },
  {
    id: 'u-staff',
    name: 'Resort Staff',
    email: 'staff@brealls.com',
    role: 'staff'
  },
  {
    id: 'u-bea',
    name: 'Bea Infanso',
    email: 'bea002@gmail.com',
    role: 'customer'
  }
];

export const initialSettings: ResortSettings = {
  resortName: 'Brealls Resorts',
  heroBackgroundImage: 'https://images.unsplash.com/photo-1540541338287-41700207dee6?auto=format&fit=crop&w=2000&q=80',
  tagline: 'Resort booking made easy',
  subTagline: 'Find your perfect lodge or cottage stay. Browse available accommodations, check prices, and reserve your stay at Brealls Resorts.',
  location: 'San Pedro Island Hinunangan Southern Leyte',
  phone: '0917 843 9210',
  email: 'breallsresorts@gmail.com'
};

export const presetBackgrounds = [
  {
    name: 'Tropical Palms & Pool',
    url: 'https://images.unsplash.com/photo-1540541338287-41700207dee6?auto=format&fit=crop&w=2000&q=80'
  },
  {
    name: 'Turquoise Ocean Beach',
    url: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=2000&q=80'
  },
  {
    name: 'Sunset Luxury Resort',
    url: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=2000&q=80'
  },
  {
    name: 'Serene Island Cottage Shore',
    url: 'https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?auto=format&fit=crop&w=2000&q=80'
  },
  {
    name: 'Nighttime Resort Lights',
    url: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=2000&q=80'
  }
];

export const presetRoomImages = [
  'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1618773928121-c32242e63f39?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1584132967334-10e028bd69f7?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1613545325278-f24b0cae1224?auto=format&fit=crop&w=800&q=80'
];
