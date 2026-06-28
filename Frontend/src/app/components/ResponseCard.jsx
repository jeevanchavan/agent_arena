import React, { useState, memo } from 'react';
import MarkdownRenderer from './MarkdownRenderer';
import LoadingSkeleton from './LoadingSkeleton';

const ResponseCard = memo(function ResponseCard({ agentName, statusColor = 'bg-zinc-600', content, generationTime, isLoading }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    if (!content) return;
    try {
      await navigator.clipboard.writeText(content);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy response:', err);
    }
  };

  const formattedTime = generationTime !== undefined && generationTime !== null
    ? `${(generationTime / 1000).toFixed(2)}s`
    : null;

  return (
    <div 
      className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 md:p-8 flex flex-col min-w-0 transition-all hover:border-zinc-700 shadow-md h-full"
      role="region"
      aria-label={`${agentName} response`}
    >
      {/* Top Card Header */}
      <div className="flex items-center justify-between border-b border-zinc-850 pb-4 mb-6 select-none shrink-0">
        <div className="flex items-center gap-2">
          <span className={`w-2.5 h-2.5 rounded-full ${statusColor}`} aria-hidden="true" />
          <h3 className="text-xs font-bold tracking-wider text-zinc-300 uppercase">
            {agentName}
          </h3>
        </div>

        {/* Header Actions */}
        <div className="flex items-center gap-3">
          {formattedTime && (
            <span className="text-xs font-mono text-zinc-500" title="Response Generation Time">
              {formattedTime}
            </span>
          )}

          {!isLoading && content && (
            <button
              onClick={handleCopy}
              className="p-1.5 text-zinc-500 hover:text-zinc-200 hover:bg-zinc-850 rounded-lg transition-colors interactive-transition cursor-pointer focus-visible:outline-2 focus-visible:outline-zinc-400"
              title="Copy Response"
              aria-label={`Copy complete response from ${agentName}`}
            >
              {copied ? (
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4 text-emerald-500">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 7.5V6.108c0-1.135.845-2.098 1.976-2.192.373-.03.748-.057 1.123-.08M15.75 18H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08M15.75 18.75v-1.875a3.375 3.375 0 00-3.375-3.375h-1.5a1.125 1.125 0 01-1.125-1.125v-1.5A3.375 3.375 0 006.375 7.5H5.25m11.9-3.664A2.251 2.251 0 0015 2.25h-1.5a2.25 2.25 0 00-2.25 2.25h-.843c-.47 0-.897.265-1.115.685L5.25 10.5" />
                </svg>
              )}
            </button>
          )}
        </div>
      </div>

      {/* Card Response Area */}
      <div 
        className="flex-1 overflow-y-auto min-w-0 pr-1 text-zinc-300" 
        style={{ maxHeight: '550px' }}
        tabIndex="0"
        aria-label={`${agentName} response text body`}
      >
        {isLoading ? (
          <LoadingSkeleton />
        ) : content ? (
          <MarkdownRenderer content={content} />
        ) : (
          <div className="text-zinc-600 text-sm italic select-none">No response generated.</div>
        )}
      </div>
    </div>
  );
});

export default ResponseCard;
