import React from 'react';
import { useResort } from '../context/ResortContext';
import { Users, Bed, Check, Sparkles, AlertCircle, CalendarX } from 'lucide-react';

export const RoomList: React.FC = () => {
  const { rooms, bookings, searchParams, filterState, setSelectedRoomForBooking, setBookingModalOpen } = useResort();

  // Filter logic
  const filteredRooms = rooms.filter(room => {
    // Type filter
    if (filterState.type !== 'All' && room.type !== filterState.type) {
      return false;
    }

    // Capacity filter
    if (filterState.capacity !== 'All') {
      const capVal = parseInt(filterState.capacity, 10);
      if (filterState.capacity === '8+') {
        if (room.capacity < 8) return false;
      } else {
        // match specific guest range
        if (capVal === 2 && room.capacity > 3) return false;
        if (capVal === 4 && (room.capacity < 3 || room.capacity > 4)) return false;
        if (capVal === 6 && (room.capacity < 5 || room.capacity > 6)) return false;
      }
    }

    // Price range filter
    if (filterState.priceRange !== 'All') {
      if (filterState.priceRange === '1000-2000' && (room.price < 1000 || room.price > 2000)) return false;
      if (filterState.priceRange === '2001-3500' && (room.price < 2001 || room.price > 3500)) return false;
      if (filterState.priceRange === '3501+' && room.price <= 3500) return false;
    }

    // Status filter
    if (filterState.status === 'Available' && room.status !== 'Available') {
      return false;
    }

    return true;
  });

  // Sort logic
  const sortedRooms = [...filteredRooms].sort((a, b) => {
    if (filterState.sortBy === 'Lowest Price') return a.price - b.price;
    if (filterState.sortBy === 'Highest Price') return b.price - a.price;
    if (filterState.sortBy === 'Capacity') return a.capacity - b.capacity;
    if (filterState.sortBy === 'Name') return a.name.localeCompare(b.name);
    return 0;
  });

  const handleReserve = (room: typeof rooms[0]) => {
    setSelectedRoomForBooking(room);
    setBookingModalOpen(true);
  };

  return (
    <div className="mb-16">
      <div className="text-center sm:text-left mb-8">
        <h2 className="text-3xl font-extrabold tracking-tight text-gray-900">
          Available Lodges & Cottages
        </h2>
        <p className="text-base text-gray-600 mt-1 font-light">
          Choose from our available resort accommodations.
        </p>
      </div>

      {sortedRooms.length === 0 ? (
        <div className="bg-white rounded-2xl p-12 text-center border border-gray-200 max-w-lg mx-auto shadow-sm">
          <AlertCircle className="w-12 h-12 text-amber-500 mx-auto mb-3" />
          <h3 className="text-xl font-bold text-gray-900 mb-1">No accommodations found</h3>
          <p className="text-sm text-gray-600 mb-6">
            We couldn't find any rooms matching your selected filters. Try broadening your criteria.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {sortedRooms.map(room => {
            const overlappingBooking = bookings.find(b => 
              b.roomId === room.id && 
              ['Confirmed', 'Checked-In', 'Pending'].includes(b.status) &&
              searchParams.checkIn < b.checkOutDate &&
              searchParams.checkOut > b.checkInDate
            );

            const isAvailableForSelectedDates = room.status === 'Available' && !overlappingBooking;

            return (
              <div
                key={room.id}
                className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-200 flex flex-col group transform hover:-translate-y-1"
              >
                {/* Image Box */}
                <div className="relative h-60 overflow-hidden bg-gray-100">
                  <img
                    src={room.imageUrl}
                    alt={room.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute top-3 left-3 flex flex-col gap-1.5 items-start">
                    <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider text-white shadow-md ${
                      room.type === 'Cottage' ? 'bg-amber-600' : 'bg-emerald-600'
                    }`}>
                      {room.type}
                    </span>
                    {isAvailableForSelectedDates ? (
                      <span className="bg-emerald-500/90 text-white px-2.5 py-1 rounded-full text-xs font-semibold backdrop-blur-md shadow-md">
                        Available for Selected Dates
                      </span>
                    ) : (
                      <span className="bg-red-600/95 text-white px-2.5 py-1 rounded-full text-xs font-semibold backdrop-blur-md shadow-md flex items-center gap-1 animate-pulse">
                        <CalendarX className="w-3.5 h-3.5" />
                        <span>Reserved for Selected Dates</span>
                      </span>
                    )}
                  </div>
                  <div className="absolute bottom-3 right-3 bg-black/70 backdrop-blur-md text-white px-3 py-1.5 rounded-xl font-extrabold text-lg shadow-md">
                    ₱{room.price.toLocaleString()} <span className="text-xs font-normal text-gray-300">/ night</span>
                  </div>
                </div>

                {/* Body */}
                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="text-xl font-bold text-gray-900 group-hover:text-emerald-600 transition-colors">
                        {room.name}
                      </h3>
                    </div>

                    <div className="flex items-center gap-4 text-xs font-semibold text-gray-500 mb-4 bg-gray-50 p-2.5 rounded-lg border border-gray-100">
                      <div className="flex items-center gap-1.5">
                        <Users className="w-4 h-4 text-emerald-600" />
                        <span>Capacity: {room.capacity} guests</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Bed className="w-4 h-4 text-emerald-600" />
                        <span>1 Room</span>
                      </div>
                    </div>

                    <p className="text-gray-600 text-sm leading-relaxed mb-6 font-light">
                      <span className="font-medium text-gray-700">Description:</span> {room.description}
                    </p>

                    {overlappingBooking && (
                      <div className="mb-4 bg-red-50 text-red-800 p-2.5 rounded-xl text-xs font-medium border border-red-200">
                        <strong className="font-bold">Reservation Notice:</strong> This room is already booked from <strong className="font-bold">{overlappingBooking.checkInDate}</strong> to <strong className="font-bold">{overlappingBooking.checkOutDate}</strong>.
                      </div>
                    )}

                    {/* Amenities preview */}
                    {room.amenities && (
                      <div className="mb-6">
                        <span className="text-xs font-bold uppercase tracking-wider text-gray-400 block mb-2">Amenities</span>
                        <div className="flex flex-wrap gap-1.5">
                          {room.amenities.slice(0, 4).map((amenity, idx) => (
                            <span key={idx} className="bg-emerald-50 text-emerald-700 text-[11px] font-medium px-2.5 py-1 rounded-md flex items-center gap-1">
                              <Check className="w-3 h-3 text-emerald-600" />
                              {amenity}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Reserve Action */}
                  <div className="pt-4 border-t border-gray-100 mt-auto">
                    <button
                      onClick={() => handleReserve(room)}
                      disabled={!isAvailableForSelectedDates}
                      className={`w-full py-3.5 rounded-xl font-bold shadow-md transition-all flex items-center justify-center gap-2 uppercase tracking-wider text-sm ${
                        isAvailableForSelectedDates
                          ? 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-emerald-600/20 hover:scale-[1.02] active:scale-[0.98]'
                          : 'bg-gray-200 text-gray-500 cursor-not-allowed'
                      }`}
                    >
                      <Sparkles className="w-4 h-4" />
                      <span>{isAvailableForSelectedDates ? 'Reserve now' : 'Reserved / Unavailable'}</span>
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
