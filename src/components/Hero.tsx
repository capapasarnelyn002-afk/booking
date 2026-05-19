import React from 'react';
import { useResort } from '../context/ResortContext';
import { Calendar, Users, MapPin, Search, Sparkles, BedDouble } from 'lucide-react';

export const Hero: React.FC = () => {
  const { settings, searchParams, setSearchParams, setActiveTab } = useResort();

  const todayStr = new Date().toISOString().split('T')[0];

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setActiveTab('Lodge & Cottages');
    // Scroll smoothly to filter / list
    const el = document.getElementById('accommodations-section');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

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

  return (
    <div className="relative min-h-[580px] flex items-center justify-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src={settings.heroBackgroundImage}
          alt={settings.resortName}
          className="w-full h-full object-cover object-center filter brightness-[0.75] transform scale-105 transition-all duration-1000"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/30 to-black/70" />
      </div>

      {/* Main Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center text-white">
        
        {/* Location Badge */}
        <div className="inline-flex items-center gap-2 bg-black/40 backdrop-blur-md border border-white/20 px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider text-emerald-300 mb-6 shadow-lg animate-fade-in">
          <MapPin className="w-3.5 h-3.5 text-emerald-400" />
          <span>{settings.location}</span>
        </div>

        {/* Heading */}
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight mb-6 drop-shadow-md">
          {settings.tagline}
        </h1>

        {/* Subheading */}
        <p className="max-w-3xl mx-auto text-lg sm:text-xl text-gray-200 font-light mb-12 drop-shadow leading-relaxed">
          {settings.subTagline}
        </p>

        {/* Search Widget Container */}
        <div className="bg-white p-3 sm:p-4 rounded-2xl shadow-2xl max-w-4xl mx-auto text-gray-800 border border-white/40">
          <form onSubmit={handleSearch} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 items-center">
            
            {/* Check-in Date */}
            <div className="relative text-left bg-gray-50 hover:bg-gray-100/80 transition-colors p-3 rounded-xl border border-gray-200">
              <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-1 flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-emerald-600" />
                Check-In Date
              </label>
              <input
                type="date"
                min={todayStr}
                value={searchParams.checkIn}
                onChange={(e) => handleCheckInChange(e.target.value)}
                className="w-full bg-transparent text-gray-900 font-bold focus:outline-none cursor-pointer"
              />
              <span className="text-xs text-gray-400 block mt-0.5">Format: 19/05/2026</span>
            </div>

            {/* Check-out Date */}
            <div className="relative text-left bg-gray-50 hover:bg-gray-100/80 transition-colors p-3 rounded-xl border border-gray-200">
              <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-1 flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-emerald-600" />
                Check-Out Date
              </label>
              <input
                type="date"
                min={searchParams.checkIn >= todayStr ? searchParams.checkIn : todayStr}
                value={searchParams.checkOut}
                onChange={(e) => setSearchParams(prev => ({ ...prev, checkOut: e.target.value }))}
                className="w-full bg-transparent text-gray-900 font-bold focus:outline-none cursor-pointer"
              />
              <span className="text-xs text-gray-400 block mt-0.5">Format: 20/05/2026</span>
            </div>

            {/* Guests & Rooms */}
            <div className="relative text-left bg-gray-50 hover:bg-gray-100/80 transition-colors p-3 rounded-xl border border-gray-200 flex justify-between items-center">
              <div className="flex-1">
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-1 flex items-center gap-1.5">
                  <Users className="w-3.5 h-3.5 text-emerald-600" />
                  Guests
                </label>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setSearchParams(prev => ({ ...prev, guests: Math.max(1, prev.guests - 1) }))}
                    className="w-6 h-6 rounded-full bg-gray-200 hover:bg-gray-300 font-bold flex items-center justify-center text-xs"
                  >-</button>
                  <span className="font-bold text-gray-900">{searchParams.guests} {searchParams.guests === 1 ? 'adult' : 'adults'}</span>
                  <button
                    type="button"
                    onClick={() => setSearchParams(prev => ({ ...prev, guests: Math.min(16, prev.guests + 1) }))}
                    className="w-6 h-6 rounded-full bg-gray-200 hover:bg-gray-300 font-bold flex items-center justify-center text-xs"
                  >+</button>
                </div>
              </div>
              <div className="border-l border-gray-200 pl-3">
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-1 flex items-center gap-1.5">
                  <BedDouble className="w-3.5 h-3.5 text-emerald-600" />
                  Room
                </label>
                <span className="font-bold text-gray-900 block mt-1">{searchParams.roomsCount} room</span>
              </div>
            </div>

            {/* Search Button */}
            <div>
              <button
                type="submit"
                className="w-full h-full min-h-[64px] bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl shadow-lg shadow-emerald-600/30 flex items-center justify-center gap-2 transition-all hover:scale-[1.02] active:scale-[0.98] text-lg uppercase tracking-wider"
              >
                <Search className="w-5 h-5" />
                <span>Search</span>
              </button>
            </div>

          </form>
        </div>

        {/* Quick hint */}
        <div className="mt-4 flex items-center justify-center gap-2 text-xs text-white/80">
          <Sparkles className="w-3.5 h-3.5 text-yellow-300 animate-pulse" />
          <span>Best price guarantee when you book directly with Brealls Resorts</span>
        </div>

      </div>
    </div>
  );
};
