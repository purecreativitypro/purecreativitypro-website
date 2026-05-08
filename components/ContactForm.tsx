import React, { useState } from 'react';
import { Send, CheckCircle, AlertCircle, Loader2 } from 'lucide-react';
import { getFirestore, collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { app } from '../lib/firebase';
import { sendInquiry } from '../lib/webhookService';

const db = getFirestore(app);

interface FormData {
  name: string;
  email: string;
  service: string;
  message: string;
}

type FormStatus = 'idle' | 'submitting' | 'success' | 'error';

interface ContactFormProps {
  /** Pre-select a service for sub-pages */
  defaultService?: string;
  /** Accent color for submit button ('cyan' | 'fuchsia' | 'orange' | 'emerald' | 'amber') */
  accentColor?: string;
  /** Source tracking — which page submitted */
  source?: string;
}

const accentStyles: Record<string, string> = {
  cyan: 'bg-cyan-500 hover:bg-cyan-400 text-black',
  fuchsia: 'bg-fuchsia-500 hover:bg-fuchsia-400 text-black',
  orange: 'bg-orange-500 hover:bg-orange-400 text-black',
  emerald: 'bg-emerald-500 hover:bg-emerald-400 text-black',
  amber: 'bg-amber-500 hover:bg-amber-400 text-black',
};

const ContactForm: React.FC<ContactFormProps> = ({
  defaultService = '',
  accentColor,
  source = 'home',
}) => {
  const [form, setForm] = useState<FormData>({
    name: '',
    email: '',
    service: defaultService,
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
      // 1. Write to Firestore (source of truth)
      await addDoc(collection(db, 'inquiries'), {
        ...form,
        createdAt: serverTimestamp(),
        source: `website-${source}`,
      });

      // 2. Fire webhook via Cloud Function proxy (non-blocking)
      sendInquiry(
        { name: form.name, email: form.email, service: form.service, message: form.message },
        source,
      );

      setStatus('success');
      setForm({ name: '', email: '', service: defaultService, message: '' });
    } catch (err) {
      console.error('Form submission error:', err);
      setStatus('error');
    }
  };

  // Button styling
  const buttonClass = accentColor && accentStyles[accentColor]
    ? `w-full ${accentStyles[accentColor]} font-bold text-sm tracking-[0.15em] py-3.5 rounded-full transition-all hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2`
    : 'w-full bg-white text-black font-bold text-sm tracking-[0.15em] py-3.5 rounded-full hover:bg-zinc-200 transition-all hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2';

  if (status === 'success') {
    return (
      <div className="max-w-xl mx-auto text-center py-12">
        <CheckCircle className="w-16 h-16 text-emerald-400 mx-auto mb-4" />
        <h3 className="text-xl font-bold text-white mb-2">Message Sent!</h3>
        <p className="text-zinc-400 text-sm mb-6">We'll get back to you within 24 hours.</p>
        <button
          onClick={() => setStatus('idle')}
          className="text-xs font-bold tracking-widest uppercase text-zinc-400 hover:text-white transition-colors py-3"
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
        <label htmlFor={`contact-name-${source}`} className="block text-[11px] font-bold tracking-[0.15em] uppercase text-zinc-400 mb-2">
          Name *
        </label>
        <input
          id={`contact-name-${source}`}
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
        <label htmlFor={`contact-email-${source}`} className="block text-[11px] font-bold tracking-[0.15em] uppercase text-zinc-400 mb-2">
          Email *
        </label>
        <input
          id={`contact-email-${source}`}
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
        <label htmlFor={`contact-service-${source}`} className="block text-[11px] font-bold tracking-[0.15em] uppercase text-zinc-400 mb-2">
          Service Interest
        </label>
        <select
          id={`contact-service-${source}`}
          name="service"
          value={form.service}
          onChange={handleChange}
          className="w-full bg-white/[0.03] border border-white/10 rounded-lg px-4 py-3 text-sm text-white focus:outline-none focus:border-white/30 focus:bg-white/[0.05] transition-all appearance-none"
        >
          <option value="" className="bg-zinc-900">Select a service...</option>
          <option value="tech" className="bg-zinc-900">Tech — Systems &amp; Automation</option>
          <option value="music" className="bg-zinc-900">Music — Production &amp; Sonic Branding</option>
          <option value="media" className="bg-zinc-900">Media — Content &amp; Visual Strategy</option>
          <option value="business" className="bg-zinc-900">Business — Clarity &amp; Growth</option>
          <option value="not-sure" className="bg-zinc-900">Not Sure — Help Me Decide</option>
        </select>
      </div>

      {/* Message */}
      <div>
        <label htmlFor={`contact-message-${source}`} className="block text-[11px] font-bold tracking-[0.15em] uppercase text-zinc-400 mb-2">
          Message *
        </label>
        <textarea
          id={`contact-message-${source}`}
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
        className={buttonClass}
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
