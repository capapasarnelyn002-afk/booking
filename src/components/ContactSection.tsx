import React from 'react';
import { useResort } from '../context/ResortContext';
import { Phone, Mail, MapPin, Send, MessageSquare } from 'lucide-react';

export const ContactSection: React.FC = () => {
  const { settings } = useResort();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Thank you for reaching out! Our resort desk will get back to you shortly.');
  };

  return (
    <div id="contact-section" className="bg-emerald-900 text-white rounded-3xl p-8 sm:p-12 mb-16 relative overflow-hidden shadow-2xl">
      <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-800 rounded-full filter blur-3xl opacity-30 -mr-20 -mt-20 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-emerald-950 rounded-full filter blur-3xl opacity-40 -ml-20 -mb-20 pointer-events-none" />

      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        {/* Left Info */}
        <div className="space-y-8">
          <div>
            <span className="bg-emerald-800/80 text-emerald-300 border border-emerald-700 text-xs font-bold uppercase tracking-wider px-3.5 py-1.5 rounded-full inline-block mb-3 shadow-inner">
              Get in Touch
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-4">
              Contact Us
            </h2>
            <p className="text-emerald-200 text-sm sm:text-base font-light leading-relaxed max-w-lg">
              Have questions about our lodges, cottages, or special events? Our resort concierge is here to ensure your stay is flawless.
            </p>
          </div>

          <div className="space-y-6">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-2xl bg-emerald-800/80 border border-emerald-700/80 flex items-center justify-center text-emerald-300 shrink-0 shadow-lg">
                <Phone className="w-6 h-6" />
              </div>
              <div>
                <span className="text-xs uppercase tracking-wider font-semibold text-emerald-400 block mb-0.5">Phone Call / SMS</span>
                <p className="text-xl font-extrabold text-white">{settings.phone}</p>
                <p className="text-xs text-emerald-300 font-light mt-0.5">Available 24/7 for booking inquiries</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-2xl bg-emerald-800/80 border border-emerald-700/80 flex items-center justify-center text-emerald-300 shrink-0 shadow-lg">
                <Mail className="w-6 h-6" />
              </div>
              <div>
                <span className="text-xs uppercase tracking-wider font-semibold text-emerald-400 block mb-0.5">Email Inquiries</span>
                <p className="text-lg font-bold text-white">{settings.email}</p>
                <p className="text-xs text-emerald-300 font-light mt-0.5">Direct reservations & custom packages</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-2xl bg-emerald-800/80 border border-emerald-700/80 flex items-center justify-center text-emerald-300 shrink-0 shadow-lg">
                <MapPin className="w-6 h-6" />
              </div>
              <div>
                <span className="text-xs uppercase tracking-wider font-semibold text-emerald-400 block mb-0.5">Resort Location</span>
                <p className="text-lg font-bold text-white">{settings.location}</p>
                <p className="text-xs text-emerald-300 font-light mt-0.5">Scenic coastal shoreline destination</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Form */}
        <div className="bg-white/10 backdrop-blur-md p-6 sm:p-8 rounded-3xl border border-white/20 shadow-2xl">
          <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
            <MessageSquare className="w-5 h-5 text-emerald-400" />
            <span>Send a Quick Message</span>
          </h3>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-emerald-200 mb-1">Your Full Name</label>
              <input
                type="text"
                required
                placeholder="Bea Infanso"
                className="w-full bg-white/10 border border-white/20 rounded-xl p-3 text-sm text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:bg-white/20 transition-all"
              />
            </div>
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-emerald-200 mb-1">Email Address</label>
              <input
                type="email"
                required
                placeholder="bea002@gmail.com"
                className="w-full bg-white/10 border border-white/20 rounded-xl p-3 text-sm text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:bg-white/20 transition-all"
              />
            </div>
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-emerald-200 mb-1">Message</label>
              <textarea
                required
                rows={3}
                placeholder="I would like to inquire about group bookings..."
                className="w-full bg-white/10 border border-white/20 rounded-xl p-3 text-sm text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:bg-white/20 transition-all"
              />
            </div>
            <button
              type="submit"
              className="w-full py-3.5 bg-emerald-500 hover:bg-emerald-400 text-emerald-950 font-extrabold uppercase tracking-wider rounded-xl text-sm transition-all shadow-lg hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-2 mt-2"
            >
              <Send className="w-4 h-4" />
              <span>Send Message</span>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
