import React, { useState, useRef, useEffect } from 'react';

export default function UserMenu({ user, onLogout }) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    
    function handleKeyDown(event) {
      if (event.key === 'Escape') {
        setIsOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const handleLogoutClick = () => {
    setIsOpen(false);
    onLogout();
  };

  const getInitials = (name) => {
    if (!name) return 'A';
    return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
  };

  return (
    <div className="relative font-sans" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-center w-8 h-8 rounded-full bg-zinc-850 text-zinc-300 text-xs font-semibold overflow-hidden border border-zinc-800 hover:border-zinc-700 transition-colors focus-visible:outline-2 focus-visible:outline-zinc-400 cursor-pointer"
        aria-label="Toggle user menu"
        aria-haspopup="true"
        aria-expanded={isOpen}
      >
        {user.picture ? (
          <img src={user.picture} alt={user.name} className="w-full h-full object-cover" />
        ) : (
          <span>{getInitials(user.name)}</span>
        )}
      </button>

      {isOpen && (
        <div 
          className="absolute right-0 mt-2 w-56 bg-zinc-900 border border-zinc-800 rounded-xl shadow-lg py-1.5 z-50 animate-in fade-in slide-in-from-top-1 duration-150"
          role="menu"
          aria-label="User actions dropdown"
        >
          <div className="px-4 py-2 border-b border-zinc-850 select-none">
            <p className="text-sm font-medium text-zinc-200 truncate">{user.name}</p>
            <p className="text-xs text-zinc-500 truncate mt-0.5">{user.email}</p>
          </div>
          
          <div className="py-1">
            <div className="px-4 py-1 text-xs text-zinc-500 font-semibold uppercase tracking-wider select-none">
              Account
            </div>
            <button
              role="menuitem"
              onClick={handleLogoutClick}
              className="w-full text-left px-4 py-2 text-sm text-red-400 hover:bg-zinc-850 transition-colors flex items-center gap-2 cursor-pointer focus:bg-zinc-850 focus:outline-none"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75" />
              </svg>
              Logout
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
