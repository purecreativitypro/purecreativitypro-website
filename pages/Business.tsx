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
              <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold mb-8 leading-tight tracking-tight break-words">
                Turn your talent into income — <br/>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-600">with a plan you can actually follow.</span>
              </h1>
              <p className="text-zinc-300 text-lg md:text-2xl leading-relaxed mb-10 border-l-2 border-emerald-500/20 pl-6 font-light">
                Whether you’re still choosing your side hustle or you’re ready to level up, we help you find the right direction, build an offer that fits you, and assemble the systems + content to grow it predictably.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
                  <a 
                    href="https://tidycal.com/purecreativitypro/purecreativity-blueprint-session"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-emerald-600 text-white px-8 py-4 rounded font-bold tracking-wide hover:bg-emerald-500 transition-all shadow-[0_0_20px_rgba(5,150,105,0.3)] flex items-center gap-3 group cursor-pointer"
                  >
                    START YOUR BLUEPRINT
                    <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                  </a>
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
                      { icon: <Search size={24} />, step: "01", title: "Discover", desc: "pick the right business path" },
                      { icon: <PenTool size={24} />, step: "02", title: "Design", desc: "build your offer + message" },
                      { icon: <Target size={24} />, step: "03", title: "Deploy", desc: "create assets + systems" },
                      { icon: <TrendingUp size={24} />, step: "04", title: "Scale", desc: "refine what works and grow predictably" }
                  ].map((item, i) => (
                      <div key={i} className="flex flex-col items-center text-center group">
                          <div className="w-16 h-16 rounded-full bg-zinc-950 border border-zinc-800 flex items-center justify-center text-emerald-500 mb-6 group-hover:border-emerald-500/50 group-hover:bg-emerald-950/20 transition-all">
                              {item.icon}
                          </div>
                          <div className="text-emerald-600 font-mono text-xs font-bold mb-2">STEP {item.step}</div>
                          <h3 className="text-xl font-bold text-zinc-100 mb-2">{item.title}</h3>
                          <p className="text-zinc-500 text-sm">{item.desc}</p>
                      </div>
                  ))}
              </div>
          </div>
      </div>

      {/* Offerings / Services */}
      <div className="py-24 container mx-auto px-6 max-w-6xl">
         <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">How we build it</h2>
            <p className="text-zinc-400">Everything you need to go from idea to income.</p>
         </div>
         
         <div className="grid md:grid-cols-3 gap-8">
            <ServiceCard 
               icon={<Lightbulb size={24}/>}
               title="Offer Design"
               desc="We help you package your skills into a high-value offer that people actually want to buy."
            />
            <ServiceCard 
               icon={<Layers size={24}/>}
               title="Funnel & Tech"
               desc="We build the landing pages, automations, and payment systems so you can sleep while you sell."
            />
            <ServiceCard 
               icon={<Users size={24}/>}
               title="Audience Growth"
               desc="Strategies to attract the right people without dancing on TikTok (unless you want to)."
            />
         </div>
      </div>

      {/* FAQ */}
      <div className="bg-zinc-900/30 border-y border-zinc-800/50 py-24">
          <div className="container mx-auto px-6 max-w-4xl">
              <h2 className="text-3xl font-bold mb-12 text-center">FAQ</h2>
              <div className="space-y-6">
                 {[
                    { q: "I have no idea what business to start.", a: "That's exactly why we start with the 'Discover' phase. We analyze your skills and market demand to find your best path." },
                    { q: "Is this for beginners?", a: "Yes. Whether you're at zero or $5k/mo, the principles of offer, system, and traffic remain the same." },
                    { q: "Do you build the tech for me?", a: "We have 'Done For You' tech options, or we can guide you through simple setups." }
                 ].map((faq, i) => (
                    <div key={i} className="bg-zinc-950 border border-zinc-800 p-6 rounded-lg">
                       <h4 className="font-bold text-zinc-200 mb-2 flex items-center gap-2"><HelpCircle size={16} className="text-emerald-500"/> {faq.q}</h4>
                       <p className="text-zinc-500 text-sm pl-6">{faq.a}</p>
                    </div>
                 ))}
              </div>
          </div>
      </div>

      <footer className="bg-zinc-950 py-12 text-center text-zinc-600 text-xs tracking-[0.3em] font-sans border-t border-emerald-900/10 uppercase">
        PureCreativity.Business // Build The Future
      </footer>
    </div>
  );
};

const ServiceCard: React.FC<{ icon: React.ReactNode; title: string; desc: string }> = ({ icon, title, desc }) => (
   <div className="p-8 border border-zinc-800 bg-zinc-900/20 hover:bg-zinc-900/50 transition-colors rounded-xl group">
      <div className="text-emerald-500 mb-4 group-hover:scale-110 transition-transform origin-left">{icon}</div>
      <h3 className="text-xl font-bold text-zinc-100 mb-3">{title}</h3>
      <p className="text-zinc-400 leading-relaxed text-sm">{desc}</p>
   </div>
);

export default Business;