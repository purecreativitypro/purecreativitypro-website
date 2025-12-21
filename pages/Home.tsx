import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Cpu, Music, Aperture, ArrowRight, ChevronDown, Command, TrendingUp, Menu, X } from 'lucide-react';

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
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const scrollToDepartments = () => {
    departmentRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const navLinks = ['tech', 'music', 'media', 'business'];

  return (
    <div className="min-h-screen w-full bg-[#050505] text-white font-sans selection:bg-white selection:text-black overflow-x-hidden">
      
      {/* 1. ARTISTIC BRAND HERO (100vh) */}
      <section className="relative h-screen w-full flex flex-col items-center justify-center overflow-hidden bg-black px-4 perspective-1000">
        
        {/* TOP NAVIGATION */}
        <nav className="absolute top-0 left-0 w-full z-50 flex justify-between items-center p-6 md:p-12 pointer-events-auto">
            {/* Logo Lockup */}
            <div className="flex items-center group cursor-default select-none relative z-50">
                <span className="text-lg md:text-xl font-serif font-bold tracking-[0.15em] text-white drop-shadow-[0_0_15px_rgba(255,255,255,0.5)]">
                    PureCreativity
                </span>
            </div>

            {/* Desktop Nav Links */}
            <div className="hidden md:flex items-center gap-6 md:gap-10">
               {navLinks.map((dept) => (
                  <Link 
                    key={dept}
                    to={`/${dept}`}
                    className="group relative py-2"
                  >
                     <span className="text-[10px] md:text-xs font-bold uppercase tracking-[0.2em] text-zinc-500 group-hover:text-white transition-colors">
                       {dept}
                     </span>
                     <span className={`absolute bottom-0 left-0 w-full h-[1px] scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left
                        ${dept === 'tech' ? 'bg-cyan-400' : ''}
                        ${dept === 'music' ? 'bg-fuchsia-400' : ''}
                        ${dept === 'media' ? 'bg-orange-400' : ''}
                        ${dept === 'business' ? 'bg-emerald-400' : ''}
                     `}></span>
                  </Link>
               ))}
            </div>

            {/* Mobile Hamburger */}
            <button 
              className="md:hidden z-50 text-white p-2 focus:outline-none"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
               {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>

            {/* Mobile Menu Overlay */}
            <div className={`fixed inset-0 z-40 bg-black/95 backdrop-blur-xl flex flex-col items-center justify-center transition-all duration-500 ${isMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}>
               <div className="flex flex-col gap-8 text-center">
                  {navLinks.map((dept) => (
                    <Link 
                      key={dept}
                      to={`/${dept}`}
                      onClick={() => setIsMenuOpen(false)}
                      className="text-2xl font-serif font-bold uppercase tracking-[0.3em] text-zinc-400 hover:text-white transition-colors"
                    >
                      {dept}
                    </Link>
                  ))}
               </div>
            </div>
        </nav>

        {/* --- CREATIVE BACKGROUND COMPOSITION --- */}
        <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
             
             {/* 1. Deep Space Gradient */}
             <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-zinc-900/40 via-[#050505] to-black"></div>

             {/* 2. Rotating Geometric System (The "Gyroscope") */}
             <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[100vw] h-[100vh] flex items-center justify-center opacity-40 mix-blend-screen">
                  {/* Outer Ring - Slow */}
                  <div className="absolute w-[80vh] h-[80vh] border border-zinc-800 rounded-full animate-[spin_60s_linear_infinite]"></div>
                  
                  {/* Tech Ring - Cyan */}
                  <div className="absolute w-[65vh] h-[65vh] border border-cyan-900/30 rounded-full animate-[spin_40s_linear_infinite_reverse]">
                     <div className="absolute top-0 left-1/2 -translate-x-1/2 w-2 h-2 bg-cyan-500 rounded-full shadow-[0_0_10px_rgba(6,182,212,0.8)]"></div>
                  </div>

                  {/* Music Ring - Fuchsia - Tilted */}
                  <div className="absolute w-[50vh] h-[50vh] border border-fuchsia-900/30 rounded-full animate-[spin_30s_linear_infinite] [transform:rotateX(60deg)]">
                     <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-2 h-2 bg-fuchsia-500 rounded-full shadow-[0_0_10px_rgba(217,70,239,0.8)]"></div>
                  </div>

                  {/* Media Ring - Orange */}
                  <div className="absolute w-[35vh] h-[35vh] border border-orange-900/30 rounded-full animate-[spin_25s_linear_infinite_reverse]">
                      <div className="absolute right-0 top-1/2 -translate-y-1/2 w-2 h-2 bg-orange-500 rounded-full shadow-[0_0_10px_rgba(249,115,22,0.8)]"></div>
                  </div>

                  {/* Business Ring - Emerald */}
                  <div className="absolute w-[20vh] h-[20vh] border border-emerald-900/30 rounded-full animate-[spin_15s_linear_infinite]">
                  </div>
             </div>

             {/* 3. Interactive Grid Floor */}
             <div 
               className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:50px_50px]"
               style={{
                 maskImage: `radial-gradient(800px circle at ${mousePos.x}px ${mousePos.y}px, black, transparent)`,
                 WebkitMaskImage: `radial-gradient(800px circle at ${mousePos.x}px ${mousePos.y}px, black, transparent)`,
                 transform: 'perspective(1000px) rotateX(20deg) scale(1.5)',
                 transformOrigin: 'center 80%'
               }}
             ></div>

             {/* 4. Mouse Spotlight */}
             <div 
               className="absolute inset-0 pointer-events-none"
               style={{
                 background: `radial-gradient(600px circle at ${mousePos.x}px ${mousePos.y}px, rgba(255,255,255,0.05), transparent 40%)`
               }}
             ></div>
        </div>

        {/* --- MAIN HERO CONTENT --- */}
        <div className={`relative z-10 flex flex-col items-center justify-center transition-all duration-1000 transform ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'}`}>
          
          <div className="relative mb-12 text-center select-none">
            {/* Tagline */}
            <div className="mb-6 flex justify-center">
              <span className="px-3 py-1 border border-white/10 rounded-full text-[10px] tracking-[0.4em] text-zinc-400 uppercase bg-black/50 backdrop-blur-sm">
                Redefining The Agency
              </span>
            </div>

            {/* Main Typography */}
            <h1 className="flex flex-col items-center leading-none">
              <span className="text-4xl md:text-7xl font-serif font-light text-zinc-300 tracking-[0.2em] mix-blend-difference mb-2 md:mb-4">
                PURE
              </span>
              <span className="text-6xl md:text-[10rem] font-serif italic font-bold text-white tracking-tighter drop-shadow-2xl mix-blend-overlay opacity-90">
                CREATIVITY
              </span>
            </h1>

            {/* Decoration Lines */}
            <div className="absolute top-1/2 left-0 -translate-x-[120%] w-24 h-[1px] bg-gradient-to-l from-white/30 to-transparent hidden md:block"></div>
            <div className="absolute top-1/2 right-0 translate-x-[120%] w-24 h-[1px] bg-gradient-to-r from-white/30 to-transparent hidden md:block"></div>
          </div>

          <p className="max-w-lg text-center text-zinc-500 text-xs md:text-sm font-light tracking-widest leading-relaxed mb-16 px-6">
            Where technical precision meets artistic expression. <br className="hidden md:block"/>
            We build systems, compose sound, capture moments, and scale brands.
          </p>

          <div className="mt-4">
            <button 
              onClick={scrollToDepartments}
              className="group flex flex-col items-center gap-4 text-zinc-500 hover:text-white transition-colors duration-500"
            >
              <div className="w-[1px] h-12 bg-gradient-to-b from-transparent via-zinc-700 to-zinc-700 group-hover:to-white transition-all"></div>
              <span className="text-[9px] uppercase tracking-[0.3em]">Enter The Hub</span>
            </button>
          </div>
        </div>
      </section>

      {/* 2. INTERACTIVE DEPARTMENTS HUB (100vh) */}
      <section 
        ref={departmentRef}
        className="relative min-h-screen md:h-screen w-full flex flex-col md:flex-row border-t border-white/5 bg-[#050505]"
      >
        {/* Dynamic Background Aura for Departments */}
        <div className={`absolute inset-0 transition-opacity duration-1000 pointer-events-none z-0 ${hoveredSection ? 'opacity-40' : 'opacity-0'}`}>
           <div className={`absolute inset-0 bg-gradient-to-br transition-all duration-700
            ${hoveredSection === 'tech' ? 'from-cyan-950 via-black to-black' : ''}
            ${hoveredSection === 'music' ? 'from-fuchsia-950 via-black to-black' : ''}
            ${hoveredSection === 'media' ? 'from-zinc-100/10 via-black to-black' : ''}
            ${hoveredSection === 'business' ? 'from-emerald-950 via-black to-black' : ''}
          `} />
        </div>

        {/* Section Heading Overlay */}
        <div className={`absolute top-12 md:top-16 left-1/2 -translate-x-1/2 z-50 pointer-events-none transition-all duration-500 ${hoveredSection ? 'opacity-0 -translate-y-4' : 'opacity-100'}`}>
          <h3 className="text-[10px] md:text-[11px] tracking-[0.6em] md:tracking-[1em] uppercase font-bold text-zinc-600 flex items-center gap-2 md:gap-4">
            <span className="w-6 md:w-8 h-[1px] bg-zinc-800"></span>
            Our Pillars
            <span className="w-6 md:w-8 h-[1px] bg-zinc-800"></span>
          </h3>
        </div>

        {/* TECH Section */}
        <Link
          to="/tech"
          onMouseEnter={() => setHoveredSection('tech')}
          onMouseLeave={() => setHoveredSection(null)}
          className={`group relative flex-1 h-[25vh] md:h-full transition-all duration-700 ease-[cubic-bezier(0.23,1,0.32,1)] flex items-center justify-center overflow-hidden border-b md:border-b-0 md:border-r border-white/5
            ${hoveredSection === 'tech' ? 'md:flex-[3]' : 'md:flex-1'}
            ${hoveredSection && hoveredSection !== 'tech' ? 'md:flex-[0.5] grayscale opacity-30' : ''}
          `}
        >
          <div className="absolute inset-0 opacity-5 bg-[url('https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center transition-transform duration-1000 group-hover:scale-110" />
          <div className={`absolute inset-0 bg-cyan-950/20 transition-opacity duration-500 ${hoveredSection === 'tech' ? 'opacity-100' : 'opacity-0'}`} />
          
          <div className="relative z-10 flex flex-col items-center">
            <Cpu className={`w-10 h-10 md:w-12 md:h-12 mb-4 md:mb-6 transition-all duration-500 ${hoveredSection === 'tech' ? 'text-cyan-400 scale-125' : 'text-zinc-600'}`} />
            <h2 className="text-xl md:text-3xl font-mono font-bold tracking-tight mb-2">SYSTEMS</h2>
            <div className={`h-[1px] bg-cyan-500 transition-all duration-500 ease-out ${hoveredSection === 'tech' ? 'w-24' : 'w-0'}`}></div>
            <p className="mt-4 text-cyan-200/40 font-mono text-[8px] md:text-[9px] tracking-[0.4em] uppercase opacity-0 group-hover:opacity-100 transition-opacity duration-500">
              Automation • AI • Infra
            </p>
          </div>
        </Link>

        {/* MUSIC Section */}
        <Link
          to="/music"
          onMouseEnter={() => setHoveredSection('music')}
          onMouseLeave={() => setHoveredSection(null)}
          className={`group relative flex-1 h-[25vh] md:h-full transition-all duration-700 ease-[cubic-bezier(0.23,1,0.32,1)] flex items-center justify-center overflow-hidden border-b md:border-b-0 md:border-r border-white/5
            ${hoveredSection === 'music' ? 'md:flex-[3]' : 'md:flex-1'}
            ${hoveredSection && hoveredSection !== 'music' ? 'md:flex-[0.5] grayscale opacity-30' : ''}
          `}
        >
          <div className="absolute inset-0 opacity-5 bg-[url('https://images.unsplash.com/photo-1614149162883-504ce4d13909?q=80&w=2068&auto=format&fit=crop')] bg-cover bg-center transition-transform duration-1000 group-hover:scale-110" />
          <div className={`absolute inset-0 bg-fuchsia-950/20 transition-opacity duration-500 ${hoveredSection === 'music' ? 'opacity-100' : 'opacity-0'}`} />

          <div className="relative z-10 flex flex-col items-center">
            <Music className={`w-10 h-10 md:w-12 md:h-12 mb-4 md:mb-6 transition-all duration-500 ${hoveredSection === 'music' ? 'text-fuchsia-400 scale-125' : 'text-zinc-600'}`} />
            <h2 className="text-xl md:text-3xl font-display font-bold tracking-tight mb-2">AUDIO</h2>
            <div className={`h-[1px] bg-fuchsia-500 transition-all duration-500 ease-out ${hoveredSection === 'music' ? 'w-24' : 'w-0'}`}></div>
            <p className="mt-4 text-fuchsia-200/40 font-display text-[8px] md:text-[9px] tracking-[0.4em] uppercase opacity-0 group-hover:opacity-100 transition-opacity duration-500">
              Scoring • Production • Tone
            </p>
          </div>
        </Link>

        {/* MEDIA Section */}
        <Link
          to="/media"
          onMouseEnter={() => setHoveredSection('media')}
          onMouseLeave={() => setHoveredSection(null)}
          className={`group relative flex-1 h-[25vh] md:h-full transition-all duration-700 ease-[cubic-bezier(0.23,1,0.32,1)] flex items-center justify-center overflow-hidden border-b md:border-b-0 md:border-r border-white/5
            ${hoveredSection === 'media' ? 'md:flex-[3]' : 'md:flex-1'}
            ${hoveredSection && hoveredSection !== 'media' ? 'md:flex-[0.5] grayscale opacity-30' : ''}
          `}
        >
          <div className="absolute inset-0 opacity-5 bg-[url('https://images.unsplash.com/photo-1542038784456-1ea0e93ca64b?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center transition-transform duration-1000 group-hover:scale-110" />
          <div className={`absolute inset-0 bg-white/5 transition-opacity duration-500 ${hoveredSection === 'media' ? 'opacity-100' : 'opacity-0'}`} />

          <div className="relative z-10 flex flex-col items-center">
            <Aperture className={`w-10 h-10 md:w-12 md:h-12 mb-4 md:mb-6 transition-all duration-500 ${hoveredSection === 'media' ? 'text-white scale-125' : 'text-zinc-600'}`} />
            <h2 className="text-xl md:text-3xl font-serif font-bold tracking-tight mb-2">VISUALS</h2>
            <div className={`h-[1px] bg-white transition-all duration-500 ease-out ${hoveredSection === 'media' ? 'w-24' : 'w-0'}`}></div>
            <p className="mt-4 text-zinc-400 font-serif text-[8px] md:text-[9px] tracking-[0.4em] uppercase opacity-0 group-hover:opacity-100 transition-opacity duration-500">
              Strategy • Story • Identity
            </p>
          </div>
        </Link>

        {/* BUSINESS Section */}
        <Link
          to="/business"
          onMouseEnter={() => setHoveredSection('business')}
          onMouseLeave={() => setHoveredSection(null)}
          className={`group relative flex-1 h-[25vh] md:h-full transition-all duration-700 ease-[cubic-bezier(0.23,1,0.32,1)] flex items-center justify-center overflow-hidden
            ${hoveredSection === 'business' ? 'md:flex-[3]' : 'md:flex-1'}
            ${hoveredSection && hoveredSection !== 'business' ? 'md:flex-[0.5] grayscale opacity-30' : ''}
          `}
        >
          <div className="absolute inset-0 opacity-5 bg-[url('https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center transition-transform duration-1000 group-hover:scale-110" />
          <div className={`absolute inset-0 bg-emerald-950/20 transition-opacity duration-500 ${hoveredSection === 'business' ? 'opacity-100' : 'opacity-0'}`} />

          <div className="relative z-10 flex flex-col items-center">
            <TrendingUp className={`w-10 h-10 md:w-12 md:h-12 mb-4 md:mb-6 transition-all duration-500 ${hoveredSection === 'business' ? 'text-emerald-400 scale-125' : 'text-zinc-600'}`} />
            <h2 className="text-xl md:text-3xl font-sans font-bold tracking-tight mb-2">STRATEGY</h2>
            <div className={`h-[1px] bg-emerald-500 transition-all duration-500 ease-out ${hoveredSection === 'business' ? 'w-24' : 'w-0'}`}></div>
            <p className="mt-4 text-emerald-200/40 font-sans text-[8px] md:text-[9px] tracking-[0.4em] uppercase opacity-0 group-hover:opacity-100 transition-opacity duration-500">
              Niche • Growth • Scale
            </p>
          </div>
        </Link>
      </section>

      {/* 3. REFINED FOOTER */}
      <footer className="py-16 md:py-20 bg-[#050505] border-t border-white/5 flex flex-col items-center justify-center px-6">
        <div className="text-[8px] md:text-[10px] tracking-[0.3em] md:tracking-[0.8em] uppercase text-zinc-700 font-bold mb-8 text-center">
          PureCreativity // Established 2024
        </div>
        <div className="flex flex-wrap justify-center gap-6 md:gap-12 text-[8px] md:text-[9px] text-zinc-500 tracking-[0.2em] md:tracking-[0.3em] font-light uppercase">
          <span className="hover:text-white transition-colors cursor-default whitespace-nowrap">New York</span>
          <span className="hover:text-white transition-colors cursor-default whitespace-nowrap">London</span>
          <span className="hover:text-white transition-colors cursor-default whitespace-nowrap">Tokyo</span>
          <span className="hover:text-white transition-colors cursor-default whitespace-nowrap">Zurich</span>
        </div>
        <div className="mt-12 md:mt-16 text-[8px] md:text-[9px] text-zinc-800 tracking-widest text-center">
          © {new Date().getFullYear()} ALL RIGHTS RESERVED
        </div>
      </footer>

    </div>
  );
};

export default Home;