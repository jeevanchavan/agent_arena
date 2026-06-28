import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import Navbar from './Navbar';
import UserMessage from './UserMessage';
import ResponseCard from './ResponseCard';
import ChatInput from './ChatInput';
import EmptyState from './EmptyState';
import ErrorMessage from './ErrorMessage';

const API_BASE_URL = 'http://localhost:3000';

export default function ChatInterface({ user, onLogout, onAuthExpired }) {
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [pendingPrompt, setPendingPrompt] = useState('');
  const [error, setError] = useState(null);
  const endOfMessagesRef = useRef(null);

  const scrollToBottom = () => {
    endOfMessagesRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, pendingPrompt, error]);

  const handleSend = async (customPrompt) => {
    const promptToSend = customPrompt || inputValue;
    if (!promptToSend.trim() || isLoading) return;

    setError(null);
    setPendingPrompt(promptToSend);
    setInputValue('');
    setIsLoading(true);

    try {
      const response = await axios.post(
        `${API_BASE_URL}/invoke`,
        { input: promptToSend },
        { withCredentials: true }
      );

      const data = response.data;

      if (data.success) {
        const newMessage = {
          id: Date.now(),
          problem: promptToSend,
          solution_1: data.result.solution_1,
          solution_2: data.result.solution_2,
          judge: data.result.judge,
          duration: data.duration // In milliseconds
        };
        setMessages((prev) => [...prev, newMessage]);
      } else {
        throw new Error(data.message || 'Failed to generate solutions');
      }
    } catch (err) {
      console.error('Execution error:', err);
      
      if (err.response?.status === 401) {
        if (onAuthExpired) {
          onAuthExpired();
        } else {
          onLogout();
        }
        return;
      }

      const statusText = err.response?.data?.error || 'Something Went Wrong';
      const msgText = err.response?.data?.message || err.message || 'An unexpected network error occurred.';
      
      setError({
        title: statusText,
        message: msgText,
        retryPrompt: promptToSend
      });
    } finally {
      setPendingPrompt('');
      setIsLoading(false);
    }
  };

  const handleRetry = () => {
    if (!error) return;
    const promptToRetry = error.retryPrompt;
    setError(null);
    handleSend(promptToRetry);
  };

  const handleSelectPrompt = (promptText) => {
    handleSend(promptText);
  };

  return (
    <div className="flex flex-col min-h-screen bg-zinc-950 font-sans text-zinc-100">
      {/* Top Navbar */}
      <Navbar user={user} onLogout={onLogout} />

      {/* Main Container */}
      <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-col justify-between" role="main">
        
        {/* Chat History / Cards Area */}
        <div className="flex-1 flex flex-col">
          {messages.length === 0 && !pendingPrompt ? (
            <EmptyState onSelectPrompt={handleSelectPrompt} />
          ) : (
            <div className="flex-1 space-y-10 mb-8" aria-live="polite" aria-relevant="additions text">
              
              {/* Render Completed Messages */}
              {messages.map((msg) => (
                <section key={msg.id} className="space-y-6" aria-label="Arena Interaction">
                  {/* User Question */}
                  <UserMessage message={msg.problem} />

                  {/* Side-by-side Response Cards */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch">
                    <ResponseCard
                      agentName="Mistral Medium"
                      statusColor="bg-emerald-500"
                      content={msg.solution_1}
                      generationTime={msg.duration}
                      isLoading={false}
                    />
                    <ResponseCard
                      agentName="Cohere Command"
                      statusColor="bg-purple-500"
                      content={msg.solution_2}
                      generationTime={msg.duration}
                      isLoading={false}
                    />
                  </div>

                  {/* Judge recommendations */}
                  {msg.judge && (
                    <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 md:p-8 shadow-md">
                      <h4 className="text-sm font-bold text-zinc-100 tracking-tight flex items-center gap-2 mb-6">
                        ⚖️ Judge Recommendations
                      </h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {/* Solution 1 Score & Reason */}
                        <div className="space-y-3">
                          <div className="flex justify-between items-center bg-emerald-950/20 px-4 py-2.5 rounded-xl border border-emerald-900/30">
                            <span className="text-xs font-semibold text-zinc-400">Mistral Medium Score</span>
                            <span className="text-lg font-bold text-emerald-400">{msg.judge.solution_1_score}/10</span>
                          </div>
                          <p className="text-zinc-400 text-sm leading-relaxed px-1">
                            {msg.judge.solution_1_reasoning}
                          </p>
                        </div>
                        {/* Solution 2 Score & Reason */}
                        <div className="space-y-3">
                          <div className="flex justify-between items-center bg-purple-950/20 px-4 py-2.5 rounded-xl border border-purple-900/30">
                            <span className="text-xs font-semibold text-zinc-600">Cohere Command Score</span>
                            <span className="text-lg font-bold text-purple-400">{msg.judge.solution_2_score}/10</span>
                          </div>
                          <p className="text-zinc-400 text-sm leading-relaxed px-1">
                            {msg.judge.solution_2_reasoning}
                          </p>
                        </div>
                      </div>
                    </div>
                  )}

                </section>
              ))}

              {/* Render Pending / Generating Message */}
              {pendingPrompt && (
                <div className="space-y-6">
                  <UserMessage message={pendingPrompt} />

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch">
                    <ResponseCard
                      agentName="Mistral Medium"
                      statusColor="bg-emerald-500"
                      isLoading={true}
                    />
                    <ResponseCard
                      agentName="Cohere Command"
                      statusColor="bg-purple-500"
                      isLoading={true}
                    />
                  </div>
                </div>
              )}

            </div>
          )}

          {/* Render Error Message if any */}
          {error && (
            <div className="mb-8">
              <ErrorMessage
                title={error.title}
                message={error.message}
                onRetry={handleRetry}
              />
            </div>
          )}

          <div ref={endOfMessagesRef} />
        </div>

      </main>

      {/* Sticky Bottom Chat Input */}
      <ChatInput
        value={inputValue}
        onChange={setInputValue}
        onSend={() => handleSend()}
        isLoading={isLoading}
      />
    </div>
  );
}
