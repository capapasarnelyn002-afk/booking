import React from 'react';
import { ResortProvider, useResort } from './context/ResortContext';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { RoomFilter } from './components/RoomFilter';
import { RoomList } from './components/RoomList';
import { ContactSection } from './components/ContactSection';
import { AdminDashboard } from './components/AdminDashboard';
import { CustomerHistory } from './components/CustomerHistory';
import { AuthModal } from './components/AuthModal';
import { BookingModal } from './components/BookingModal';
import { Footer } from './components/Footer';

const MainContent: React.FC = () => {
  const { activeTab } = useResort();

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 selection:bg-emerald-500 selection:text-white font-sans">
      <Navbar />

      <main className="flex-1">
        {activeTab === 'Home' && (
          <div>
            <Hero />
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
              <RoomFilter />
              <RoomList />
              <ContactSection />
            </div>
          </div>
        )}

        {activeTab === 'Lodge & Cottages' && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="bg-emerald-900 text-white p-8 rounded-3xl mb-8 shadow-xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-800 rounded-full filter blur-3xl opacity-30 -mr-20 -mt-20 pointer-events-none" />
              <div className="relative z-10">
                <span className="bg-emerald-600 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest text-emerald-100 shadow-inner">
                  Accommodations
                </span>
                <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight mt-2 mb-1">
                  Lodge & Cottages
                </h1>
                <p className="text-emerald-200 text-sm max-w-xl font-light leading-relaxed">
                  Explore our selection of premium lodges and relaxing beachfront cottages.
                </p>
              </div>
            </div>
            <RoomFilter />
            <RoomList />
          </div>
        )}

        {activeTab === 'Book Now' && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="bg-emerald-900 text-white p-8 rounded-3xl mb-8 shadow-xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-800 rounded-full filter blur-3xl opacity-30 -mr-20 -mt-20 pointer-events-none" />
              <div className="relative z-10">
                <span className="bg-emerald-600 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest text-emerald-100 shadow-inner">
                  Instant Reservations
                </span>
                <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight mt-2 mb-1">
                  Book Your Stay Now
                </h1>
                <p className="text-emerald-200 text-sm max-w-xl font-light leading-relaxed">
                  Select your desired dates, filter by guest capacity, and reserve your accommodation instantly.
                </p>
              </div>
            </div>
            <RoomFilter />
            <RoomList />
          </div>
        )}

        {activeTab === 'Contact' && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <ContactSection />
          </div>
        )}

        {activeTab === 'My Bookings' && (
          <CustomerHistory />
        )}

        {(activeTab === 'Admin' || activeTab === 'Staff Portal' || activeTab === 'Admin Portal') && (
          <AdminDashboard />
        )}
      </main>

      <Footer />
      <AuthModal />
      <BookingModal />
    </div>
  );
};

export const App: React.FC = () => {
  return (
    <ResortProvider>
      <MainContent />
    </ResortProvider>
  );
};

export default App;
