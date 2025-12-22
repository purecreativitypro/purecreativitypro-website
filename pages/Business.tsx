import React, { useState } from 'react';
import Navigation from '../components/Navigation';
import ScannerModal from '../components/ScannerModal';
import { Target, TrendingUp, Users, Lightbulb, BarChart3, ArrowRight, CheckCircle2, Search, PenTool, Rocket, HelpCircle, Layers } from 'lucide-react';

const Business: React.FC = () => {
  const [isScannerOpen, setIsScannerOpen] = useState(false);

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 font-sans selection:bg-emerald-500/30 selection:text-emerald-200 relative overflow-x-hidden">
      <Navigation theme="business" />
      <ScannerModal isOpen={isScannerOpen} onClose={() => setIsScannerOpen(false)} theme="business" />

      {/* Hero Section */}
      <div className="relative pt-32 pb-24 container mx-auto px-6 max-w-6xl">
        <div className="flex flex-col md:flex-row items-center gap-16">
           <div className="w-full md:w-1/2">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-emerald-500/30 bg-emerald-500/10 text-emerald-400 text-xs font-bold tracking-widest uppercase mb-8">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                  PURECREATIVITY BUSINESS — THE ENTREPRENEURSHIP STUDIO
              </div>
              <h1 className="text-5xl md:text-7xl font-bold mb-8 leading-tight tracking-tight">
                Turn your talent into income — <br/>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-600">with a plan you can actually follow.</span>
              </h1>
              <p className="text-zinc-300 text-xl md:text-2xl leading-relaxed mb-10 border-l-2 border-emerald-500/20 pl-6 font-light">
                Whether you’re still choosing your side hustle or you’re ready to level up, we help you find the right direction, build an offer that fits you, and assemble the systems + content to grow it predictably.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
                  <button className="bg-emerald-600 text-white px-8 py-4 rounded font-bold tracking-wide hover:bg-emerald-500 transition-all shadow-[0_0_20px_rgba(5,150,105,0.3)] flex items-center gap-3 group">
                    START YOUR BLUEPRINT
                    <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                  </button>
                  <button 
                    onClick={() => setIsScannerOpen(true)}
                    className="text-sm font-bold text-zinc-400 hover:text-emerald-400 transition-colors flex items-center gap-2"
                  >
                    Take the 10-minute Clarity Scan <ArrowRight size={14}/>
                  </button>
              </div>
           </div>
           
           {/* Abstract Chart Visual */}
           <div className="w-full md:w-1/2 relative">
              {/* Optimized Glow: Reduced opacity and complexity */}
              <div className="absolute inset-0 bg-emerald-500/10 blur-[60px] rounded-full pointer-events-none"></div>
              
              <div className="relative bg-zinc-900 border border-zinc-800 p-8 rounded-xl shadow-2xl">
                  <div className="flex justify-between items-end h-64 gap-4">
                      {/* Optimized Bars: Using scaleY instead of height to animate without layout shifts */}
                      {[0.3, 0.45, 0.35, 0.6, 0.5, 0.75, 0.65, 0.9].map((h, i) => (
                          <div key={i} className="w-full bg-zinc-800 rounded-t-sm relative group overflow-hidden h-full flex items-end">
                              <div 
                                style={{ transform: `scaleY(${h})` }} 
                                className="w-full h-full origin-bottom bg-gradient-to-t from-emerald-900 to-emerald-500 transition-transform duration-1000 ease-out group-hover:to-emerald-300"
                              ></div>
                          </div>
                      ))}
                  </div>
                  <div className="mt-6 flex justify-between text-xs text-zinc-500 font-mono uppercase tracking-wider">
                      <span>Q1</span>
                      <span>Strategy</span>
                      <span>Execution</span>
                      <span>Q4</span>
                  </div>
              </div>
           </div>
        </div>
      </div>

      {/* PROBLEM SECTION */}
      <div className="bg-zinc-900/30 border-y border-zinc-800/50 py-24">
          <div className="container mx-auto px-6 max-w-5xl">
             <div className="grid md:grid-cols-2 gap-12 items-center">
                <div>
                   <h2 className="text-3xl md:text-4xl font-bold mb-6">You’re not lazy. You’re unstructured.</h2>
                   <p className="text-zinc-400 text-lg leading-relaxed">
                      Most people don’t fail because they lack talent — they fail because they never turn talent into a clear offer, a simple system, and consistent execution.
                   </p>
                </div>
                <div className="space-y-4">
                   {[
                      "You have skills, but you don’t know what business to build",
                      "You have ideas, but you can’t pick the right one",
                      "You’re doing a lot… but not building momentum"
                   ].map((item, i) => (
                      <div key={i} className="flex gap-3 items-start p-4 bg-zinc-900 border border-zinc-800 rounded-lg">
                          <div className="min-w-[8px] h-[8px] rounded-full bg-emerald-500 mt-2"></div>
                          <p className="text-zinc-300">{item}</p>
                      </div>
                   ))}
                </div>
             </div>
          </div>
      </div>

      {/* GUIDE SECTION */}
      <div className="py-24 container mx-auto px-6 max-w-4xl text-center">
         <h2 className="text-3xl font-bold mb-6">You don’t need a million tools. You need a blueprint.</h2>
         <p className="text-zinc-400 text-xl leading-relaxed max-w-2xl mx-auto">
            PureCreativity exists for builders: side hustlers, creatives, and entrepreneurs who want a clear path and real execution. We help you simplify decisions, make progress fast, and turn your vision into something real.
         </p>
      </div>

      {/* THE PLAN (Previously 4-step process) */}
      <div className="bg-zinc-900 border-y border-zinc-800 py-20">
          <div className="container mx-auto px-6 max-w-6xl">
              <div className="text-center mb-12">
                  <h2 className="text-3xl font-bold">The Plan</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                  {[
                      { icon: <Search />, step: "01", title: "Discover", desc: "pick the right business path" },
                      { icon: <PenTool />, step: "02", title: "Design", desc: "build your offer + message" },
                      { icon: <Target />, step: "03", title: "Deploy", desc: "create assets + systems" },
                      { icon: <TrendingUp />, step: "04", title: "Scale", desc: "refine what works and grow predictably" }
                  ].map((item, i) => (
                      <div key={i} className="group p-6 hover:bg-zinc-800/50 rounded-lg transition-colors border border-transparent hover:border-zinc-700/50">
                          <div className="flex justify-between items-start mb-6">
                              <div className="text-emerald-500 p-3 bg-emerald-950/30 rounded-lg">{item.icon}</div>
                              <span className="text-zinc-700 font-mono text-xl font-bold group-hover:text-emerald-500/50 transition-colors">{item.step}</span>
                          </div>
                          <h3 className="text-xl font-bold text-white mb-3">{item.title}</h3>
                          <p className="text-zinc-400 text-sm leading-relaxed">{item.desc}</p>
                      </div>
                  ))}
              </div>
          </div>
      </div>

      {/* ONE STUDIO / FOUR WEAPONS */}
      <div className="py-24 container mx-auto px-6 max-w-5xl">
         <div className="bg-zinc-900/50 border border-zinc-800 rounded-2xl p-8 md:p-12">
             <div className="md:flex gap-12 items-center">
                 <div className="md:w-1/2 mb-8 md:mb-0">
                     <h2 className="text-3xl font-bold mb-4">One studio. Four weapons.</h2>
                     <p className="text-zinc-400">When it’s time to execute, we pull the right tools for the job:</p>
                 </div>
                 <div className="md:w-1/2 grid grid-cols-1 gap-4">
                     {[
                         { label: "Business", desc: "clarity, niche, offer design, pricing, plan", color: "text-emerald-400" },
                         { label: "Tech", desc: "smart systems, automations, web apps, client portals", color: "text-cyan-400" },
                         { label: "Media", desc: "content creation + AI enhancement + repurposing", color: "text-orange-400" },
                         { label: "Music", desc: "sonic identity, scoring, sound assets when needed", color: "text-fuchsia-400" }
                     ].map((item, i) => (
                         <div key={i} className="flex items-start gap-3 text-sm">
                             <span className={`font-bold uppercase tracking-wider ${item.color} w-20 shrink-0`}>{item.label}</span>
                             <span className="text-zinc-300">{item.desc}</span>
                         </div>
                     ))}
                 </div>
             </div>
         </div>
      </div>

      {/* SERVICE CARDS (Replaces Deep Dive) */}
      <div className="container mx-auto px-6 max-w-6xl py-12">
          <div className="grid md:grid-cols-3 gap-8">
              {[
                  { title: "Find Your Business Path", desc: "If you don’t know what to build, we’ll help you pick a direction that fits you skills, lifestyle, and market demand.", icon: <Search /> },
                  { title: "Build an Offer That Sells", desc: "We shape your product/service into something clear, valuable, and easy to say yes to — with a simple delivery plan.", icon: <Target /> },
                  { title: "Build the Engine", desc: "We assemble the assets and systems that create predictable growth: content, follow-up, automation, and simple metrics.", icon: <Rocket /> }
              ].map((item, i) => (
                  <div key={i} className="bg-gradient-to-br from-zinc-900 to-black p-8 rounded-2xl border border-zinc-800 hover:border-emerald-500/30 transition-colors group">
                      <div className="text-emerald-500 mb-6 p-3 bg-emerald-950/20 inline-block rounded-lg group-hover:scale-110 transition-transform">{item.icon}</div>
                      <h3 className="text-xl font-bold text-white mb-4">{item.title}</h3>
                      <p className="text-zinc-400 leading-relaxed text-sm">{item.desc}</p>
                  </div>
              ))}
          </div>
      </div>

      {/* SUCCESS PICTURE */}
      <div className="py-24 bg-zinc-900/20">
          <div className="container mx-auto px-6 max-w-4xl">
              <h2 className="text-3xl font-bold mb-10 text-center">What changes when you have a blueprint</h2>
              <div className="grid md:grid-cols-2 gap-x-12 gap-y-6">
                  {[
                      "You stop second-guessing and start executing",
                      "You know what to sell and who it’s for",
                      "Your content and systems work together",
                      "Growth becomes predictable instead of random"
                  ].map((item, i) => (
                      <div key={i} className="flex items-center gap-3">
                          <CheckCircle2 className="text-emerald-500" size={20} />
                          <span className="text-zinc-300 text-lg">{item}</span>
                      </div>
                  ))}
              </div>
          </div>
      </div>

      {/* FAQ SECTION */}
      <div className="py-24 container mx-auto px-6 max-w-3xl">
          <h2 className="text-3xl font-bold mb-12 text-center">FAQ</h2>
          <div className="space-y-6">
              {[
                  { q: "What if I don’t know what business to start?", a: "Perfect — that’s what the first step is for. We help you choose a path that fits you and the market." },
                  { q: "What if I already have an idea?", a: "Great — we’ll validate it, sharpen the offer, and build the execution plan." },
                  { q: "Do you just give advice, or do you build?", a: "Both. We can deliver the blueprint, and we can also build the assets and systems across Tech/Media/Music as needed." },
                  { q: "Is this only for full-time entrepreneurs?", a: "No. It’s designed for side hustlers and small teams who need clarity and momentum." }
              ].map((item, i) => (
                  <div key={i} className="border-b border-zinc-800 pb-6">
                      <h4 className="font-bold text-lg mb-2 text-zinc-200 flex items-start gap-3">
                        <HelpCircle size={18} className="text-emerald-500 mt-1 shrink-0" />
                        {item.q}
                      </h4>
                      <p className="text-zinc-500 pl-8 text-sm leading-relaxed">{item.a}</p>
                  </div>
              ))}
          </div>
      </div>

      {/* CTA BAND */}
      <div className="bg-emerald-900/20 py-24 border-t border-emerald-900/50">
          <div className="container mx-auto px-6 text-center">
              <h2 className="text-4xl font-bold mb-4">Stop guessing. Start building.</h2>
              <p className="text-emerald-200/60 mb-8 max-w-2xl mx-auto">If you’ve got talent and a desire to build, you’re in the right place. Let’s turn it into something real.</p>
              <button className="px-10 py-5 bg-white text-emerald-900 font-bold rounded-full hover:scale-105 transition-transform shadow-[0_0_30px_rgba(255,255,255,0.1)]">
                  START YOUR BLUEPRINT
              </button>
          </div>
      </div>

      <footer className="bg-zinc-950 py-12 text-center text-zinc-600 text-xs tracking-[0.3em] font-sans border-t border-emerald-900/10 uppercase">
        PureCreativity.Business // The Blueprint
      </footer>

    </div>
  );
};

export default Business;