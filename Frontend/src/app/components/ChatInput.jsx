import React, { useRef, useEffect } from 'react';

export default function ChatInput({ value, onChange, onSend, isLoading }) {
  const textareaRef = useRef(null);

  useEffect(() => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = 'auto';
      textarea.style.height = `${Math.min(textarea.scrollHeight, 200)}px`;
    }
  }, [value]);

  const handleSubmit = (e) => {
    if (e) e.preventDefault();
    if (!value.trim() || isLoading) return;
    onSend();
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  return (
    <div className="sticky bottom-0 bg-zinc-950/80 backdrop-blur-md pt-4 pb-6 px-4 md:px-8 border-t border-zinc-900 font-sans">
      <div className="max-w-4xl mx-auto">
        <form 
          onSubmit={handleSubmit} 
          className="relative flex items-end bg-zinc-900 border border-zinc-800 rounded-2xl p-1.5 shadow-sm focus-within:border-zinc-700 focus-within:shadow-md transition-all"
        >
          <label htmlFor="prompt-input" className="sr-only">Ask a programming or AI question</label>
          <textarea
            id="prompt-input"
            ref={textareaRef}
            rows={1}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Ask anything..."
            disabled={isLoading}
            className="flex-1 max-h-[200px] min-h-[44px] resize-none overflow-y-auto bg-transparent border-0 pl-4 pr-16 py-3 text-zinc-100 placeholder-zinc-500 focus:outline-none focus:ring-0 text-sm leading-relaxed align-bottom"
            style={{ scrollbarWidth: 'thin' }}
          />

          <div className="absolute right-3 bottom-3 flex items-center gap-2">
            {/* Attachment placeholder button */}
            <button
              type="button"
              disabled={true}
              className="p-2 rounded-lg text-zinc-600 cursor-not-allowed"
              title="Attach (future feature)"
              aria-label="Add attachment"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M18.375 12.739l-7.693 7.693a4.5 4.5 0 01-6.364-6.364l10.94-10.94A3 3 0 1119.5 7.372L8.552 18.32m.009-.01l-.01.01m5.625-13.68l.008-.009a3.5 3.5 0 114.95 4.95l-1.25 1.25" />
              </svg>
            </button>

            {/* Send Button */}
            <button
              type="submit"
              disabled={!value.trim() || isLoading}
              className="bg-zinc-100 text-zinc-950 hover:bg-zinc-200 disabled:bg-zinc-800 disabled:text-zinc-600 p-2.5 rounded-xl transition-all interactive-transition flex items-center justify-center cursor-pointer disabled:cursor-not-allowed focus-visible:outline-2 focus-visible:outline-zinc-400"
              aria-label="Send message"
            >
              {isLoading ? (
                <svg className="animate-spin h-5 w-5 text-zinc-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                  <path d="M3.478 2.404a.75.75 0 00-.926.941l2.432 7.905H13.5a.75.75 0 010 1.5H4.984l-2.432 7.905a.75.75 0 00.926.94 60.519 60.519 0 0018.445-8.986.75.75 0 000-1.218A60.517 60.517 0 003.478 2.404z" />
                </svg>
              )}
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}
