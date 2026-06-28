import React from 'react';

export default function ErrorMessage({ title = 'Something Went Wrong', message, onRetry }) {
  return (
    <div 
      className="w-full max-w-2xl mx-auto my-6 p-5 bg-red-950/20 border border-red-900/50 rounded-xl flex items-start gap-4 shadow-md animate-in fade-in slide-in-from-top-2 duration-200 font-sans"
      role="alert"
      aria-live="assertive"
    >
      {/* Warning Icon SVG */}
      <div className="shrink-0 w-10 h-10 rounded-lg bg-red-900/20 flex items-center justify-center text-red-400" aria-hidden="true">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
        </svg>
      </div>

      {/* Info & Actions */}
      <div className="flex-1 space-y-1">
        <h4 className="text-sm font-semibold text-red-300">{title}</h4>
        {message && <p className="text-sm text-red-400/90 leading-relaxed">{message}</p>}
        
        {onRetry && (
          <div className="pt-2">
            <button
              onClick={onRetry}
              className="px-3.5 py-1.5 bg-red-900/30 hover:bg-red-900/50 text-red-200 text-xs font-semibold rounded-lg transition-colors interactive-transition flex items-center gap-1.5 cursor-pointer focus-visible:outline-2 focus-visible:outline-red-400"
              aria-label="Retry the failed request"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-3.5 h-3.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99" />
              </svg>
              Retry Request
            </button>
          </div>
        )}
      </div>

    </div>
  );
}
