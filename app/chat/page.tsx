'use client';

import { useState, useRef, useEffect } from 'react';
import { apiClient } from '@/lib/api';
import { Send, Bot, User, Sparkles } from 'lucide-react';
import ReactMarkdown from 'react-markdown';

export default function Chat() {
  const [messages, setMessages] = useState([
    { role: 'model', text: 'Hi! I am your AI Mentor. How can I help you accelerate your learning today? Ask me to explain a concept or recommend a project!' }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, loading]);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || loading) return;
    
    const userMessage = input.trim();
    setInput('');
    
    const newMessages = [...messages, { role: 'user', text: userMessage }];
    setMessages(newMessages);
    setLoading(true);
    
    try {
      // Format history for Gemini API. We map 'model' to 'model' and 'user' to 'user'
      // Parts must contain an object { text: string }
      const historyPayload = messages.map(msg => ({
        role: msg.role === 'model' ? 'model' : 'user',
        parts: [{ text: msg.text }]
      }));

      const data = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          history: historyPayload,
          message: userMessage
        })
      }).then(res => res.json());
      
      if (data.error) {
        setMessages(prev => [...prev, { role: 'model', text: "I encountered an error trying to process that. Please try again!" }]);
      } else {
        setMessages(prev => [...prev, { role: 'model', text: data.text }]);
      }
    } catch (err) {
      console.error(err);
      setMessages(prev => [...prev, { role: 'model', text: "Connection failed. Please check your network." }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-[calc(100vh-4rem)] md:h-[calc(100vh-4rem)] max-w-4xl mx-auto w-full pt-4">
      <header className="mb-6 flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">AI Mentor Chat</h1>
          <p className="text-slate-400">Ask doubts, request resources, or get motivated.</p>
        </div>
        <div className="flex items-center gap-2 px-3 py-1 bg-blue-500/10 text-blue-400 border border-blue-500/20 rounded-full text-xs font-bold uppercase tracking-widest">
          <Sparkles size={14} /> Context Aware
        </div>
      </header>
      
      <div className="flex-1 overflow-y-auto card p-4 sm:p-6 mb-4 flex flex-col gap-6">
        {messages.map((msg, i) => (
          <div key={i} className={`flex gap-4 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}>
            
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${msg.role === 'user' ? 'bg-blue-600 text-white' : 'bg-gradient-to-br from-purple-500 to-blue-500 text-white shadow-lg'}`}>
              {msg.role === 'user' ? <User size={20} /> : <Bot size={20} />}
            </div>
            
            <div className={`px-5 py-4 rounded-2xl max-w-[85%] text-[15px] leading-relaxed ${
              msg.role === 'user' 
                ? 'bg-blue-600 text-white rounded-tr-none' 
                : 'bg-white/5 text-slate-200 rounded-tl-none border border-white/10 prose prose-invert prose-p:leading-relaxed prose-pre:bg-black/50 prose-pre:border prose-pre:border-white/10 prose-a:text-blue-400 max-w-none'
            }`}>
              {msg.role === 'user' ? (
                msg.text
              ) : (
                <ReactMarkdown>{msg.text}</ReactMarkdown>
              )}
            </div>
          </div>
        ))}

        {loading && (
          <div className="flex gap-4">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500 to-blue-500 text-white shadow-lg flex items-center justify-center shrink-0">
              <Bot size={20} />
            </div>
            <div className="px-5 py-4 rounded-2xl bg-white/5 text-slate-200 rounded-tl-none border border-white/10 flex items-center gap-2">
              <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
              <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
              <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
            </div>
          </div>
        )}
        
        <div ref={messagesEndRef} />
      </div>
      
      <form onSubmit={handleSend} className="relative mb-4">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask a question or request a project idea..."
          className="w-full px-6 py-4 bg-black/40 border border-white/10 rounded-full text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 pr-16"
          disabled={loading}
        />
        <button 
          type="submit" 
          disabled={!input.trim() || loading} 
          className="absolute right-2 top-2 bottom-2 aspect-square bg-blue-600 hover:bg-blue-700 disabled:bg-blue-600/50 text-white rounded-full flex items-center justify-center transition-colors"
        >
          <Send size={18} className="ml-1" />
        </button>
      </form>
    </div>
  );
}
