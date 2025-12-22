import React from 'react';
import Navigation from '../components/Navigation';
import { Terminal, Bot, Code2, Smartphone, Zap, Database } from 'lucide-react';

const Tech: React.FC = () => {
  return (
    <div className="min-h-screen bg-slate-950 text-cyan-400 font-mono selection:bg-cyan-900 selection:text-white relative overflow-x-hidden">
      <Navigation theme="tech" />
      
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
          <h4 className="text-cyan-600 mb-2 uppercase tracking-widest text-sm flex items-center gap-2">
            <span className="animate-pulse w-2 h-2 bg-cyan-500 rounded-full"></span>
            System Online
          </h4>
          <h1 className="text-4xl md:text-7xl font-bold mb-6 text-white leading-tight">
            Efficient Systems for <br />
            {/* Mobile Glitch Effect via CSS animation keyframes defined in tailwind config or arbitrary values if needed, sticking to standard class composition here */}
            <span className="text-cyan-400 animate-pulse md:animate-none">The Modern Entrepreneur</span>
          </h1>
          <p className="text-slate-400 max-w-2xl text-lg mb-8 leading-relaxed">
            PureCreativity Tech specializes in bridging the gap between ambition and execution. 
            We build intelligent web applications, automate workflows, and consult on AI integration 
            to reclaim your time.
          </p>
          <button className="group border border-cyan-500 text-cyan-500 px-8 py-3 hover:bg-cyan-500/10 transition-all flex items-center gap-3 active:scale-95">
            <Terminal size={18} />
            <span>INITIALIZE_PROJECT</span>
            <span className="block w-2 h-4 bg-cyan-500 animate-pulse"></span>
          </button>
        </div>
      </div>

      {/* Services Matrix */}
      <div className="container mx-auto px-6 max-w-6xl py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          
          <ServiceCard 
            icon={<Bot className="text-cyan-300" size={32} />}
            title="AI & Automation"
            code="consulting.init()"
            description="We analyze your business bottlenecks and implement custom AI agents and automation scripts to handle repetitive tasks."
            delay={0}
          />
          
          <ServiceCard 
            icon={<Smartphone className="text-cyan-300" size={32} />}
            title="PWA Development"
            code="app.build({ mobile: true })"
            description="Next-gen Progressive Web Apps that work offline, load instantly, and provide a native experience without the app store hassle."
            delay={1}
          />

          <ServiceCard 
            icon={<Code2 className="text-cyan-300" size={32} />}
            title="SaaS Solutions"
            code="scale.up()"
            description="Robust, scalable Software as a Service platforms built on modern React architectures tailored for side-hustlers."
            delay={2}
          />

        </div>
      </div>

      {/* Feature Section */}
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
              You don't need to be a developer to wield the power of code. We translate your business logic into digital systems that work while you sleep.
            </p>
            <ul className="space-y-3">
              {[
                "Custom Dashboard Creation",
                "API Integration & Development",
                "Database Architecture",
                "Performance Optimization"
              ].map((item, i) => (
                <li key={i} className="flex items-center gap-2 text-cyan-200">
                  <Zap size={16} /> {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
      
      <footer className="py-8 text-center text-slate-600 text-xs font-mono border-t border-slate-900">
        PureCreativity.Tech // SYSTEM.END
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