import React, { useState } from 'react';
import { useResort } from '../context/ResortContext';
import { X, Mail, Lock, User as UserIcon, ShieldCheck, Sparkles, CheckCircle2 } from 'lucide-react';

export const AuthModal: React.FC = () => {
  const { 
    authModalOpen, 
    setAuthModalOpen, 
    authModalTab, 
    setAuthModalTab, 
    users, 
    setCurrentUser, 
    registerUser 
  } = useResort();

  const [loginEmail, setLoginEmail] = useState('bea002@gmail.com');
  const [loginPassword, setLoginPassword] = useState('password123');

  const [regName, setRegName] = useState('Bea Infanso');
  const [regEmail, setRegEmail] = useState('bea002@gmail.com');
  const [regPassword, setRegPassword] = useState('password123');
  
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  if (!authModalOpen) return null;

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    setSuccessMsg('');

    // Check pre-configured or registered users
    const matchedUser = users.find(u => u.email.toLowerCase() === loginEmail.trim().toLowerCase());
    if (matchedUser) {
      setCurrentUser(matchedUser);
      setSuccessMsg(`Welcome back, ${matchedUser.name}!`);
      setTimeout(() => {
        setAuthModalOpen(false);
      }, 700);
    } else {
      // Fallback: create customer if email looks like customer
      if (loginEmail.includes('admin')) {
        const adminUser = users.find(u => u.role === 'admin') || { id: 'u-admin', name: 'Brealls Admin', email: loginEmail, role: 'admin' };
        setCurrentUser(adminUser as any);
        setAuthModalOpen(false);
      } else if (loginEmail.includes('staff')) {
        const staffUser = users.find(u => u.role === 'staff') || { id: 'u-staff', name: 'Resort Staff', email: loginEmail, role: 'staff' };
        setCurrentUser(staffUser as any);
        setAuthModalOpen(false);
      } else {
        setErrorMsg('Account not found. Please check your credentials or create a customer account.');
      }
    }
  };

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    if (!regName || !regEmail || !regPassword) {
      setErrorMsg('Please fill in all required fields.');
      return;
    }

    registerUser(regName, regEmail);
    setSuccessMsg('Account created successfully! You are now logged in.');
    setTimeout(() => {
      setAuthModalOpen(false);
    }, 1000);
  };

  // Quick autofill helpers
  const autofill = (role: 'admin' | 'staff' | 'customer') => {
    if (role === 'admin') {
      setLoginEmail('admin@brealls.com');
      setLoginPassword('admin123');
    } else if (role === 'staff') {
      setLoginEmail('staff@brealls.com');
      setLoginPassword('staff123');
    } else {
      setLoginEmail('bea002@gmail.com');
      setLoginPassword('password123');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-fade-in">
      <div className="bg-white rounded-3xl max-w-md w-full shadow-2xl overflow-hidden border border-gray-100">
        
        {/* Header Tabs */}
        <div className="flex bg-gray-50 border-b border-gray-200 relative">
          <button
            onClick={() => { setAuthModalTab('login'); setErrorMsg(''); setSuccessMsg(''); }}
            className={`flex-1 py-4 text-sm font-bold uppercase tracking-wider text-center transition-all ${
              authModalTab === 'login'
                ? 'bg-white text-emerald-600 border-b-2 border-emerald-600 shadow-sm'
                : 'text-gray-500 hover:text-gray-800'
            }`}
          >
            Login
          </button>
          <button
            onClick={() => { setAuthModalTab('register'); setErrorMsg(''); setSuccessMsg(''); }}
            className={`flex-1 py-4 text-sm font-bold uppercase tracking-wider text-center transition-all ${
              authModalTab === 'register'
                ? 'bg-white text-emerald-600 border-b-2 border-emerald-600 shadow-sm'
                : 'text-gray-500 hover:text-gray-800'
            }`}
          >
            Register
          </button>
          <button
            onClick={() => setAuthModalOpen(false)}
            className="absolute right-3 top-3.5 p-1.5 text-gray-400 hover:text-gray-700 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 sm:p-8">
          
          {errorMsg && (
            <div className="bg-red-50 text-red-700 p-3 rounded-xl text-xs font-semibold mb-4 border border-red-200 flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-red-500 shrink-0" />
              <span>{errorMsg}</span>
            </div>
          )}

          {successMsg && (
            <div className="bg-emerald-50 text-emerald-700 p-3 rounded-xl text-xs font-bold mb-4 border border-emerald-200 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>{successMsg}</span>
            </div>
          )}

          {authModalTab === 'login' ? (
            <div>
              <div className="text-center mb-6">
                <h3 className="text-2xl font-extrabold text-gray-900 mb-1">Welcome Back</h3>
                <p className="text-xs text-gray-500">Use your Admin, Staff, or Customer account.</p>
              </div>

              {/* Sample Account Helper Buttons */}
              <div className="bg-emerald-50/60 border border-emerald-200/80 p-3 rounded-2xl mb-6">
                <p className="text-[11px] font-bold uppercase tracking-wider text-emerald-800 mb-2 flex items-center gap-1">
                  <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Quick Test Accounts</span>
                </p>
                <div className="grid grid-cols-3 gap-2">
                  <button
                    type="button"
                    onClick={() => autofill('admin')}
                    className="bg-white hover:bg-emerald-600 hover:text-white text-emerald-800 border border-emerald-200 text-xs py-1.5 px-2 rounded-lg font-bold transition-all shadow-sm"
                  >
                    Admin
                  </button>
                  <button
                    type="button"
                    onClick={() => autofill('staff')}
                    className="bg-white hover:bg-emerald-600 hover:text-white text-emerald-800 border border-emerald-200 text-xs py-1.5 px-2 rounded-lg font-bold transition-all shadow-sm"
                  >
                    Staff
                  </button>
                  <button
                    type="button"
                    onClick={() => autofill('customer')}
                    className="bg-white hover:bg-emerald-600 hover:text-white text-emerald-800 border border-emerald-200 text-xs py-1.5 px-2 rounded-lg font-bold transition-all shadow-sm"
                  >
                    Customer
                  </button>
                </div>
                <div className="mt-2 text-[11px] text-gray-600 leading-tight space-y-0.5">
                  <div><strong className="font-semibold text-gray-800">Admin:</strong> admin@brealls.com / admin123</div>
                  <div><strong className="font-semibold text-gray-800">Staff:</strong> staff@brealls.com / staff123</div>
                </div>
              </div>

              {/* Login Form */}
              <form onSubmit={handleLogin} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1.5">Email Address</label>
                  <div className="relative">
                    <Mail className="absolute left-3.5 top-3.5 w-5 h-5 text-gray-400" />
                    <input
                      type="email"
                      required
                      value={loginEmail}
                      onChange={(e) => setLoginEmail(e.target.value)}
                      placeholder="e.g. bea002@gmail.com"
                      className="w-full bg-gray-50 border border-gray-300 rounded-xl py-3 pl-11 pr-4 text-gray-900 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white transition-all"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1.5">Password</label>
                  <div className="relative">
                    <Lock className="absolute left-3.5 top-3.5 w-5 h-5 text-gray-400" />
                    <input
                      type="password"
                      required
                      value={loginPassword}
                      onChange={(e) => setLoginPassword(e.target.value)}
                      placeholder="••••••••"
                      className="w-full bg-gray-50 border border-gray-300 rounded-xl py-3 pl-11 pr-4 text-gray-900 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white transition-all"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl shadow-lg shadow-emerald-600/20 text-sm uppercase tracking-wider transition-all hover:scale-[1.02] active:scale-[0.98] mt-2"
                >
                  Login
                </button>
              </form>
            </div>
          ) : (
            <div>
              <div className="text-center mb-6">
                <h3 className="text-2xl font-extrabold text-gray-900 mb-1">Create Customer Account</h3>
                <p className="text-xs text-gray-500">Register first before booking a stay.</p>
              </div>

              {/* Register Form */}
              <form onSubmit={handleRegister} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1.5">Full Name</label>
                  <div className="relative">
                    <UserIcon className="absolute left-3.5 top-3.5 w-5 h-5 text-gray-400" />
                    <input
                      type="text"
                      required
                      value={regName}
                      onChange={(e) => setRegName(e.target.value)}
                      placeholder="Bea Infanso"
                      className="w-full bg-gray-50 border border-gray-300 rounded-xl py-3 pl-11 pr-4 text-gray-900 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white transition-all"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1.5">Email Address</label>
                  <div className="relative">
                    <Mail className="absolute left-3.5 top-3.5 w-5 h-5 text-gray-400" />
                    <input
                      type="email"
                      required
                      value={regEmail}
                      onChange={(e) => setRegEmail(e.target.value)}
                      placeholder="bea002@gmail.com"
                      className="w-full bg-gray-50 border border-gray-300 rounded-xl py-3 pl-11 pr-4 text-gray-900 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white transition-all"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1.5">Password</label>
                  <div className="relative">
                    <Lock className="absolute left-3.5 top-3.5 w-5 h-5 text-gray-400" />
                    <input
                      type="password"
                      required
                      value={regPassword}
                      onChange={(e) => setRegPassword(e.target.value)}
                      placeholder="Password"
                      className="w-full bg-gray-50 border border-gray-300 rounded-xl py-3 pl-11 pr-4 text-gray-900 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white transition-all"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl shadow-lg shadow-emerald-600/20 text-sm uppercase tracking-wider transition-all hover:scale-[1.02] active:scale-[0.98] mt-2"
                >
                  Register
                </button>
              </form>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};
