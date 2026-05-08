import React, { useState } from 'react';
import { Mail, CheckCircle, Loader2 } from 'lucide-react';
import { getFirestore, collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { app } from '../lib/firebase';

const db = getFirestore(app);

const EmailCapture: React.FC = () => {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return;

    setStatus('submitting');
    try {
      await addDoc(collection(db, 'subscribers'), {
        email,
        createdAt: serverTimestamp(),
        source: 'website-email-capture',
      });
      setStatus('success');
      setEmail('');
    } catch {
      setStatus('error');
    }
  };

  if (status === 'success') {
    return (
      <div className="flex items-center justify-center gap-3 py-4">
        <CheckCircle className="w-5 h-5 text-emerald-400" />
        <span className="text-emerald-300 text-sm font-bold">You're in! Check your inbox soon.</span>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto text-center">
      <div className="inline-flex items-center gap-2 text-zinc-400 text-[11px] font-mono tracking-[0.2em] uppercase mb-3">
        <Mail size={14} />
        Free Resource
      </div>
      <h3 className="text-xl md:text-2xl font-display font-bold text-white mb-2">
        Get the Creator's Tech Stack Guide
      </h3>
      <p className="text-zinc-400 text-sm mb-6 max-w-md mx-auto">
        The exact tools and automations we use to run PureCreativity. Free, no fluff.
      </p>

      <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="your@email.com"
          required
          className="flex-1 bg-white/[0.03] border border-white/10 rounded-full px-5 py-3 text-sm text-white placeholder-zinc-600 focus:outline-none focus:border-white/30 transition-all"
        />
        <button
          type="submit"
          disabled={status === 'submitting'}
          className="bg-white text-black font-bold text-xs tracking-[0.15em] px-6 py-3 rounded-full hover:bg-zinc-200 transition-all hover:scale-105 active:scale-95 disabled:opacity-50 flex items-center justify-center gap-2 whitespace-nowrap"
        >
          {status === 'submitting' ? (
            <Loader2 size={14} className="animate-spin" />
          ) : (
            'GET THE GUIDE'
          )}
        </button>
      </form>
      {status === 'error' && (
        <p className="text-red-400 text-xs mt-3">Something went wrong. Try again.</p>
      )}
    </div>
  );
};

export default EmailCapture;
