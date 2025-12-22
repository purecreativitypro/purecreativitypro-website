import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Navigation from '../components/Navigation';
import ScannerModal from '../components/ScannerModal';
import { Terminal, Bot, Code2, Smartphone, Zap, Database, ArrowRight, CheckCircle2 } from 'lucide-react';

const Tech: React.FC = () => {
  const [isScannerOpen, setIsScannerOpen] = useState(false);

  return (
    <div className="min-h-screen bg-slate-950 text-cyan-400 font-mono selection:bg-cyan-900 selection:text-white relative overflow-x-hidden">
      <Navigation theme="tech" />
      <ScannerModal isOpen={isScannerOpen} onClose={() => setIsScannerOpen(false)} theme="tech" />
      
      {/* Grid Background Effect - Optimized */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-20" 
        style={{
          backgroundImage: 'linear-gradient(#083344 1px, transparent 1px), linear-gradient(90deg, #083344 1px, transparent 1px)',
          backgroundSize: '24px 24px',
          maskImage: 'radial-gradient(circle at center, black 0%, transparent 80%)',
          WebkitMaskImage: 'radial-gradient(circle at center, black 0%, transparent 80%)'
        }}
      />

      {/* Hero */}
      <div className="relative pt-32 pb-16 container mx-auto px-6 max-w-6xl">
        <div className="flex flex-col items-start border-l-2 border-cyan-500/30 pl-8 ml-4 md:ml-0">
          <h4 className="text-cyan-600 mb-4 uppercase tracking-widest text-sm font-bold flex items-center gap-2">
            <span className="animate-pulse w-2 h-2 bg-cyan-500 rounded-full"></span>
            SYSTEM ONLINE — YOUR OPERATIONS, SIMPLIFIED
          </h4>
          <h1 className="text-5xl md:text-7xl font-bold mb-8 text-white leading-tight tracking-tight">
            Stop Doing Busywork. <br />
            {/* Mobile Glitch Effect via CSS animation keyframes defined in tailwind config or arbitrary values if needed, sticking to standard class composition here */}
            <span className="text-cyan-400 animate-pulse md:animate-none">Run Your Business on Smart Systems.</span>
          </h1>
          <p className="text-slate-300 max-w-3xl text-xl md:text-2xl mb-8 leading-relaxed font-light">
            You’re building something real — but your time is getting eaten by admin, follow-ups, and duct-taped tools.
            PureCreativity Tech designs simple automations and lightweight web apps that remove friction, protect your data, and give you hours back every week.
          </p>
          
          {/* Alignment Line */}
          <p className="text-cyan-200/80 font-mono text-sm mb-10">
             &gt; Already have an offer? We’ll build the system that runs it.
          </p>

          <div className="flex flex-col md:flex-row gap-6 items-start">
            <div className="flex flex-col">
                <button className="group border border-cyan-500 text-cyan-500 px-8 py-3 hover:bg-cyan-500/10 transition-all flex items-center gap-3 active:scale-95">
                    <Terminal size={18} />
                    <span>START A PROJECT</span>
                    <span className="block w-2 h-4 bg-cyan-500 animate-pulse"></span>
                </button>
                <button 
                  onClick={() => setIsScannerOpen(true)}
                  className="text-xs text-slate-500 mt-2 font-mono ml-1 hover:text-cyan-400 transition-colors text-left"
                >
                  &gt; Initialize 10-minute systems scan
                </button>
            </div>
            <a href="#" className="group text-slate-400 hover:text-cyan-400 transition-colors flex items-center gap-2 text-sm md:mt-3.5 pb-0.5">
                <span className="border-b border-transparent group-hover:border-cyan-400 transition-colors">See what we build</span>
                <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
            </a>
          </div>
          
          {/* Secondary Blueprint CTA */}
          <Link to="/business" className="mt-6 text-xs text-slate-500 hover:text-cyan-400 transition-colors flex items-center gap-2 group">
              Not sure where to start? Start with the Blueprint <ArrowRight size={12} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>

      {/* Services Matrix */}
      <div className="container mx-auto px-6 max-w-6xl py-16">
        {/* Best For Line */}
        <div className="mb-10 text-xs font-mono text-slate-500 tracking-wide border-b border-cyan-900/30 pb-4 inline-block">
            <span className="text-cyan-500 font-bold mr-2">&gt; BEST FOR:</span> 
            automations, client portals, payments, internal workflows, lightweight SaaS/PWAs.
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          
          <ServiceCard 
            icon={<Bot className="text-cyan-300" size={32} />}
            title="AI & Automation"
            code="workflow.optimize()"
            description="Stop repeating yourself. We automate the tasks that steal your focus — messages, data entry, follow-ups, file handling, and internal workflows — so your business runs even when you’re offline."
            delay={0}
          />
          
          <ServiceCard 
            icon={<Smartphone className="text-cyan-300" size={32} />}
            title="PWA Development"
            code="app.deploy({ mobile: true })"
            description="Want an “app” without app-store headaches? We build fast, installable Progressive Web Apps that feel native, load instantly, and keep your team moving from any device."
            delay={1}
          />

          <ServiceCard 
            icon={<Code2 className="text-cyan-300" size={32} />}
            title="SaaS Solutions"
            code="scale.up()"
            description="Turn your process into a product. We build secure, scalable web platforms — from client portals to multi-tenant SaaS — designed to grow without complexity."
            delay={2}
          />

        </div>
      </div>

      {/* Feature Section: Code is Leverage */}
      <div className="border-t border-cyan-900/30 bg-slate-900/50 py-20 relative">
        <div className="container mx-auto px-6 max-w-6xl flex flex-col md:flex-row items-center gap-12">
          <div className="w-full md:w-1/2">
             <div className="bg-slate-950 border border-slate-800 rounded-lg p-4 shadow-2xl relative overflow-hidden group">
                {/* Mobile scanline effect */}
                <div className="absolute inset-0 bg-cyan-500/10 h-1 w-full animate-[float_3s_ease-in-out_infinite] md:hidden pointer-events-none opacity-50"></div>
                
                <div className="flex gap-2 mb-4">
                  <div className="w-3 h-3 rounded-full bg-red-500"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                  <div className="w-3 h-3 rounded-full bg-green-500"></div>
                </div>
                <div className="space-y-2 font-mono text-sm">
                  <div className="flex">
                    <span className="text-slate-500 mr-4">01</span>
                    <span className="text-purple-400">const</span> <span className="text-blue-400">businessGrowth</span> = <span className="text-yellow-300">async</span> () ={'>'} {'{'}
                  </div>
                  <div className="flex">
                    <span className="text-slate-500 mr-4">02</span>
                    <span className="ml-4 text-slate-300">await</span> <span className="text-green-400">PureCreativity</span>.optimize({'{'}
                  </div>
                  <div className="flex">
                    <span className="text-slate-500 mr-4">03</span>
                    <span className="ml-8 text-cyan-300">efficiency</span>: <span className="text-orange-400">"MAXIMUM"</span>,
                  </div>
                  <div className="flex">
                    <span className="text-slate-500 mr-4">04</span>
                    <span className="ml-8 text-cyan-300">techStack</span>: <span className="text-orange-400">["AI", "React", "Cloud"]</span>
                  </div>
                  <div className="flex">
                    <span className="text-slate-500 mr-4">05</span>
                    <span className="ml-4">{'}'});</span>
                  </div>
                  <div className="flex">
                    <span className="text-slate-500 mr-4">06</span>
                    <span className="text-slate-300">return</span> <span className="text-green-400">profit</span>;
                  </div>
                  <div className="flex">
                    <span className="text-slate-500 mr-4">07</span>
                    <span>{'}'}</span>
                  </div>
                </div>
             </div>
          </div>
          <div className="w-full md:w-1/2">
            <h3 className="text-2xl font-bold text-white mb-4">Code is Leverage.</h3>
            <p className="text-slate-400 mb-6">
              You don't need to be a developer to benefit from software.
              We translate what you do manually into clean, reliable systems — so your business is easier to run, easier to scale, and harder to break.
            </p>
            <ul className="space-y-3 mb-8">
              {[
                "Client Portals & Admin Dashboards",
                "Payments, Scheduling & Tool Integrations",
                "Databases, Reporting & Clean Data Flow",
                "Performance, Security & Long-Term Maintainability"
              ].map((item, i) => (
                <li key={i} className="flex items-center gap-2 text-cyan-200">
                  <Zap size={16} /> {item}
                </li>
              ))}
            </ul>
            <button className="text-cyan-400 font-bold hover:text-white transition-colors flex items-center gap-2">
                &gt; REQUEST A BUILD QUOTE
            </button>
          </div>
        </div>
      </div>
      
      {/* The Plan Section */}
      <div className="container mx-auto px-6 max-w-6xl py-20 border-t border-cyan-900/30">
          <h2 className="text-3xl font-bold text-white mb-12 text-center">The Plan</h2>
          <div className="grid md:grid-cols-3 gap-8">
              {[
                  { step: "01", title: "Describe the bottleneck", desc: "what’s slowing you down" },
                  { step: "02", title: "We build the system", desc: "automation or app — simple + secure" },
                  { step: "03", title: "You run lighter", desc: "launch + handoff + support" }
              ].map((item, i) => (
                  <div key={i} className="relative bg-slate-900/50 border border-slate-800 p-8 hover:bg-slate-900 transition-colors group">
                      <div className="text-4xl font-bold text-slate-800 absolute top-4 right-4 font-mono group-hover:text-cyan-900/50 transition-colors">{item.step}</div>
                      <div className="w-10 h-10 border border-cyan-500/50 flex items-center justify-center text-cyan-400 mb-6 rounded-full bg-cyan-950/30">
                          {i === 0 && <Database size={18} />}
                          {i === 1 && <Code2 size={18} />}
                          {i === 2 && <Zap size={18} />}
                      </div>
                      <h3 className="text-xl font-bold text-white mb-2">{item.title}</h3>
                      <p className="text-slate-400 text-sm">({item.desc})</p>
                  </div>
              ))}
          </div>
          <div className="mt-12 text-center">
              <button 
                onClick={() => setIsScannerOpen(true)}
                className="group bg-cyan-600 text-white px-8 py-3 font-bold hover:bg-cyan-500 transition-all shadow-[0_0_20px_rgba(8,145,178,0.4)] active:scale-95 inline-flex items-center gap-2"
              >
                  &gt; RUN SYSTEMS SCAN
              </button>
          </div>
      </div>

      {/* What This Unlocks Section */}
      <div className="bg-slate-900/30 border-t border-cyan-900/30 py-20">
          <div className="container mx-auto px-6 max-w-4xl text-center">
              <h2 className="text-3xl font-bold text-white mb-10">What This Unlocks</h2>
              <div className="grid md:grid-cols-2 gap-x-12 gap-y-6 text-left">
                  {[
                      "Your operations stop living in your head",
                      "Leads and customers get faster responses",
                      "You spend more time selling, serving, and creating",
                      "Your tools finally work together"
                  ].map((item, i) => (
                      <div key={i} className="flex items-start gap-3">
                          <CheckCircle2 className="text-cyan-500 mt-1 shrink-0" size={20} />
                          <span className="text-slate-300 text-lg">{item}</span>
                      </div>
                  ))}
              </div>
          </div>
      </div>

      <footer className="bg-slate-950 py-12 text-center text-slate-600 text-xs tracking-[0.3em] font-mono border-t border-cyan-900/10 uppercase">
        PureCreativity.Tech // Code is Leverage
      </footer>
    </div>
  );
};

const ServiceCard: React.FC<{ icon: React.ReactNode; title: string; code: string; description: string; delay: number }> = ({ icon, title, code, description, delay }) => (
  // Added conditional animation for mobile: animate-pulse on the border-color to simulate scanning
  <div 
    className="bg-slate-900 border border-slate-800 p-6 hover:border-cyan-500/50 transition-colors group cursor-default md:animate-none animate-[pulse_4s_cubic-bezier(0.4,0,0.6,1)_infinite]"
    style={{ animationDelay: `${delay * 1}s` }}
  >
    <div className="mb-4 p-3 bg-slate-950 inline-block rounded border border-slate-800 group-hover:text-cyan-400 transition-colors">{icon}</div>
    <div className="font-mono text-xs text-slate-500 mb-2">{code}</div>
    <h3 className="text-xl font-bold text-white mb-3">{title}</h3>
    <p className="text-slate-400 text-sm leading-relaxed">{description}</p>
  </div>
);

export default Tech;