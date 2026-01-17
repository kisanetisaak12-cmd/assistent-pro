
import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="sticky top-0 z-50 bg-slate-950/50 backdrop-blur-md border-b border-white/5 py-4">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 flex items-center justify-between">
        <div className="flex items-center space-x-3 group cursor-pointer">
          <div className="relative">
            <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500 to-emerald-500 rounded-lg blur opacity-40 group-hover:opacity-100 transition duration-1000 group-hover:duration-200"></div>
            <div className="relative bg-slate-900 p-2 rounded-lg border border-white/10">
              <svg className="w-6 h-6 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
          </div>
          <h1 className="text-xl font-black text-white tracking-tighter">
            LEVEL<span className="text-emerald-500">UP</span> <span className="text-slate-500 font-medium">STUDIE</span>
          </h1>
        </div>
        
        <nav className="hidden md:flex items-center space-x-8 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">
          <a href="#" className="hover:text-emerald-400 transition-colors">Teknologi</a>
          <a href="#" className="hover:text-emerald-400 transition-colors">Betygsgaranti</a>
          <button className="bg-white/5 hover:bg-white/10 text-white px-5 py-2 rounded-full border border-white/10 transition-all">
            Logga In
          </button>
        </nav>
      </div>
    </header>
  );
};

export default Header;
