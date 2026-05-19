import React, { createContext, useContext, useState, useEffect } from 'react';
import { Room, Booking, User, ResortSettings, FilterState } from '../types';
import { initialRooms, initialUsers, initialSettings } from '../data/initialData';

interface ResortContextType {
  currentUser: User | null;
  setCurrentUser: (user: User | null) => void;
  users: User[];
  registerUser: (name: string, email: string) => void;
  
  activeTab: string; // 'Home', 'Lodge & Cottages', 'Book Now', 'Contact', 'Admin'
  setActiveTab: (tab: string) => void;
  
  rooms: Room[];
  updateRoom: (room: Room) => void;
  addRoom: (room: Omit<Room, 'id'>) => void;
  deleteRoom: (id: string) => void;
  
  bookings: Booking[];
  addBooking: (booking: Omit<Booking, 'id' | 'bookingDate' | 'status'>) => void;
  updateBookingStatus: (id: string, status: Booking['status']) => void;
  
  settings: ResortSettings;
  updateSettings: (newSettings: Partial<ResortSettings>) => void;
  
  searchParams: {
    checkIn: string;
    checkOut: string;
    guests: number;
    roomsCount: number;
  };
  setSearchParams: React.Dispatch<React.SetStateAction<{
    checkIn: string;
    checkOut: string;
    guests: number;
    roomsCount: number;
  }>>;
  
  filterState: FilterState;
  setFilterState: React.Dispatch<React.SetStateAction<FilterState>>;
  
  authModalOpen: boolean;
  setAuthModalOpen: (open: boolean) => void;
  authModalTab: 'login' | 'register';
  setAuthModalTab: (tab: 'login' | 'register') => void;
  
  bookingModalOpen: boolean;
  setBookingModalOpen: (open: boolean) => void;
  selectedRoomForBooking: Room | null;
  setSelectedRoomForBooking: (room: Room | null) => void;
}

const ResortContext = createContext<ResortContextType | undefined>(undefined);

