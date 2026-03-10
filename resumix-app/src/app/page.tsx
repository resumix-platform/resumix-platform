'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Bot, Zap, FileText } from 'lucide-react';

export default function Home() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [msg, setMsg] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setStatus('loading');
    try {
      const res = await fetch('/api/waitlist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();

      if (res.ok) {
        setStatus('success');
        setMsg(data.message);
        setEmail('');
      } else {
        setStatus('error');
        setMsg(data.error);
      }
    } catch {
      setStatus('error');
      setMsg('Something went wrong. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-[#050505] text-white flex flex-col relative overflow-hidden">
      {/* Dynamic Background Glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-gradient-to-r from-blue-600/20 to-purple-600/30 blur-[120px] -z-10 rounded-full select-none pointer-events-none" />

      {/* Navigation */}
      <nav className="w-full max-w-7xl mx-auto px-6 py-8 flex justify-between items-center z-10">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
            <span className="font-bold text-lg">R</span>
          </div>
          <span className="font-bold text-xl tracking-tight">resumix.in</span>
        </div>
        <a href="#waitlist" className="text-sm font-medium hover:text-indigo-400 transition-colors">
          Join Early Access
        </a>
      </nav>

      {/* Hero Section */}
      <main className="flex-1 flex flex-col items-center justify-center px-4 z-10 mt-12 mb-24">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-4xl mx-auto"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-8 backdrop-blur-sm">
            <Sparkles className="w-4 h-4 text-yellow-400" />
            <span className="text-sm font-medium text-gray-300">India's First AGI-Powered Career OS</span>
          </div>

          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-8 leading-tight">
            12 AI Agents Fighting For <br className="hidden md:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400">
              Your Dream Career
            </span>
          </h1>

          <p className="text-xl text-gray-400 mb-12 max-w-2xl mx-auto leading-relaxed">
            Upload your details once. Our intelligent AI workforce builds your ATS-perfect resume in 60 seconds, auto-applies to matching jobs, and helps you negotiate your salary.
          </p>

          <form id="waitlist" onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto w-full group relative">
            <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-xl blur opacity-20 group-hover:opacity-40 transition duration-1000 group-hover:duration-200"></div>
            <div className="relative flex flex-col sm:flex-row gap-2 w-full">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email address"
                disabled={status === 'loading' || status === 'success'}
                className="flex-1 px-6 py-4 rounded-lg bg-black/60 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent backdrop-blur-xl"
              />
              <button
                type="submit"
                disabled={status === 'loading' || status === 'success'}
                className="px-8 py-4 rounded-lg bg-white text-black font-semibold hover:bg-gray-100 transition-colors disabled:opacity-70 disabled:cursor-not-allowed whitespace-nowrap shadow-[0_0_20px_rgba(255,255,255,0.3)]"
              >
                {status === 'loading' ? 'Joining...' : status === 'success' ? 'Added!' : 'Notify Me'}
              </button>
            </div>
          </form>

          {/* Status Message */}
          <div className="h-6 mt-4">
            {msg && (
              <motion.p 
                initial={{ opacity: 0 }} 
                animate={{ opacity: 1 }} 
                className={`text-sm font-medium ${status === 'error' ? 'text-red-400' : 'text-green-400'}`}
              >
                {status === 'success' ? '🎉 ' : '⚠️ '}{msg}
              </motion.p>
            )}
          </div>
        </motion.div>

        {/* Feature Grid */}
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-24 max-w-5xl mx-auto px-4"
        >
          <div className="p-8 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm hover:bg-white/10 transition-colors">
            <FileText className="w-10 h-10 text-indigo-400 mb-6" />
            <h3 className="text-xl font-bold mb-3">Instant Resume Builder</h3>
            <p className="text-gray-400 leading-relaxed">Gemini 2.0 AI analyzes your profile and generates a stunning, ATS-optimized PDF in under 60 seconds.</p>
          </div>
          <div className="p-8 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm hover:bg-white/10 transition-colors">
            <Zap className="w-10 h-10 text-yellow-400 mb-6" />
            <h3 className="text-xl font-bold mb-3">Auto-Apply Engine</h3>
            <p className="text-gray-400 leading-relaxed">Karthi, our matching agent, finds the best jobs on Naukri and LinkedIn and automatically submits your application.</p>
          </div>
          <div className="p-8 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm hover:bg-white/10 transition-colors">
            <Bot className="w-10 h-10 text-purple-400 mb-6" />
            <h3 className="text-xl font-bold mb-3">24/7 Career Assistance</h3>
            <p className="text-gray-400 leading-relaxed">Chat with Princy anytime. Get interview preparation, mock scripts, and salary negotiation strategies instantly.</p>
          </div>
        </motion.div>
      </main>

      <footer className="w-full text-center py-8 text-gray-500 text-sm border-t border-white/5 z-10">
        © {new Date().getFullYear()} Resumix.in. All rights reserved. Launching soon for India.
      </footer>
    </div>
  );
}
