import React, { useState, memo } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeHighlight from 'rehype-highlight';
import 'highlight.js/styles/github-dark.css'; // Standard dark code highlighting

// Internal CodeBlock sub-component with copy button and dark styling
function CodeBlock({ language, code }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy code:', err);
    }
  };

  return (
    <div className="rounded-xl overflow-hidden my-5 border border-zinc-800 bg-zinc-950 text-zinc-100 flex flex-col font-mono text-sm shadow-sm select-text">
      {/* Code Block Header */}
      <div className="flex justify-between items-center px-4 py-2 border-b border-zinc-850 bg-zinc-900/60 select-none">
        <span className="text-xs font-semibold uppercase tracking-wider text-zinc-400">
          {language || 'code'}
        </span>
        <button
          onClick={handleCopy}
          className="flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800 rounded-md transition-colors interactive-transition cursor-pointer focus-visible:outline-2 focus-visible:outline-zinc-400"
          title="Copy Code"
          aria-label="Copy code block contents"
        >
          {copied ? (
            <>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-3.5 h-3.5 text-emerald-400">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
              </svg>
              <span className="text-emerald-400 font-semibold">Copied</span>
            </>
          ) : (
            <>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-3.5 h-3.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 17.25v3.375c0 .621-.504 1.125-1.125 1.125h-9.75a1.125 1.125 0 01-1.125-1.125V7.875c0-.621.504-1.125 1.125-1.125H5.25m11.9-3.664A2.251 2.251 0 0015 2.25h-1.5a2.25 2.25 0 00-2.25 2.25h-.843c-.47 0-.897.265-1.115.685L5.25 10.5m14.25-1.5v6.75A2.25 2.25 0 0117.25 18h-9.75A2.25 2.25 0 015.25 15.75V9m14.25 0a2.25 2.25 0 00-2.25-2.25h-1.5a2.25 2.25 0 00-2.25 2.25s-.217 0-.309.004M15 2.25a.75.75 0 00-.75-.75h-1.5a.75.75 0 00-.75.75M9 3.75h.008v.008H9V3.75z" />
              </svg>
              <span>Copy</span>
            </>
          )}
        </button>
      </div>

      {/* Pre-format code body */}
      <pre className="p-4 overflow-x-auto bg-zinc-950/80 leading-relaxed">
        <code className={`hljs language-${language || ''}`}>
          {code}
        </code>
      </pre>
    </div>
  );
}

const MarkdownRenderer = memo(function MarkdownRenderer({ content }) {
  return (
    <div className="text-zinc-300 leading-relaxed font-sans text-[15px] space-y-4 select-text">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeHighlight]}
        components={{
          h1: ({ node, ...props }) => (
            <h1 className="text-2xl font-bold mt-7 mb-4 text-zinc-100 border-b border-zinc-800 pb-2" {...props} />
          ),
          h2: ({ node, ...props }) => (
            <h2 className="text-xl font-bold mt-6 mb-3 text-zinc-100" {...props} />
          ),
          h3: ({ node, ...props }) => (
            <h3 className="text-lg font-semibold mt-5 mb-2 text-zinc-100" {...props} />
          ),
          p: ({ node, ...props }) => (
            <p className="mb-4 text-zinc-300 leading-relaxed text-[15px]" {...props} />
          ),
          ul: ({ node, ...props }) => (
            <ul className="list-disc pl-6 mb-4 text-zinc-300 space-y-1.5" {...props} />
          ),
          ol: ({ node, ...props }) => (
            <ol className="list-decimal pl-6 mb-4 text-zinc-300 space-y-1.5" {...props} />
          ),
          li: ({ node, ...props }) => (
            <li className="text-zinc-300 leading-relaxed" {...props} />
          ),
          blockquote: ({ node, ...props }) => (
            <blockquote className="border-l-4 border-zinc-800 pl-4 py-1 my-4 italic text-zinc-400 bg-zinc-900/30 rounded-r-md" {...props} />
          ),
          a: ({ node, ...props }) => (
            <a className="text-zinc-100 font-semibold underline underline-offset-4 decoration-zinc-700 hover:decoration-zinc-100 transition-colors" target="_blank" rel="noopener noreferrer" {...props} />
          ),
          hr: ({ node, ...props }) => (
            <hr className="my-6 border-zinc-850" {...props} />
          ),
          // Tables
          table: ({ node, ...props }) => (
            <div className="overflow-x-auto my-6 border border-zinc-800 rounded-xl shadow-md bg-zinc-900/30">
              <table className="min-w-full divide-y divide-zinc-800 text-sm" {...props} />
            </div>
          ),
          thead: ({ node, ...props }) => <thead className="bg-zinc-950/40 select-none" {...props} />,
          tbody: ({ node, ...props }) => <tbody className="divide-y divide-zinc-850" {...props} />,
          tr: ({ node, ...props }) => <tr {...props} />,
          th: ({ node, ...props }) => (
            <th className="px-4 py-3 text-left font-semibold text-zinc-300 select-none" {...props} />
          ),
          td: ({ node, ...props }) => (
            <td className="px-4 py-3 text-zinc-400 font-normal leading-normal" {...props} />
          ),
          // Inline and block code
          code: ({ node, className, children, ...props }) => {
            const match = /language-(\w+)/.exec(className || '');
            const isBlock = !!match || (node && node.tagName === 'code' && className);
            
            if (isBlock) {
              return (
                <CodeBlock
                  language={match ? match[1] : ''}
                  code={String(children).replace(/\n$/, '')}
                />
              );
            }
            
            return (
              <code className="bg-zinc-950 text-zinc-200 font-mono text-[13.5px] px-1.5 py-0.5 rounded-md border border-zinc-800" {...props}>
                {children}
              </code>
            );
          }
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
});

export default MarkdownRenderer;