export const ResortProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Users state
  const [users, setUsers] = useState<User[]>(() => {
    const saved = localStorage.getItem('brealls_users');
    return saved ? JSON.parse(saved) : initialUsers;
  });

  const [currentUser, setCurrentUser] = useState<User | null>(() => {
    const saved = localStorage.getItem('brealls_current_user');
    return saved ? JSON.parse(saved) : null;
  });

  // Navigation tab
  const [activeTab, setActiveTab] = useState<string>('Home');

  // Rooms state
  const [rooms, setRooms] = useState<Room[]>(() => {
    const saved = localStorage.getItem('brealls_rooms');
    return saved ? JSON.parse(saved) : initialRooms;
  });

  // Bookings state
  const [bookings, setBookings] = useState<Booking[]>(() => {
    const saved = localStorage.getItem('brealls_bookings');
    if (saved) return JSON.parse(saved);
    // Add dummy bookings for admin demo
    return [
      {
        id: 'b-101',
        roomId: 'room-1',
        roomName: 'Room 1',
        roomType: 'Cottage',
        customerId: 'u-bea',
        customerName: 'Bea Infanso',
        customerEmail: 'bea002@gmail.com',
        checkInDate: '2026-05-19',
        checkOutDate: '2026-05-20',
        guestsCount: 2,
        totalAmount: 2800,
        advanceDepositRequired: 1400,
        paymentMethod: 'GCash',
        paymentReference: 'GC-940128394',
        status: 'Confirmed',
        bookingDate: '2026-05-01'
      },
      {
        id: 'b-102',
        roomId: 'room-3',
        roomName: 'Room 3',
        roomType: 'Cottage',
        customerId: 'cust-99',
        customerName: 'Carlos Santos',
        customerEmail: 'carlos@santos.ph',
        checkInDate: '2026-05-25',
        checkOutDate: '2026-05-28',
        guestsCount: 5,
        totalAmount: 10200,
        advanceDepositRequired: 5100,
        paymentMethod: 'Bank Transfer',
        paymentReference: 'BDO-001293021',
        status: 'Pending',
        bookingDate: '2026-05-05'
      }
    ];
  });

  // Settings state (Hero BG, Contact info)
  const [settings, setSettings] = useState<ResortSettings>(() => {
    const saved = localStorage.getItem('brealls_settings');
    if (saved) {
      const parsed = JSON.parse(saved);
      // Ensure the updated location is set even if old localStorage exists
      if (parsed.location === 'Brealls Beach Resort Location') {
        parsed.location = 'San Pedro Island Hinunangan Southern Leyte';
      }
      return parsed;
    }
    return initialSettings;
  });

  // Search parameters matching prompt
  const [searchParams, setSearchParams] = useState({
    checkIn: '2026-05-19',
    checkOut: '2026-05-20',
    guests: 2,
    roomsCount: 1
  });

  // Filter state matching prompt
  const [filterState, setFilterState] = useState<FilterState>({
    type: 'All',
    capacity: 'All',
    priceRange: 'All',
    status: 'Available',
    sortBy: 'Lowest Price'
  });

  // Modal states
  const [authModalOpen, setAuthModalOpen] = useState<boolean>(false);
  const [authModalTab, setAuthModalTab] = useState<'login' | 'register'>('login');
  const [bookingModalOpen, setBookingModalOpen] = useState<boolean>(false);
  const [selectedRoomForBooking, setSelectedRoomForBooking] = useState<Room | null>(null);

  // Sync to localStorage
  useEffect(() => {
    localStorage.setItem('brealls_users', JSON.stringify(users));
  }, [users]);

  useEffect(() => {
    if (currentUser) {
      localStorage.setItem('brealls_current_user', JSON.stringify(currentUser));
    } else {
      localStorage.removeItem('brealls_current_user');
    }
  }, [currentUser]);

  useEffect(() => {
    localStorage.setItem('brealls_rooms', JSON.stringify(rooms));
  }, [rooms]);

  useEffect(() => {
    localStorage.setItem('brealls_bookings', JSON.stringify(bookings));
  }, [bookings]);

  useEffect(() => {
    localStorage.setItem('brealls_settings', JSON.stringify(settings));
  }, [settings]);

  // Actions
  const registerUser = (name: string, email: string) => {
    const newUser: User = {
      id: `u-${Date.now()}`,
      name,
      email,
      role: 'customer'
    };
    setUsers(prev => [...prev, newUser]);
    setCurrentUser(newUser);
  };

  const updateRoom = (updated: Room) => {
    setRooms(prev => prev.map(r => r.id === updated.id ? updated : r));
  };

  const addRoom = (roomData: Omit<Room, 'id'>) => {
    const newRoom: Room = {
      ...roomData,
      id: `room-${Date.now()}`
    };
    setRooms(prev => [...prev, newRoom]);
  };

  const deleteRoom = (id: string) => {
    setRooms(prev => prev.filter(r => r.id !== id));
  };

  const addBooking = (bookingData: Omit<Booking, 'id' | 'bookingDate' | 'status'>) => {
    const newBooking: Booking = {
      ...bookingData,
      id: `B-${Math.floor(1000 + Math.random() * 9000)}`,
      bookingDate: new Date().toISOString().split('T')[0],
      status: 'Confirmed'
    };
    setBookings(prev => [newBooking, ...prev]);
  };

  const updateBookingStatus = (id: string, status: Booking['status']) => {
    setBookings(prev => prev.map(b => b.id === id ? { ...b, status } : b));
  };

  const updateSettings = (newSettings: Partial<ResortSettings>) => {
    setSettings(prev => ({ ...prev, ...newSettings }));
  };

  return (
    <ResortContext.Provider
      value={{
        currentUser,
        setCurrentUser,
        users,
        registerUser,
        activeTab,
        setActiveTab,
        rooms,
        updateRoom,
        addRoom,
        deleteRoom,
        bookings,
        addBooking,
        updateBookingStatus,
        settings,
        updateSettings,
        searchParams,
        setSearchParams,
        filterState,
        setFilterState,
        authModalOpen,
        setAuthModalOpen,
        authModalTab,
        setAuthModalTab,
        bookingModalOpen,
        setBookingModalOpen,
        selectedRoomForBooking,
        setSelectedRoomForBooking
      }}
    >
      {children}
    </ResortContext.Provider>
  );
};

export const useResort = () => {
  const context = useContext(ResortContext);
  if (!context) {
    throw new Error('useResort must be used within a ResortProvider');
  }
  return context;
};
