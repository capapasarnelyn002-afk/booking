import React from 'react';
import { useResort } from '../context/ResortContext';
import { History, Calendar, Users, CreditCard, AlertCircle, ArrowRight } from 'lucide-react';

export const CustomerHistory: React.FC = () => {
  const { currentUser, bookings, setActiveTab } = useResort();

  if (!currentUser || currentUser.role !== 'customer') return null;

  // Filter bookings belonging to this customer
  const myBookings = bookings.filter(
    b => b.customerId === currentUser.id || b.customerEmail.toLowerCase() === currentUser.email.toLowerCase()
  );

  const statusColors: Record<string, string> = {
    'Confirmed': 'bg-emerald-100 text-emerald-800 border-emerald-300',
    'Pending': 'bg-amber-100 text-amber-800 border-amber-300',
    'Checked-In': 'bg-blue-100 text-blue-800 border-blue-300',
    'Checked-Out': 'bg-purple-100 text-purple-800 border-purple-300',
    'Cancelled': 'bg-red-100 text-red-800 border-red-300'
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="bg-emerald-900 text-white p-8 rounded-3xl mb-8 shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-800 rounded-full filter blur-3xl opacity-30 -mr-20 -mt-20 pointer-events-none" />
        <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <span className="bg-emerald-600 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest text-emerald-100 shadow-inner">
              Customer Account
            </span>
            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight mt-2 mb-1 flex items-center gap-3">
              <History className="w-8 h-8 text-emerald-400" />
              <span>My Booking History</span>
            </h1>
            <p className="text-emerald-200 text-sm max-w-xl font-light leading-relaxed">
              Welcome back, <strong className="font-semibold text-white">{currentUser.name}</strong>. Here you can view all your past stays and upcoming resort reservations.
            </p>
          </div>
          <button
            onClick={() => setActiveTab('Book Now')}
            className="bg-emerald-500 hover:bg-emerald-400 text-emerald-950 font-bold px-6 py-3 rounded-xl shadow-lg transition-all hover:scale-[1.02] flex items-center gap-2 text-sm uppercase tracking-wider whitespace-nowrap"
          >
            <span>Book Another Stay</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {myBookings.length === 0 ? (
        <div className="bg-white rounded-3xl p-12 text-center border border-gray-200 max-w-lg mx-auto shadow-sm">
          <AlertCircle className="w-16 h-16 text-amber-500 mx-auto mb-4 animate-bounce" />
          <h3 className="text-2xl font-bold text-gray-900 mb-2">No Bookings Found</h3>
          <p className="text-gray-600 text-sm mb-8 font-light">
            You don't have any reservation history yet. Browse our available resort accommodations and book your perfect getaway!
          </p>
          <button
            onClick={() => setActiveTab('Lodge & Cottages')}
            className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-8 py-3.5 rounded-xl shadow-lg shadow-emerald-600/20 text-sm uppercase tracking-wider transition-all"
          >
            Browse Lodge & Cottages
          </button>
        </div>
      ) : (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {myBookings.map((b) => (
              <div
                key={b.id}
                className="bg-white rounded-2xl border border-gray-200/80 shadow-sm hover:shadow-lg transition-all flex flex-col overflow-hidden"
              >
                <div className="p-6 border-b border-gray-100 bg-gray-50/50 flex justify-between items-start">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-xs font-extrabold px-2.5 py-0.5 rounded-md bg-emerald-600 text-white uppercase tracking-wider">
                        {b.roomType}
                      </span>
                      <span className="text-xs text-gray-500 font-mono font-bold">
                        {b.id}
                      </span>
                    </div>
                    <h3 className="text-xl font-extrabold text-gray-900 mt-1">{b.roomName}</h3>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs font-bold border ${statusColors[b.status] || 'bg-gray-100 text-gray-800'}`}>
                    {b.status}
                  </span>
                </div>

                <div className="p-6 flex-1 space-y-4 text-sm">
                  <div className="flex justify-between items-center text-xs text-gray-500 pb-3 border-b border-gray-100 font-medium">
                    <span>Booked on {b.bookingDate}</span>
                    <span className="flex items-center gap-1 font-bold text-gray-700">
                      <Users className="w-3.5 h-3.5 text-emerald-600" /> {b.guestsCount} guests
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-3 bg-emerald-50/50 p-3 rounded-xl border border-emerald-100/60">
                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-800 block mb-0.5 flex items-center gap-1">
                        <Calendar className="w-3 h-3 text-emerald-600" /> Check-in
                      </span>
                      <span className="font-bold text-gray-900 text-xs">{b.checkInDate}</span>
                    </div>
                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-800 block mb-0.5 flex items-center gap-1">
                        <Calendar className="w-3 h-3 text-emerald-600" /> Check-out
                      </span>
                      <span className="font-bold text-gray-900 text-xs">{b.checkOutDate}</span>
                    </div>
                  </div>

                  <div className="space-y-1.5 text-xs text-gray-600 pt-1">
                    <div className="flex justify-between items-center font-medium">
                      <span>Total Amount</span>
                      <span className="font-extrabold text-gray-900 text-sm">₱{b.totalAmount.toLocaleString()}</span>
                    </div>
                    {b.advanceDepositRequired && (
                      <div className="flex justify-between items-center font-medium text-emerald-700 bg-emerald-50/80 p-2 rounded-lg border border-emerald-200">
                        <span className="flex items-center gap-1">
                          <CreditCard className="w-3.5 h-3.5 text-emerald-600" /> Adv. Deposit (50%)
                        </span>
                        <span className="font-bold">₱{b.advanceDepositRequired.toLocaleString()} ({b.paymentMethod})</span>
                      </div>
                    )}
                    {b.paymentReference && (
                      <div className="text-[11px] text-gray-500 font-mono pt-0.5 text-right">
                        Ref No: {b.paymentReference}
                      </div>
                    )}
                  </div>

                  {b.notes && (
                    <div className="pt-2 border-t border-gray-100 text-xs text-gray-500 italic">
                      <strong className="not-italic font-semibold text-gray-700 block mb-0.5">Special Request:</strong>
                      "{b.notes}"
                    </div>
                  )}
                </div>

                <div className="p-4 bg-gray-50 border-t border-gray-100 text-center text-xs text-gray-500">
                  Resort Location: <strong className="text-gray-700">San Pedro Island Hinunangan Southern Leyte</strong>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
