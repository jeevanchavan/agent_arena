import React from 'react';

export default function OAuthPage({ onLoginClick }) {
  return (
    <div className="min-h-screen bg-zinc-950 flex flex-col justify-center items-center px-4 py-12 font-sans select-none">
      <main className="w-full max-w-sm bg-zinc-900 border border-zinc-800 rounded-2xl p-8 shadow-md text-center">
        
        {/* Logo */}
        <div className="mx-auto w-12 h-12 rounded-xl bg-zinc-100 flex items-center justify-center mb-6" aria-hidden="true">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2.5" stroke="currentColor" className="w-6 h-6 text-zinc-950">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 17.25v1.007a3 3 0 01-.879 2.122L7.5 21h9l-.621-.621A3 3 0 0115 18.257V17.25m6-12V15a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 15V5.25m18 0A2.25 2.25 0 0018.75 3H5.25A2.25 2.25 0 003 5.25m18 0V12a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 12V5.25" />
          </svg>
        </div>

        {/* Header content */}
        <h1 className="text-2xl font-bold tracking-tight text-zinc-100 mb-2">
          Agent Arena
        </h1>
        <p className="text-zinc-400 text-sm leading-relaxed mb-8">
          Compare responses from multiple AI agents in one place.
        </p>

        {/* Action Button */}
        <button
          onClick={onLoginClick}
          className="w-full py-2.5 px-4 bg-zinc-100 hover:bg-zinc-200 text-zinc-950 text-sm font-medium rounded-xl border border-transparent flex items-center justify-center gap-3 transition-colors interactive-transition cursor-pointer focus-visible:outline-2 focus-visible:outline-zinc-400"
          aria-label="Log in with Google"
        >
          <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24" aria-hidden="true">
            <path d="M12.24 10.285V13.4h6.887c-.275 1.565-1.88 4.604-6.887 4.604-4.33 0-7.866-3.577-7.866-8s3.536-8 7.866-8c2.46 0 4.105 1.025 5.047 1.926l2.427-2.334C17.955 2.192 15.34 1 12.24 1 6.033 1 1 6.033 1 12.24s5.033 11.24 11.24 11.24c6.478 0 10.793-4.537 10.793-10.986 0-.746-.08-1.32-.176-1.886H12.24z" />
          </svg>
          Continue with Google
        </button>

        <span className="block mt-6 text-xs text-zinc-500">
          By continuing you agree to Terms and Privacy.
        </span>

      </main>
    </div>
  );
}
