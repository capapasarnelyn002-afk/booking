import React, { useState } from 'react';
import { useResort } from '../context/ResortContext';
import { X, Calendar, Users, BedDouble, CheckCircle2, ShieldCheck, ArrowRight, CreditCard, AlertCircle } from 'lucide-react';

export const BookingModal: React.FC = () => {
  const { 
    bookingModalOpen, 
    setBookingModalOpen, 
    selectedRoomForBooking, 
    currentUser, 
    searchParams, 
    setSearchParams,
    bookings,
    addBooking,
    setAuthModalOpen,
    setAuthModalTab
  } = useResort();

  const [notes, setNotes] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('GCash');
  const [paymentReference, setPaymentReference] = useState('');
  const [agreedToAdvancePay, setAgreedToAdvancePay] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [success, setSuccess] = useState(false);

  if (!bookingModalOpen || !selectedRoomForBooking) return null;

  const todayStr = new Date().toISOString().split('T')[0];

  // Calculate nights
  const checkInDate = new Date(searchParams.checkIn);
  const checkOutDate = new Date(searchParams.checkOut);
  const diffTime = Math.abs(checkOutDate.getTime() - checkInDate.getTime());
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  const nights = diffDays > 0 ? diffDays : 1;

  const totalAmount = selectedRoomForBooking.price * nights * searchParams.roomsCount;
  const advanceDepositRequired = totalAmount * 0.5; // 50% advance deposit

  const handleCheckInChange = (newCheckIn: string) => {
    setSearchParams(prev => {
      let nextCheckOut = prev.checkOut;
      if (new Date(newCheckIn) >= new Date(nextCheckOut)) {
        const nextDay = new Date(newCheckIn);
        nextDay.setDate(nextDay.getDate() + 1);
        nextCheckOut = nextDay.toISOString().split('T')[0];
      }
      return { ...prev, checkIn: newCheckIn, checkOut: nextCheckOut };
    });
  };

  const overlappingBooking = bookings.find(b => 
    b.roomId === selectedRoomForBooking.id && 
    ['Confirmed', 'Checked-In', 'Pending'].includes(b.status) &&
    searchParams.checkIn < b.checkOutDate &&
    searchParams.checkOut > b.checkInDate
  );

  const handleConfirmBooking = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    
    if (!currentUser) {
      setAuthModalTab('register');
      setAuthModalOpen(true);
      return;
    }

    if (searchParams.checkIn < todayStr) {
      setErrorMsg('Invalid check-in date: You cannot check in before the current date.');
      return;
    }

    if (searchParams.checkOut <= searchParams.checkIn) {
      setErrorMsg('Invalid check-out date: Check-out date must be after check-in date.');
      return;
    }

    if (overlappingBooking) {
      setErrorMsg(`Room unavailable: Already reserved from ${overlappingBooking.checkInDate} to ${overlappingBooking.checkOutDate}.`);
      return;
    }

    if (!agreedToAdvancePay) {
      setErrorMsg('Please confirm and agree to the required advance reservation deposit.');
      return;
    }

    if (!paymentReference.trim()) {
      setErrorMsg('Please enter your transaction reference number or receipt ID.');
      return;
    }

    addBooking({
      roomId: selectedRoomForBooking.id,
      roomName: selectedRoomForBooking.name,
      roomType: selectedRoomForBooking.type,
      customerId: currentUser.id,
      customerName: currentUser.name,
      customerEmail: currentUser.email,
      checkInDate: searchParams.checkIn,
      checkOutDate: searchParams.checkOut,
      guestsCount: searchParams.guests,
      totalAmount,
      advanceDepositRequired,
      paymentMethod,
      paymentReference,
      notes
    });

    setSuccess(true);
    setTimeout(() => {
      setSuccess(false);
      setBookingModalOpen(false);
      setAgreedToAdvancePay(false);
      setPaymentReference('');
    }, 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-fade-in">
      <div className="bg-white rounded-3xl max-w-lg w-full shadow-2xl overflow-hidden border border-gray-100 flex flex-col max-h-[90vh]">
        
        {/* Header */}
        <div className="bg-emerald-600 text-white p-6 relative flex items-center justify-between">
          <div>
            <span className="bg-emerald-500 text-emerald-100 text-xs uppercase tracking-wider px-2.5 py-1 rounded-full font-bold">
              {selectedRoomForBooking.type} Reservation
            </span>
            <h3 className="text-2xl font-extrabold mt-1">{selectedRoomForBooking.name}</h3>
          </div>
          <button
            onClick={() => setBookingModalOpen(false)}
            className="p-1.5 text-white/80 hover:text-white bg-emerald-700 rounded-full hover:bg-emerald-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Content */}
        <div className="p-6 sm:p-8 overflow-y-auto space-y-6">

          {success ? (
            <div className="py-12 text-center space-y-3">
              <CheckCircle2 className="w-16 h-16 text-emerald-600 mx-auto animate-bounce" />
              <h4 className="text-2xl font-bold text-gray-900">Reservation Confirmed!</h4>
              <p className="text-sm text-gray-600 max-w-sm mx-auto">
                Thank you for choosing Brealls Resorts. Your stay has been successfully reserved. We have sent the confirmation to your email.
              </p>
            </div>
          ) : (
            <>
              {/* Login Notice if not logged in */}
              {!currentUser && (
                <div className="bg-amber-50 border border-amber-200 p-4 rounded-2xl flex items-start gap-3">
                  <ShieldCheck className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                  <div>
                    <h5 className="text-xs font-bold uppercase tracking-wider text-amber-900 mb-1">
                      Registration Required
                    </h5>
                    <p className="text-xs text-amber-800 leading-relaxed mb-3">
                      Register first before booking a stay, or log in with your existing account.
                    </p>
                    <div className="flex gap-2">
                      <button
                        type="button"
                        onClick={() => { setAuthModalTab('register'); setAuthModalOpen(true); }}
                        className="bg-emerald-600 text-white px-3 py-1.5 rounded-lg text-xs font-bold hover:bg-emerald-700 transition-colors shadow-sm"
                      >
                        Register Now
                      </button>
                      <button
                        type="button"
                        onClick={() => { setAuthModalTab('login'); setAuthModalOpen(true); }}
                        className="bg-white text-gray-800 border border-gray-300 px-3 py-1.5 rounded-lg text-xs font-bold hover:bg-gray-50 transition-colors"
                      >
                        Login
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* Booking Details Summary */}
              <div className="bg-gray-50 p-4 rounded-2xl border border-gray-200/80 space-y-3">
                <div className="flex justify-between items-center pb-3 border-b border-gray-200 text-sm">
                  <span className="text-gray-500 font-medium">Rate / Night</span>
                  <span className="font-bold text-gray-900">₱{selectedRoomForBooking.price.toLocaleString()}</span>
                </div>

                <div className="grid grid-cols-2 gap-3 pt-1">
                  <div className="bg-white p-3 rounded-xl border border-gray-200">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-gray-400 block mb-1 flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5 text-emerald-600" /> Check-in
                    </span>
                    <input
                      type="date"
                      min={todayStr}
                      value={searchParams.checkIn}
                      onChange={(e) => handleCheckInChange(e.target.value)}
                      className="w-full text-xs font-bold text-gray-900 bg-transparent border-none focus:outline-none cursor-pointer"
                    />
                  </div>

                  <div className="bg-white p-3 rounded-xl border border-gray-200">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-gray-400 block mb-1 flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5 text-emerald-600" /> Check-out
                    </span>
                    <input
                      type="date"
                      min={searchParams.checkIn >= todayStr ? searchParams.checkIn : todayStr}
                      value={searchParams.checkOut}
                      onChange={(e) => setSearchParams(prev => ({ ...prev, checkOut: e.target.value }))}
                      className="w-full text-xs font-bold text-gray-900 bg-transparent border-none focus:outline-none cursor-pointer"
                    />
                  </div>
                </div>

                <div className="flex justify-between items-center text-xs text-gray-600 pt-2 px-1">
                  <span className="flex items-center gap-1.5 font-medium">
                    <Users className="w-4 h-4 text-emerald-600" /> {searchParams.guests} guests
                  </span>
                  <span className="flex items-center gap-1.5 font-medium">
                    <BedDouble className="w-4 h-4 text-emerald-600" /> {searchParams.roomsCount} room ({nights} {nights === 1 ? 'night' : 'nights'})
                  </span>
                </div>
              </div>

              {/* Guest Information */}
              {currentUser && (
                <div className="bg-emerald-50/60 p-4 rounded-2xl border border-emerald-200 flex justify-between items-center">
                  <div>
                    <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-800 block mb-0.5">Booking Guest</span>
                    <h5 className="font-bold text-gray-900">{currentUser.name}</h5>
                    <p className="text-xs text-gray-600">{currentUser.email}</p>
                  </div>
                  <span className="bg-emerald-600 text-white text-[11px] px-2.5 py-1 rounded-full font-bold uppercase">
                    {currentUser.role}
                  </span>
                </div>
              )}

              {/* Advance Payment Notice & Instructions */}
              <div className="bg-amber-50/80 border border-amber-200/80 p-4 rounded-2xl space-y-3">
                <div className="flex items-center gap-2 text-amber-900 font-bold text-sm">
                  <CreditCard className="w-5 h-5 text-amber-600 shrink-0" />
                  <span>Advance Payment Required for Reservation</span>
                </div>
                <p className="text-xs text-amber-900 leading-relaxed">
                  To secure your stay at Brealls Resorts (<strong className="font-semibold">San Pedro Island Hinunangan Southern Leyte</strong>), a 50% advance downpayment is required upon booking.
                </p>

                <div className="bg-white p-3 rounded-xl border border-amber-200 flex justify-between items-center">
                  <span className="text-xs font-semibold text-gray-700">Required 50% Advance Deposit:</span>
                  <span className="font-extrabold text-emerald-600 text-lg">₱{advanceDepositRequired.toLocaleString()}</span>
                </div>

                <div className="text-xs text-gray-700 space-y-1 pt-1">
                  <span className="font-bold block text-gray-800 uppercase tracking-wider text-[11px]">Payment Methods:</span>
                  <div>• <strong className="text-gray-900">GCash / Maya:</strong> 0917 843 9210 (Brealls Resort Desk)</div>
                  <div>• <strong className="text-gray-900">Bank Transfer:</strong> BDO Acct: 004920192831 / Brealls Resorts Inc.</div>
                </div>

                <div className="pt-2 space-y-2.5">
                  <label className="block text-xs font-bold uppercase tracking-wider text-gray-700">Select Paid Method</label>
                  <div className="grid grid-cols-2 gap-2">
                    {['GCash', 'Bank Transfer'].map((method) => (
                      <button
                        type="button"
                        key={method}
                        onClick={() => setPaymentMethod(method)}
                        className={`py-2 px-3 text-xs font-bold rounded-xl border text-center transition-all ${
                          paymentMethod === method
                            ? 'bg-amber-600 text-white border-amber-600 shadow-sm'
                            : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
                        }`}
                      >
                        {method}
                      </button>
                    ))}
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1">
                      Payment Reference No. / Transaction ID
                    </label>
                    <input
                      type="text"
                      required
                      value={paymentReference}
                      onChange={(e) => setPaymentReference(e.target.value)}
                      placeholder="e.g. Ref No. 901238491823"
                      className="w-full bg-white border border-amber-300 rounded-xl p-2.5 text-xs text-gray-900 font-semibold focus:outline-none focus:ring-2 focus:ring-amber-500"
                    />
                  </div>

                  <label className="flex items-start gap-2 pt-1 cursor-pointer select-none">
                    <input
                      type="checkbox"
                      checked={agreedToAdvancePay}
                      onChange={(e) => setAgreedToAdvancePay(e.target.checked)}
                      className="mt-0.5 rounded text-amber-600 focus:ring-amber-500 w-4 h-4"
                    />
                    <span className="text-xs text-amber-950 font-medium">
                      I have transferred ₱{advanceDepositRequired.toLocaleString()} and verify the transaction details above.
                    </span>
                  </label>
                </div>
              </div>

              {/* Special Requests / Notes */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1.5">
                  Special Requests (Optional)
                </label>
                <textarea
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="e.g. Extra pillows, late arrival, diet requirements..."
                  rows={2}
                  className="w-full bg-gray-50 border border-gray-300 rounded-xl p-3 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white transition-all"
                />
              </div>

              {overlappingBooking && (
                <div className="bg-red-100 text-red-900 p-4 rounded-xl text-xs font-bold border border-red-300 flex items-center gap-3">
                  <AlertCircle className="w-6 h-6 text-red-600 shrink-0 animate-bounce" />
                  <div>
                    <span className="text-sm block font-extrabold mb-0.5">Room Already Reserved for Selected Dates</span>
                    This accommodation is already reserved from <span className="underline">{overlappingBooking.checkInDate}</span> to <span className="underline">{overlappingBooking.checkOutDate}</span>. Please choose different dates or select another room.
                  </div>
                </div>
              )}

              {errorMsg && (
                <div className="bg-red-50 text-red-700 p-3 rounded-xl text-xs font-bold border border-red-200 flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 text-red-500 shrink-0" />
                  <span>{errorMsg}</span>
                </div>
              )}

              {/* Total Calculation & Confirm */}
              <div className="bg-gray-900 text-white p-6 rounded-2xl shadow-xl flex items-center justify-between">
                <div>
                  <span className="text-xs text-gray-400 block uppercase tracking-wider font-semibold">Total Payable Amount</span>
                  <div className="text-3xl font-extrabold text-emerald-400 mt-1">
                    ₱{totalAmount.toLocaleString()}
                  </div>
                  <span className="text-[11px] text-gray-400">50% deposit required now</span>
                </div>

                <button
                  type="button"
                  onClick={handleConfirmBooking}
                  disabled={!!overlappingBooking}
                  className={`px-6 py-3.5 rounded-xl font-bold uppercase tracking-wider text-sm shadow-lg flex items-center gap-2 transition-all ${
                    overlappingBooking 
                      ? 'bg-gray-700 text-gray-500 cursor-not-allowed shadow-none' 
                      : 'bg-emerald-600 hover:bg-emerald-500 text-white shadow-emerald-600/30 hover:scale-[1.03] active:scale-[0.97]'
                  }`}
                >
                  <span>{overlappingBooking ? 'Date Unavailable' : 'Confirm Stay'}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </>
          )}

        </div>
      </div>
    </div>
  );
};
