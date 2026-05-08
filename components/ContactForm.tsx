import React, { useState } from 'react';
import { Send, CheckCircle, AlertCircle, Loader2 } from 'lucide-react';
import { getFirestore, collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { app } from '../lib/firebase';

const db = getFirestore(app);

// Configurable n8n webhook URL — replace with your actual webhook
const WEBHOOK_URL = '';

interface FormData {
  name: string;
  email: string;
  service: string;
  message: string;
}

type FormStatus = 'idle' | 'submitting' | 'success' | 'error';

const ContactForm: React.FC = () => {
  const [form, setForm] = useState<FormData>({
    name: '',
    email: '',
    service: '',
    message: '',
  });
  const [status, setStatus] = useState<FormStatus>('idle');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const isValidEmail = (email: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) return;
    if (!isValidEmail(form.email)) return;

    setStatus('submitting');

    try {
      // 1. Write to Firestore
      await addDoc(collection(db, 'inquiries'), {
        ...form,
        createdAt: serverTimestamp(),
        source: 'website-contact-form',
      });

      // 2. Fire n8n webhook (if configured)
      if (WEBHOOK_URL) {
        fetch(WEBHOOK_URL, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            ...form,
            timestamp: new Date().toISOString(),
            source: 'website-contact-form',
          }),
        }).catch(() => {
          // Webhook failure is non-blocking — Firestore is the source of truth
        });
      }

      setStatus('success');
      setForm({ name: '', email: '', service: '', message: '' });
    } catch (err) {
      console.error('Form submission error:', err);
      setStatus('error');
    }
  };

  if (status === 'success') {
    return (
      <div className="max-w-xl mx-auto text-center py-12">
        <CheckCircle className="w-16 h-16 text-emerald-400 mx-auto mb-4" />
        <h3 className="text-xl font-bold text-white mb-2">Message Sent!</h3>
        <p className="text-zinc-400 text-sm mb-6">We'll get back to you within 24 hours.</p>
        <button
          onClick={() => setStatus('idle')}
          className="text-xs font-bold tracking-widest uppercase text-zinc-400 hover:text-white transition-colors"
        >
          Send Another Message
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-xl mx-auto space-y-5">
      {/* Name */}
      <div>
        <label htmlFor="contact-name" className="block text-[11px] font-bold tracking-[0.15em] uppercase text-zinc-400 mb-2">
          Name *
        </label>
        <input
          id="contact-name"
          name="name"
          type="text"
          required
          value={form.name}
          onChange={handleChange}
          className="w-full bg-white/[0.03] border border-white/10 rounded-lg px-4 py-3 text-sm text-white placeholder-zinc-600 focus:outline-none focus:border-white/30 focus:bg-white/[0.05] transition-all"
          placeholder="Your name"
        />
      </div>

      {/* Email */}
      <div>
        <label htmlFor="contact-email" className="block text-[11px] font-bold tracking-[0.15em] uppercase text-zinc-400 mb-2">
          Email *
        </label>
        <input
          id="contact-email"
          name="email"
          type="email"
          required
          value={form.email}
          onChange={handleChange}
          className="w-full bg-white/[0.03] border border-white/10 rounded-lg px-4 py-3 text-sm text-white placeholder-zinc-600 focus:outline-none focus:border-white/30 focus:bg-white/[0.05] transition-all"
          placeholder="you@example.com"
        />
      </div>

      {/* Service Interest */}
      <div>
        <label htmlFor="contact-service" className="block text-[11px] font-bold tracking-[0.15em] uppercase text-zinc-400 mb-2">
          Service Interest
        </label>
        <select
          id="contact-service"
          name="service"
          value={form.service}
          onChange={handleChange}
          className="w-full bg-white/[0.03] border border-white/10 rounded-lg px-4 py-3 text-sm text-white focus:outline-none focus:border-white/30 focus:bg-white/[0.05] transition-all appearance-none"
        >
          <option value="" className="bg-zinc-900">Select a service...</option>
          <option value="tech" className="bg-zinc-900">Tech — Systems & Automation</option>
          <option value="music" className="bg-zinc-900">Music — Production & Sonic Branding</option>
          <option value="media" className="bg-zinc-900">Media — Content & Visual Strategy</option>
          <option value="business" className="bg-zinc-900">Business — Clarity & Growth</option>
          <option value="not-sure" className="bg-zinc-900">Not Sure — Help Me Decide</option>
        </select>
      </div>

      {/* Message */}
      <div>
        <label htmlFor="contact-message" className="block text-[11px] font-bold tracking-[0.15em] uppercase text-zinc-400 mb-2">
          Message *
        </label>
        <textarea
          id="contact-message"
          name="message"
          required
          rows={4}
          value={form.message}
          onChange={handleChange}
          className="w-full bg-white/[0.03] border border-white/10 rounded-lg px-4 py-3 text-sm text-white placeholder-zinc-600 focus:outline-none focus:border-white/30 focus:bg-white/[0.05] transition-all resize-none"
          placeholder="Tell us about your project or question..."
        />
      </div>

      {/* Error state */}
      {status === 'error' && (
        <div className="flex items-center gap-2 text-red-400 text-sm">
          <AlertCircle size={16} />
          Something went wrong. Please try again.
        </div>
      )}

      {/* Submit */}
      <button
        type="submit"
        disabled={status === 'submitting'}
        className="w-full bg-white text-black font-bold text-sm tracking-[0.15em] py-3.5 rounded-full hover:bg-zinc-200 transition-all hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
      >
        {status === 'submitting' ? (
          <>
            <Loader2 size={16} className="animate-spin" />
            Sending...
          </>
        ) : (
          <>
            <Send size={14} />
            SEND MESSAGE
          </>
        )}
      </button>
    </form>
  );
};

export default ContactForm;
