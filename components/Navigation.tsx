import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

interface NavigationProps {
  theme: 'tech' | 'music' | 'media' | 'business';
}

const Navigation: React.FC<NavigationProps> = ({ theme }) => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  // STYLES CONFIGURATION
  const themes = {
    tech: {
      nav: "bg-slate-950/90 border-b border-cyan-900/50 backdrop-blur-md shadow-[0_0_20px_rgba(8,51,68,0.5)]",
      logo: "text-cyan-400 font-mono tracking-tighter font-bold",
      link: "font-mono text-xs tracking-widest uppercase text-slate-500 hover:text-cyan-400",
      active: "text-cyan-400 border-b border-cyan-500 pb-1",
      container: "gap-4 md:gap-8",
      icon: "text-cyan-500",
      mobileMenu: "bg-slate-950/95 text-cyan-400 font-mono"
    },
    music: {
      nav: "bg-indigo-950/80 border-b border-fuchsia-500/20 backdrop-blur-md shadow-[0_0_30px_rgba(192,38,211,0.2)]",
      logo: "text-transparent bg-clip-text bg-gradient-to-r from-fuchsia-400 to-purple-600 font-display font-black tracking-tighter text-xl md:text-2xl",
      link: "font-display text-sm font-bold tracking-wider uppercase text-indigo-300 hover:text-white hover:drop-shadow-[0_0_8px_rgba(232,121,249,0.8)]",
      active: "text-white drop-shadow-[0_0_5px_rgba(232,121,249,0.8)] border-b-2 border-fuchsia-500 pb-1",
      container: "gap-6 md:gap-10",
      icon: "text-fuchsia-400",
      mobileMenu: "bg-indigo-950/95 text-fuchsia-100 font-display"
    },
    media: {
      nav: "bg-white/90 border-b border-zinc-200 backdrop-blur-md shadow-sm", 
      logo: "text-black font-serif font-bold tracking-widest text-lg md:text-xl",
      link: "font-sans text-[10px] md:text-xs font-bold tracking-[0.2em] uppercase text-zinc-400 hover:text-orange-600",
      active: "text-black border-b-2 border-orange-500 pb-1",
      container: "gap-4 md:gap-8",
      icon: "text-black",
      mobileMenu: "bg-white/95 text-black font-serif"
    },
    business: {
      nav: "bg-zinc-950/95 border-b border-emerald-900/30 backdrop-blur-md",
      logo: "text-white font-sans tracking-tight font-black uppercase text-lg md:text-xl",
      link: "font-sans text-[10px] md:text-xs font-bold tracking-wide uppercase text-zinc-500 hover:text-emerald-400",
      active: "text-emerald-400 bg-emerald-500/10 rounded px-3 py-1",
      container: "gap-4 md:gap-8",
      icon: "text-emerald-500",
      mobileMenu: "bg-zinc-950/95 text-white font-sans"
    }
  };

  const currentTheme = themes[theme];
  
  const links = [
    { label: 'Tech', path: '/tech' },
    { label: 'Music', path: '/music' },
    { label: 'Media', path: '/media' },
    { label: 'Business', path: '/business' },
  ];

  return (
    <nav className={`fixed top-0 left-0 w-full z-50 px-6 md:px-12 py-4 transition-all duration-300 ${currentTheme.nav}`}>
      <div className="flex justify-between items-center w-full relative z-50">
        <Link to="/" className={`transition-transform hover:scale-105 ${currentTheme.logo}`}>
          PureCreativity
          <span className={`hidden md:inline-block ml-2 text-sm font-light opacity-60 ${theme === 'music' ? 'text-white' : 'text-current'}`}>
             / {theme.charAt(0).toUpperCase() + theme.slice(1)}
          </span>
        </Link>

        {/* Desktop Links */}
        <div className={`hidden md:flex items-center ${currentTheme.container}`}>
          {links.map((link) => {
            const isActive = location.pathname === link.path;
            return (
              <Link
                key={link.path}
                to={link.path}
                className={`transition-all duration-300 ${currentTheme.link} ${isActive ? currentTheme.active : ''}`}
              >
                {link.label}
              </Link>
            );
          })}
        </div>

        {/* Mobile Hamburger */}
        <button 
          className={`md:hidden p-1 focus:outline-none transition-transform active:scale-95 ${currentTheme.icon}`}
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle menu"
        >
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      <div 
        className={`fixed inset-0 z-40 flex flex-col items-center justify-center gap-10 transition-all duration-500 ease-in-out ${currentTheme.mobileMenu} ${isOpen ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0 pointer-events-none'}`}
      >
        <div className="flex flex-col items-center gap-8">
            {links.map((link, idx) => {
              const isActive = location.pathname === link.path;
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setIsOpen(false)}
                  className={`text-2xl font-bold tracking-widest uppercase transition-all duration-300 hover:scale-110 ${isActive ? 'underline underline-offset-8 decoration-2' : 'opacity-70'}`}
                  style={{ transitionDelay: `${idx * 50}ms` }}
                >
                  {link.label}
                </Link>
              );
            })}
        </div>
        
        {/* Mobile Menu Footer Branding */}
        <div className="absolute bottom-12 text-xs opacity-40 tracking-[0.3em] uppercase">
          PureCreativity / {theme}
        </div>
      </div>
    </nav>
  );
};

export default Navigation;