import React from 'react';

export default function LoadingSkeleton() {
  return (
    <div className="space-y-4 w-full animate-pulse font-sans" aria-label="Loading response content" aria-live="polite">
      {/* Header skeleton */}
      <div className="h-4 bg-zinc-800 rounded w-1/4 mb-6"></div>
      
      {/* Body lines */}
      <div className="space-y-3">
        <div className="h-3.5 bg-zinc-850 rounded w-full"></div>
        <div className="h-3.5 bg-zinc-850 rounded w-11/12"></div>
        <div className="h-3.5 bg-zinc-850 rounded w-10/12"></div>
      </div>
      
      {/* Code block skeleton */}
      <div className="my-6 p-4 border border-zinc-800 bg-zinc-900/40 rounded-xl space-y-2">
        <div className="h-3 bg-zinc-800 rounded w-1/3"></div>
        <div className="h-3 bg-zinc-800 rounded w-2/3"></div>
        <div className="h-3 bg-zinc-800 rounded w-1/2"></div>
      </div>

      {/* Footer body lines */}
      <div className="space-y-3">
        <div className="h-3.5 bg-zinc-850 rounded w-full"></div>
        <div className="h-3.5 bg-zinc-850 rounded w-4/5"></div>
      </div>
    </div>
  );
}
