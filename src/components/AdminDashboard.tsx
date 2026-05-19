import React, { useState } from 'react';
import { useResort } from '../context/ResortContext';
import { presetBackgrounds, presetRoomImages } from '../data/initialData';
import { Room, AccommodationType } from '../types';
import { 
  Settings, 
  Image as ImageIcon, 
  CalendarCheck, 
  Plus, 
  Edit, 
  Trash2, 
  CheckCircle, 
  XCircle, 
  UserCheck, 
  Users, 
  Lock, 
  UploadCloud, 
  BedDouble,
  Search
} from 'lucide-react';

export const AdminDashboard: React.FC = () => {
  const { 
    currentUser, 
    settings, 
    updateSettings, 
    rooms, 
    updateRoom, 
    addRoom, 
    deleteRoom, 
    bookings, 
    updateBookingStatus,
    setAuthModalOpen,
    setAuthModalTab
  } = useResort();

  const [activeSubTab, setActiveSubTab] = useState<'bookings' | 'rooms' | 'settings'>('bookings');
  const [bookingStatusFilter, setBookingStatusFilter] = useState('All');
  const [bookingSearch, setBookingSearch] = useState('');
  
  // Custom Background input
  const [customBgUrl, setCustomBgUrl] = useState('');
  const [bgSuccess, setBgSuccess] = useState('');

  // Room modal state for Add/Edit
  const [isEditingRoom, setIsEditingRoom] = useState(false);
  const [editingRoomId, setEditingRoomId] = useState<string | null>(null);

  // Form fields for room
  const [roomName, setRoomName] = useState('');
  const [roomType, setRoomType] = useState<AccommodationType>('Lodge');
  const [roomCapacity, setRoomCapacity] = useState(4);
  const [roomPrice, setRoomPrice] = useState(2500);
  const [roomDescription, setRoomDescription] = useState('');
  const [roomImageUrl, setRoomImageUrl] = useState('');
  const [roomStatus, setRoomStatus] = useState<'Available' | 'Booked' | 'Maintenance'>('Available');
  const [amenitiesText, setAmenitiesText] = useState('Free Wi-Fi, Air Conditioning, TV, Ensuite Bathroom');

  // Check if authorized
  if (!currentUser || (currentUser.role !== 'admin' && currentUser.role !== 'staff')) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-24 text-center">
        <div className="bg-white rounded-3xl p-12 shadow-xl border border-gray-100 max-w-lg mx-auto">
          <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center text-amber-600 mx-auto mb-6">
            <Lock className="w-8 h-8" />
          </div>
          <h2 className="text-2xl font-extrabold text-gray-900 mb-2">Restricted Access</h2>
          <p className="text-gray-600 text-sm mb-8 leading-relaxed font-light">
            You need to log in with an Admin or Staff account to access the resort management portal.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-3">
            <button
              onClick={() => { setAuthModalTab('login'); setAuthModalOpen(true); }}
              className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-6 py-3 rounded-xl shadow-lg shadow-emerald-600/20 text-sm transition-all uppercase tracking-wider"
            >
              Login as Admin / Staff
            </button>
          </div>
          <div className="mt-6 pt-6 border-t border-gray-100 text-xs text-gray-500 text-left bg-gray-50 p-4 rounded-xl">
            <span className="font-bold text-gray-700 block mb-1">Demo Accounts:</span>
            <div>• <strong className="text-gray-900">Admin:</strong> admin@brealls.com / admin123</div>
            <div>• <strong className="text-gray-900">Staff:</strong> staff@brealls.com / staff123</div>
          </div>
        </div>
      </div>
    );
  }

  const isAdmin = currentUser.role === 'admin';

  // Open modal for editing
  const handleOpenEditRoom = (room: Room) => {
    setEditingRoomId(room.id);
    setRoomName(room.name);
    setRoomType(room.type);
    setRoomCapacity(room.capacity);
    setRoomPrice(room.price);
    setRoomDescription(room.description);
    setRoomImageUrl(room.imageUrl);
    setRoomStatus(room.status);
    setAmenitiesText((room.amenities || []).join(', '));
    setIsEditingRoom(true);
  };

  // Open modal for adding
  const handleOpenAddRoom = () => {
    setEditingRoomId(null);
    setRoomName('New Cottage Suite');
    setRoomType('Cottage');
    setRoomCapacity(4);
    setRoomPrice(2200);
    setRoomDescription('A beautiful tropical cottage with serene views and top tier comfort.');
    setRoomImageUrl(presetRoomImages[0]);
    setRoomStatus('Available');
    setAmenitiesText('Free Wi-Fi, Air Conditioning, Balcony, Mini Bar');
    setIsEditingRoom(true);
  };

  // Save room
  const handleSaveRoom = (e: React.FormEvent) => {
    e.preventDefault();
    const amenities = amenitiesText.split(',').map(a => a.trim()).filter(a => a.length > 0);

    if (editingRoomId) {
      // update
      updateRoom({
        id: editingRoomId,
        name: roomName,
        type: roomType,
        capacity: roomCapacity,
        price: roomPrice,
        description: roomDescription,
        imageUrl: roomImageUrl,
        status: roomStatus,
        amenities
      });
    } else {
      // add
      addRoom({
        name: roomName,
        type: roomType,
        capacity: roomCapacity,
        price: roomPrice,
        description: roomDescription,
        imageUrl: roomImageUrl,
        status: roomStatus,
        amenities
      });
    }

    setIsEditingRoom(false);
  };

  const handleUpdateHeroBg = (url: string) => {
    updateSettings({ heroBackgroundImage: url });
    setBgSuccess('Resort background image successfully updated!');
    setTimeout(() => setBgSuccess(''), 3000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      
      {/* Header banner */}
      <div className="bg-emerald-900 text-white p-8 rounded-3xl mb-8 shadow-xl relative overflow-hidden flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-800 rounded-full filter blur-3xl opacity-30 -mr-20 -mt-20 pointer-events-none" />
        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-2">
            <span className="bg-emerald-600 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest text-emerald-100 shadow-inner">
              {currentUser.role.toUpperCase()} PORTAL
            </span>
            <span className="text-emerald-300 font-medium text-sm">Brealls Resorts Control Panel</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
            Resort Management System
          </h1>
          <p className="text-emerald-200 text-sm mt-1 max-w-xl font-light leading-relaxed">
            Manage your accommodations, customer bookings, dynamic room pictures, and customize the resort storefront look.
          </p>
        </div>

        {/* Sub-navigation tabs */}
        <div className="flex bg-emerald-950/80 p-1.5 rounded-2xl border border-emerald-800/80 z-10 w-full md:w-auto">
          <button
            onClick={() => setActiveSubTab('bookings')}
            className={`flex-1 md:flex-initial px-5 py-2.5 rounded-xl font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all ${
              activeSubTab === 'bookings'
                ? 'bg-emerald-600 text-white shadow-md'
                : 'text-emerald-300 hover:text-white hover:bg-emerald-800/40'
            }`}
          >
            <CalendarCheck className="w-4 h-4" />
            <span>Bookings ({bookings.length})</span>
          </button>
          <button
            onClick={() => setActiveSubTab('rooms')}
            className={`flex-1 md:flex-initial px-5 py-2.5 rounded-xl font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all ${
              activeSubTab === 'rooms'
                ? 'bg-emerald-600 text-white shadow-md'
                : 'text-emerald-300 hover:text-white hover:bg-emerald-800/40'
            }`}
          >
            <BedDouble className="w-4 h-4" />
            <span>Rooms ({rooms.length})</span>
          </button>
          {isAdmin && (
            <button
              onClick={() => setActiveSubTab('settings')}
              className={`flex-1 md:flex-initial px-5 py-2.5 rounded-xl font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all ${
                activeSubTab === 'settings'
                  ? 'bg-emerald-600 text-white shadow-md'
                  : 'text-emerald-300 hover:text-white hover:bg-emerald-800/40'
              }`}
            >
              <Settings className="w-4 h-4" />
              <span>Hero & Storefront</span>
            </button>
          )}
        </div>
      </div>

      {/* BOOKINGS TAB */}
      {activeSubTab === 'bookings' && (() => {
        const filteredBookings = bookings.filter(b => {
          if (bookingStatusFilter !== 'All' && b.status !== bookingStatusFilter) return false;
          if (bookingSearch.trim()) {
            const q = bookingSearch.toLowerCase();
            return b.customerName.toLowerCase().includes(q) || b.id.toLowerCase().includes(q) || b.customerEmail.toLowerCase().includes(q) || b.roomName.toLowerCase().includes(q);
          }
          return true;
        });

        return (
          <div className="space-y-6">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center bg-white p-6 rounded-2xl shadow-sm border border-gray-200 gap-4">
              <div>
                <h2 className="text-2xl font-extrabold text-gray-900">Customer Bookings & Reservations</h2>
                <p className="text-sm text-gray-600">Review check-in dates, update guest statuses, or confirm reservations.</p>
              </div>
              <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
                <div className="relative flex-1 md:w-64">
                  <Search className="absolute left-3 top-2.5 w-4 h-4 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search guest, ID, room..."
                    value={bookingSearch}
                    onChange={e => setBookingSearch(e.target.value)}
                    className="w-full bg-gray-50 border border-gray-300 rounded-xl pl-9 pr-3 py-1.5 text-xs font-medium text-gray-900 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>
                <select
                  value={bookingStatusFilter}
                  onChange={e => setBookingStatusFilter(e.target.value)}
                  className="bg-gray-50 border border-gray-300 rounded-xl px-3 py-1.5 text-xs font-bold text-gray-800 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                >
                  <option value="All">All Statuses</option>
                  <option value="Pending">Pending</option>
                  <option value="Confirmed">Confirmed</option>
                  <option value="Checked-In">Checked-In</option>
                  <option value="Checked-Out">Checked-Out</option>
                  <option value="Cancelled">Cancelled</option>
                </select>
                <div className="flex items-center gap-1.5 text-xs font-bold text-gray-500 bg-gray-50 px-3 py-1.5 rounded-xl border border-gray-200 whitespace-nowrap">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                  <span>{filteredBookings.length} {filteredBookings.length === 1 ? 'record' : 'records'}</span>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
              {filteredBookings.length === 0 ? (
                <div className="p-12 text-center text-gray-500 font-light">No bookings found matching your search or filter.</div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse text-sm">
                    <thead>
                      <tr className="bg-gray-50 text-gray-700 text-xs font-bold uppercase tracking-wider border-b border-gray-200">
                        <th className="py-4 px-6">Booking ID / Guest</th>
                        <th className="py-4 px-6">Accommodation</th>
                        <th className="py-4 px-6">Stay Dates</th>
                        <th className="py-4 px-6">Guests & Total</th>
                        <th className="py-4 px-6">Status</th>
                        <th className="py-4 px-6 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100 font-medium">
                      {filteredBookings.map((booking) => {
                      const statusColors: Record<string, string> = {
                        'Confirmed': 'bg-emerald-100 text-emerald-800 border-emerald-300',
                        'Pending': 'bg-amber-100 text-amber-800 border-amber-300',
                        'Checked-In': 'bg-blue-100 text-blue-800 border-blue-300',
                        'Checked-Out': 'bg-purple-100 text-purple-800 border-purple-300',
                        'Cancelled': 'bg-red-100 text-red-800 border-red-300'
                      };

                      return (
                        <tr key={booking.id} className="hover:bg-gray-50/80 transition-colors">
                          <td className="py-4 px-6">
                            <div className="font-extrabold text-gray-900">{booking.id}</div>
                            <div className="text-gray-700 font-bold">{booking.customerName}</div>
                            <div className="text-xs text-gray-500">{booking.customerEmail}</div>
                          </td>
                          <td className="py-4 px-6">
                            <span className="bg-gray-100 font-bold text-gray-800 px-2.5 py-1 rounded-lg text-xs inline-block mb-1">
                              {booking.roomType}
                            </span>
                            <div className="font-bold text-gray-900">{booking.roomName}</div>
                          </td>
                          <td className="py-4 px-6 text-xs">
                            <div className="font-bold text-gray-800">In: {booking.checkInDate}</div>
                            <div className="text-gray-500 font-semibold">Out: {booking.checkOutDate}</div>
                          </td>
                          <td className="py-4 px-6">
                            <div className="flex items-center gap-1.5 text-xs text-gray-700 font-bold mb-1">
                              <Users className="w-3.5 h-3.5 text-emerald-600" />
                              <span>{booking.guestsCount} guests</span>
                            </div>
                            <div className="font-extrabold text-gray-900 text-base">₱{booking.totalAmount.toLocaleString()}</div>
                            {booking.advanceDepositRequired && (
                              <div className="text-[11px] text-emerald-700 font-medium mt-1 bg-emerald-50 p-1.5 rounded-lg border border-emerald-100">
                                <div><strong className="font-bold">Adv. Deposit:</strong> ₱{booking.advanceDepositRequired.toLocaleString()}</div>
                                {booking.paymentMethod && <div><strong className="font-bold">Method:</strong> {booking.paymentMethod} ({booking.paymentReference || 'N/A'})</div>}
                              </div>
                            )}
                          </td>
                          <td className="py-4 px-6">
                            <span className={`px-3 py-1 rounded-full text-xs font-bold border ${statusColors[booking.status] || 'bg-gray-100 text-gray-800'}`}>
                              {booking.status}
                            </span>
                          </td>
                          <td className="py-4 px-6 text-right space-x-1.5 whitespace-nowrap">
                            {booking.status === 'Pending' && (
                              <button
                                onClick={() => updateBookingStatus(booking.id, 'Confirmed')}
                                className="bg-emerald-600 hover:bg-emerald-700 text-white p-1.5 rounded-lg text-xs font-bold transition-all shadow-sm"
                                title="Approve & Confirm"
                              >
                                <CheckCircle className="w-4 h-4 inline" /> Confirm
                              </button>
                            )}
                            {booking.status === 'Confirmed' && (
                              <button
                                onClick={() => updateBookingStatus(booking.id, 'Checked-In')}
                                className="bg-blue-600 hover:bg-blue-700 text-white p-1.5 rounded-lg text-xs font-bold transition-all shadow-sm"
                                title="Check In Guest"
                              >
                                <UserCheck className="w-4 h-4 inline" /> Check In
                              </button>
                            )}
                            {booking.status === 'Checked-In' && (
                              <button
                                onClick={() => updateBookingStatus(booking.id, 'Checked-Out')}
                                className="bg-purple-600 hover:bg-purple-700 text-white p-1.5 rounded-lg text-xs font-bold transition-all shadow-sm"
                                title="Check Out Guest"
                              >
                                <CheckCircle className="w-4 h-4 inline" /> Check Out
                              </button>
                            )}
                            {booking.status !== 'Cancelled' && booking.status !== 'Checked-Out' && (
                              <button
                                onClick={() => updateBookingStatus(booking.id, 'Cancelled')}
                                className="text-red-500 hover:bg-red-50 p-1.5 rounded-lg text-xs font-bold transition-all"
                                title="Cancel Booking"
                              >
                                <XCircle className="w-4 h-4 inline" /> Cancel
                              </button>
                            )}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
        );
      })()}

      {/* ROOMS & COTTAGES TAB */}
      {activeSubTab === 'rooms' && (
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center bg-white p-6 rounded-2xl shadow-sm border border-gray-200 gap-4">
            <div>
              <h2 className="text-2xl font-extrabold text-gray-900">Lodge & Cottages Management</h2>
              <p className="text-sm text-gray-600">Dynamically update room pictures, capacities, prices, and status.</p>
            </div>
            {isAdmin && (
              <button
                onClick={handleOpenAddRoom}
                className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-5 py-3 rounded-xl shadow-lg shadow-emerald-600/20 text-sm flex items-center gap-2 transition-all hover:scale-[1.02]"
              >
                <Plus className="w-5 h-5" />
                <span>Add New Accommodation</span>
              </button>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {rooms.map(room => (
              <div 
                key={room.id}
                className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-200 flex flex-col"
              >
                <div className="relative h-48 bg-gray-100 overflow-hidden">
                  <img
                    src={room.imageUrl}
                    alt={room.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-2 left-2 flex gap-1.5">
                    <span className="bg-black/70 backdrop-blur-md text-white px-2.5 py-1 rounded-lg text-xs font-extrabold">
                      {room.type}
                    </span>
                    <span className={`px-2.5 py-1 rounded-lg text-xs font-bold text-white shadow ${
                      room.status === 'Available' ? 'bg-emerald-600' : room.status === 'Booked' ? 'bg-amber-600' : 'bg-red-600'
                    }`}>
                      {room.status}
                    </span>
                  </div>
                  <div className="absolute bottom-2 right-2 bg-emerald-600 text-white font-extrabold text-sm px-3 py-1 rounded-lg shadow-md">
                    ₱{room.price.toLocaleString()} / night
                  </div>
                </div>

                <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                  <div>
                    <h3 className="text-lg font-bold text-gray-900 mb-1">{room.name}</h3>
                    <p className="text-xs text-gray-500 line-clamp-2 leading-relaxed mb-3">{room.description}</p>
                    <div className="flex items-center gap-3 text-xs text-gray-700 bg-gray-50 p-2 rounded-lg border border-gray-100 font-semibold">
                      <span>👥 {room.capacity} guests max</span>
                    </div>
                  </div>

                  <div className="pt-3 border-t border-gray-100 flex gap-2">
                    <button
                      onClick={() => handleOpenEditRoom(room)}
                      className="flex-1 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 font-bold py-2 px-3 rounded-xl text-xs flex items-center justify-center gap-1.5 transition-all"
                    >
                      <Edit className="w-3.5 h-3.5 text-emerald-600" />
                      <span>Edit & Dynamic Image</span>
                    </button>
                    {isAdmin && rooms.length > 2 && (
                      <button
                        onClick={() => deleteRoom(room.id)}
                        className="bg-red-50 hover:bg-red-100 text-red-600 p-2 rounded-xl text-xs transition-all"
                        title="Delete Accommodation"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* HERO & STOREFRONT SETTINGS TAB */}
      {activeSubTab === 'settings' && isAdmin && (
        <div className="space-y-8">
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200">
            <h2 className="text-2xl font-extrabold text-gray-900 mb-1 flex items-center gap-2">
              <ImageIcon className="w-6 h-6 text-emerald-600" />
              <span>Modify Storefront Hero Background Image</span>
            </h2>
            <p className="text-sm text-gray-600 mb-6 font-light">
              Choose from one of our beautiful preset stock photos or provide a direct image link to instantly update the homepage hero.
            </p>

            {bgSuccess && (
              <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 p-4 rounded-xl text-sm font-bold mb-6 flex items-center gap-2 animate-fade-in">
                <CheckCircle className="w-5 h-5 text-emerald-600" />
                <span>{bgSuccess}</span>
              </div>
            )}

            {/* Current background preview */}
            <div className="mb-8">
              <span className="text-xs font-bold uppercase tracking-wider text-gray-500 block mb-2">Current Active Hero Background</span>
              <div className="relative rounded-2xl overflow-hidden h-64 border-2 border-emerald-500 shadow-xl max-w-3xl">
                <img
                  src={settings.heroBackgroundImage}
                  alt="Resort background"
                  className="w-full h-full object-cover"
                />
                <div className="absolute bottom-4 left-4 bg-black/60 backdrop-blur-md px-4 py-2 rounded-xl text-white font-semibold text-sm">
                  Active Display Banner
                </div>
              </div>
            </div>

            {/* Presets Selection */}
            <div className="mb-8">
              <span className="text-xs font-bold uppercase tracking-wider text-gray-500 block mb-3">Quick Preset Background Images</span>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
                {presetBackgrounds.map((preset, idx) => {
                  const isCurrent = settings.heroBackgroundImage === preset.url;
                  return (
                    <div
                      key={idx}
                      onClick={() => handleUpdateHeroBg(preset.url)}
                      className={`cursor-pointer rounded-xl overflow-hidden border-2 transition-all group relative h-28 ${
                        isCurrent ? 'border-emerald-600 ring-4 ring-emerald-600/20 scale-105' : 'border-gray-200 hover:border-emerald-500'
                      }`}
                    >
                      <img src={preset.url} alt={preset.name} className="w-full h-full object-cover" />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex items-end p-2">
                        <span className="text-white text-xs font-bold line-clamp-1">{preset.name}</span>
                      </div>
                      {isCurrent && (
                        <div className="absolute top-2 right-2 bg-emerald-600 text-white rounded-full p-1 shadow">
                          <CheckCircle className="w-3.5 h-3.5" />
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Custom URL Input */}
            <div className="pt-6 border-t border-gray-100 max-w-2xl">
              <span className="text-xs font-bold uppercase tracking-wider text-gray-500 block mb-2">Or Use Custom Image URL</span>
              <div className="flex gap-2">
                <input
                  type="url"
                  value={customBgUrl}
                  onChange={(e) => setCustomBgUrl(e.target.value)}
                  placeholder="https://images.unsplash.com/photo-..."
                  className="flex-1 bg-gray-50 border border-gray-300 rounded-xl px-4 py-3 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white"
                />
                <button
                  type="button"
                  onClick={() => {
                    if (customBgUrl) handleUpdateHeroBg(customBgUrl);
                  }}
                  className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-6 py-3 rounded-xl shadow-lg shadow-emerald-600/20 text-sm transition-all uppercase tracking-wider whitespace-nowrap"
                >
                  Apply Custom BG
                </button>
              </div>
            </div>
          </div>

          {/* Resort Contact & Taglines */}
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200 max-w-3xl">
            <h3 className="text-xl font-extrabold text-gray-900 mb-4 flex items-center gap-2">
              <Settings className="w-5 h-5 text-emerald-600" />
              <span>Resort Brand Settings</span>
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1">Resort Name</label>
                <input
                  type="text"
                  value={settings.resortName}
                  onChange={(e) => updateSettings({ resortName: e.target.value })}
                  className="w-full bg-gray-50 border border-gray-300 rounded-xl p-3 text-sm font-semibold text-gray-900"
                />
              </div>
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1">Location Tag</label>
                <input
                  type="text"
                  value={settings.location}
                  onChange={(e) => updateSettings({ location: e.target.value })}
                  className="w-full bg-gray-50 border border-gray-300 rounded-xl p-3 text-sm font-semibold text-gray-900"
                />
              </div>
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1">Contact Phone</label>
                <input
                  type="text"
                  value={settings.phone}
                  onChange={(e) => updateSettings({ phone: e.target.value })}
                  className="w-full bg-gray-50 border border-gray-300 rounded-xl p-3 text-sm font-semibold text-gray-900"
                />
              </div>
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1">Contact Email</label>
                <input
                  type="email"
                  value={settings.email}
                  onChange={(e) => updateSettings({ email: e.target.value })}
                  className="w-full bg-gray-50 border border-gray-300 rounded-xl p-3 text-sm font-semibold text-gray-900"
                />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* EDIT / ADD ROOM MODAL */}
      {isEditingRoom && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-fade-in">
          <div className="bg-white rounded-3xl max-w-2xl w-full shadow-2xl overflow-hidden border border-gray-100 flex flex-col max-h-[90vh]">
            
            <div className="bg-emerald-600 text-white p-6 flex justify-between items-center">
              <div>
                <span className="text-xs uppercase tracking-wider font-bold text-emerald-200">Accommodation Editor</span>
                <h3 className="text-2xl font-extrabold">{editingRoomId ? 'Modify Dynamic Picture & Room Data' : 'Add New Resort Room'}</h3>
              </div>
              <button
                onClick={() => setIsEditingRoom(false)}
                className="p-1.5 bg-emerald-700 hover:bg-emerald-800 rounded-full text-white/80 hover:text-white transition-colors"
              >
                <XCircle className="w-6 h-6" />
              </button>
            </div>

            <form onSubmit={handleSaveRoom} className="p-6 sm:p-8 overflow-y-auto space-y-6">
              
              {/* Dynamic Image Selection */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-2 flex items-center gap-1.5">
                  <UploadCloud className="w-4 h-4 text-emerald-600" />
                  <span>Dynamic Accommodation Picture URL</span>
                </label>
                <input
                  type="url"
                  required
                  value={roomImageUrl}
                  onChange={(e) => setRoomImageUrl(e.target.value)}
                  placeholder="https://images.unsplash.com/photo-..."
                  className="w-full bg-gray-50 border border-gray-300 rounded-xl p-3 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-emerald-500 font-mono text-xs mb-3"
                />
                <span className="text-xs text-gray-500 font-medium block mb-2">Or select from high-quality presets:</span>
                <div className="grid grid-cols-4 sm:grid-cols-8 gap-2">
                  {presetRoomImages.map((img, idx) => (
                    <div
                      key={idx}
                      onClick={() => setRoomImageUrl(img)}
                      className={`h-12 rounded-lg overflow-hidden cursor-pointer border-2 transition-all ${
                        roomImageUrl === img ? 'border-emerald-600 ring-2 ring-emerald-600/30 scale-105' : 'border-gray-200 hover:border-emerald-500'
                      }`}
                    >
                      <img src={img} alt="Preset room" className="w-full h-full object-cover" />
                    </div>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1">Accommodation Name</label>
                  <input
                    type="text"
                    required
                    value={roomName}
                    onChange={(e) => setRoomName(e.target.value)}
                    placeholder="e.g. Room 1"
                    className="w-full bg-gray-50 border border-gray-300 rounded-xl p-3 text-sm font-bold text-gray-900"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1">Accommodation Type</label>
                  <select
                    value={roomType}
                    onChange={(e) => setRoomType(e.target.value as AccommodationType)}
                    className="w-full bg-gray-50 border border-gray-300 rounded-xl p-3 text-sm font-bold text-gray-900"
                  >
                    <option value="Lodge">Lodge</option>
                    <option value="Cottage">Cottage</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1">Capacity (Guests)</label>
                  <input
                    type="number"
                    min="1"
                    max="16"
                    required
                    value={roomCapacity}
                    onChange={(e) => setRoomCapacity(parseInt(e.target.value, 10) || 1)}
                    className="w-full bg-gray-50 border border-gray-300 rounded-xl p-3 text-sm font-bold text-gray-900"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1">Price / Night (PHP ₱)</label>
                  <input
                    type="number"
                    step="50"
                    min="500"
                    required
                    value={roomPrice}
                    onChange={(e) => setRoomPrice(parseInt(e.target.value, 10) || 1000)}
                    className="w-full bg-gray-50 border border-gray-300 rounded-xl p-3 text-sm font-bold text-gray-900"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1">Status</label>
                  <select
                    value={roomStatus}
                    onChange={(e) => setRoomStatus(e.target.value as any)}
                    className="w-full bg-gray-50 border border-gray-300 rounded-xl p-3 text-sm font-bold text-gray-900"
                  >
                    <option value="Available">Available</option>
                    <option value="Booked">Booked</option>
                    <option value="Maintenance">Maintenance</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1">Amenities (Comma separated)</label>
                  <input
                    type="text"
                    value={amenitiesText}
                    onChange={(e) => setAmenitiesText(e.target.value)}
                    placeholder="Free Wi-Fi, Air Conditioning, TV..."
                    className="w-full bg-gray-50 border border-gray-300 rounded-xl p-3 text-sm text-gray-900"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1">Description</label>
                <textarea
                  required
                  rows={3}
                  value={roomDescription}
                  onChange={(e) => setRoomDescription(e.target.value)}
                  placeholder="Comfortable and relaxing cottage..."
                  className="w-full bg-gray-50 border border-gray-300 rounded-xl p-3 text-sm text-gray-900"
                />
              </div>

              <div className="pt-4 border-t border-gray-100 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsEditingRoom(false)}
                  className="px-6 py-3 rounded-xl border border-gray-300 font-bold text-sm text-gray-700 hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm shadow-lg shadow-emerald-600/20 uppercase tracking-wider"
                >
                  Save Accommodation
                </button>
              </div>

            </form>
          </div>
        </div>
      )}

    </div>
  );
};
