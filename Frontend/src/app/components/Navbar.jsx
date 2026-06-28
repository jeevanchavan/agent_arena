import React from 'react';
import UserMenu from './UserMenu';

export default function Navbar({ user, onLogout }) {
  return (
    <header className="sticky top-0 z-40 w-full bg-zinc-950/80 backdrop-blur-md border-b border-zinc-900 select-none">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-14 flex items-center justify-between" aria-label="Main Navigation">
        
        {/* Left: Logo & Title */}
        <div className="flex items-center gap-2.5">
          <div 
            className="w-8 h-8 rounded-lg bg-zinc-100 flex items-center justify-center text-zinc-900 font-bold text-sm tracking-tighter"
            aria-hidden="true"
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="w-4 h-4 text-zinc-950">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 17.25v1.007a3 3 0 01-.879 2.122L7.5 21h9l-.621-.621A3 3 0 0115 18.257V17.25m6-12V15a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 15V5.25m18 0A2.25 2.25 0 0018.75 3H5.25A2.25 2.25 0 003 5.25m18 0V12a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 12V5.25" />
            </svg>
          </div>
          <span className="font-semibold text-sm tracking-tight text-zinc-100">Agent Arena</span>
        </div>

        {/* Right: User Avatar & Dropdown */}
        {user && (
          <div className="flex items-center gap-3">
            <UserMenu user={user} onLogout={onLogout} />
          </div>
        )}

      </nav>
    </header>
  );
}
