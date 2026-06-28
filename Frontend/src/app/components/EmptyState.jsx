import React from 'react';

export default function EmptyState({ onSelectPrompt }) {
  const suggestions = [
    'Explain Docker',
    'Difference between SQL and MongoDB',
    'Build a React Login Page'
  ];

  return (
    <div className="flex-1 flex flex-col items-center justify-center py-12 px-4 select-none font-sans">
      <div className="max-w-md w-full text-center space-y-8">
        
        {/* App Logo Emblem */}
        <div className="mx-auto w-14 h-14 rounded-2xl bg-zinc-100 flex items-center justify-center shadow-md" aria-hidden="true">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2.5" stroke="currentColor" className="w-6 h-6 text-zinc-950">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 17.25v1.007a3 3 0 01-.879 2.122L7.5 21h9l-.621-.621A3 3 0 0115 18.257V17.25m6-12V15a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 15V5.25m18 0A2.25 2.25 0 0018.75 3H5.25A2.25 2.25 0 003 5.25m18 0V12a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 12V5.25" />
          </svg>
        </div>

        {/* Text */}
        <div className="space-y-2">
          <h2 className="text-xl font-bold text-zinc-100 tracking-tight">
            Welcome to Agent Arena
          </h2>
          <p className="text-zinc-400 text-sm">
            Compare responses from multiple AI models side by side.
          </p>
        </div>

        {/* Suggestions list */}
        <div className="space-y-3">
          <p className="text-xs font-semibold text-zinc-500 uppercase tracking-wider text-left pl-1">
            Suggested Prompts
          </p>
          <div className="grid grid-cols-1 gap-2.5" role="group" aria-label="Suggested prompt options">
            {suggestions.map((prompt) => (
              <button
                key={prompt}
                onClick={() => onSelectPrompt(prompt)}
                className="w-full text-left px-4 py-3 bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 hover:border-zinc-700 rounded-xl text-zinc-300 hover:text-zinc-100 text-sm font-medium transition-all interactive-transition flex items-center justify-between cursor-pointer focus-visible:outline-2 focus-visible:outline-zinc-400"
              >
                <span>{prompt}</span>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4 text-zinc-500">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                </svg>
              </button>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
