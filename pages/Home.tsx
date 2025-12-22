import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Cpu, Music, Aperture, TrendingUp, Menu, X, ArrowRight, Zap, Play, BookOpen } from 'lucide-react';

const Home: React.FC = () => {
  const [hoveredSection, setHoveredSection] = useState<string | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const departmentRef = useRef<HTMLDivElement>(null);

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
      
      {/* 1. HERO SECTION: "THE CONVERGENCE HUB" */}
      <section className="relative h-screen w-full flex flex-col items-center justify-center overflow-hidden bg-[#020202] px-4 perspective-1000">
        
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
                  className="md:hidden text-white p-2 focus:outline-none z-50 relative"
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
                >
                   {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
                </button>
            </div>

            {/* Mobile Menu Overlay - PERFORMANCE FIX: Removed backdrop-blur-xl */}
            <div className={`fixed inset-0 z-40 bg-[#050505] flex flex-col items-center justify-center transition-opacity duration-300 ${isMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}>
               <div className="flex flex-col gap-10 text-center">
                  {navLinks.map((dept) => (
                    <Link 
                      key={dept}
                      to={`/${dept}`}
                      onClick={() => setIsMenuOpen(false)}
                      className="text-4xl font-afro font-bold uppercase tracking-tight text-zinc-500 hover:text-white transition-all duration-500 hover:scale-110"
                    >
                      {dept}
                    </Link>
                  ))}
               </div>
            </div>
        </nav>

        {/* --- VIBRANT BACKGROUND CORE --- */}
        <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
             {/* 1. Grain Overlay for Authenticity/Texture */}
             <div className="absolute inset-0 opacity-20 bg-[url('https://upload.wikimedia.org/wikipedia/commons/7/76/Noise_pattern_with_intensity_0.4.png')] z-10 mix-blend-overlay"></div>

             {/* 2. The Pillars Converging (Auras) */}
             <div className="absolute inset-0 flex items-center justify-center" 
                  style={{ transform: `translate(${tiltY * 2}px, ${tiltX * 2}px)` }}>
                 
                 {/* Tech (Cyan) - Top Left */}
                 <div className="absolute top-[-20%] left-[-10%] w-[70vw] h-[70vw] bg-cyan-600/30 rounded-full blur-[100px] animate-pulse-slow mix-blend-screen"></div>
                 
                 {/* Music (Fuchsia) - Top Right */}
                 <div className="absolute top-[-20%] right-[-10%] w-[70vw] h-[70vw] bg-fuchsia-600/30 rounded-full blur-[100px] animate-pulse-slow delay-1000 mix-blend-screen"></div>
                 
                 {/* Media (Orange) - Bottom Left */}
                 <div className="absolute bottom-[-20%] left-[-10%] w-[70vw] h-[70vw] bg-orange-600/30 rounded-full blur-[100px] animate-pulse-slow delay-2000 mix-blend-screen"></div>
                 
                 {/* Business (Emerald) - Bottom Right */}
                 <div className="absolute bottom-[-20%] right-[-10%] w-[70vw] h-[70vw] bg-emerald-600/30 rounded-full blur-[100px] animate-pulse-slow delay-3000 mix-blend-screen"></div>
             </div>
        </div>

        {/* --- HERO FOREGROUND CONTENT --- */}
        <div className={`relative z-20 w-full h-full flex flex-col items-center justify-center transition-all duration-1000 ${isLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}>
          
          <div className="relative text-center w-full px-2">
             {/* Main Title - Updated to Afropunk Style (Syne Font) - RESPONSIVE TUNING */}
             <h1 className="flex flex-col items-center justify-center font-afro leading-[0.85] md:leading-[0.8] select-none relative w-full max-w-full">
                
                {/* PURE: Solid, Massive, White */}
                {/* Mobile: Reduced to 15vw (was 18vw) to ensure better fit. Desktop: 13rem. */}
                <span className="text-[15vw] md:text-[13rem] font-extrabold text-white tracking-tighter relative z-10 mix-blend-screen">
                    PURE
                </span>

                {/* CREATIVITY: Outlined, overlapping, offset glitch effect */}
                <div className="relative mt-[-2vw] md:mt-[-2rem]">
                   {/* Background layer for glitch/shadow effect */}
                   <span className="absolute top-1 left-1 md:top-2 md:left-2 text-[8.5vw] md:text-[11rem] font-extrabold text-transparent text-outline-thick opacity-30 blur-sm select-none">
                      CREATIVITY
                   </span>
                   {/* Main Outline Text - Mobile: Reduced to 8.5vw (was 10vw) to fit width. */}
                   <span className="relative z-20 text-[8.5vw] md:text-[11rem] font-extrabold text-transparent text-outline-thick tracking-tight hover:text-white/10 transition-colors duration-500">
                      CREATIVITY
                   </span>
                </div>
             </h1>
          </div>

          <div className="mt-12 md:mt-24 flex flex-col items-center text-center max-w-2xl px-6 relative z-30">
             
             {/* Glue Statement */}
             <p className="text-white/80 text-xs md:text-sm font-mono mb-8 md:mb-10 max-w-lg leading-relaxed border-b border-white/10 pb-4 md:pb-6">
                Business defines the plan. Tech builds the system. Media ships the content. Music sets the tone.
             </p>

             {/* Refined Mobile Subheading */}
             <div className="flex flex-col items-center mb-8 md:mb-10 font-mono uppercase">
                <span className="text-white/60 text-[9px] md:text-xs tracking-[0.2em] md:tracking-[0.3em] mb-4 md:mb-6">
                    The Convergence of
                </span>
                
                <div className="flex flex-wrap justify-center items-center gap-x-3 md:gap-x-4 gap-y-3 text-[10px] md:text-xs tracking-[0.15em] md:tracking-[0.3em]">
                   <button 
                       onClick={scrollToDepartments} 
                       onMouseEnter={() => setHoveredSection('tech')}
                       onMouseLeave={() => setHoveredSection(null)}
                       className="uppercase text-cyan-300 font-bold drop-shadow-[0_0_8px_rgba(34,211,238,0.6)] hover:scale-110 transition-transform cursor-pointer"
                   >
                       Tech
                   </button>
                   <span className="text-white/20 text-[8px]">•</span>
                   <button 
                       onClick={scrollToDepartments} 
                       onMouseEnter={() => setHoveredSection('music')}
                       onMouseLeave={() => setHoveredSection(null)}
                       className="uppercase text-fuchsia-300 font-bold drop-shadow-[0_0_8px_rgba(232,121,249,0.6)] hover:scale-110 transition-transform cursor-pointer"
                   >
                       Music
                   </button>
                   <span className="text-white/20 text-[8px]">•</span>
                   <button 
                       onClick={scrollToDepartments} 
                       onMouseEnter={() => setHoveredSection('media')}
                       onMouseLeave={() => setHoveredSection(null)}
                       className="uppercase text-orange-300 font-bold drop-shadow-[0_0_8px_rgba(251,146,60,0.6)] hover:scale-110 transition-transform cursor-pointer"
                   >
                       Media
                   </button>
                   <span className="text-white/20 text-[8px]">•</span>
                   <button 
                       onClick={scrollToDepartments} 
                       onMouseEnter={() => setHoveredSection('business')}
                       onMouseLeave={() => setHoveredSection(null)}
                       className="uppercase text-emerald-300 font-bold drop-shadow-[0_0_8px_rgba(52,211,153,0.6)] hover:scale-110 transition-transform cursor-pointer"
                   >
                       Business
                   </button>
                   <span className="text-white/20 text-[8px]">•</span>
                   <button 
                       onClick={scrollToDepartments} 
                       onMouseEnter={() => setHoveredSection('learn')}
                       onMouseLeave={() => setHoveredSection(null)}
                       className="uppercase text-amber-300 font-bold drop-shadow-[0_0_8px_rgba(251,191,36,0.6)] hover:scale-110 transition-transform cursor-pointer"
                   >
                       Learn
                   </button>
                </div>
             </div>

             <button 
                onClick={scrollToDepartments}
                className="group relative px-6 md:px-8 py-3 md:py-4 bg-white/5 border border-white/20 backdrop-blur-md rounded-full overflow-hidden hover:bg-white/10 transition-all duration-300 hover:scale-105 hover:border-white/40 shadow-[0_0_30px_rgba(255,255,255,0.1)] active:scale-95"
             >
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-100%] group-hover:animate-[beam-right_0.5s_linear]"></div>
                <span className="relative flex items-center gap-3 text-[10px] md:text-xs font-bold tracking-[0.2em] text-white">
                   EXPLORE THE HUB <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                </span>
             </button>

             {/* Start Here Option */}
             <Link to="/business" className="mt-6 text-[10px] md:text-xs text-zinc-500 hover:text-white transition-colors tracking-widest uppercase border-b border-transparent hover:border-white pb-1 group flex items-center gap-1">
                Not sure which studio you need? Start with the Blueprint <ArrowRight size={10} className="group-hover:translate-x-1 transition-transform"/>
             </Link>
          </div>
        </div>
      </section>

      {/* 2. INTERACTIVE DEPARTMENTS HUB (100vh) */}
      <section 
        ref={departmentRef}
        className="relative h-[100dvh] md:h-screen w-full flex flex-col md:flex-row border-t border-white/10 bg-[#050505]"
      >
        {/* Dynamic Background Aura for Departments */}
        <div className={`absolute inset-0 transition-opacity duration-1000 pointer-events-none z-0 ${hoveredSection ? 'opacity-40' : 'opacity-0'}`}>
           <div className={`absolute inset-0 bg-gradient-to-br transition-all duration-1000
            ${hoveredSection === 'tech' ? 'from-cyan-900/40 via-black to-black' : ''}
            ${hoveredSection === 'music' ? 'from-fuchsia-900/40 via-black to-black' : ''}
            ${hoveredSection === 'media' ? 'from-orange-900/40 via-black to-black' : ''}
            ${hoveredSection === 'business' ? 'from-emerald-900/40 via-black to-black' : ''}
            ${hoveredSection === 'learn' ? 'from-amber-900/40 via-black to-black' : ''}
          `} />
        </div>

        {/* Section Heading Overlay */}
        <div className={`absolute top-4 md:top-12 left-1/2 -translate-x-1/2 z-50 pointer-events-none transition-all duration-500 ${hoveredSection ? 'opacity-0 -translate-y-4' : 'opacity-100'}`}>
          <div className="flex items-center gap-4">
             <div className="h-[1px] w-4 md:w-8 bg-zinc-700"></div>
             <span className="text-[8px] md:text-[10px] tracking-[0.3em] md:tracking-[0.5em] uppercase font-bold text-zinc-500 whitespace-nowrap">The Ecosystem</span>
             <div className="h-[1px] w-4 md:w-8 bg-zinc-700"></div>
          </div>
        </div>

        {/* TECH Section */}
        <Link
          to="/tech"
          onMouseEnter={() => setHoveredSection('tech')}
          onMouseLeave={() => setHoveredSection(null)}
          className={`group relative flex-1 h-[20%] md:h-full transition-all duration-700 ease-[cubic-bezier(0.23,1,0.32,1)] flex items-center justify-center overflow-hidden border-b md:border-b-0 md:border-r border-white/5 bg-black
            ${hoveredSection === 'tech' ? 'md:flex-[2.5]' : 'md:flex-1'}
            ${hoveredSection && hoveredSection !== 'tech' ? 'md:flex-[0.5] grayscale opacity-30' : ''}
          `}
        >
          <ElectricBorder hex="#22d3ee" isActive={hoveredSection === 'tech'} />
          
          <img 
            src="https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=70&w=800&auto=format&fit=crop" 
            alt="Tech Background"
            loading="lazy"
            className="absolute inset-0 w-full h-full object-cover opacity-20 transition-transform duration-1000 group-hover:scale-110 grayscale group-hover:grayscale-0"
          />
          <div className={`absolute inset-0 bg-gradient-to-t from-cyan-950/90 to-transparent transition-opacity duration-500 ${hoveredSection === 'tech' ? 'opacity-100' : 'opacity-0'}`} />
          
          <div className="relative z-10 flex flex-col items-center p-2 md:p-6 text-center">
            <Cpu className={`w-6 h-6 md:w-12 md:h-12 mb-2 md:mb-4 transition-all duration-500 ${hoveredSection === 'tech' ? 'text-cyan-400 scale-110 md:scale-125 rotate-90' : 'text-zinc-600'}`} />
            <h2 className="text-xl md:text-4xl font-mono font-bold tracking-tighter mb-1 md:mb-2 text-white">TECH</h2>
            
            <div className={`overflow-hidden transition-all duration-500 ease-out ${hoveredSection === 'tech' ? 'max-h-24 opacity-100 mt-1 md:mt-2' : 'max-h-0 opacity-0'}`}>
                <p className="text-cyan-200 font-mono text-[8px] md:text-xs tracking-widest uppercase mb-2 md:mb-4">
                  Systems • AI • Code
                </p>
                <div className="flex items-center justify-center gap-2 text-[8px] md:text-[9px] text-cyan-400 border border-cyan-500/30 px-2 md:px-3 py-1 rounded bg-cyan-950/30">
                   <span>INIT_SYSTEM</span> <ArrowRight size={10} />
                </div>
            </div>
          </div>
        </Link>

        {/* MUSIC Section */}
        <Link
          to="/music"
          onMouseEnter={() => setHoveredSection('music')}
          onMouseLeave={() => setHoveredSection(null)}
          className={`group relative flex-1 h-[20%] md:h-full transition-all duration-700 ease-[cubic-bezier(0.23,1,0.32,1)] flex items-center justify-center overflow-hidden border-b md:border-b-0 md:border-r border-white/5 bg-black
            ${hoveredSection === 'music' ? 'md:flex-[2.5]' : 'md:flex-1'}
            ${hoveredSection && hoveredSection !== 'music' ? 'md:flex-[0.5] grayscale opacity-30' : ''}
          `}
        >
          <ElectricBorder hex="#e879f9" isActive={hoveredSection === 'music'} />
          
          <img 
            src="https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?q=70&w=800&auto=format&fit=crop" 
            alt="Music Background"
            loading="lazy"
            className="absolute inset-0 w-full h-full object-cover opacity-20 transition-transform duration-1000 group-hover:scale-110 grayscale group-hover:grayscale-0"
          />
          <div className={`absolute inset-0 bg-gradient-to-t from-fuchsia-950/90 to-transparent transition-opacity duration-500 ${hoveredSection === 'music' ? 'opacity-100' : 'opacity-0'}`} />

          <div className="relative z-10 flex flex-col items-center p-2 md:p-6 text-center">
            <Music className={`w-6 h-6 md:w-12 md:h-12 mb-2 md:mb-4 transition-all duration-500 ${hoveredSection === 'music' ? 'text-fuchsia-400 scale-110 md:scale-125' : 'text-zinc-600'}`} />
            <h2 className="text-xl md:text-4xl font-display font-black tracking-tighter mb-1 md:mb-2 text-white">MUSIC</h2>
            
            <div className={`overflow-hidden transition-all duration-500 ease-out ${hoveredSection === 'music' ? 'max-h-24 opacity-100 mt-1 md:mt-2' : 'max-h-0 opacity-0'}`}>
                <p className="text-fuchsia-200 font-display text-[8px] md:text-xs tracking-widest uppercase mb-2 md:mb-4">
                  Audio • Score • Mix
                </p>
                <div className="flex items-center justify-center gap-2 text-[8px] md:text-[9px] text-fuchsia-400 border border-fuchsia-500/30 px-2 md:px-3 py-1 rounded-full bg-fuchsia-950/30">
                   <span>PLAY REEL</span> <Zap size={10} fill="currentColor" />
                </div>
            </div>
          </div>
        </Link>

        {/* MEDIA Section */}
        <Link
          to="/media"
          onMouseEnter={() => setHoveredSection('media')}
          onMouseLeave={() => setHoveredSection(null)}
          className={`group relative flex-1 h-[20%] md:h-full transition-all duration-700 ease-[cubic-bezier(0.23,1,0.32,1)] flex items-center justify-center overflow-hidden border-b md:border-b-0 md:border-r border-white/5 bg-black
            ${hoveredSection === 'media' ? 'md:flex-[2.5]' : 'md:flex-1'}
            ${hoveredSection && hoveredSection !== 'media' ? 'md:flex-[0.5] grayscale opacity-30' : ''}
          `}
        >
          <ElectricBorder hex="#fb923c" isActive={hoveredSection === 'media'} />
          
          <img 
            src="https://images.unsplash.com/photo-1536440136628-849c177e76a1?q=70&w=800&auto=format&fit=crop" 
            alt="Media Background"
            loading="lazy"
            className="absolute inset-0 w-full h-full object-cover opacity-20 transition-transform duration-1000 group-hover:scale-110 grayscale group-hover:grayscale-0"
          />
          <div className={`absolute inset-0 bg-gradient-to-t from-orange-950/90 to-transparent transition-opacity duration-500 ${hoveredSection === 'media' ? 'opacity-100' : 'opacity-0'}`} />

          <div className="relative z-10 flex flex-col items-center p-2 md:p-6 text-center">
            <Aperture className={`w-6 h-6 md:w-12 md:h-12 mb-2 md:mb-4 transition-all duration-500 ${hoveredSection === 'media' ? 'text-white scale-110 md:scale-125' : 'text-zinc-600'}`} />
            <h2 className="text-xl md:text-4xl font-serif font-bold tracking-tight mb-1 md:mb-2 text-white">MEDIA</h2>
            
             <div className={`overflow-hidden transition-all duration-500 ease-out ${hoveredSection === 'media' ? 'max-h-24 opacity-100 mt-1 md:mt-2' : 'max-h-0 opacity-0'}`}>
                <p className="text-orange-200 font-serif text-[8px] md:text-xs tracking-widest uppercase mb-2 md:mb-4">
                  Photo • Video • Brand
                </p>
                <div className="flex items-center justify-center gap-2 text-[8px] md:text-[9px] text-white border border-white/30 px-2 md:px-3 py-1 rounded-sm bg-white/10">
                   <span>VIEW PORTFOLIO</span>
                </div>
            </div>
          </div>
        </Link>

        {/* BUSINESS Section */}
        <Link
          to="/business"
          onMouseEnter={() => setHoveredSection('business')}
          onMouseLeave={() => setHoveredSection(null)}
          className={`group relative flex-1 h-[20%] md:h-full transition-all duration-700 ease-[cubic-bezier(0.23,1,0.32,1)] flex items-center justify-center overflow-hidden border-b md:border-b-0 md:border-r border-white/5 bg-black
            ${hoveredSection === 'business' ? 'md:flex-[2.5]' : 'md:flex-1'}
            ${hoveredSection && hoveredSection !== 'business' ? 'md:flex-[0.5] grayscale opacity-30' : ''}
          `}
        >
          <ElectricBorder hex="#34d399" isActive={hoveredSection === 'business'} />
          
          <img 
            src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=70&w=800&auto=format&fit=crop" 
            alt="Business Background"
            loading="lazy"
            className="absolute inset-0 w-full h-full object-cover opacity-20 transition-transform duration-1000 group-hover:scale-110 grayscale group-hover:grayscale-0"
          />
          <div className={`absolute inset-0 bg-gradient-to-t from-emerald-950/90 to-transparent transition-opacity duration-500 ${hoveredSection === 'business' ? 'opacity-100' : 'opacity-0'}`} />

          <div className="relative z-10 flex flex-col items-center p-2 md:p-6 text-center">
            <TrendingUp className={`w-6 h-6 md:w-12 md:h-12 mb-2 md:mb-4 transition-all duration-500 ${hoveredSection === 'business' ? 'text-emerald-400 scale-110 md:scale-125' : 'text-zinc-600'}`} />
            <h2 className="text-xl md:text-4xl font-sans font-black tracking-tight mb-1 md:mb-2 text-white">BUSINESS</h2>
            
            <div className={`overflow-hidden transition-all duration-500 ease-out ${hoveredSection === 'business' ? 'max-h-24 opacity-100 mt-1 md:mt-2' : 'max-h-0 opacity-0'}`}>
                <p className="text-emerald-200 font-sans text-[8px] md:text-xs tracking-widest uppercase mb-2 md:mb-4">
                  Growth • Scale • Niche
                </p>
                <div className="flex items-center justify-center gap-2 text-[8px] md:text-[9px] text-emerald-400 border border-emerald-500/30 px-2 md:px-3 py-1 rounded bg-emerald-950/30">
                   <span>GET BLUEPRINT</span> <TrendingUp size={10} />
                </div>
            </div>
          </div>
        </Link>

        {/* LEARN Section */}
        <Link
          to="/learn"
          onMouseEnter={() => setHoveredSection('learn')}
          onMouseLeave={() => setHoveredSection(null)}
          className={`group relative flex-1 h-[20%] md:h-full transition-all duration-700 ease-[cubic-bezier(0.23,1,0.32,1)] flex items-center justify-center overflow-hidden bg-black
            ${hoveredSection === 'learn' ? 'md:flex-[2.5]' : 'md:flex-1'}
            ${hoveredSection && hoveredSection !== 'learn' ? 'md:flex-[0.5] grayscale opacity-30' : ''}
          `}
        >
          <ElectricBorder hex="#fbbf24" isActive={hoveredSection === 'learn'} />
          
          <img 
            src="https://images.unsplash.com/photo-1501504905252-473c47e087f8?q=70&w=800&auto=format&fit=crop" 
            alt="Learn Background"
            loading="lazy"
            className="absolute inset-0 w-full h-full object-cover opacity-20 transition-transform duration-1000 group-hover:scale-110 grayscale group-hover:grayscale-0"
          />
          <div className={`absolute inset-0 bg-gradient-to-t from-amber-950/90 to-transparent transition-opacity duration-500 ${hoveredSection === 'learn' ? 'opacity-100' : 'opacity-0'}`} />

          <div className="relative z-10 flex flex-col items-center p-2 md:p-6 text-center">
            <BookOpen className={`w-6 h-6 md:w-12 md:h-12 mb-2 md:mb-4 transition-all duration-500 ${hoveredSection === 'learn' ? 'text-amber-400 scale-110 md:scale-125' : 'text-zinc-600'}`} />
            <h2 className="text-xl md:text-4xl font-display font-bold tracking-tight mb-1 md:mb-2 text-white">LEARN</h2>
            
            <div className={`overflow-hidden transition-all duration-500 ease-out ${hoveredSection === 'learn' ? 'max-h-24 opacity-100 mt-1 md:mt-2' : 'max-h-0 opacity-0'}`}>
                <p className="text-amber-200 font-sans text-[8px] md:text-xs tracking-widest uppercase mb-2 md:mb-4">
                  Guides • Kits • Start
                </p>
                <div className="flex items-center justify-center gap-2 text-[8px] md:text-[9px] text-amber-400 border border-amber-500/30 px-2 md:px-3 py-1 rounded bg-amber-950/30">
                   <span>BROWSE KITS</span> <ArrowRight size={10} />
                </div>
            </div>
          </div>
        </Link>

      </section>

      {/* 3. REFINED FOOTER */}
      <footer className="bg-[#050505] py-12 text-center text-zinc-600 text-xs tracking-[0.3em] font-sans border-t border-white/5 uppercase">
        <div className="mb-4">PureCreativity // The Convergence Hub</div>
        <div className="text-[9px] opacity-50 flex justify-center gap-6 font-light">
          <span>NY</span><span>LDN</span><span>TKY</span><span>ZRH</span>
        </div>
      </footer>

    </div>
  );
};

export default Home;