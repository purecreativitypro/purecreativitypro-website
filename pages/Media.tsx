import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Navigation from '../components/Navigation';
import ScannerModal from '../components/ScannerModal';
import { Wand2, Layers, Repeat, Megaphone, Palette, ArrowRight, CheckCircle2 } from 'lucide-react';
import SEOHead, { createServiceSchema, createFAQSchema } from '../components/SEOHead';
import Footer from '../components/Footer';
import ScrollReveal from '../components/ScrollReveal';
import SocialProofBar from '../components/SocialProofBar';
import FAQAccordion from '../components/FAQAccordion';
import CrossStudioLinks from '../components/CrossStudioLinks';
import TestimonialQuote from '../components/TestimonialQuote';

const Media: React.FC = () => {
  const [isScannerOpen, setIsScannerOpen] = useState(false);

  const faqItems = [
    { q: "Do I need professional footage or photos?", a: "No. Bring what you have — even phone footage — and we'll enhance it. If you need capture later, we can guide the shot list and direction." },
    { q: "Is this AI-only?", a: "AI-assisted, human-finished. We use AI for speed and options, then apply taste, strategy, and consistency." },
    { q: "What do you need from me?", a: "Your offer, your goal, and any brand links or assets. If you have nothing, we can start from a simple description." },
    { q: "What's the turnaround time?", a: "Depends on scope, but most requests start with a first draft within a few days." },
    { q: "What will I receive?", a: "Ready-to-post files formatted for your platforms (and source files when needed)." },
  ];

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 font-sans selection:bg-orange-500/30 selection:text-orange-200 relative overflow-x-hidden">
      <SEOHead
        title="Media — AI-Powered Content Studio"
        description="Turn ideas and raw assets into scroll-stopping content using AI + design tools. From ebooks and ads to reels and brand visuals."
        path="/media"
        jsonLd={[createServiceSchema('PureCreativity Media', 'AI-powered content creation, editing, and creative direction for brands and entrepreneurs.', '/media'), createFAQSchema(faqItems.map(f => ({ question: f.q, answer: f.a })))]}
      />
      <Navigation theme="media" />
      <ScannerModal isOpen={isScannerOpen} onClose={() => setIsScannerOpen(false)} theme="media" />

      {/* HERO — Dark cinematic with scrolling reel */}
      <div className="relative pt-32 pb-24 px-6 overflow-hidden">
        {/* Ambient glow */}
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-orange-500/8 rounded-full blur-[120px] pointer-events-none -translate-y-1/2 translate-x-1/4" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-orange-600/5 rounded-full blur-[100px] pointer-events-none translate-y-1/2 -translate-x-1/4" />

        {/* Scrolling image reel strip */}
        <div className="absolute top-1/2 -translate-y-1/2 left-0 right-0 opacity-[0.06] pointer-events-none overflow-hidden">
          <div className="flex gap-4 animate-marquee w-max">
            {[1,2].map(set => (
              <React.Fragment key={set}>
                {['photo-1611162617213-7d7a39e9b1d7', 'photo-1558618666-fcd25c85f82e', 'photo-1611532736597-de2d4265fba3', 'photo-1626785774573-4b799315345d', 'photo-1542744173-8e7e53415bb0', 'photo-1626544827763-d516dce335e2'].map((id, i) => (
                  <div key={`${set}-${i}`} className="w-48 h-32 rounded-lg overflow-hidden shrink-0">
                    <img src={`https://images.unsplash.com/${id}?q=30&w=300&auto=format&fit=crop`} alt="" className="w-full h-full object-cover grayscale" loading="lazy" />
                  </div>
                ))}
              </React.Fragment>
            ))}
          </div>
        </div>

        <div className="container mx-auto max-w-6xl relative z-10">
          <div className="max-w-3xl">
            <h4 className="text-orange-500 font-bold tracking-[0.2em] uppercase text-xs mb-6 flex items-center gap-2">
              <span className="w-2 h-2 bg-orange-500 rounded-full animate-pulse" />
              PureCreativity Media
            </h4>
            <h1 className="text-4xl sm:text-6xl md:text-8xl font-serif font-medium leading-[0.9] mb-8 tracking-tighter break-words">
              CREATE.<br />
              <span className="italic text-zinc-500">ENHANCE.</span><br />
              CONVERT.
            </h1>
            <p className="text-lg md:text-2xl text-zinc-400 font-light leading-relaxed max-w-2xl mb-4 border-l-2 border-orange-500 pl-6">
              We turn ideas and raw assets into scroll-stopping content using AI + design tools — from ebooks and ads to reels and brand visuals.
            </p>
            <p className="text-zinc-600 text-sm pl-6 mb-10 italic">
              Once your offer is clear, we build the content machine around it.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 items-start">
              <a
                href="https://tidycal.com/purecreativitypro/purecreativity-blueprint-session"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-orange-500 text-black px-8 py-4 rounded-full font-bold tracking-wide hover:bg-orange-400 transition-all flex items-center gap-2 group active:scale-95 cursor-pointer shadow-[0_0_30px_rgba(249,115,22,0.3)]"
              >
                START A PROJECT
                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </a>
              <button
                onClick={() => setIsScannerOpen(true)}
                className="px-8 py-4 rounded-full border border-zinc-700 text-zinc-300 font-bold tracking-wide hover:border-orange-500 hover:text-orange-400 transition-all active:scale-95"
              >
                FREE CONTENT SCAN
              </button>
            </div>

            <Link to="/business" className="mt-6 text-xs text-zinc-600 hover:text-orange-400 transition-colors inline-flex items-center gap-1 py-3">
              Not sure where to start? Start with the Blueprint <ArrowRight size={12} />
            </Link>
          </div>
        </div>
      </div>

      {/* SOCIAL PROOF BAR */}
      <SocialProofBar
        accentColor="orange"
        stats={[
          { value: 1000, suffix: '+', label: 'Assets Created' },
          { value: 50, suffix: '+', label: 'Brands Served' },
          { value: 48, prefix: '<', suffix: 'hr', label: 'First Draft' },
        ]}
      />

      {/* BEFORE / AFTER — Moved higher for immediate proof */}
      <div className="py-24 px-6">
        <div className="container mx-auto max-w-6xl">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-4">
              <div className="relative rounded-xl overflow-hidden border border-zinc-800 group">
                <img
                  src="https://drive.google.com/thumbnail?id=1-XunDGqd-41b5c6jzy_mlvfU0EHIXm04&sz=w1200"
                  className="w-full h-64 object-cover opacity-60"
                  alt="Raw Asset - Before"
                />
                <div className="absolute bottom-4 left-4">
                  <span className="bg-zinc-900/90 text-zinc-400 px-4 py-2 text-xs uppercase tracking-widest font-bold rounded-full border border-zinc-700">Before: Raw Asset</span>
                </div>
              </div>

              <div className="relative rounded-xl overflow-hidden border border-orange-500/30 shadow-[0_0_30px_rgba(249,115,22,0.1)] group">
                <img
                  src="https://drive.google.com/thumbnail?id=1RljZH5e-hp1kdvPYJJ_T4PZy2VrLqf7v&sz=w1200"
                  className="w-full h-80 object-cover group-hover:scale-105 transition-transform duration-700"
                  alt="Enhanced Asset - After"
                />
                <div className="absolute bottom-4 left-4">
                  <span className="bg-orange-500 text-black px-4 py-2 text-xs uppercase tracking-widest font-bold rounded-full shadow-lg">After: Enhanced + On-Brand</span>
                </div>
              </div>
            </div>
            <div>
              <ScrollReveal direction="up" distance={20}>
                <h2 className="text-3xl md:text-4xl font-serif font-medium mb-6 text-white">Deliverables that convert.</h2>
              </ScrollReveal>
              <p className="text-zinc-400 mb-8 leading-relaxed">
                We don't just "edit." We package content for maximum engagement.
                Every asset is delivered in the correct ratio, format, and style for your target platform.
              </p>
              <div className="grid grid-cols-2 gap-3">
                {["Carousel Packs", "Reel Covers", "Ad Set Creatives", "Lead Magnets (PDF)", "Story Graphics", "YouTube Thumbnails"].map((item, i) => (
                  <div key={i} className="border border-zinc-800 bg-zinc-900/50 p-4 rounded-lg flex items-center gap-2 text-sm text-zinc-300 hover:border-orange-500/30 transition-colors">
                    <CheckCircle2 size={16} className="text-orange-500 shrink-0" /> {item}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* PROBLEM SECTION */}
      <div className="py-20 px-6 border-y border-white/5 bg-white/[0.02]">
        <div className="container mx-auto max-w-3xl text-center">
          <ScrollReveal direction="up" distance={25} blur={3}>
            <div className="inline-block bg-orange-500/10 border border-orange-500/20 text-orange-400 text-xs font-bold uppercase tracking-widest px-4 py-1.5 rounded-full mb-6">Sound familiar?</div>
            <h2 className="text-3xl md:text-4xl font-serif font-medium mb-6 text-white">Your brand is better than your content looks.</h2>
            <p className="text-zinc-400 text-lg leading-relaxed max-w-2xl mx-auto">
              Inconsistent visuals and scattered messaging make great businesses look smaller than they are. You need content that matches your vision — created fast and on-brand.
            </p>
          </ScrollReveal>
        </div>
      </div>

      {/* SERVICES — BENTO GRID */}
      <div className="py-24 px-6">
        <div className="container mx-auto max-w-6xl">
          <ScrollReveal direction="up" distance={20}>
            <div className="text-center mb-14">
              <div className="inline-block border border-white/10 bg-white/5 px-3 py-1 rounded-full text-[11px] font-mono tracking-[0.2em] uppercase text-zinc-400 mb-4">What We Build</div>
              <h2 className="text-3xl md:text-4xl font-serif font-medium text-white">Content that performs.</h2>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-6 gap-4 auto-rows-[200px] md:auto-rows-[240px]">
            {/* AI Content Creation — Hero card */}
            <div className="group relative md:col-span-4 md:row-span-2 rounded-2xl overflow-hidden border border-white/10 hover:border-orange-500/30 transition-all duration-500 bg-zinc-900">
              <img src="https://images.unsplash.com/photo-1611532736597-de2d4265fba3?q=60&w=800&auto=format&fit=crop" alt="Creative workspace" loading="lazy" width="900" height="600"
                className="absolute inset-0 w-full h-full object-cover opacity-20 group-hover:opacity-30 group-hover:scale-105 transition-all duration-700" />
              <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/70 to-transparent" />
              <div className="relative z-10 h-full flex flex-col justify-end p-6 md:p-8">
                <div className="w-12 h-12 bg-orange-500/10 border border-orange-500/20 rounded-xl flex items-center justify-center mb-4 group-hover:bg-orange-500/20 transition-colors">
                  <Wand2 className="text-orange-400" size={24} />
                </div>
                <h3 className="text-2xl md:text-3xl font-serif font-medium text-white mb-2">AI Content Creation</h3>
                <p className="text-zinc-400 text-sm leading-relaxed max-w-md mb-4">From a blank page to finished assets. Ebooks, carousels, ad creatives, thumbnails, reels, and social posts — built around your message.</p>
                <div className="text-orange-400 text-xs font-bold tracking-widest uppercase">From Scratch</div>
              </div>
            </div>

            {/* AI Editing */}
            <div className="group relative md:col-span-2 rounded-2xl overflow-hidden border border-white/10 hover:border-orange-500/30 transition-all duration-500 bg-zinc-900 p-6 flex flex-col justify-end">
              <Megaphone className="text-orange-400 mb-3" size={24} />
              <h3 className="text-xl font-bold text-white mb-1">AI Editing</h3>
              <p className="text-zinc-500 text-xs leading-relaxed">Cleanup, upscale, color polish, captions, and pro formatting.</p>
            </div>

            {/* Repurposing Packs */}
            <div className="group relative md:col-span-2 rounded-2xl overflow-hidden border border-white/10 hover:border-orange-500/30 transition-all duration-500 bg-zinc-900 p-6 flex flex-col justify-end">
              <Layers className="text-orange-400 mb-3" size={24} />
              <h3 className="text-xl font-bold text-white mb-1">Repurposing Packs</h3>
              <p className="text-zinc-500 text-xs leading-relaxed">One idea becomes a week of content — clips, hooks, captions, covers.</p>
            </div>

            {/* Campaign Creative */}
            <div className="group relative md:col-span-3 rounded-2xl overflow-hidden border border-white/10 hover:border-orange-500/30 transition-all duration-500 bg-zinc-900 p-6 flex flex-col justify-end">
              <Repeat className="text-orange-400 mb-3" size={24} />
              <h3 className="text-xl font-bold text-white mb-1">Campaign Creative</h3>
              <p className="text-zinc-500 text-xs leading-relaxed">Launch-ready ads, landing visuals, and offer graphics that support the sale.</p>
            </div>

            {/* Creative Direction */}
            <div className="group relative md:col-span-3 rounded-2xl overflow-hidden border border-white/10 hover:border-orange-500/30 transition-all duration-500 bg-gradient-to-br from-orange-950/40 to-zinc-950 p-6 flex flex-col justify-end">
              <Palette className="text-orange-400 mb-3" size={24} />
              <h3 className="text-xl font-bold text-white mb-2">Creative Direction</h3>
              <p className="text-zinc-400 text-sm leading-relaxed mb-3">Not sure what to make? We define the style, structure, and angle — so everything looks and feels aligned.</p>
              <div className="text-orange-400/60 text-xs font-mono tracking-wider">No footage? No problem.</div>
            </div>
          </div>
        </div>
      </div>

      {/* THE PLAN — Dark with orange accents */}
      <div className="py-24 px-6 border-y border-white/5 bg-white/[0.02]">
        <div className="container mx-auto max-w-5xl">
          <ScrollReveal direction="up" distance={20}>
            <h2 className="text-3xl md:text-4xl font-serif font-medium mb-16 text-center text-white">The Plan</h2>
          </ScrollReveal>

          {/* Horizontal timeline */}
          <div className="relative">
            {/* Connector line */}
            <div className="hidden md:block absolute top-8 left-[10%] right-[10%] h-px bg-zinc-800" />

            <div className="grid md:grid-cols-3 gap-8">
              {[
                { step: "01", title: "Share your offer + vibe", desc: "or send what you have" },
                { step: "02", title: "We create + enhance", desc: "draft → polish → variations" },
                { step: "03", title: "You post consistently", desc: "and convert more" },
              ].map((item, i) => (
                <ScrollReveal key={i} direction="up" delay={i * 0.1} distance={20}>
                  <div className="flex flex-col items-center text-center group">
                    <div className="w-16 h-16 rounded-full bg-zinc-900 border border-zinc-800 flex items-center justify-center mb-6 relative z-10 group-hover:border-orange-500/50 group-hover:bg-orange-950/20 transition-all">
                      <span className="text-lg font-bold text-orange-400 font-mono">{item.step}</span>
                    </div>
                    <h3 className="text-lg font-bold text-white mb-2">{item.title}</h3>
                    <p className="text-zinc-500 text-sm">({item.desc})</p>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>

          <div className="mt-14 text-center">
            <button
              onClick={() => setIsScannerOpen(true)}
              className="bg-orange-500 text-black px-10 py-4 rounded-full font-bold tracking-wide hover:bg-orange-400 transition-all shadow-[0_0_30px_rgba(249,115,22,0.3)] active:scale-95"
            >
              GET A FREE CONTENT SCAN
            </button>
          </div>
        </div>
      </div>

      {/* Testimonial */}
      <TestimonialQuote
        quote="We went from zero social presence to a full content library in 3 weeks. The quality blew us away — our engagement tripled."
        author="K. Williams"
        role="Brand Founder"
        accentColor="orange"
      />

      {/* FAQ — Accordion */}
      <div className="py-24 px-6">
        <div className="container mx-auto max-w-3xl">
          <ScrollReveal direction="up" distance={20}>
            <h2 className="text-3xl font-serif font-medium mb-12 text-center text-white">Frequently Asked</h2>
          </ScrollReveal>
          <FAQAccordion items={faqItems} accentColor="orange" />
        </div>
      </div>

      {/* FINAL CTA */}
      <div className="relative py-32 px-6 text-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-zinc-950 via-orange-950/10 to-zinc-950 pointer-events-none" />
        <div className="container mx-auto max-w-4xl relative z-10">
          <ScrollReveal direction="up" distance={25}>
            <h2 className="text-3xl md:text-6xl font-serif font-medium mb-10 leading-tight text-white">
              Ready to make your content look as good as your business?
            </h2>
          </ScrollReveal>
          <a
            href="https://tidycal.com/purecreativitypro/purecreativity-blueprint-session"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-white text-black px-12 py-5 text-xl font-bold hover:bg-orange-500 hover:text-white transition-all duration-300 inline-flex items-center gap-3 rounded-full shadow-[0_0_40px_rgba(255,255,255,0.1)] active:scale-95 cursor-pointer"
          >
            START A PROJECT
          </a>
          <p className="mt-6 text-zinc-600 text-xs tracking-widest uppercase">Tell us what you're launching — we'll build the content.</p>
        </div>
      </div>

      {/* CROSS-STUDIO LINKS */}
      <CrossStudioLinks />

      {/* SHARED FOOTER */}
      <Footer theme="media" />
    </div>
  );
};

export default Media;