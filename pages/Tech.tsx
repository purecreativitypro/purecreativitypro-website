import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import Navigation from '../components/Navigation';
import ScannerModal from '../components/ScannerModal';
import { Terminal, Bot, Code2, Smartphone, Zap, ArrowRight, CheckCircle2 } from 'lucide-react';
import SEOHead, { createServiceSchema, createFAQSchema } from '../components/SEOHead';
import Footer from '../components/Footer';
import ScrollReveal from '../components/ScrollReveal';
import CaseStudyCard from '../components/CaseStudyCard';
import SocialProofBar from '../components/SocialProofBar';
import FAQAccordion from '../components/FAQAccordion';
import CrossStudioLinks from '../components/CrossStudioLinks';
import ContactForm from '../components/ContactForm';
import TestimonialQuote from '../components/TestimonialQuote';

const Tech: React.FC = () => {
  const [isScannerOpen, setIsScannerOpen] = useState(false);
  const [codeStep, setCodeStep] = useState(0);
  const codeRef = useRef<HTMLDivElement>(null);
  const [startTyping, setStartTyping] = useState(false);

  // Start typing on page load (hero is always visible)
  useEffect(() => {
    const timer = setTimeout(() => setStartTyping(true), 600);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (startTyping && codeStep < 8) {
      const timeout = setTimeout(() => {
        setCodeStep(prev => prev + 1);
      }, 500);
      return () => clearTimeout(timeout);
    }
  }, [startTyping, codeStep]);

  const codeLines = [
    { id: "01", content: <><span className="text-purple-400">const</span> <span className="text-blue-400">businessGrowth</span> = <span className="text-yellow-300">async</span> () ={">"} {"{"}</> },
    { id: "02", content: <><span className="ml-4 text-slate-300">await</span> <span className="text-green-400">PureCreativity</span>.optimize({"{"}</> },
    { id: "03", content: <><span className="ml-8 text-cyan-300">efficiency</span>: <span className="text-orange-400">"MAXIMUM"</span>,</> },
    { id: "04", content: <><span className="ml-8 text-cyan-300">techStack</span>: <span className="text-orange-400">["AI", "React", "Cloud"]</span></> },
    { id: "05", content: <><span className="ml-4">{"}"});</span></> },
    { id: "06", content: <><span className="text-slate-300">return</span> <span className="text-green-400">profit</span>;</> },
    { id: "07", content: <>{"}"}</> }
  ];

  const faqItems = [
    { q: "Do I need to be technical to work with you?", a: "Not at all. You describe the problem; we build the solution. We handle all the code, hosting, and deployment." },
    { q: "How long does a typical project take?", a: "Most automations are live within 1-2 weeks. Larger apps (PWAs, SaaS) typically take 4-8 weeks depending on scope." },
    { q: "What if I don't know what I need?", a: "Start with a free systems scan. We'll identify your biggest bottlenecks and recommend the simplest solution." },
    { q: "Do you offer support after launch?", a: "Yes. Every build comes with a support window, and we offer ongoing maintenance plans for larger systems." },
    { q: "What's the cost?", a: "Projects range from $500 (automations) to $5K+ (full apps). We scope everything upfront — no surprises." },
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-cyan-400 font-mono selection:bg-cyan-900 selection:text-white relative overflow-x-hidden">
      <SEOHead
        title="Tech — AI, Automation & Web Apps"
        description="Stop doing busywork. PureCreativity Tech designs simple automations, lightweight web apps, and AI-powered systems that remove friction and give you hours back every week."
        path="/tech"
        jsonLd={[createServiceSchema('PureCreativity Tech', 'AI automation, PWA development, and SaaS solutions for entrepreneurs and small businesses.', '/tech'), createFAQSchema(faqItems.map(f => ({ question: f.q, answer: f.a })))]}
      />
      <Navigation theme="tech" />
      <ScannerModal isOpen={isScannerOpen} onClose={() => setIsScannerOpen(false)} theme="tech" />

      {/* Grid Background Effect */}
      <div
        className="absolute inset-0 pointer-events-none opacity-20"
        style={{
          backgroundImage: 'linear-gradient(#083344 1px, transparent 1px), linear-gradient(90deg, #083344 1px, transparent 1px)',
          backgroundSize: '24px 24px',
          maskImage: 'radial-gradient(circle at center, black 0%, transparent 80%)',
          WebkitMaskImage: 'radial-gradient(circle at center, black 0%, transparent 80%)'
        }}
      />

      {/* HERO — Split Layout: Text Left, Terminal Right */}
      <div className="relative pt-32 pb-16 container mx-auto px-6 max-w-6xl">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left: Text */}
          <div className="border-l-2 border-cyan-500/30 pl-8">
            <h4 className="text-cyan-600 mb-4 uppercase tracking-widest text-sm font-bold flex items-center gap-2">
              <span className="animate-pulse w-2 h-2 bg-cyan-500 rounded-full" />
              PureCreativity Tech
            </h4>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-8 text-white leading-tight tracking-tight break-words font-sans">
              Stop Doing Busywork.<br />
              <span className="text-cyan-400">Run Smart Systems.</span>
            </h1>
            <p className="text-slate-300 text-lg md:text-xl mb-4 leading-relaxed font-light font-sans">
              Your time is getting eaten by admin, follow-ups, and duct-taped tools.
              We design simple automations and lightweight web apps that give you hours back every week.
            </p>

            <p className="text-cyan-200/80 font-mono text-sm mb-10">
              &gt; Already have an offer? We'll build the system that runs it.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 items-start">
              <a
                href="https://tidycal.com/purecreativitypro/purecreativity-blueprint-session"
                target="_blank"
                rel="noopener noreferrer"
                className="group border border-cyan-500 text-cyan-500 px-8 py-3 hover:bg-cyan-500/10 transition-all flex items-center gap-3 active:scale-95 cursor-pointer"
              >
                <Terminal size={18} />
                <span>START A PROJECT</span>
                <span className="block w-2 h-4 bg-cyan-500 animate-pulse" />
              </a>
              <button
                onClick={() => setIsScannerOpen(true)}
                className="text-xs text-slate-500 mt-2 sm:mt-3 font-mono hover:text-cyan-400 transition-colors py-3"
              >
                &gt; Initialize systems scan
              </button>
            </div>

            <Link to="/business" className="mt-6 text-xs text-slate-500 hover:text-cyan-400 transition-colors flex items-center gap-2 group py-3">
              Not sure where to start? Start with the Blueprint <ArrowRight size={12} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          {/* Right: Floating Terminal Window — Always visible */}
          <div className="hidden md:block">
            <div
              ref={codeRef}
              className="bg-slate-950 border border-slate-800 rounded-lg p-5 shadow-[0_0_40px_rgba(8,145,178,0.15)] relative overflow-hidden"
            >
              {/* Scanline effect */}
              <div className="absolute inset-0 bg-gradient-to-b from-cyan-500/5 to-transparent h-1 w-full animate-[float_3s_ease-in-out_infinite] pointer-events-none opacity-50" />

              <div className="flex gap-2 mb-4">
                <div className="w-3 h-3 rounded-full bg-red-500" />
                <div className="w-3 h-3 rounded-full bg-yellow-500" />
                <div className="w-3 h-3 rounded-full bg-green-500" />
                <span className="text-[10px] text-slate-600 ml-2 mt-0.5">purecreativity.sh</span>
              </div>

              <div className="space-y-2 font-mono text-sm">
                {codeLines.map((line, i) => (
                  <div key={line.id} className={`flex ${i < codeStep ? 'opacity-100' : 'opacity-0'} transition-opacity duration-300`}>
                    <span className="text-slate-500 mr-4 select-none">{line.id}</span>
                    <div className="relative">
                      {line.content}
                      {(i === codeStep - 1 && codeStep <= 7) && (
                        <span className="inline-block w-2 h-4 bg-cyan-500 ml-1 align-middle animate-pulse" />
                      )}
                    </div>
                  </div>
                ))}
                {codeStep > 7 && (
                  <div className="flex">
                    <span className="text-slate-500 mr-4 select-none">08</span>
                    <span className="inline-block w-2 h-4 bg-cyan-500 animate-pulse" />
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* SOCIAL PROOF BAR */}
      <SocialProofBar
        accentColor="cyan"
        stats={[
          { value: 500, suffix: '+', label: 'Automations Deployed' },
          { value: 98, suffix: '%', label: 'Uptime' },
          { value: 48, prefix: '<', suffix: 'hr', label: 'First Draft' },
        ]}
      />

      {/* SERVICES BENTO GRID */}
      <div className="container mx-auto px-6 max-w-6xl py-20">
        <ScrollReveal direction="up" distance={20}>
          <div className="mb-12">
            <div className="text-xs font-mono text-slate-500 tracking-wide border-b border-cyan-900/30 pb-4 inline-block">
              <span className="text-cyan-500 font-bold mr-2">&gt; BEST FOR:</span>
              automations, client portals, payments, internal workflows, lightweight SaaS/PWAs.
            </div>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-6 gap-4 auto-rows-[200px] md:auto-rows-[260px]">
          {/* AI & Automation — Large hero card */}
          <div className="group relative md:col-span-4 md:row-span-2 rounded-xl overflow-hidden border border-slate-800 hover:border-cyan-500/40 transition-all duration-500 bg-slate-900">
            <img
              src="https://images.unsplash.com/photo-1677442136019-21780ecad995?q=50&w=800&auto=format&fit=crop"
              alt="AI workspace"
              loading="lazy"
              className="absolute inset-0 w-full h-full object-cover opacity-15 group-hover:opacity-25 group-hover:scale-105 transition-all duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/80 to-transparent" />
            <div className="relative z-10 h-full flex flex-col justify-end p-6 md:p-8">
              <div className="w-12 h-12 bg-cyan-950/50 border border-cyan-500/30 rounded-lg flex items-center justify-center mb-4 group-hover:bg-cyan-500/10 transition-colors">
                <Bot className="text-cyan-400" size={24} />
              </div>
              <div className="text-xs text-cyan-600 font-mono mb-2">workflow.optimize()</div>
              <h3 className="text-2xl md:text-3xl font-bold text-white mb-3 font-sans">AI & Automation</h3>
              <p className="text-slate-400 text-sm leading-relaxed max-w-md font-sans">
                Stop repeating yourself. We automate messages, data entry, follow-ups, file handling, and internal workflows — so your business runs even when you're offline.
              </p>
            </div>
          </div>

          {/* PWA Development */}
          <div className="group relative md:col-span-2 rounded-xl overflow-hidden border border-slate-800 hover:border-cyan-500/40 transition-all duration-500 bg-slate-900 p-6 flex flex-col justify-end">
            <Smartphone className="text-cyan-400 mb-3" size={24} />
            <div className="text-xs text-cyan-600 font-mono mb-1">app.deploy({"{"} mobile: true {"}"})</div>
            <h3 className="text-xl font-bold text-white mb-1 font-sans">PWA Development</h3>
            <p className="text-slate-500 text-xs leading-relaxed font-sans">Fast, installable web apps that feel native — no app-store headaches.</p>
          </div>

          {/* SaaS Solutions */}
          <div className="group relative md:col-span-2 rounded-xl overflow-hidden border border-slate-800 hover:border-cyan-500/40 transition-all duration-500 bg-slate-900 p-6 flex flex-col justify-end">
            <Code2 className="text-cyan-400 mb-3" size={24} />
            <div className="text-xs text-cyan-600 font-mono mb-1">scale.up()</div>
            <h3 className="text-xl font-bold text-white mb-1 font-sans">SaaS Solutions</h3>
            <p className="text-slate-500 text-xs leading-relaxed font-sans">Turn your process into a product — secure, scalable web platforms.</p>
          </div>

          {/* Code is Leverage — Full-width */}
          <div className="group relative md:col-span-6 rounded-xl overflow-hidden border border-slate-800 hover:border-cyan-500/20 transition-all duration-500 bg-gradient-to-r from-cyan-950/30 to-slate-900 p-6 flex flex-col md:flex-row items-start md:items-center gap-6">
            <Zap className="text-cyan-400 shrink-0" size={24} />
            <div className="font-sans">
              <h3 className="text-xl font-bold text-white mb-1">Code is Leverage.</h3>
              <p className="text-slate-400 text-sm">You don't need to be a developer to benefit from software. We translate what you do manually into clean, reliable systems.</p>
            </div>
            <div className="hidden md:flex flex-wrap gap-2 ml-auto shrink-0">
              {["Client Portals", "Payments", "Scheduling", "Databases"].map((item, i) => (
                <span key={i} className="text-xs bg-slate-800 border border-slate-700 px-3 py-1 rounded-full text-cyan-300">{item}</span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* TECH STACK MARQUEE */}
      <div className="w-full py-10 overflow-hidden border-y border-cyan-900/20">
        <div className="flex whitespace-nowrap gap-12 animate-marquee w-max items-center text-sm tracking-[0.15em] font-bold text-cyan-500/30 will-change-transform">
          {[1, 2, 3].map(i => (
            <React.Fragment key={i}>
              <span>REACT</span><span>•</span>
              <span>FIREBASE</span><span>•</span>
              <span>N8N</span><span>•</span>
              <span>STRIPE</span><span>•</span>
              <span>OPENAI</span><span>•</span>
              <span>CLOUD FUNCTIONS</span><span>•</span>
              <span>TYPESCRIPT</span><span>•</span>
              <span>VITE</span><span>•</span>
            </React.Fragment>
          ))}
        </div>
      </div>

      {/* THE PLAN */}
      <div className="container mx-auto px-6 max-w-5xl py-24">
        <ScrollReveal direction="up" distance={20}>
          <h2 className="text-3xl font-bold text-white mb-16 text-center font-sans">The Plan</h2>
        </ScrollReveal>

        <div className="relative">
          {/* Connector line */}
          <div className="hidden md:block absolute top-8 left-[10%] right-[10%] h-px bg-slate-800" />

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { step: "01", title: "Describe the bottleneck", desc: "what's slowing you down" },
              { step: "02", title: "We build the system", desc: "automation or app — simple + secure" },
              { step: "03", title: "You run lighter", desc: "launch + handoff + support" }
            ].map((item, i) => (
              <ScrollReveal key={i} direction="up" delay={i * 0.1} distance={20}>
                <div className="flex flex-col items-center text-center group">
                  <div className="w-16 h-16 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center mb-6 relative z-10 group-hover:border-cyan-500/50 group-hover:bg-cyan-950/20 transition-all">
                    <span className="text-lg font-bold text-cyan-400">{item.step}</span>
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2 font-sans">{item.title}</h3>
                  <p className="text-slate-500 text-sm font-sans">({item.desc})</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>

        <div className="mt-14 text-center">
          <button
            onClick={() => setIsScannerOpen(true)}
            className="group bg-cyan-600 text-white px-8 py-3 font-bold hover:bg-cyan-500 transition-all shadow-[0_0_20px_rgba(8,145,178,0.4)] active:scale-95 inline-flex items-center gap-2"
          >
            &gt; RUN SYSTEMS SCAN
          </button>
        </div>
      </div>

      {/* WHAT THIS UNLOCKS */}
      <div className="bg-slate-900/30 border-t border-cyan-900/30 py-20">
        <div className="container mx-auto px-6 max-w-4xl text-center">
          <ScrollReveal direction="up" distance={20}>
            <h2 className="text-3xl font-bold text-white mb-10 font-sans">What This Unlocks</h2>
          </ScrollReveal>
          <div className="grid md:grid-cols-2 gap-x-12 gap-y-6 text-left">
            {[
              "Your operations stop living in your head",
              "Leads and customers get faster responses",
              "You spend more time selling, serving, and creating",
              "Your tools finally work together"
            ].map((item, i) => (
              <ScrollReveal key={i} direction="left" delay={i * 0.1} distance={20}>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="text-cyan-500 mt-1 shrink-0" size={20} />
                  <span className="text-slate-300 text-lg font-sans">{item}</span>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </div>

      {/* RECENT WORK */}
      <div className="py-24 px-6 bg-slate-950">
        <div className="container mx-auto max-w-5xl">
          <ScrollReveal direction="up" distance={20}>
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-12 text-center font-sans">Recent Work</h2>
          </ScrollReveal>
          <div className="grid md:grid-cols-2 gap-6">
            <ScrollReveal direction="left" delay={0} distance={20}>
              <CaseStudyCard
                title="Automated Client Onboarding System"
                client="Creative Agency"
                description="Built an end-to-end automation that handles intake, scheduling, and CRM updates — saving 15 hours per week."
                result="15hrs/week saved"
                imageUrl="https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=70&w=600&auto=format&fit=crop"
                accent="text-cyan-400"
              />
            </ScrollReveal>
            <ScrollReveal direction="right" delay={0.1} distance={20}>
              <CaseStudyCard
                title="AI-Powered Content Pipeline"
                client="E-Commerce Brand"
                description="Designed an AI workflow that generates product descriptions, social posts, and email copy from a single brief."
                result="3x output speed"
                imageUrl="https://images.unsplash.com/photo-1677442136019-21780ecad995?q=70&w=600&auto=format&fit=crop"
                accent="text-cyan-400"
              />
            </ScrollReveal>
          </div>
        </div>
      </div>

      {/* Testimonial */}
      <TestimonialQuote
        quote="They automated our entire client onboarding flow in under a week. What used to take us 3 hours per client now takes 10 minutes."
        author="D. Martinez"
        role="Freelance Consultant"
        accentColor="cyan"
      />

      {/* FAQ — Accordion */}
      <div className="py-24 px-6 border-t border-cyan-900/30">
        <div className="container mx-auto max-w-3xl">
          <ScrollReveal direction="up" distance={20}>
            <h2 className="text-3xl font-bold text-white mb-12 text-center font-sans">FAQ</h2>
          </ScrollReveal>
          <FAQAccordion items={faqItems} accentColor="cyan" />
        </div>
      </div>

      {/* CONTACT FORM */}
      <section className="relative py-24 px-4 sm:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 text-cyan-400 text-[11px] font-mono tracking-[0.2em] uppercase mb-4">
            <Terminal size={14} /> Get In Touch
          </div>
          <h2 className="text-3xl md:text-4xl font-display font-bold text-white mb-3">Ready to Automate?</h2>
          <p className="text-zinc-400 text-sm mb-10 max-w-md mx-auto">Tell us about your tech challenges and we'll build the solution.</p>
          <ContactForm defaultService="tech" accentColor="cyan" source="tech" />
        </div>
      </section>

      {/* CROSS-STUDIO LINKS */}
      <CrossStudioLinks />

      {/* SHARED FOOTER */}
      <Footer theme="tech" />
    </div>
  );
};

export default Tech;