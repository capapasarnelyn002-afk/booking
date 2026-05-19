import React from 'react';
import { useResort } from '../context/ResortContext';
import { Palmtree, Heart } from 'lucide-react';

export const Footer: React.FC = () => {
  const { settings, setActiveTab } = useResort();

  return (
    <footer className="bg-gray-900 text-white pt-12 pb-8 border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center pb-8 border-b border-gray-800 gap-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-600 flex items-center justify-center text-white shadow-lg">
              <Palmtree className="w-6 h-6" />
            </div>
            <div>
              <span className="text-xl font-bold tracking-tight text-white">
                Brealls <span className="font-light text-emerald-400">Resorts</span>
              </span>
              <p className="text-xs text-gray-400 font-medium">{settings.tagline}</p>
            </div>
          </div>

          <div className="flex flex-wrap gap-6 text-sm font-medium text-gray-300">
            {['Home', 'Lodge & Cottages', 'Book Now', 'Contact', 'Admin'].map(item => (
              <button
                key={item}
                onClick={() => {
                  setActiveTab(item);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="hover:text-emerald-400 transition-colors cursor-pointer"
              >
                {item}
              </button>
            ))}
          </div>
        </div>

        <div className="pt-8 flex flex-col sm:flex-row justify-between items-center text-xs text-gray-400 gap-4">
          <div>
            © 2026 Brealls Resorts. All rights reserved.
          </div>
          <div className="flex items-center gap-1">
            <span>Made with premium hospitality & care</span>
            <Heart className="w-3.5 h-3.5 text-emerald-500 inline fill-emerald-500" />
          </div>
        </div>
      </div>
    </footer>
  );
};
