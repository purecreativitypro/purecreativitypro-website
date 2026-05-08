import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Navigation from '../components/Navigation';
import ScannerModal from '../components/ScannerModal';
import { Search, PenTool, Target, TrendingUp, Lightbulb, Layers, Users, HelpCircle, ArrowRight, Rocket, BarChart3 } from 'lucide-react';
import SEOHead, { createServiceSchema, createFAQSchema } from '../components/SEOHead';
import Footer from '../components/Footer';
import ScrollReveal from '../components/ScrollReveal';
import SocialProofBar from '../components/SocialProofBar';
import FAQAccordion from '../components/FAQAccordion';
import CrossStudioLinks from '../components/CrossStudioLinks';
import TestimonialQuote from '../components/TestimonialQuote';

const Business: React.FC = () => {
  const [isScannerOpen, setIsScannerOpen] = useState(false);

  const faqItems = [
    { q: "I have no idea what business to start.", a: "That's exactly why we start with the 'Discover' phase. We analyze your skills and market demand to find your best path." },
    { q: "Is this for beginners?", a: "Yes. Whether you're at zero or $5k/mo, the principles of offer, system, and traffic remain the same." },
    { q: "Do you build the tech for me?", a: "We have 'Done For You' tech options, or we can guide you through simple setups." },
    { q: "How quickly can I expect results?", a: "Most clients launch their offer within 30 days. Revenue timelines vary, but we focus on getting you to market fast." },
    { q: "What's the investment?", a: "Blueprint sessions start at $250. Full build-outs are scoped after discovery. No hidden fees." },
  ];

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-200 font-sans selection:bg-emerald-900 selection:text-emerald-200 relative overflow-x-hidden">
      <SEOHead
        title="Business — Launch, Scale & Monetize"
        description="Turn your skills into income. PureCreativity Business helps entrepreneurs go from idea to offer to revenue with clear structure and real execution."
        path="/business"
        jsonLd={[createServiceSchema('PureCreativity Business', 'Business strategy, offer design, funnel building, and audience growth for entrepreneurs.', '/business'), createFAQSchema(faqItems.map(f => ({ question: f.q, answer: f.a })))]}
      />
      <Navigation theme="business" />
      <ScannerModal isOpen={isScannerOpen} onClose={() => setIsScannerOpen(false)} theme="business" />

      {/* Subtle grid background */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage: 'linear-gradient(white 1px, transparent 1px), linear-gradient(90deg, white 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }}
      />

      {/* HERO — With stat cards instead of bar chart */}
      <div className="relative pt-32 pb-20 px-6">
        <div className="absolute top-0 left-1/2 w-[600px] h-[600px] bg-emerald-500/5 rounded-full blur-[120px] pointer-events-none -translate-x-1/2 -translate-y-1/2" />

        <div className="container mx-auto max-w-6xl relative z-10">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Left: Text */}
            <div>
              <h4 className="text-emerald-500 font-bold tracking-[0.2em] uppercase text-xs mb-6 inline-flex items-center gap-2 border border-emerald-500/20 px-3 py-1 rounded-full bg-emerald-950/20">
                <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" />
                PureCreativity Business
              </h4>
              <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold text-white mb-6 leading-[0.95] tracking-tight">
                Turn Your Skills<br />
                Into <span className="text-emerald-400">Income.</span>
              </h1>
              <p className="text-zinc-400 text-lg md:text-xl mb-10 leading-relaxed max-w-xl">
                You don't need a million tools — you need a clear path from idea to offer to revenue. We help you simplify decisions, make progress fast, and build something real.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 items-start">
                <a
                  href="https://tidycal.com/purecreativitypro/purecreativity-blueprint-session"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-emerald-500 text-black px-8 py-4 rounded-full font-bold tracking-wide hover:bg-emerald-400 transition-all flex items-center gap-2 group active:scale-95 cursor-pointer shadow-[0_0_30px_rgba(16,185,129,0.3)]"
                >
                  START YOUR BLUEPRINT
                  <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                </a>
                <button
                  onClick={() => setIsScannerOpen(true)}
                  className="px-8 py-4 rounded-full border border-zinc-700 text-zinc-300 font-bold tracking-wide hover:border-emerald-500 hover:text-emerald-400 transition-all active:scale-95"
                >
                  TAKE THE SCAN
                </button>
              </div>

              <Link to="/tech" className="mt-6 text-xs text-zinc-600 hover:text-emerald-400 transition-colors inline-flex items-center gap-1">
                Already have a business? Go to Tech for systems & automation <ArrowRight size={12} />
              </Link>
            </div>

            {/* Right: Mini stat cards */}
            <div className="hidden md:grid grid-cols-2 gap-4">
              {[
                { value: "90", unit: "day", label: "Avg. Launch Time", icon: Rocket },
                { value: "85", unit: "%", label: "Return Rate", icon: TrendingUp },
                { value: "100", unit: "+", label: "Blueprints Delivered", icon: BarChart3 },
                { value: "5K", unit: "/mo", label: "Avg. Client Revenue", icon: Target },
              ].map((stat, i) => (
                <ScrollReveal key={i} direction="up" delay={i * 0.1} distance={20}>
                  <div className="bg-zinc-900/80 border border-zinc-800 rounded-2xl p-5 hover:border-emerald-500/30 transition-all group">
                    <stat.icon size={18} className="text-emerald-500 mb-3 group-hover:scale-110 transition-transform" />
                    <div className="text-3xl font-bold text-white font-mono">
                      {stat.value}<span className="text-emerald-400 text-lg">{stat.unit}</span>
                    </div>
                    <span className="text-zinc-500 text-xs">{stat.label}</span>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* SOCIAL PROOF BAR */}
      <SocialProofBar
        accentColor="emerald"
        stats={[
          { value: 100, suffix: '+', label: 'Blueprints Delivered' },
          { value: 90, suffix: '-day', label: 'Avg. Launch' },
          { value: 85, suffix: '%', label: 'Return Rate' },
        ]}
      />

      {/* PROBLEM SECTION */}
      <div className="py-20 px-6 border-y border-white/5 bg-white/[0.02]">
        <div className="container mx-auto max-w-3xl text-center">
          <ScrollReveal direction="up" distance={25}>
            <div className="inline-block bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-bold uppercase tracking-widest px-4 py-1.5 rounded-full mb-6">Sound familiar?</div>
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white">You're not lazy. You're unstructured.</h2>
            <p className="text-zinc-400 text-lg leading-relaxed max-w-2xl mx-auto">
              Most people don't fail because they lack talent — they fail because they never turn talent into a clear offer, a simple system, and consistent execution.
            </p>
          </ScrollReveal>
        </div>
      </div>

      {/* THE PLAN — Animated Timeline */}
      <div className="py-24 px-6">
        <div className="container mx-auto max-w-5xl">
          <ScrollReveal direction="up" distance={20}>
            <h2 className="text-3xl font-bold text-white mb-16 text-center">The Plan</h2>
          </ScrollReveal>

          <div className="relative">
            {/* Horizontal connector line (desktop) */}
            <div className="hidden md:block absolute top-10 left-[8%] right-[8%] h-px bg-zinc-800" />

            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              {[
                { icon: <Search size={24} />, step: "01", title: "Discover", desc: "Pick the right business path" },
                { icon: <PenTool size={24} />, step: "02", title: "Design", desc: "Build your offer + message" },
                { icon: <Target size={24} />, step: "03", title: "Deploy", desc: "Create assets + systems" },
                { icon: <TrendingUp size={24} />, step: "04", title: "Scale", desc: "Refine what works and grow" },
              ].map((item, i) => (
                <ScrollReveal key={i} direction="up" delay={i * 0.12} distance={20}>
                  <div className="flex flex-col items-center text-center group">
                    <div className="w-20 h-20 rounded-full bg-zinc-900 border border-zinc-800 flex items-center justify-center text-emerald-500 mb-6 relative z-10 group-hover:border-emerald-500/50 group-hover:bg-emerald-950/20 transition-all shadow-lg">
                      {item.icon}
                    </div>
                    <div className="text-emerald-600 font-mono text-xs font-bold mb-2">STEP {item.step}</div>
                    <h3 className="text-xl font-bold text-zinc-100 mb-2">{item.title}</h3>
                    <p className="text-zinc-500 text-sm">{item.desc}</p>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* SERVICES — BENTO GRID */}
      <div className="py-24 px-6 border-y border-white/5 bg-white/[0.02]">
        <div className="container mx-auto max-w-6xl">
          <ScrollReveal direction="up" distance={20}>
            <div className="text-center mb-14">
              <h2 className="text-3xl font-bold mb-4 text-white">How we build it</h2>
              <p className="text-zinc-400">Everything you need to go from idea to income.</p>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-6 gap-4 auto-rows-[200px] md:auto-rows-[220px]">
            {/* Offer Design — Hero card */}
            <div className="group relative md:col-span-4 md:row-span-2 rounded-2xl overflow-hidden border border-zinc-800 hover:border-emerald-500/30 transition-all duration-500 bg-zinc-900">
              <img
                src="https://images.unsplash.com/photo-1552664730-d307ca884978?q=50&w=800&auto=format&fit=crop"
                alt="Strategy session"
                loading="lazy"
                className="absolute inset-0 w-full h-full object-cover opacity-15 group-hover:opacity-25 group-hover:scale-105 transition-all duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/80 to-transparent" />
              <div className="relative z-10 h-full flex flex-col justify-end p-6 md:p-8">
                <div className="w-12 h-12 bg-emerald-950/50 border border-emerald-500/30 rounded-xl flex items-center justify-center mb-4 group-hover:bg-emerald-500/10 transition-colors">
                  <Lightbulb className="text-emerald-400" size={24} />
                </div>
                <h3 className="text-2xl md:text-3xl font-bold text-white mb-3">Offer Design</h3>
                <p className="text-zinc-400 text-sm leading-relaxed max-w-md">
                  We help you package your skills into a high-value offer that people actually want to buy. Clear pricing, clear promise, clear delivery.
                </p>
              </div>
            </div>

            {/* Funnel & Tech */}
            <div className="group relative md:col-span-2 rounded-2xl overflow-hidden border border-zinc-800 hover:border-emerald-500/30 transition-all duration-500 bg-zinc-900 p-6 flex flex-col justify-end">
              <Layers className="text-emerald-400 mb-3" size={24} />
              <h3 className="text-xl font-bold text-white mb-1">Funnel & Tech</h3>
              <p className="text-zinc-500 text-xs leading-relaxed">Landing pages, automations, and payment systems so you can sell while you sleep.</p>
            </div>

            {/* Audience Growth */}
            <div className="group relative md:col-span-2 rounded-2xl overflow-hidden border border-zinc-800 hover:border-emerald-500/30 transition-all duration-500 bg-zinc-900 p-6 flex flex-col justify-end">
              <Users className="text-emerald-400 mb-3" size={24} />
              <h3 className="text-xl font-bold text-white mb-1">Audience Growth</h3>
              <p className="text-zinc-500 text-xs leading-relaxed">Attract the right people without burning out on content treadmills.</p>
            </div>

            {/* Brand & Content */}
            <div className="group relative md:col-span-3 rounded-2xl overflow-hidden border border-zinc-800 hover:border-emerald-500/30 transition-all duration-500 bg-zinc-900 p-6 flex flex-col justify-end">
              <PenTool className="text-emerald-400 mb-3" size={24} />
              <h3 className="text-xl font-bold text-white mb-1">Brand & Content Strategy</h3>
              <p className="text-zinc-500 text-xs leading-relaxed">Define your voice, visuals, and messaging so everything feels intentional and on-brand.</p>
            </div>

            {/* Launch Support */}
            <div className="group relative md:col-span-3 rounded-2xl overflow-hidden border border-zinc-800 hover:border-emerald-500/30 transition-all duration-500 bg-gradient-to-br from-emerald-950/40 to-zinc-950 p-6 flex flex-col justify-end">
              <Rocket className="text-emerald-400 mb-3" size={24} />
              <h3 className="text-xl font-bold text-white mb-2">Launch Support</h3>
              <p className="text-zinc-400 text-sm leading-relaxed mb-3">From pre-launch strategy to post-launch optimization — we stay in the trenches with you.</p>
              <div className="text-emerald-400/60 text-xs font-mono tracking-wider">Idea → Revenue in 90 days.</div>
            </div>
          </div>
        </div>
      </div>

      {/* Testimonial */}
      <TestimonialQuote
        quote="I had the idea for months but couldn't figure out the first step. After one session, I had a clear offer, a funnel, and my first 3 clients within 2 weeks."
        author="T. Reeves"
        role="Side Hustle → Full-Time"
        accentColor="emerald"
      />

      {/* FAQ — Accordion */}
      <div className="py-24 px-6">
        <div className="container mx-auto max-w-3xl">
          <ScrollReveal direction="up" distance={20}>
            <h2 className="text-3xl font-bold mb-12 text-center text-white">FAQ</h2>
          </ScrollReveal>
          <FAQAccordion items={faqItems} accentColor="emerald" />
        </div>
      </div>

      {/* FINAL CTA */}
      <div className="relative py-32 px-6 text-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-zinc-950 via-emerald-950/10 to-zinc-950 pointer-events-none" />
        <div className="container mx-auto max-w-3xl relative z-10">
          <ScrollReveal direction="up" distance={25}>
            <h2 className="text-3xl md:text-5xl font-bold mb-10 leading-tight text-white">
              Ready to turn your skills into something real?
            </h2>
          </ScrollReveal>
          <a
            href="https://tidycal.com/purecreativitypro/purecreativity-blueprint-session"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-emerald-500 text-black px-12 py-5 text-xl font-bold hover:bg-emerald-400 transition-all duration-300 inline-flex items-center gap-3 rounded-full shadow-[0_0_40px_rgba(16,185,129,0.2)] active:scale-95 cursor-pointer"
          >
            START YOUR BLUEPRINT
          </a>
          <p className="mt-6 text-zinc-600 text-xs tracking-widest uppercase">Free discovery session included.</p>
        </div>
      </div>

      {/* CROSS-STUDIO LINKS */}
      <CrossStudioLinks />

      {/* SHARED FOOTER */}
      <Footer theme="business" />
    </div>
  );
};

export default Business;