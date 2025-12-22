import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Navigation from '../components/Navigation';
import ScannerModal from '../components/ScannerModal';
import { Wand2, Layers, Repeat, Megaphone, Palette, ArrowRight, CheckCircle2 } from 'lucide-react';

const Media: React.FC = () => {
  const [isScannerOpen, setIsScannerOpen] = useState(false);

  return (
    <div className="min-h-screen bg-zinc-5 text-black font-sans selection:bg-orange-500/30 selection:text-orange-900 relative overflow-x-hidden">
      <Navigation theme="media" />
      <ScannerModal isOpen={isScannerOpen} onClose={() => setIsScannerOpen(false)} theme="media" />

      {/* HERO SECTION */}
      <div className="relative bg-zinc-900 text-white pt-32 pb-24 px-6 rounded-b-[3rem] shadow-2xl overflow-hidden">
        {/* Abstract shapes for vibe */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-white/5 rounded-full blur-3xl pointer-events-none -translate-y-1/2 translate-x-1/2"></div>
        <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-orange-500/10 rounded-full blur-3xl pointer-events-none translate-y-1/2 -translate-x-1/2"></div>

        <div className="container mx-auto max-w-6xl relative z-10">
            <div className="flex flex-col md:flex-row justify-between items-end gap-12">
                <div className="max-w-3xl">
                    <h4 className="text-orange-500 font-bold tracking-[0.2em] uppercase text-xs md:text-sm mb-6 flex items-center gap-2">
                        <span className="w-2 h-2 bg-orange-500 rounded-full animate-pulse"></span>
                        PureCreativity Media — AI-Powered Content Studio
                    </h4>
                    <h1 className="text-4xl sm:text-6xl md:text-8xl font-serif font-medium leading-[0.9] mb-8 tracking-tighter break-words">
                        CREATE.<br />
                        <span className="italic text-zinc-400">ENHANCE.</span><br />
                        CONVERT.
                    </h1>
                    <p className="text-lg md:text-2xl text-zinc-300 font-light leading-relaxed max-w-2xl mb-4 border-l-2 border-orange-500 pl-6">
                        We turn ideas and raw assets into scroll-stopping content using AI + design tools — from ebooks and ads to reels and brand visuals — so your business looks premium and performs.
                    </p>
                    
                    {/* Alignment Line */}
                    <p className="text-zinc-400 text-sm pl-6 mb-10 italic">
                        Once your offer is clear, we build the content machine around it.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 items-start">
                        <button className="bg-white text-black px-8 py-4 rounded-full font-bold tracking-wide hover:bg-orange-500 hover:text-white transition-all flex items-center gap-2 group active:scale-95">
                            START A PROJECT
                            <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                        </button>
                        <button 
                            onClick={() => setIsScannerOpen(true)}
                            className="px-8 py-4 rounded-full border border-zinc-700 text-white font-bold tracking-wide hover:border-orange-500 hover:text-orange-500 transition-all active:scale-95"
                        >
                            GET A FREE CONTENT SCAN
                        </button>
                    </div>
                    
                    {/* Secondary Blueprint CTA */}
                    <div className="mt-6 flex flex-col gap-2">
                        <p className="text-zinc-500 text-xs tracking-wide font-mono uppercase">
                            Bring an idea or bring footage. We’ll handle the creative.
                        </p>
                        <Link to="/business" className="text-zinc-400 text-xs hover:text-orange-500 transition-colors inline-flex items-center gap-1 w-fit">
                            Not sure where to start? Start with the Blueprint <ArrowRight size={12} />
                        </Link>
                    </div>
                </div>
            </div>
        </div>
      </div>

      {/* PROBLEM SECTION */}
      <div className="py-24 px-6 container mx-auto max-w-5xl">
          <div className="grid md:grid-cols-2 gap-16 items-center">
              <div>
                  <h2 className="text-3xl md:text-5xl font-serif mb-8 leading-tight">Your brand is better than your content looks.</h2>
                  <p className="text-zinc-500 text-lg italic border-l-4 border-zinc-200 pl-4">
                      "If you’ve been trying to make your content match your vision, you’re not alone."
                  </p>
              </div>
              <div className="space-y-6">
                  {[
                      "You need consistent content, but creating it takes too long.",
                      "Templates feel generic, and outsourcing feels expensive or unclear.",
                      "You have ideas — you just need them brought to life fast and on-brand."
                  ].map((item, i) => (
                      <div key={i} className="flex gap-4 items-start">
                          <div className="w-6 h-6 rounded-full bg-orange-100 flex items-center justify-center shrink-0 mt-1">
                              <span className="w-2 h-2 bg-orange-500 rounded-full"></span>
                          </div>
                          <p className="text-lg text-zinc-800 font-medium">{item}</p>
                      </div>
                  ))}
              </div>
          </div>
      </div>

      {/* VILLAIN / GUIDE SECTION */}
      <div className="bg-zinc-100 py-24 px-6">
          <div className="container mx-auto max-w-4xl text-center">
              <div className="mb-16">
                  <h3 className="text-orange-600 font-bold tracking-widest uppercase text-sm mb-4">The Real Enemy</h3>
                  <h2 className="text-3xl md:text-4xl font-serif mb-6">Inconsistency.</h2>
                  <p className="text-zinc-600 max-w-2xl mx-auto text-lg leading-relaxed">
                      Inconsistent visuals and scattered messaging make great businesses look smaller than they are. We fix that by building content systems you can actually keep up with.
                  </p>
              </div>
              
              <div className="w-full h-px bg-zinc-200 my-12"></div>

              <div>
                  <h3 className="text-orange-600 font-bold tracking-widest uppercase text-sm mb-4">The Guide</h3>
                  <h2 className="text-3xl md:text-4xl font-serif mb-6">You bring the vision. We bring the execution.</h2>
                  <p className="text-zinc-600 max-w-2xl mx-auto text-lg leading-relaxed">
                      PureCreativity Media blends AI speed with human taste, strategy, and brand consistency — so your content doesn’t just look good… it supports your offer.
                  </p>
              </div>
          </div>
      </div>

      {/* SERVICES SECTION */}
      <div className="py-24 px-6 container mx-auto max-w-6xl">
          {/* Best For Line */}
          <div className="mb-12 text-center text-sm font-serif italic text-zinc-500">
             <span className="font-bold text-orange-600 not-italic mr-2 font-sans text-xs tracking-widest uppercase">Best for:</span> 
             content created from scratch, AI enhancement, repurposing packs, campaign creative, brand consistency.
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              <ServiceCard 
                  icon={<Wand2 size={24} />} 
                  title="AI Content Creation" 
                  subtitle="(From Scratch)"
                  desc="From a blank page to finished assets. We create ebooks, carousels, ad creatives, thumbnails, reels concepts, and social posts built around your message."
              />
              <ServiceCard 
                  icon={<Megaphone size={24} />} 
                  title="AI Editing + Enhancement" 
                  subtitle=""
                  desc="Make what you have look premium. Cleanup, upscale, color polish, lighting fixes, background removal, audio cleanup, captions, and pro formatting."
              />
              <ServiceCard 
                  icon={<Layers size={24} />} 
                  title="Repurposing Packs" 
                  subtitle=""
                  desc="One idea becomes a week of content. We turn long-form into short clips, hooks, captions, cover images, and platform-ready variations."
              />
              <ServiceCard 
                  icon={<Repeat size={24} />} 
                  title="Campaign Creative" 
                  subtitle="+ Messaging"
                  desc="Launch-ready creative that stays consistent. Ads, landing visuals, offer graphics, and content that supports the sale."
              />
              <ServiceCard 
                  icon={<Palette size={24} />} 
                  title="Creative Direction" 
                  subtitle=""
                  desc="If you’re not sure what to make, we define the style, structure, and content angle — so everything looks and feels aligned."
              />
              
              {/* FROM SCRATCH EMPHASIS BOX */}
              <div className="bg-zinc-900 text-white p-8 rounded-xl flex flex-col justify-center shadow-xl">
                  <h3 className="text-xl font-bold mb-4 font-serif italic text-orange-500">No footage? No problem.</h3>
                  <p className="text-zinc-400 text-sm mb-4">No idea? We can build it.</p>
                  <ul className="space-y-3">
                      {[
                          "Turn rough concepts into finished visuals",
                          "Generate on-brand designs",
                          "Deliver platform-ready formats"
                      ].map((item, i) => (
                          <li key={i} className="flex items-center gap-3 text-sm text-zinc-300">
                              <CheckCircle2 size={16} className="text-orange-500 shrink-0"/> {item}
                          </li>
                      ))}
                  </ul>
              </div>
          </div>
      </div>

      {/* THE PLAN */}
      <div className="bg-orange-500 text-black py-24 px-6">
          <div className="container mx-auto max-w-6xl">
              <h2 className="text-4xl md:text-5xl font-serif mb-16 text-center text-white drop-shadow-md">The Plan</h2>
              <div className="grid md:grid-cols-3 gap-8 mb-12">
                  {[
                      { step: "01", title: "Share your offer + vibe", desc: "(or send what you have)" },
                      { step: "02", title: "We create + enhance", desc: "(draft → polish → variations)" },
                      { step: "03", title: "You post consistently", desc: "and convert more" }
                  ].map((item, i) => (
                      <div key={i} className="bg-white p-8 rounded-lg shadow-xl relative overflow-hidden group hover:-translate-y-2 transition-transform duration-300">
                          <div className="absolute -right-4 -top-4 text-9xl font-serif text-zinc-100 group-hover:text-orange-50 transition-colors pointer-events-none select-none">
                              {item.step}
                          </div>
                          <div className="relative z-10">
                              <div className="text-xs font-bold tracking-widest uppercase mb-2 text-orange-600">Step {item.step}</div>
                              <h3 className="text-2xl font-bold mb-2">{item.title}</h3>
                              <p className="text-zinc-600">{item.desc}</p>
                          </div>
                      </div>
                  ))}
              </div>
              <div className="text-center">
                  <button 
                    onClick={() => setIsScannerOpen(true)}
                    className="bg-black text-white px-10 py-4 rounded-full font-bold tracking-wide hover:bg-white hover:text-black transition-all shadow-xl active:scale-95"
                  >
                      GET A FREE CONTENT SCAN
                  </button>
              </div>
          </div>
      </div>

      {/* PROOF SECTION */}
      <div className="py-24 px-6 container mx-auto max-w-6xl">
          <h2 className="text-3xl font-serif mb-12 text-center">Proof it works</h2>
          <div className="grid md:grid-cols-2 gap-12">
              <div className="space-y-4">
                  <div className="bg-zinc-200 h-64 rounded-lg flex items-center justify-center relative overflow-hidden group border border-zinc-300">
                      <img src="https://images.unsplash.com/photo-1512418490979-92798cec1380?q=80&w=800&auto=format&fit=crop" className="w-full h-full object-cover grayscale opacity-50" alt="Raw" />
                      <div className="absolute inset-0 flex items-center justify-center bg-black/20">
                        <span className="bg-black text-white px-4 py-2 text-xs uppercase tracking-widest font-bold">Before: Raw Asset</span>
                      </div>
                  </div>
                  <div className="bg-zinc-900 h-80 rounded-lg flex items-center justify-center relative overflow-hidden shadow-2xl group border border-zinc-800">
                      <img src="https://images.unsplash.com/photo-1542038784456-1ea0e93ca64b?q=80&w=800&auto=format&fit=crop" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" alt="Enhanced" />
                      <div className="absolute bottom-6 left-6">
                        <span className="bg-orange-500 text-black px-4 py-2 text-xs uppercase tracking-widest font-bold shadow-lg">After: Enhanced + On-Brand</span>
                      </div>
                  </div>
              </div>
              <div className="flex flex-col justify-center">
                  <h3 className="text-2xl font-bold mb-6">Deliverables that convert</h3>
                  <p className="text-zinc-600 mb-8 leading-relaxed">
                     We don't just "edit." We package content for maximum engagement.
                     Every asset is delivered in the correct ratio, format, and style for your target platform.
                  </p>
                  <div className="grid grid-cols-2 gap-4">
                      {["Carousel Packs", "Reel Covers", "Ad Set Creatives", "Lead Magnets (PDF)", "Story Graphics", "YouTube Thumbnails"].map((item, i) => (
                          <div key={i} className="border border-zinc-200 p-4 rounded bg-white flex items-center gap-2 text-sm text-zinc-700 shadow-sm">
                              <CheckCircle2 size={16} className="text-orange-500 shrink-0"/> {item}
                          </div>
                      ))}
                  </div>
              </div>
          </div>
      </div>

      {/* FAQ SECTION */}
      <div className="bg-zinc-100 py-24 px-6">
          <div className="container mx-auto max-w-3xl">
              <h2 className="text-3xl font-serif mb-12 text-center">FAQ</h2>
              <div className="space-y-4">
                  {[
                      { q: "Do I need professional footage or photos?", a: "No. Bring what you have — even phone footage — and we’ll enhance it. If you need capture later, we can guide the shot list and direction." },
                      { q: "Is this AI-only?", a: "AI-assisted, human-finished. We use AI for speed and options, then apply taste, strategy, and consistency." },
                      { q: "What do you need from me?", a: "Your offer, your goal, and any brand links or assets. If you have nothing, we can start from a simple description." },
                      { q: "What’s the turnaround time?", a: "Depends on scope, but most requests start with a first draft within a few days." },
                      { q: "What will I receive?", a: "Ready-to-post files formatted for your platforms (and source files when needed)." }
                  ].map((item, i) => (
                      <div key={i} className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow">
                          <h4 className="font-bold text-lg mb-2 flex items-start gap-3 text-zinc-900">
                              <span className="text-orange-500 font-serif italic">Q.</span> {item.q}
                          </h4>
                          <p className="text-zinc-600 pl-7 text-sm leading-relaxed">{item.a}</p>
                      </div>
                  ))}
              </div>
          </div>
      </div>

      {/* FINAL CTA */}
      <div className="bg-black text-white py-32 px-6 text-center">
          <div className="container mx-auto max-w-4xl">
              <h2 className="text-3xl md:text-6xl font-serif font-bold mb-10 leading-tight">Ready to make your content look as good as your business?</h2>
              <button 
                onClick={() => setIsScannerOpen(true)}
                className="bg-white text-black px-12 py-5 text-xl font-bold hover:bg-orange-500 hover:text-white transition-all duration-300 inline-flex items-center gap-3 rounded-full shadow-[0_0_40px_rgba(255,255,255,0.1)] active:scale-95"
              >
                  START A PROJECT
              </button>
              <p className="mt-6 text-zinc-500 text-xs tracking-widest uppercase">Tell us what you’re launching — we’ll build the content.</p>
          </div>
      </div>

      <footer className="bg-zinc-900 py-12 text-center text-zinc-500 text-xs tracking-[0.3em] font-sans border-t border-white/5 uppercase">
        PureCreativity.Media // Perspective is Everything
      </footer>

    </div>
  );
};

const ServiceCard: React.FC<{ icon: React.ReactNode; title: string; subtitle: string; desc: string }> = ({ icon, title, subtitle, desc }) => (
    <div className="bg-white p-8 rounded-xl shadow-lg border border-zinc-100 hover:shadow-2xl hover:border-orange-200 transition-all duration-300 group">
        <div className="w-12 h-12 bg-zinc-100 rounded-lg flex items-center justify-center text-zinc-900 mb-6 group-hover:bg-orange-500 group-hover:text-white transition-colors">
            {icon}
        </div>
        <h3 className="text-xl font-bold mb-1">{title}</h3>
        <p className="text-sm text-orange-500 font-bold mb-4 uppercase tracking-wider">{subtitle}</p>
        <p className="text-zinc-600 leading-relaxed text-sm">{desc}</p>
    </div>
);

export default Media;