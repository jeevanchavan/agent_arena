import React from 'react';

export default function UserMessage({ message }) {
  return (
    <div className="flex justify-end my-6 select-text font-sans">
      <div className="bg-zinc-900 text-zinc-200 border border-zinc-800 px-5 py-3.5 rounded-2xl max-w-[80%] shadow-md text-sm font-medium leading-relaxed">
        {message}
      </div>
    </div>
  );
}
