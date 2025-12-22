import React, { useState } from 'react';
import Navigation from '../components/Navigation';
import ScannerModal from '../components/ScannerModal';
import { ArrowRight, Download, BookOpen, Star, Zap, MonitorPlay, Music, Cpu, BarChart3, Aperture, Check } from 'lucide-react';

const Learn: React.FC = () => {
  const [isScannerOpen, setIsScannerOpen] = useState(false);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) element.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-200 font-sans selection:bg-amber-500/30 selection:text-amber-100 relative overflow-x-hidden">
      <Navigation theme="learn" />
      <ScannerModal isOpen={isScannerOpen} onClose={() => setIsScannerOpen(false)} theme="learn" />

      {/* Grid Background */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-[0.03]" 
        style={{
          backgroundImage: 'linear-gradient(white 1px, transparent 1px), linear-gradient(90deg, white 1px, transparent 1px)',
          backgroundSize: '40px 40px',
        }}
      />

      {/* 1) HERO SECTION */}
      <div className="relative pt-32 pb-20 container mx-auto px-6 max-w-6xl text-center">
        <h4 className="text-amber-400 font-bold tracking-widest uppercase text-xs mb-6 inline-flex items-center gap-2 border border-amber-500/20 px-3 py-1 rounded-full bg-amber-950/20">
            <span className="w-1.5 h-1.5 bg-amber-400 rounded-full animate-pulse"></span>
            PURECREATIVITY LEARN
        </h4>
        <h1 className="text-5xl md:text-7xl font-display font-bold text-white mb-6 leading-tight">
          Start where you are.<br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-200 to-amber-500">Build what’s next.</span>
        </h1>
        <p className="text-xl text-neutral-400 max-w-3xl mx-auto mb-10 leading-relaxed">
          Short, beginner-friendly guides to help you use AI, create better content, learn creative tools, and turn your skills into something real — without overwhelm.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <button 
            onClick={() => scrollToSection('starter-kits')}
            className="bg-amber-500 text-black px-8 py-4 rounded-full font-bold tracking-wide hover:bg-amber-400 transition-all shadow-[0_0_20px_rgba(245,158,11,0.3)] hover:scale-105 active:scale-95 flex items-center gap-2"
          >
            BROWSE STARTER KITS <ArrowRight size={18} />
          </button>
          <button 
            onClick={() => setIsScannerOpen(true)}
            className="px-8 py-4 rounded-full border border-neutral-700 hover:border-amber-500 hover:text-amber-400 transition-all text-neutral-300 font-medium active:scale-95"
          >
            TAKE THE 10-MINUTE CLARITY SCAN
          </button>
        </div>
      </div>

      {/* 2) CATEGORY TILES */}
      <div className="container mx-auto px-6 max-w-6xl pb-24">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: 'AI for Real Life', icon: <Cpu />, color: 'text-cyan-400', border: 'hover:border-cyan-500/50', bg: 'hover:bg-cyan-950/20' },
            { label: 'Media Basics', icon: <Aperture />, color: 'text-orange-400', border: 'hover:border-orange-500/50', bg: 'hover:bg-orange-950/20' },
            { label: 'Music Basics', icon: <Music />, color: 'text-fuchsia-400', border: 'hover:border-fuchsia-500/50', bg: 'hover:bg-fuchsia-950/20' },
            { label: 'Business Basics', icon: <BarChart3 />, color: 'text-emerald-400', border: 'hover:border-emerald-500/50', bg: 'hover:bg-emerald-950/20' },
          ].map((item, i) => (
            <button 
                key={i} 
                onClick={() => scrollToSection('starter-kits')}
                className={`p-6 rounded-2xl bg-neutral-900/50 border border-neutral-800 transition-all duration-300 group ${item.border} ${item.bg}`}
            >
                <div className={`${item.color} mb-3 group-hover:scale-110 transition-transform`}>{item.icon}</div>
                <h3 className="font-bold text-lg text-white text-left">{item.label}</h3>
            </button>
          ))}
        </div>
        <p className="text-center text-neutral-500 text-sm mt-6 font-mono tracking-wide">
          &gt; Choose one path. Grab a free guide. Start building.
        </p>
      </div>

      {/* 3) FREE SECTION */}
      <div id="starter-kits" className="bg-neutral-900 border-y border-neutral-800 py-24">
        <div className="container mx-auto px-6 max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-white mb-2">Free First Steps</h2>
            <p className="text-amber-400 font-medium">Quick wins you can finish today.</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            
            {/* AI Group */}
            <div className="space-y-6">
               <div className="text-xs font-bold text-cyan-500 uppercase tracking-widest mb-4 border-b border-cyan-900/50 pb-2">AI / Tech</div>
               <FreeCard 
                 title="10 AI Prompts I Use Every Week"
                 desc="Copy/paste prompts for real life + business."
                 color="cyan"
               />
               <FreeCard 
                 title="AI Starter Workflow"
                 desc="Notes → plan → output template you can reuse."
                 color="cyan"
               />
            </div>

            {/* Media Group */}
            <div className="space-y-6">
               <div className="text-xs font-bold text-orange-500 uppercase tracking-widest mb-4 border-b border-orange-900/50 pb-2">Media</div>
               <FreeCard 
                 title="Beginner Camera Buying Guide"
                 desc="What to buy without overpaying (Kids Sports/Vlog)."
                 color="orange"
               />
               <FreeCard 
                 title="Phone Video Checklist"
                 desc="Lighting, framing, audio in one page."
                 color="orange"
               />
            </div>

            {/* Music Group */}
            <div className="space-y-6">
               <div className="text-xs font-bold text-fuchsia-500 uppercase tracking-widest mb-4 border-b border-fuchsia-900/50 pb-2">Music</div>
               <FreeCard 
                 title="Make Your First Track: 7 Steps"
                 desc="From idea to export — beginner friendly."
                 color="fuchsia"
               />
               <FreeCard 
                 title="10 Chord Progressions That Work"
                 desc="A simple sheet to get unstuck."
                 color="fuchsia"
               />
            </div>

            {/* Business Group */}
            <div className="space-y-6">
               <div className="text-xs font-bold text-emerald-500 uppercase tracking-widest mb-4 border-b border-emerald-900/50 pb-2">Business</div>
               <FreeCard 
                 title="Pick Your Side Hustle in 30 Mins"
                 desc="Worksheet to choose a direction fast."
                 color="emerald"
               />
               <FreeCard 
                 title="Offer Builder Template"
                 desc="Turn a skill into a sellable package."
                 color="emerald"
               />
            </div>

          </div>
        </div>
      </div>

      {/* 4) PAID SECTION */}
      <div className="py-24 container mx-auto px-6 max-w-5xl">
         <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-white mb-2">Tiny Training Packs</h2>
            <p className="text-neutral-400">Small products. Big momentum.</p>
         </div>

         <div className="grid md:grid-cols-3 gap-8 items-start">
            {/* Tier 1 */}
            <PriceCard 
              price="9"
              tier="Quick Starts"
              items={[
                "AI Prompt Library (Expanded)",
                "Lightroom Presets (Mobile)",
                "Social Bio Templates"
              ]}
              color="text-neutral-300"
            />
            
            {/* Tier 2 */}
            <div className="relative transform md:-translate-y-4">
              <div className="absolute -top-10 left-0 right-0 text-center">
                 <span className="bg-amber-500 text-black text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wide">Best Value</span>
              </div>
              <PriceCard 
                price="19"
                tier="Toolkits"
                highlight
                items={[
                  "The Content Calendar System",
                  "OBS / Streaming Setup Guide",
                  "Freelance Contract Template",
                  "Client Email Scripts"
                ]}
                color="text-amber-400"
              />
            </div>

            {/* Tier 3 */}
            <PriceCard 
              price="47"
              tier="Mini Courses"
              items={[
                "Business Launch Weekend",
                "Video Editing 101 (CapCut)",
                "Beatmaking for Beginners"
              ]}
              color="text-white"
            />
         </div>
      </div>

      {/* 5) THE PATH */}
      <div className="bg-neutral-900 border-t border-neutral-800 py-24">
         <div className="container mx-auto px-6 max-w-4xl text-center">
             <h2 className="text-3xl font-bold text-white mb-12">The Path</h2>
             
             <div className="grid md:grid-cols-3 gap-8 relative">
                {/* Connector Line (Desktop) */}
                <div className="hidden md:block absolute top-12 left-[16%] right-[16%] h-0.5 bg-neutral-800 -z-10"></div>
                
                {[
                  { step: "01", title: "Learn the basics", sub: "(Starter Kits)" },
                  { step: "02", title: "Apply with a project", sub: "(Templates + Challenges)" },
                  { step: "03", title: "Upgrade to Blueprint", sub: "(When you're ready)" }
                ].map((item, i) => (
                   <div key={i} className="flex flex-col items-center">
                      <div className="w-24 h-24 bg-neutral-950 border border-neutral-700 rounded-full flex flex-col items-center justify-center mb-6 shadow-xl relative z-10">
                         <span className="text-xs text-neutral-500 font-bold uppercase tracking-wider">Step</span>
                         <span className="text-2xl font-bold text-white">{item.step}</span>
                      </div>
                      <h3 className="text-xl font-bold text-white mb-1">{item.title}</h3>
                      <p className="text-neutral-500 text-sm">{item.sub}</p>
                   </div>
                ))}
             </div>

             <div className="mt-16">
               <a 
                 href="https://tidycal.com/purecreativitypro/purecreativity-blueprint-session"
                 target="_blank"
                 rel="noopener noreferrer"
                 className="text-amber-400 font-bold tracking-wide hover:text-white transition-colors flex items-center justify-center gap-2 mx-auto border-b border-amber-400/30 pb-1 hover:border-white cursor-pointer"
               >
                  START YOUR BLUEPRINT <ArrowRight size={14} />
               </a>
             </div>
         </div>
      </div>

      {/* 6) FINAL CTA BAND */}
      <div className="py-24 px-6 text-center bg-gradient-to-b from-neutral-950 to-amber-950/20">
         <div className="container mx-auto max-w-2xl">
            <h2 className="text-4xl font-display font-bold text-white mb-6">Not sure what to learn first?</h2>
            <p className="text-neutral-400 text-lg mb-8">
               Start with the Blueprint and we’ll point you to the right path.
            </p>
            <a 
               href="https://tidycal.com/purecreativitypro/purecreativity-blueprint-session"
               target="_blank"
               rel="noopener noreferrer"
               className="bg-white text-black px-10 py-5 rounded-full font-bold tracking-wide hover:bg-amber-400 transition-all shadow-2xl active:scale-95 cursor-pointer inline-block"
            >
               START YOUR BLUEPRINT
            </a>
         </div>
      </div>

      <footer className="bg-neutral-950 py-12 text-center text-neutral-600 text-xs tracking-[0.3em] font-sans border-t border-neutral-900 uppercase">
        PureCreativity.Learn // Knowledge is Power
      </footer>
    </div>
  );
};

