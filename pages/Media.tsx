import React, { useEffect, useState, useRef } from 'react';
import Navigation from '../components/Navigation';
import { Camera, Video, PenTool, Layout, ArrowUpRight } from 'lucide-react';

const Media: React.FC = () => {
  const [scrollY, setScrollY] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div 
      ref={containerRef}
      className="min-h-screen bg-zinc-50 text-black font-serif relative overflow-x-hidden"
      style={{ '--scroll-y': `${scrollY}px` } as React.CSSProperties}
    >
      <Navigation theme="media" />
      
      {/* Parallax Background Text */}
      <div 
        className="fixed top-1/4 -right-20 text-[20vw] font-bold text-zinc-200/40 select-none pointer-events-none z-0 whitespace-nowrap"
        style={{ transform: `translateX(calc(var(--scroll-y) * -0.2))` }}
      >
        PURE MEDIA
      </div>

      <div 
        className="fixed top-2/3 -left-10 text-[15vw] font-bold text-zinc-200/30 select-none pointer-events-none z-0 whitespace-nowrap italic"
        style={{ transform: `translateX(calc(var(--scroll-y) * 0.1))` }}
      >
        AESTHETIC
      </div>

      {/* Heavy Header */}
      <div className="relative z-10 bg-zinc-900 text-white pt-48 pb-32 px-6 rounded-b-[4rem] shadow-2xl overflow-hidden">
        {/* Header Parallax Element */}
        <div 
          className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none"
          style={{ transform: `translateY(calc(var(--scroll-y) * 0.4))` }}
        >
          <div className="absolute top-20 left-10 w-64 h-64 border border-white/20 rounded-full"></div>
          <div className="absolute top-40 right-20 w-96 h-96 border border-white/10 rounded-full"></div>
        </div>

        <div className="container mx-auto max-w-6xl relative z-10">
            <div className="flex flex-col md:flex-row justify-between items-end gap-12">
                <div style={{ transform: `translateY(calc(var(--scroll-y) * -0.05))` }}>
                    <h1 className="text-7xl md:text-9xl font-serif font-medium leading-[0.9] mb-6 tracking-tighter">
                        Capture.<br />
                        <span className="italic text-zinc-400">Create.</span><br />
                        Convert.
                    </h1>
                    <div className="w-32 h-1 bg-orange-500"></div>
                </div>
                <div className="max-w-md pb-4" style={{ transform: `translateY(calc(var(--scroll-y) * 0.05))` }}>
                    <p className="text-xl text-zinc-300 font-sans font-light leading-relaxed">
                        PureCreativity Media is a full-service agency for visual storytelling. 
                        We combine high-end photography, cinematic video, and data-driven content strategy.
                    </p>
                </div>
            </div>
        </div>
      </div>

      {/* Services Strip */}
      <div className="relative z-20 bg-orange-500 text-black py-6 overflow-hidden font-sans font-bold text-sm tracking-widest uppercase shadow-lg">
        <div className="container mx-auto flex justify-between px-6">
            <span className="flex items-center gap-3"><Camera size={18}/> Photography</span>
            <span className="flex items-center gap-3"><Video size={18}/> Videography</span>
            <span className="flex items-center gap-3"><PenTool size={18}/> Editing</span>
            <span className="flex items-center gap-3"><Layout size={18}/> Strategy</span>
        </div>
      </div>

      {/* Gallery / Work */}
      <div className="container mx-auto px-6 py-32 max-w-7xl relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 items-start">
            
            {/* Item 1 - Tall (Moves slower - Deep Parallax) */}
            <div 
              className="group relative cursor-pointer md:row-span-2 h-[700px] overflow-hidden rounded-sm shadow-xl border-4 border-transparent hover:border-orange-500/30 transition-all duration-700 hover:shadow-[0_0_40px_rgba(249,115,22,0.2)]"
              style={{ transform: `translateY(calc((var(--scroll-y) - 600) * -0.1))` }}
            >
                <img 
                    src="https://images.unsplash.com/photo-1542038784456-1ea0e93ca64b?q=75&w=1200&auto=format&fit=crop" 
                    alt="Editorial" 
                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-1000 transform group-hover:scale-110"
                />
                {/* On Mobile: Always visible gradient and text. On Desktop: Hover only. */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent md:bg-black/30 md:group-hover:bg-transparent transition-colors duration-500"></div>
                <div className="absolute bottom-0 left-0 p-10 text-white opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-all duration-500 translate-y-0 md:translate-y-8 md:group-hover:translate-y-0">
                    <h3 className="text-4xl font-serif italic mb-2">Editorial</h3>
                    <p className="font-sans text-xs tracking-widest uppercase opacity-80">Brand Campaign / New York</p>
                </div>
            </div>

            {/* Item 2 - Square (Moves faster - Fore Parallax) */}
            <div 
              className="group relative cursor-pointer h-[400px] overflow-hidden rounded-sm shadow-lg border-4 border-transparent hover:border-orange-500/30 transition-all duration-700 hover:shadow-[0_0_40px_rgba(249,115,22,0.2)]"
              style={{ transform: `translateY(calc((var(--scroll-y) - 800) * 0.05))` }}
            >
                <img 
                    src="https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?q=75&w=1200&auto=format&fit=crop" 
                    alt="Landscape" 
                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-1000 transform group-hover:scale-110"
                />
                 {/* On Mobile: Always visible gradient and text. On Desktop: Hover only. */}
                 <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent md:bg-transparent transition-colors duration-500"></div>
                 <div className="absolute bottom-0 left-0 p-8 text-white opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-all duration-500 translate-y-0 md:translate-y-4 md:group-hover:translate-y-0">
                    <h3 className="text-3xl font-serif italic">Adventure</h3>
                    <p className="font-sans text-xs tracking-widest uppercase opacity-80">Social Content / Iceland</p>
                </div>
            </div>

            {/* Item 3 - Square (Moves mid) */}
            <div 
              className="group relative cursor-pointer h-[400px] overflow-hidden rounded-sm shadow-lg lg:mt-24 border-4 border-transparent hover:border-orange-500/30 transition-all duration-700 hover:shadow-[0_0_40px_rgba(249,115,22,0.2)]"
              style={{ transform: `translateY(calc((var(--scroll-y) - 900) * -0.05))` }}
            >
                 <img 
                    src="https://images.unsplash.com/photo-1536240478700-b869070f9279?q=75&w=1200&auto=format&fit=crop" 
                    alt="Abstract" 
                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-1000 transform group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent md:bg-transparent transition-colors duration-500"></div>
                <div className="absolute bottom-0 left-0 p-8 text-white opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-all duration-500 translate-y-0 md:translate-y-4 md:group-hover:translate-y-0">
                    <h3 className="text-3xl font-serif italic">Vision</h3>
                    <p className="font-sans text-xs tracking-widest uppercase opacity-80">Product Photography / Studio</p>
                </div>
            </div>

             {/* Item 4 - Wide (Static Base) */}
             <div className="group relative cursor-pointer md:col-span-2 h-[450px] overflow-hidden rounded-sm shadow-2xl mt-12 border-4 border-transparent hover:border-orange-500/30 transition-all duration-700 hover:shadow-[0_0_40px_rgba(249,115,22,0.2)]">
                 <img 
                    src="https://images.unsplash.com/photo-1559075480-8025251664d4?q=75&w=1200&auto=format&fit=crop" 
                    alt="Strategy" 
                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-1000 transform group-hover:scale-110"
                />
                <div className="absolute inset-0 flex items-center justify-center bg-orange-500/90 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    <div className="text-center text-black px-12">
                         <h3 className="text-5xl font-serif mb-4 italic">Strategy</h3>
                         <p className="font-sans font-bold uppercase tracking-[0.2em] text-sm">View Comprehensive Case Study <ArrowUpRight className="inline-block ml-1" /></p>
                    </div>
                </div>
                {/* On mobile, standard strategy text is hidden, show a simplified tag */}
                <div className="absolute bottom-6 left-6 md:top-6 md:right-6 md:left-auto md:bottom-auto text-white md:text-white/50 font-sans text-lg md:text-[10px] tracking-[0.2em] md:tracking-[0.5em] uppercase font-bold md:font-normal bg-black/50 md:bg-transparent p-2 md:p-0">Featured Project 2025</div>
            </div>

        </div>
      </div>

      {/* CTA Section with Scroll Entrance */}
      <div className="relative z-30 bg-black text-white py-32 px-6 text-center font-sans overflow-hidden">
        <div 
          className="absolute inset-0 opacity-10 pointer-events-none"
          style={{ transform: `translateY(calc((var(--scroll-y) - 2000) * 0.1))` }}
        >
          <div className="text-[30vw] font-bold text-white/10 select-none">NEXT</div>
        </div>
        
        <div className="relative z-10 max-w-3xl mx-auto" style={{ transform: `translateY(calc((var(--scroll-y) - 2200) * -0.02))` }}>
          <h2 className="text-5xl md:text-7xl font-bold mb-10 tracking-tight leading-none">Ready to define your image?</h2>
          <button className="group relative bg-white text-black px-12 py-5 text-xl font-bold hover:bg-orange-500 transition-all duration-300 inline-flex items-center gap-3 rounded-full shadow-[0_0_40px_rgba(255,255,255,0.1)]">
              <span>START A PROJECT</span>
              <ArrowUpRight className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
          </button>
        </div>
      </div>

      <footer className="relative z-10 bg-zinc-900 py-12 text-center text-zinc-500 text-xs tracking-[0.3em] font-sans border-t border-white/5 uppercase">
        PureCreativity.Media // Perspective is Everything
      </footer>

    </div>
  );
};

export default Media;