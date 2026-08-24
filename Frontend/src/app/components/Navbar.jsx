import React from 'react';
import UserMenu from './UserMenu';

export default function Navbar({ user, onLogout }) {
  return (
    <header className="sticky top-0 z-40 w-full bg-zinc-950/80 backdrop-blur-md border-b border-zinc-900 select-none">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-14 flex items-center justify-between" aria-label="Main Navigation">
        
        {/* Left: Logo & Title */}
        <div className="flex items-center gap-2.5">
          <div 
            className="w-8 h-8 rounded-lg bg-black border border-zinc-800 flex items-center justify-center"
            aria-hidden="true"
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" fill="none" className="w-5 h-5">
              <path d="M8 24L16 6L24 24H19.5L16 16L12.5 24H8Z" fill="#ffffff"/>
              <circle cx="11" cy="20" r="1.5" fill="#10b981"/>
              <circle cx="21" cy="20" r="1.5" fill="#a855f7"/>
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