const FreeCard: React.FC<{ title: string; desc: string; color: string }> = ({ title, desc, color }) => {
    // Dynamic color classes
    const colorClasses: Record<string, string> = {
        cyan: "hover:border-cyan-500/50 group-hover:text-cyan-400",
        orange: "hover:border-orange-500/50 group-hover:text-orange-400",
        fuchsia: "hover:border-fuchsia-500/50 group-hover:text-fuchsia-400",
        emerald: "hover:border-emerald-500/50 group-hover:text-emerald-400",
    };

    return (
        <a href="#" className={`block bg-neutral-950 border border-neutral-800 p-6 rounded-xl transition-all duration-300 group ${colorClasses[color]} hover:-translate-y-1`}>
            <div className="flex justify-between items-start mb-4">
                <BookOpen size={20} className="text-neutral-600 group-hover:text-white transition-colors" />
                <span className="text-[10px] font-bold uppercase tracking-wider bg-neutral-900 text-neutral-500 px-2 py-1 rounded group-hover:bg-white group-hover:text-black transition-colors">Free</span>
            </div>
            <h4 className="font-bold text-white mb-2 leading-tight">{title}</h4>
            <p className="text-neutral-500 text-xs leading-relaxed mb-4">{desc}</p>
            <div className="flex items-center gap-2 text-xs font-bold mt-auto opacity-0 group-hover:opacity-100 transition-opacity -translate-x-2 group-hover:translate-x-0 duration-300">
                GET FREE GUIDE <ArrowRight size={12} />
            </div>
        </a>
    );
};

