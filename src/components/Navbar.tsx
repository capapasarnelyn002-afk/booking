import React from 'react';
import { useResort } from '../context/ResortContext';
import { Palmtree, UserCircle, LogIn, LogOut, ShieldAlert, History } from 'lucide-react';

export const Navbar: React.FC = () => {
  const { activeTab, setActiveTab, currentUser, setCurrentUser, setAuthModalOpen, setAuthModalTab } = useResort();

  const navItems = ['Home', 'Lodge & Cottages', 'Book Now', 'Contact'];
  if (currentUser?.role === 'customer') {
    navItems.push('My Bookings');
  }
  const adminTabLabel = currentUser?.role === 'staff' ? 'Staff Portal' : currentUser?.role === 'admin' ? 'Admin Portal' : 'Admin';
  navItems.push(adminTabLabel);

  const handleNavClick = (tab: string) => {
    setActiveTab(tab);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md shadow-sm border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20 items-center">
          
          {/* Logo */}
          <div 
            onClick={() => handleNavClick('Home')}
            className="flex items-center gap-3 cursor-pointer group"
          >
            <div className="w-12 h-12 rounded-xl bg-emerald-600 flex items-center justify-center text-white shadow-lg shadow-emerald-600/20 group-hover:scale-105 transition-transform">
              <Palmtree className="w-7 h-7" />
            </div>
            <div>
              <span className="text-2xl font-bold tracking-tight text-gray-900 group-hover:text-emerald-600 transition-colors">
                Brealls <span className="font-light text-emerald-600">Resorts</span>
              </span>
              <p className="text-xs text-gray-500 tracking-wider font-medium uppercase">Beach Resort & Villas</p>
            </div>
          </div>

          {/* Nav Items */}
          <nav className="hidden md:flex items-center space-x-1 lg:space-x-2">
            {navItems.map((item) => {
              const isActive = activeTab === item || (item === adminTabLabel && (activeTab === 'Admin' || activeTab === 'Staff Portal' || activeTab === 'Admin Portal'));
              return (
                <button
                  key={item}
                  onClick={() => handleNavClick(item)}
                  className={`px-4 py-2.5 rounded-lg text-sm font-medium transition-all ${
                    isActive
                      ? 'bg-emerald-50 text-emerald-700 font-semibold shadow-sm'
                      : 'text-gray-600 hover:text-emerald-600 hover:bg-gray-50'
                  }`}
                >
                  <span className="flex items-center gap-1.5">
                    {(item === 'Admin' || item === 'Staff Portal' || item === 'Admin Portal') && <ShieldAlert className="w-4 h-4 text-emerald-600" />}
                    {item === 'My Bookings' && <History className="w-4 h-4 text-emerald-600" />}
                    {item}
                  </span>
                </button>
              );
            })}
          </nav>

          {/* User Auth Section */}
          <div className="flex items-center gap-3">
            {currentUser ? (
              <div className="flex items-center gap-3 bg-gray-50 border border-gray-200 py-1.5 px-3.5 rounded-full shadow-inner">
                <UserCircle className="w-6 h-6 text-emerald-600" />
                <div className="text-left hidden sm:block">
                  <p className="text-xs font-semibold text-gray-800 leading-none">{currentUser.name}</p>
                  <p className="text-[10px] text-emerald-600 font-bold uppercase tracking-wider mt-0.5">{currentUser.role}</p>
                </div>
                <button
                  onClick={() => {
                    setCurrentUser(null);
                    if (activeTab === 'Admin' || activeTab === 'Staff Portal' || activeTab === 'Admin Portal' || activeTab === 'My Bookings') {
                      setActiveTab('Home');
                    }
                  }}
                  title="Logout"
                  className="p-1 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-full transition-colors ml-1"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <button
                  onClick={() => {
                    setAuthModalTab('login');
                    setAuthModalOpen(true);
                  }}
                  className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-medium text-sm px-4 py-2.5 rounded-lg shadow-md shadow-emerald-600/20 transition-all hover:scale-[1.02] active:scale-[0.98]"
                >
                  <LogIn className="w-4 h-4" />
                  <span>Login</span>
                </button>
              </div>
            )}
          </div>
          
        </div>
      </div>

      {/* Mobile nav bar */}
      <div className="md:hidden flex overflow-x-auto px-4 py-2 bg-gray-50/80 border-t border-gray-100 gap-1 sm:gap-2">
        {navItems.map((item) => {
          const isActive = activeTab === item || (item === adminTabLabel && (activeTab === 'Admin' || activeTab === 'Staff Portal' || activeTab === 'Admin Portal'));
          return (
            <button
              key={item}
              onClick={() => handleNavClick(item)}
              className={`whitespace-nowrap px-3 py-1.5 rounded-full text-xs font-medium ${
                isActive
                  ? 'bg-emerald-600 text-white shadow-sm font-semibold'
                  : 'text-gray-600 hover:bg-gray-200/60'
              }`}
            >
              {item}
            </button>
          );
        })}
      </div>
    </header>
  );
};
