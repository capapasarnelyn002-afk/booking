export type Role = 'admin' | 'staff' | 'customer';

export interface User {
  id: string;
  name: string;
  email: string;
  role: Role;
}

export type AccommodationType = 'Lodge' | 'Cottage';

export interface Room {
  id: string;
  name: string;
  type: AccommodationType;
  capacity: number;
  price: number; // in PHP ₱
  description: string;
  imageUrl: string;
  status: 'Available' | 'Booked' | 'Maintenance';
  amenities?: string[];
}

export interface Booking {
  id: string;
  roomId: string;
  roomName: string;
  roomType: AccommodationType;
  customerId: string;
  customerName: string;
  customerEmail: string;
  checkInDate: string;
  checkOutDate: string;
  guestsCount: number;
  totalAmount: number;
  advanceDepositRequired: number;
  paymentMethod?: string;
  paymentReference?: string;
  status: 'Pending' | 'Confirmed' | 'Checked-In' | 'Checked-Out' | 'Cancelled';
  bookingDate: string;
  notes?: string;
}

export interface ResortSettings {
  resortName: string;
  heroBackgroundImage: string;
  tagline: string;
  subTagline: string;
  location: string;
  phone: string;
  email: string;
}

export interface FilterState {
  type: string; // 'All', 'Lodge', 'Cottage'
  capacity: string; // 'All', '2', '4', '6', etc.
  priceRange: string; // 'All', '1000-2000', '2001-3500', '3501+'
  status: string; // 'Available', 'All'
  sortBy: string; // 'Lowest Price', 'Highest Price', 'Capacity', 'Name'
}