const PriceCard: React.FC<{ price: string; tier: string; items: string[]; color: string; highlight?: boolean }> = ({ price, tier, items, color, highlight }) => (
    <div className={`bg-neutral-950 border ${highlight ? 'border-amber-500 shadow-[0_0_30px_rgba(245,158,11,0.15)]' : 'border-neutral-800'} p-8 rounded-2xl flex flex-col h-full`}>
        <div className="mb-6">
            <div className={`text-sm font-bold uppercase tracking-wider mb-2 ${highlight ? 'text-amber-400' : 'text-neutral-500'}`}>{tier}</div>
            <div className="flex items-baseline gap-1">
                <span className="text-4xl font-bold text-white">${price}</span>
            </div>
        </div>
        <ul className="space-y-4 mb-8 flex-1">
            {items.map((item, i) => (
                <li key={i} className="flex items-start gap-3 text-sm text-neutral-300">
                    <Check size={16} className={`shrink-0 mt-0.5 ${highlight ? 'text-amber-500' : 'text-neutral-600'}`} />
                    {item}
                </li>
            ))}
        </ul>
        <button className={`w-full py-3 rounded-lg font-bold text-sm transition-all active:scale-95 ${highlight ? 'bg-amber-500 text-black hover:bg-amber-400' : 'bg-neutral-800 text-white hover:bg-neutral-700'}`}>
            BUY NOW
        </button>
    </div>
);

export default Learn;