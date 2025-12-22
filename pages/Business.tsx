import React from 'react';
import Navigation from '../components/Navigation';
import { Target, TrendingUp, Users, Lightbulb, BarChart3, ArrowRight, CheckCircle2 } from 'lucide-react';

const Business: React.FC = () => {
  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 font-sans selection:bg-emerald-500/30 selection:text-emerald-200 relative overflow-x-hidden">
      <Navigation theme="business" />

      {/* Hero Section */}
      <div className="relative pt-32 pb-24 container mx-auto px-6 max-w-6xl">
        <div className="flex flex-col md:flex-row items-center gap-16">
           <div className="w-full md:w-1/2">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-emerald-500/30 bg-emerald-500/10 text-emerald-400 text-xs font-bold tracking-widest uppercase mb-8">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                  Business Intelligence
              </div>
              <h1 className="text-5xl md:text-7xl font-bold mb-8 leading-tight">
                Turn Your <br/>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-600">Ambition</span> Into <br/>
                Authority.
              </h1>
              <p className="text-zinc-400 text-lg leading-relaxed mb-10 border-l-2 border-emerald-500/20 pl-6">
                Most ideas stay ideas. We provide the strategic blueprint to define your niche, understand your customer avatar, and scale your side hustle into a dominant brand.
              </p>
              <button className="bg-emerald-600 text-white px-8 py-4 rounded font-bold tracking-wide hover:bg-emerald-500 transition-all shadow-[0_0_20px_rgba(5,150,105,0.3)] flex items-center gap-3 group">
                GET THE BLUEPRINT
                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </button>
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

      {/* The 4-Step Process Strip */}
      <div className="bg-zinc-900 border-y border-zinc-800 py-20">
          <div className="container mx-auto px-6 max-w-6xl">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                  {[
                      { icon: <Target />, step: "01", title: "Niche Down", desc: "Stop serving everyone. Become the only choice for someone." },
                      { icon: <Users />, step: "02", title: "Avatar", desc: "Psychographic profiling of your ideal customer." },
                      { icon: <Lightbulb />, step: "03", title: "Offer", desc: "Crafting irresistible products that solve real pain." },
                      { icon: <TrendingUp />, step: "04", title: "Scale", desc: "Automated funnels and messaging that converts." }
                  ].map((item, i) => (
                      <div key={i} className="group p-6 hover:bg-zinc-800/50 rounded-lg transition-colors border border-transparent hover:border-zinc-700/50">
                          <div className="flex justify-between items-start mb-6">
                              <div className="text-emerald-500 p-3 bg-emerald-950/30 rounded-lg">{item.icon}</div>
                              <span className="text-zinc-700 font-mono text-xl font-bold group-hover:text-zinc-500 transition-colors">{item.step}</span>
                          </div>
                          <h3 className="text-xl font-bold text-white mb-3">{item.title}</h3>
                          <p className="text-zinc-400 text-sm leading-relaxed">{item.desc}</p>
                      </div>
                  ))}
              </div>
          </div>
      </div>

      {/* Deep Dive Section */}
      <div className="container mx-auto px-6 max-w-5xl py-24">
          <div className="text-center mb-16">
              <h2 className="text-3xl md:text-5xl font-bold mb-6">Why most side hustles fail.</h2>
              <p className="text-zinc-400 max-w-2xl mx-auto">It's not lack of effort. It's lack of clarity. We strip away the noise and focus on the revenue-generating activities that matter.</p>
          </div>

          <div className="grid md:grid-cols-2 gap-12">
              <div className="bg-gradient-to-br from-zinc-900 to-black p-8 rounded-2xl border border-zinc-800">
                  <h3 className="text-2xl font-bold text-emerald-400 mb-6 flex items-center gap-3">
                      <BarChart3 size={24} /> Advertising Strategy
                  </h3>
                  <ul className="space-y-4">
                      {[
                          "Direct Response Copywriting",
                          "Meta & Google Ad Management",
                          "Creative Testing Frameworks",
                          "ROAS Optimization"
                      ].map((item, i) => (
                          <li key={i} className="flex items-start gap-3 text-zinc-300 text-sm">
                              <CheckCircle2 size={16} className="text-emerald-600 mt-1 shrink-0" />
                              {item}
                          </li>
                      ))}
                  </ul>
              </div>

              <div className="bg-gradient-to-br from-zinc-900 to-black p-8 rounded-2xl border border-zinc-800">
                  <h3 className="text-2xl font-bold text-emerald-400 mb-6 flex items-center gap-3">
                      <Users size={24} /> Brand Messaging
                  </h3>
                  <ul className="space-y-4">
                      {[
                          "Unique Value Proposition Design",
                          "StoryBrand Implementation",
                          "Email Marketing Sequences",
                          "Social Media Content Pillars"
                      ].map((item, i) => (
                          <li key={i} className="flex items-start gap-3 text-zinc-300 text-sm">
                              <CheckCircle2 size={16} className="text-emerald-600 mt-1 shrink-0" />
                              {item}
                          </li>
                      ))}
                  </ul>
              </div>
          </div>
      </div>

      {/* CTA */}
      <div className="bg-emerald-900/20 py-24 border-t border-emerald-900/50">
          <div className="container mx-auto px-6 text-center">
              <h2 className="text-4xl font-bold mb-8">Stop guessing. Start growing.</h2>
              <p className="text-emerald-200/60 mb-8">Schedule a strategic consultation to audit your business model.</p>
              <button className="px-10 py-4 bg-white text-emerald-900 font-bold rounded-full hover:scale-105 transition-transform">
                  BOOK CONSULTATION
              </button>
          </div>
      </div>

      <footer className="py-8 text-center text-zinc-600 text-xs font-mono bg-black">
        PureCreativity.Business // GROWTH_ENGINE
      </footer>

    </div>
  );
};

export default Business;