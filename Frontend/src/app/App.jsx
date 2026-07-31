import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';
import ChatInterface from './components/ChatInterface';
import OAuthPage from './components/OAuthPage';
import { API_BASE_URL } from './config';

function App() {
  const [user, setUser] = useState(null);
  const [checkingAuth, setCheckingAuth] = useState(true);

  // Check auth status on mount
  useEffect(() => {
    async function checkAuth() {
      try {
        const response = await axios.get(`${API_BASE_URL}/auth/me`, {
          withCredentials: true,
        });
        if (response.data.success && response.data.user) {
          setUser(response.data.user);
        }
      } catch (err) {
        // Not authenticated or network error
        console.log('User session not found.');
      } finally {
        setCheckingAuth(false);
      }
    }
    checkAuth();
  }, []);

  const handleLoginClick = () => {
    // Redirect to backend endpoint for Google OAuth (or dev fallback)
    window.location.href = `${API_BASE_URL}/auth/google`;
  };

  const handleLogout = async () => {
    try {
      await axios.post(`${API_BASE_URL}/auth/logout`, {}, {
        withCredentials: true,
      });
    } catch (err) {
      console.error('Failed to log out cleanly:', err);
    } finally {
      setUser(null);
    }
  };

  const handleAuthExpired = () => {
    setUser(null);
  };

  if (checkingAuth) {
    return (
      <div className="min-h-screen bg-zinc-50 flex items-center justify-center font-sans">
        <svg className="animate-spin h-8 w-8 text-zinc-950" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
        </svg>
      </div>
    );
  }

  return (
    <>
      {user ? (
        <ChatInterface 
          user={user} 
          onLogout={handleLogout} 
          onAuthExpired={handleAuthExpired} 
        />
      ) : (
        <OAuthPage onLoginClick={handleLoginClick} />
      )}
    </>
  );
}

export default App;
