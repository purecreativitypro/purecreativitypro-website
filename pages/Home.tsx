import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Cpu, Music, Aperture, TrendingUp, Menu, X, ArrowRight, Zap, Play, BookOpen, Check, Star, Compass, Briefcase, Sun, Moon } from 'lucide-react';
import { useScroll, useTransform, motion } from 'framer-motion';
import SEOHead, { organizationSchema, websiteSchema } from '../components/SEOHead';
import Footer from '../components/Footer';
import ScrollReveal, { StaggerContainer } from '../components/ScrollReveal';
import AnimatedCounter from '../components/AnimatedCounter';
import TestimonialCarousel from '../components/TestimonialCarousel';
import { useTheme } from '../components/ThemeContext';
import ContactForm from '../components/ContactForm';
import EmailCapture from '../components/EmailCapture';

// Centralized booking URL for easy updates
const BOOKING_URL = "https://tidycal.com/purecreativitypro/purecreativity-blueprint-session";

const Home: React.FC = () => {
  const [hoveredSection, setHoveredSection] = useState<string | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const departmentRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLElement>(null);
  const { toggleTheme, isDark } = useTheme();

  // Parallax: scroll-linked transforms for hero
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  });
  const heroTextY = useTransform(scrollYProgress, [0, 1], [0, 80]);
  const auraY = useTransform(scrollYProgress, [0, 1], [0, 150]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  useEffect(() => {
    setIsLoaded(true);
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    
    // MOBILE AUTO-CYCLE: Automatically cycle through visual states on mobile
    let cycleInterval: ReturnType<typeof setInterval> | undefined;
    const handleResize = () => {
      if (window.innerWidth < 768) {
        const sections = ['tech', 'music', 'media', 'business', 'learn'];
        let currentIndex = 0;
        
        // Start cycling if not already running
        if (!cycleInterval) {
            cycleInterval = setInterval(() => {
                setHoveredSection(sections[currentIndex]);
                currentIndex = (currentIndex + 1) % sections.length;
            }, 2500); // Faster cycle on mobile
        }
      } else {
        if (cycleInterval) {
            clearInterval(cycleInterval);
            cycleInterval = undefined;
        }
        setHoveredSection(null); // Reset on desktop
      }
    };

    // Initial check
    handleResize();
    window.addEventListener('resize', handleResize);

    return () => {
        window.removeEventListener('mousemove', handleMouseMove);
        window.removeEventListener('resize', handleResize);
        if (cycleInterval) clearInterval(cycleInterval);
    };
  }, []);

  const scrollToDepartments = () => {
    departmentRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const navLinks = ['tech', 'music', 'media', 'business', 'learn'];

  // Calculate 3D Tilt for Hero based on mouse position
  // We reduce the multiplier to make it more subtle but keeping the interactive feel
  const tiltX = (mousePos.y / window.innerHeight - 0.5) * 10;
  const tiltY = (mousePos.x / window.innerWidth - 0.5) * -10;

  // --- AMAZING ELECTRIC BORDER V3 (Single Light Loop) ---
  const ElectricBorder = ({ hex, isActive }: { hex: string, isActive: boolean }) => {
    return (
      <div className={`absolute inset-0 pointer-events-none z-30 transition-opacity duration-500 ${isActive ? 'opacity-100' : 'opacity-0'}`}>
        <style>{`
            @keyframes border-top-flow {
                0% { transform: translateX(-100%); opacity: 0; }
                1% { opacity: 1; }
                25% { transform: translateX(100%); opacity: 1; }
                26% { opacity: 0; }
                100% { opacity: 0; }
            }
            @keyframes border-right-flow {
                0% { transform: translateY(-100%); opacity: 0; }
                1% { opacity: 1; }
                25% { transform: translateY(100%); opacity: 1; }
                26% { opacity: 0; }
                100% { opacity: 0; }
            }
            @keyframes border-bottom-flow {
                0% { transform: translateX(100%); opacity: 0; }
                1% { opacity: 1; }
                25% { transform: translateX(-100%); opacity: 1; }
                26% { opacity: 0; }
                100% { opacity: 0; }
            }
            @keyframes border-left-flow {
                0% { transform: translateY(100%); opacity: 0; }
                1% { opacity: 1; }
                25% { transform: translateY(-100%); opacity: 1; }
                26% { opacity: 0; }
                100% { opacity: 0; }
            }
        `}</style>
        
        {/* ANIMATED CORNER BRACKETS - Slide in from offset */}
        <div 
            className="absolute top-2 left-2 w-4 h-4 border-l-2 border-t-2 transition-transform duration-500 ease-[cubic-bezier(0.23,1,0.32,1)]"
            style={{ borderColor: hex, transform: isActive ? 'translate(0, 0)' : 'translate(10px, 10px)' }}
        />
        <div 
            className="absolute top-2 right-2 w-4 h-4 border-r-2 border-t-2 transition-transform duration-500 ease-[cubic-bezier(0.23,1,0.32,1)]"
            style={{ borderColor: hex, transform: isActive ? 'translate(0, 0)' : 'translate(-10px, 10px)' }}
        />
        <div 
            className="absolute bottom-2 right-2 w-4 h-4 border-r-2 border-b-2 transition-transform duration-500 ease-[cubic-bezier(0.23,1,0.32,1)]"
            style={{ borderColor: hex, transform: isActive ? 'translate(0, 0)' : 'translate(-10px, -10px)' }}
        />
        <div 
            className="absolute bottom-2 left-2 w-4 h-4 border-l-2 border-b-2 transition-transform duration-500 ease-[cubic-bezier(0.23,1,0.32,1)]"
            style={{ borderColor: hex, transform: isActive ? 'translate(0, 0)' : 'translate(10px, -10px)' }}
        />

        {/* SINGLE LIGHT LOOP - 2s Cycle */}
        {/* Top */}
        <div className="absolute top-0 left-0 w-full h-[2px]">
             <div 
                className="w-full h-full"
                style={{ 
                    background: `linear-gradient(90deg, transparent 0%, ${hex} 50%, #ffffff 100%)`,
                    boxShadow: `0 0 15px ${hex}, 0 0 30px ${hex}`,
                    animation: 'border-top-flow 2s linear infinite'
                }} 
             />
        </div>

        {/* Right */}
        <div className="absolute top-0 right-0 w-[2px] h-full">
             <div 
                className="w-full h-full"
                style={{ 
                    background: `linear-gradient(180deg, transparent 0%, ${hex} 50%, #ffffff 100%)`,
                    boxShadow: `0 0 15px ${hex}, 0 0 30px ${hex}`,
                    animation: 'border-right-flow 2s linear infinite',
                    animationDelay: '0.5s'
                }} 
             />
        </div>

        {/* Bottom */}
        <div className="absolute bottom-0 right-0 w-full h-[2px]">
             <div 
                className="w-full h-full"
                style={{ 
                    background: `linear-gradient(270deg, transparent 0%, ${hex} 50%, #ffffff 100%)`,
                    boxShadow: `0 0 15px ${hex}, 0 0 30px ${hex}`,
                    animation: 'border-bottom-flow 2s linear infinite',
                    animationDelay: '1s'
                }} 
             />
        </div>

        {/* Left */}
        <div className="absolute top-0 left-0 w-[2px] h-full">
             <div 
                className="w-full h-full"
                style={{ 
                    background: `linear-gradient(0deg, transparent 0%, ${hex} 50%, #ffffff 100%)`,
                    boxShadow: `0 0 15px ${hex}, 0 0 30px ${hex}`,
                    animation: 'border-left-flow 2s linear infinite',
                    animationDelay: '1.5s'
                }} 
             />
        </div>

      </div>
    );
  };

  return (
    <div className="min-h-screen w-full bg-[#050505] text-white font-sans selection:bg-white selection:text-black overflow-x-hidden">
      <SEOHead
        title="PureCreativity"
        description="The Convergence Hub — Tech, Music, Media, and Business solutions for entrepreneurs and side hustlers. Stop guessing, get clear, and build momentum."
        path="/"
        jsonLd={[organizationSchema, websiteSchema]}
      />
      
      {/* 1. HERO SECTION: "THE CONVERGENCE HUB" */}
      <section ref={heroRef} className="relative min-h-screen w-full flex flex-col items-center justify-center overflow-hidden bg-[#020202] px-4 perspective-1000 py-28 md:py-0">
        
        {/* TOP NAVIGATION */}
        <nav className="absolute top-0 left-0 w-full z-[100] pointer-events-auto">
            {/* Header Bar with Blend Mode */}
            <div className="relative z-50 flex justify-between items-center p-6 md:p-12 mix-blend-plus-lighter">
                {/* Logo Lockup */}
                <div className="flex items-center group cursor-default select-none">
                    <span className="text-xl md:text-xl font-afro font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-white via-zinc-400 to-white bg-[length:200%_auto] animate-shine drop-shadow-[0_0_15px_rgba(255,255,255,0.8)]">
                        PureCreativity
                    </span>
                </div>

                {/* Desktop Nav Links */}
                <div className="hidden md:flex items-center gap-12">
                   {navLinks.map((dept) => (
                      <Link 
                        key={dept}
                        to={`/${dept}`}
                        className="group relative py-2"
                      >
                         <span className={`text-[11px] font-bold uppercase tracking-[0.3em] text-zinc-300 transition-all duration-300
                            group-hover:text-white
                            group-hover:animate-pulse-fast
                            ${dept === 'tech' ? 'group-hover:drop-shadow-[0_0_8px_rgba(34,211,238,0.8)]' : ''}
                            ${dept === 'music' ? 'group-hover:drop-shadow-[0_0_8px_rgba(232,121,249,0.8)]' : ''}
                            ${dept === 'media' ? 'group-hover:drop-shadow-[0_0_8px_rgba(251,146,60,0.8)]' : ''}
                            ${dept === 'business' ? 'group-hover:drop-shadow-[0_0_8px_rgba(52,211,153,0.8)]' : ''}
                            ${dept === 'learn' ? 'group-hover:drop-shadow-[0_0_8px_rgba(251,191,36,0.8)]' : ''}
                         `}>
                           {dept}
                         </span>
                         <span className={`absolute -bottom-1 left-0 w-full h-[1px] scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-right group-hover:origin-left
                            ${dept === 'tech' ? 'bg-cyan-400 shadow-[0_0_10px_rgba(34,211,238,1)]' : ''}
                            ${dept === 'music' ? 'bg-fuchsia-400 shadow-[0_0_10px_rgba(232,121,249,1)]' : ''}
                            ${dept === 'media' ? 'bg-orange-400 shadow-[0_0_10px_rgba(251,146,60,1)]' : ''}
                            ${dept === 'business' ? 'bg-emerald-400 shadow-[0_0_10px_rgba(52,211,153,1)]' : ''}
                            ${dept === 'learn' ? 'bg-amber-400 shadow-[0_0_10px_rgba(251,191,36,1)]' : ''}
                         `}></span>
                      </Link>
                   ))}
                </div>

                {/* Mobile Hamburger */}
                <button 
                  className="md:hidden text-white p-2.5 -mr-2 focus:outline-none z-50 relative"
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
                  aria-label="Toggle navigation menu"
                >
                   {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
                </button>
            </div>

            {/* Mobile Menu Overlay */}
            <div className={`fixed inset-0 z-40 bg-[#050505] flex flex-col items-center justify-center transition-opacity duration-300 ${isMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}>
               <div className="flex flex-col gap-10 text-center">
                  {navLinks.map((dept) => (
                    <Link 
                      key={dept}
                      to={`/${dept}`}
                      onClick={() => setIsMenuOpen(false)}
                      className="text-4xl font-afro font-bold uppercase tracking-tight text-zinc-400 hover:text-white transition-all duration-500 hover:scale-110"
                    >
                      {dept}
                    </Link>
                  ))}
               </div>
            </div>
        </nav>

        {/* --- VIBRANT BACKGROUND CORE (with parallax) --- */}
        <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
             {/* 0. Video Background — subtle, dark, looping */}
             <video
               autoPlay
               muted
               loop
               playsInline
               className="absolute inset-0 w-full h-full object-cover opacity-15"
               poster=""
             >
               <source src="https://videos.pexels.com/video-files/3129671/3129671-uhd_2560_1440_30fps.mp4" type="video/mp4" />
             </video>
             <div className="absolute inset-0 bg-black/70 z-[1]" />

             {/* 1. Grain Overlay for Authenticity/Texture */}
             <div className="absolute inset-0 opacity-20 bg-[url('https://upload.wikimedia.org/wikipedia/commons/7/76/Noise_pattern_with_intensity_0.4.png')] z-10 mix-blend-overlay"></div>

             {/* 2. The Pillars Converging (Auras) — parallax on scroll */}
             <motion.div
                  className="absolute inset-0 flex items-center justify-center" 
                  style={{ y: auraY, transform: `translate(${tiltY * 2}px, 0px)` }}>
                 
                 {/* Tech (Cyan) - Top Left */}
                 <div className="absolute top-[-20%] left-[-10%] w-[70vw] h-[70vw] bg-cyan-600/30 rounded-full blur-[100px] animate-pulse-slow mix-blend-screen"></div>
                 
                 {/* Music (Fuchsia) - Top Right */}
                 <div className="absolute top-[-20%] right-[-10%] w-[70vw] h-[70vw] bg-fuchsia-600/30 rounded-full blur-[100px] animate-pulse-slow delay-1000 mix-blend-screen"></div>
                 
                 {/* Media (Orange) - Bottom Left */}
                 <div className="absolute bottom-[-20%] left-[-10%] w-[70vw] h-[70vw] bg-orange-600/30 rounded-full blur-[100px] animate-pulse-slow delay-2000 mix-blend-screen"></div>
                 
                 {/* Business (Emerald) - Bottom Right */}
                 <div className="absolute bottom-[-20%] right-[-10%] w-[70vw] h-[70vw] bg-emerald-600/30 rounded-full blur-[100px] animate-pulse-slow delay-3000 mix-blend-screen"></div>
             </motion.div>
        </div>

        {/* --- HERO FOREGROUND CONTENT --- */}
        <motion.div
          className={`relative z-20 w-full h-full flex flex-col items-center justify-center transition-all duration-1000 ${isLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}
          style={{ y: heroTextY, opacity: heroOpacity }}
        >
          
          <div className="relative text-center w-full px-2 md:px-0">
             {/* Main Title */}
             <h1 className="flex flex-col items-center justify-center font-afro leading-none select-none relative w-full">
                <span className="text-[17vw] sm:text-[15vw] md:text-[16vw] lg:text-[13vw] xl:text-[11vw] font-extrabold text-white tracking-tighter relative z-10 mix-blend-screen leading-none">
                    PURE
                </span>
                <div className="relative mt-[-2vw] sm:mt-[-1.5vw] md:mt-[-1.5vw] lg:mt-[-1vw] xl:mt-[-0.5vw] w-full text-center">
                   <span className="absolute top-0 left-0 w-full text-center font-extrabold text-white/10 blur-sm select-none leading-none translate-x-[0.3vw] translate-y-[0.3vw]
                      text-[9vw] sm:text-[8.5vw] md:text-[8.5vw] lg:text-[7vw] xl:text-[6vw]">
                      CREATIVITY
                   </span>
                   <span className="relative z-20 font-extrabold text-white tracking-tight leading-none
                      text-[9vw] sm:text-[8.5vw] md:text-[8.5vw] lg:text-[7vw] xl:text-[6vw]">
                      CREATIVITY
                   </span>
                </div>
             </h1>
          </div>

          <div className="mt-8 md:mt-12 flex flex-col items-center text-center max-w-2xl px-6 relative z-30">
             
             {/* NEW: Who It's For */}
             <div className="mb-8 border border-white/10 bg-white/5 px-4 py-2 rounded-full backdrop-blur-sm">
                 <p className="text-white font-bold tracking-widest text-[11px] md:text-xs uppercase text-center">
                      For side hustlers and entrepreneurs — whether you're just starting or already making sales — who want to stop guessing, get clear on the next step, and build momentum.
                  </p>
             </div>

             {/* Glue Statement — improved readability */}
             <p className="text-zinc-200 text-sm md:text-base font-mono mb-8 md:mb-10 max-w-lg leading-relaxed border-b border-white/10 pb-4 md:pb-6">
                Business defines the plan. Tech builds the system. Media ships the content. Music sets the tone.
             </p>

             {/* Refined Mobile Subheading */}
             <div className="flex flex-col items-center mb-8 md:mb-10 font-mono uppercase">
                <span className="text-zinc-400 text-[11px] md:text-xs tracking-[0.2em] md:tracking-[0.3em] mb-4 md:mb-6">
                    The Convergence of
                </span>
                
                <div className="flex flex-wrap justify-center items-center gap-x-3 md:gap-x-4 gap-y-3 text-[11px] md:text-xs tracking-[0.15em] md:tracking-[0.3em]">
                   <button 
                       onClick={scrollToDepartments} 
                       onMouseEnter={() => setHoveredSection('tech')}
                       onMouseLeave={() => setHoveredSection(null)}
                       className="uppercase text-cyan-300 font-bold drop-shadow-[0_0_8px_rgba(34,211,238,0.6)] hover:scale-110 transition-transform cursor-pointer"
                   >
                       Tech
                   </button>
                   <span className="text-zinc-600 text-[11px]">•</span>
                   <button 
                       onClick={scrollToDepartments} 
                       onMouseEnter={() => setHoveredSection('music')}
                       onMouseLeave={() => setHoveredSection(null)}
                       className="uppercase text-fuchsia-300 font-bold drop-shadow-[0_0_8px_rgba(232,121,249,0.6)] hover:scale-110 transition-transform cursor-pointer"
                   >
                       Music
                   </button>
                   <span className="text-zinc-600 text-[11px]">•</span>
                   <button 
                       onClick={scrollToDepartments} 
                       onMouseEnter={() => setHoveredSection('media')}
                       onMouseLeave={() => setHoveredSection(null)}
                       className="uppercase text-orange-300 font-bold drop-shadow-[0_0_8px_rgba(251,146,60,0.6)] hover:scale-110 transition-transform cursor-pointer"
                   >
                       Media
                   </button>
                   <span className="text-zinc-600 text-[11px]">•</span>
                   <button 
                       onClick={scrollToDepartments} 
                       onMouseEnter={() => setHoveredSection('business')}
                       onMouseLeave={() => setHoveredSection(null)}
                       className="uppercase text-emerald-300 font-bold drop-shadow-[0_0_8px_rgba(52,211,153,0.6)] hover:scale-110 transition-transform cursor-pointer"
                   >
                       Business
                   </button>
                </div>
             </div>

             <button 
                onClick={scrollToDepartments}
                className="group relative px-6 md:px-8 py-3 md:py-4 bg-white/5 border border-white/20 backdrop-blur-md rounded-full overflow-hidden hover:bg-white/10 transition-all duration-300 hover:scale-105 hover:border-white/40 shadow-[0_0_30px_rgba(255,255,255,0.1)] active:scale-95"
             >
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-100%] group-hover:animate-[beam-right_0.5s_linear]"></div>
                <span className="relative flex items-center gap-3 text-[11px] md:text-xs font-bold tracking-[0.2em] text-white">
                   EXPLORE THE HUB <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                </span>
             </button>

             {/* Start Here Option */}
             <div className="mt-8 flex flex-col items-center gap-3 animate-fade-in-up">
                 <p className="text-zinc-400 text-[11px] uppercase tracking-widest font-bold">
                    Not sure which studio you need? Book a Clarity Call and we'll point you to the right next step →
                 </p>
                 <a 
                    href={BOOKING_URL} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="group/cta bg-white text-black px-6 py-2 rounded-full font-bold text-xs tracking-widest hover:bg-zinc-200 transition-all shadow-[0_0_20px_rgba(255,255,255,0.2)] hover:scale-105 active:scale-95 cursor-pointer inline-flex items-center gap-2"
                 >
                    BOOK A CLARITY CALL <ArrowRight size={12} className="group-hover/cta:translate-x-1 transition-transform" />
                 </a>
             </div>
          </div>
        </motion.div>
      </section>

      {/* 2. PROBLEM SECTION */}
      <section className="py-24 bg-zinc-950 border-t border-white/5 px-6 relative z-30">
          <div className="container mx-auto max-w-4xl text-center">
             <ScrollReveal direction="up" distance={30}>
             <h2 className="text-3xl md:text-5xl font-display font-bold text-white mb-6 leading-tight">You don’t need more ideas.<br/> You need a system.</h2>
             </ScrollReveal>
             <ScrollReveal direction="up" delay={0.15} distance={20}>
             <p className="text-zinc-400 text-lg leading-relaxed mb-12 max-w-3xl mx-auto font-light">
                Most side hustlers and entrepreneurs don't quit because they aren't capable — they quit because they're doing it alone.
                Confusion and tool overload steal momentum. PureCreativity is your guide to choose the next right step, build something people will pay for, and set up simple systems so growth becomes repeatable.
             </p>
             </ScrollReveal>
             <div className="grid md:grid-cols-3 gap-4 text-left max-w-4xl mx-auto">
                {[
                    { title: "Get clear", sub: "Choose the right direction.", icon: Compass },
                    { title: "Build what sells", sub: "Turn your skill into a simple offer.", icon: Briefcase },
                    { title: "Make it repeatable", sub: "Set up systems that drive predictable growth.", icon: Cpu }
                ].map((item, i) => (
                    <ScrollReveal key={i} direction="left" delay={i * 0.12} blur={4} distance={30}>
                      <div className="flex flex-col gap-2 text-zinc-300 border border-white/10 p-5 rounded-lg bg-white/[0.02] hover:bg-white/[0.05] transition-colors group h-full">
                          <div className="w-12 h-12 rounded-xl bg-red-500/10 flex items-center justify-center shrink-0 border border-red-500/30 group-hover:border-red-500/60 transition-colors shadow-[0_0_15px_rgba(239,68,68,0.15)] mb-2">
                              <item.icon size={24} className="text-red-500" />
                          </div>
                          <div>
                              <span className="block text-sm font-bold tracking-wide text-white">{item.title}</span>
                              <span className="block text-xs text-zinc-400">{item.sub}</span>
                          </div>
                      </div>
                    </ScrollReveal>
                ))}
             </div>
          </div>
      </section>

      {/* 3. PLAN SECTION */}
      <section className="py-24 bg-black border-t border-white/5 px-6 relative z-30">
          <div className="container mx-auto max-w-5xl text-center">
             <div className="inline-block border border-white/10 bg-white/5 px-3 py-1 rounded-full text-[11px] font-mono tracking-[0.2em] uppercase text-zinc-400">
                 The Plan
             </div>
             
             <ScrollReveal direction="up" blur={6}>
             <h3 className="text-xl md:text-2xl text-white font-display font-medium mb-12 mt-4 max-w-2xl mx-auto">
                 You don’t have to build alone — here’s the path.
             </h3>
             </ScrollReveal>

             <div className="grid md:grid-cols-3 gap-12 mb-16 relative">
                {/* Connecting Line (Desktop) */}
                <div className="hidden md:block absolute top-6 left-[15%] right-[15%] h-[1px] bg-gradient-to-r from-transparent via-zinc-800 to-transparent"></div>
                
                {[
                    { step: "01", text: "Get the Blueprint" },
                    { step: "02", text: "Build the Engine" },
                    { step: "03", text: "Ship the Work" }
                ].map((item, i) => (
                    <ScrollReveal key={i} direction="up" delay={i * 0.15} blur={6} distance={25}>
                      <div className="flex flex-col items-center relative z-10">
                          <div className="w-12 h-12 bg-black border border-white/20 rounded-full flex items-center justify-center text-lg font-bold text-white mb-6 shadow-[0_0_20px_rgba(255,255,255,0.05)]">
                             {i + 1}
                          </div>
                          <h3 className="text-xl md:text-2xl font-bold text-white tracking-tight">{item.text}</h3>
                      </div>
                    </ScrollReveal>
                ))}
             </div>
             
             <div className="flex flex-col items-center gap-4">
                 <a 
                    href={BOOKING_URL} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="bg-white text-black px-12 py-5 rounded-full font-bold text-sm tracking-[0.15em] hover:scale-105 transition-transform shadow-[0_0_30px_rgba(255,255,255,0.15)] cursor-pointer"
                 >
                    BOOK A CLARITY CALL
                 </a>
                 <p className="text-zinc-400 text-xs tracking-wide">
                     One paid call to get clear, choose the next step, and stop doing it alone.
                 </p>
             </div>
          </div>
      </section>

      {/* 3B. EMAIL CAPTURE */}
      <section className="py-16 bg-zinc-950 border-t border-white/5 px-6 relative z-30">
          <ScrollReveal direction="up" distance={20}>
            <EmailCapture />
          </ScrollReveal>
      </section>

      {/* 4. WHAT WE DO SECTION */}
      <section className="py-24 bg-zinc-950 border-t border-white/5 px-6 relative z-30">
           <div className="container mx-auto max-w-6xl">
              <ScrollReveal direction="up" distance={25}>
                <h2 className="text-2xl md:text-3xl font-display font-bold text-white mb-16 text-center">What we build inside PureCreativity</h2>
              </ScrollReveal>
              <div className="grid md:grid-cols-4 gap-6">
                  {[
                    { title: "Business", desc: "Clarity, niche, offers, predictable growth.", color: "text-emerald-400", border: "hover:border-emerald-500/50" },
                    { title: "Tech", desc: "Smart systems, automations, apps.", color: "text-cyan-400", border: "hover:border-cyan-500/50" },
                    { title: "Media", desc: "AI-powered content creation + enhancement.", color: "text-orange-400", border: "hover:border-orange-500/50" },
                    { title: "Music", desc: "Production, scoring, sound identity.", color: "text-fuchsia-400", border: "hover:border-fuchsia-500/50" }
                  ].map((item, i) => (
                      <ScrollReveal key={i} direction="right" delay={i * 0.1} blur={4} distance={30}>
                        <div className={`p-8 border border-white/5 rounded-xl bg-black/40 ${item.border} transition-all duration-300 group cursor-default h-full hover:-translate-y-1 hover:scale-[1.02] hover:shadow-lg hover:bg-white/[0.04]`}>
                            <h3 className={`font-bold text-xl mb-3 ${item.color} tracking-tight group-hover:drop-shadow-[0_0_6px_currentColor] transition-all`}>{item.title}</h3>
                            <p className="text-zinc-400 text-sm leading-relaxed group-hover:text-zinc-300 transition-colors">{item.desc}</p>
                        </div>
                      </ScrollReveal>
                  ))}
              </div>
           </div>
      </section>

       {/* 4B. ANIMATED STATS BAR */}
       <section className="py-16 bg-black border-t border-white/5 px-6 relative z-30">
           <div className="container mx-auto max-w-4xl">
              <ScrollReveal direction="up" distance={20}>
                <div className="grid grid-cols-3 gap-8 md:gap-16">
                  <AnimatedCounter target={50} suffix="+" label="Projects Delivered" />
                  <AnimatedCounter target={4} label="Creative Studios" />
                  <AnimatedCounter target={98} suffix="%" label="Client Satisfaction" />
                </div>
              </ScrollReveal>
           </div>
       </section>

       {/* 4C. TESTIMONIALS */}
       <section className="py-24 bg-zinc-950 border-t border-white/5 px-6 relative z-30">
           <div className="container mx-auto max-w-5xl">
              <ScrollReveal direction="up" distance={20}>
                <div className="text-center mb-12">
                  <div className="inline-block border border-white/10 bg-white/5 px-3 py-1 rounded-full text-[11px] font-mono tracking-[0.2em] uppercase text-zinc-400 mb-4">
                    Testimonials
                  </div>
                  <h3 className="text-xl md:text-2xl text-white font-display font-medium max-w-2xl mx-auto">
                    What our clients say
                  </h3>
                </div>
              </ScrollReveal>
              <ScrollReveal direction="up" delay={0.15} distance={15}>
                <TestimonialCarousel />
              </ScrollReveal>
           </div>
       </section>

      {/* 4D. CONTACT FORM */}
      <section className="py-24 bg-black border-t border-white/5 px-6 relative z-30">
          <div className="container mx-auto max-w-5xl">
            <ScrollReveal direction="up" distance={20}>
              <div className="text-center mb-12">
                <div className="inline-block border border-white/10 bg-white/5 px-3 py-1 rounded-full text-[11px] font-mono tracking-[0.2em] uppercase text-zinc-400 mb-4">
                  Get In Touch
                </div>
                <h3 className="text-xl md:text-2xl text-white font-display font-medium max-w-2xl mx-auto">
                  Ready to build something?
                </h3>
                <p className="text-zinc-400 text-sm mt-2">Tell us about your project and we'll point you in the right direction.</p>
              </div>
            </ScrollReveal>
            <ScrollReveal direction="up" delay={0.15} distance={15}>
              <ContactForm />
            </ScrollReveal>
          </div>
      </section>

      {/* 5. ECOSYSTEM — BENTO GRID */}
      <section ref={departmentRef} className="relative py-20 md:py-28 px-6 bg-[#050505] border-t border-white/10">
        <div className="container mx-auto max-w-6xl">
          <ScrollReveal direction="up" distance={20}>
            <div className="text-center mb-14">
              <div className="inline-block border border-white/10 bg-white/5 px-3 py-1 rounded-full text-[11px] font-mono tracking-[0.2em] uppercase text-zinc-400 mb-4">The Ecosystem</div>
              <h2 className="text-3xl md:text-5xl font-afro font-bold text-white">Five Studios. One Vision.</h2>
            </div>
          </ScrollReveal>

          {/* Bento Grid */}
          <div className="grid grid-cols-1 md:grid-cols-6 gap-4 auto-rows-[220px] md:auto-rows-[260px]">

            {/* TECH — spans 3 cols, 2 rows */}
            <Link to="/tech" onMouseEnter={() => setHoveredSection('tech')} onMouseLeave={() => setHoveredSection(null)}
              className="group relative md:col-span-3 md:row-span-2 rounded-2xl overflow-hidden border border-white/10 hover:border-cyan-500/40 transition-all duration-500">
              <img src="https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=70&w=900&auto=format&fit=crop" alt="Code on a dark screen" loading="lazy"
                className="absolute inset-0 w-full h-full object-cover opacity-40 group-hover:opacity-60 group-hover:scale-105 transition-all duration-700" />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent" />
              <div className="relative z-10 h-full flex flex-col justify-end p-6 md:p-8">
                <Cpu className="w-8 h-8 text-cyan-400 mb-3 group-hover:rotate-90 transition-transform duration-500" />
                <h3 className="text-3xl md:text-4xl font-afro font-bold text-white mb-1">TECH</h3>
                <p className="text-cyan-300/80 text-sm mb-3">AI, Automation & Web Applications</p>
                <div className="flex items-center gap-2 text-xs text-cyan-400 opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300">
                  <span className="font-mono tracking-wider">EXPLORE</span><ArrowRight size={14} />
                </div>
              </div>
            </Link>

            {/* MUSIC — spans 3 cols */}
            <Link to="/music" onMouseEnter={() => setHoveredSection('music')} onMouseLeave={() => setHoveredSection(null)}
              className="group relative md:col-span-3 rounded-2xl overflow-hidden border border-white/10 hover:border-fuchsia-500/40 transition-all duration-500">
              <img src="https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?q=70&w=900&auto=format&fit=crop" alt="Music studio with neon lighting" loading="lazy"
                className="absolute inset-0 w-full h-full object-cover opacity-40 group-hover:opacity-60 group-hover:scale-105 transition-all duration-700" />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent" />
              <div className="relative z-10 h-full flex flex-col justify-end p-6 md:p-8">
                <Music className="w-8 h-8 text-fuchsia-400 mb-3" />
                <h3 className="text-3xl md:text-4xl font-afro font-bold text-white mb-1">MUSIC</h3>
                <p className="text-fuchsia-300/80 text-sm mb-3">Production & Sonic Branding</p>
                <div className="flex items-center gap-2 text-xs text-fuchsia-400 opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300">
                  <span className="font-mono tracking-wider">EXPLORE</span><ArrowRight size={14} />
                </div>
              </div>
            </Link>

            {/* MEDIA — spans 3 cols */}
            <Link to="/media" onMouseEnter={() => setHoveredSection('media')} onMouseLeave={() => setHoveredSection(null)}
              className="group relative md:col-span-3 rounded-2xl overflow-hidden border border-white/10 hover:border-orange-500/40 transition-all duration-500">
              <img src="https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?q=70&w=900&auto=format&fit=crop" alt="Camera lens close-up with bokeh" loading="lazy"
                className="absolute inset-0 w-full h-full object-cover opacity-40 group-hover:opacity-60 group-hover:scale-105 transition-all duration-700" />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent" />
              <div className="relative z-10 h-full flex flex-col justify-end p-6 md:p-8">
                <Aperture className="w-8 h-8 text-orange-400 mb-3 group-hover:rotate-180 transition-transform duration-700" />
                <h3 className="text-3xl md:text-4xl font-afro font-bold text-white mb-1">MEDIA</h3>
                <p className="text-orange-300/80 text-sm mb-3">Film, Content & Visual Storytelling</p>
                <div className="flex items-center gap-2 text-xs text-orange-400 opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300">
                  <span className="font-mono tracking-wider">EXPLORE</span><ArrowRight size={14} />
                </div>
              </div>
            </Link>

            {/* BUSINESS — spans 4 cols */}
            <Link to="/business" onMouseEnter={() => setHoveredSection('business')} onMouseLeave={() => setHoveredSection(null)}
              className="group relative md:col-span-4 rounded-2xl overflow-hidden border border-white/10 hover:border-emerald-500/40 transition-all duration-500">
              <img src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=70&w=900&auto=format&fit=crop" alt="Business analytics dashboard on screen" loading="lazy"
                className="absolute inset-0 w-full h-full object-cover opacity-30 group-hover:opacity-50 group-hover:scale-105 transition-all duration-700" />
              <div className="absolute inset-0 bg-gradient-to-r from-black via-black/70 to-transparent" />
              <div className="relative z-10 h-full flex flex-col justify-end p-6 md:p-8">
                <TrendingUp className="w-8 h-8 text-emerald-400 mb-3" />
                <h3 className="text-3xl md:text-4xl font-afro font-bold text-white mb-1">BUSINESS</h3>
                <p className="text-emerald-300/80 text-sm mb-3">Strategy, Branding & Consulting</p>
                <div className="flex items-center gap-2 text-xs text-emerald-400 opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300">
                  <span className="font-mono tracking-wider">EXPLORE</span><ArrowRight size={14} />
                </div>
              </div>
            </Link>

            {/* LEARN — spans 2 cols */}
            <Link to="/learn" onMouseEnter={() => setHoveredSection('learn')} onMouseLeave={() => setHoveredSection(null)}
              className="group relative md:col-span-2 rounded-2xl overflow-hidden border border-white/10 hover:border-amber-500/40 transition-all duration-500">
              <img src="https://images.unsplash.com/photo-1513542789411-b6a5d4f31634?q=70&w=900&auto=format&fit=crop" alt="Open book with warm lighting" loading="lazy"
                className="absolute inset-0 w-full h-full object-cover opacity-30 group-hover:opacity-50 group-hover:scale-105 transition-all duration-700" />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-transparent" />
              <div className="relative z-10 h-full flex flex-col justify-end p-6 md:p-8">
                <BookOpen className="w-8 h-8 text-amber-400 mb-3" />
                <h3 className="text-3xl md:text-4xl font-afro font-bold text-white mb-1">LEARN</h3>
                <p className="text-amber-300/80 text-sm mb-3">Academy & Mentorship</p>
                <div className="flex items-center gap-2 text-xs text-amber-400 opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300">
                  <span className="font-mono tracking-wider">EXPLORE</span><ArrowRight size={14} />
                </div>
              </div>
            </Link>

          </div>
        </div>
      </section>

      {/* 3. REFINED FOOTER */}
      <Footer theme="home" />

    </div>
  );
};

export default Home;