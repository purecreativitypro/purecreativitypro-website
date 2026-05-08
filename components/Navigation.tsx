import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Sun, Moon } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from './ThemeContext';

interface NavigationProps {
  theme: 'tech' | 'music' | 'media' | 'business' | 'learn';
}

const Navigation: React.FC<NavigationProps> = ({ theme }) => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const { theme: currentMode, toggleTheme, isDark } = useTheme();

  // STYLES CONFIGURATION
  const themes = {
    tech: {
      background: "bg-slate-950/90 border-b border-cyan-900/50 backdrop-blur-md shadow-[0_0_20px_rgba(8,51,68,0.5)]",
      logo: "text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 via-cyan-100 to-cyan-500 bg-[length:200%_auto] animate-shine font-mono tracking-tighter font-bold",
      link: "font-mono text-xs tracking-widest uppercase text-slate-500 hover:text-cyan-400",
      active: "text-cyan-400 border-b border-cyan-500 pb-1",
      container: "gap-4 md:gap-8",
      icon: "text-cyan-500",
      mobileMenu: "bg-slate-950",
      mobileLinkColor: "text-cyan-400",
      mobileActiveGlow: "drop-shadow-[0_0_8px_rgba(34,211,238,0.6)]",
    },
    music: {
      background: "bg-indigo-950/80 border-b border-fuchsia-500/20 backdrop-blur-md shadow-[0_0_30px_rgba(192,38,211,0.2)]",
      logo: "text-transparent bg-clip-text bg-gradient-to-r from-fuchsia-500 via-white to-purple-500 bg-[length:200%_auto] animate-shine font-display font-black tracking-tighter text-xl md:text-2xl",
      link: "font-display text-sm font-bold tracking-wider uppercase text-indigo-300 hover:text-white hover:drop-shadow-[0_0_8px_rgba(232,121,249,0.8)]",
      active: "text-white drop-shadow-[0_0_5px_rgba(232,121,249,0.8)] border-b-2 border-fuchsia-500 pb-1",
      container: "gap-6 md:gap-10",
      icon: "text-fuchsia-400",
      mobileMenu: "bg-indigo-950",
      mobileLinkColor: "text-fuchsia-100",
      mobileActiveGlow: "drop-shadow-[0_0_8px_rgba(232,121,249,0.6)]",
    },
    media: {
      background: "bg-white/90 border-b border-zinc-200 backdrop-blur-md shadow-sm", 
      logo: "text-transparent bg-clip-text bg-gradient-to-r from-black via-zinc-400 to-black bg-[length:200%_auto] animate-shine font-serif font-bold tracking-widest text-lg md:text-xl",
      link: "font-sans text-[10px] md:text-xs font-bold tracking-[0.2em] uppercase text-zinc-400 hover:text-orange-600",
      active: "text-black border-b-2 border-orange-500 pb-1",
      container: "gap-4 md:gap-8",
      icon: "text-black",
      mobileMenu: "bg-white",
      mobileLinkColor: "text-black",
      mobileActiveGlow: "text-orange-500",
    },
    business: {
      background: "bg-zinc-950/95 border-b border-emerald-900/30 backdrop-blur-md",
      logo: "text-transparent bg-clip-text bg-gradient-to-r from-white via-emerald-200 to-white bg-[length:200%_auto] animate-shine font-sans tracking-tight font-black uppercase text-lg md:text-xl",
      link: "font-sans text-[10px] md:text-xs font-bold tracking-wide uppercase text-zinc-500 hover:text-emerald-400",
      active: "text-emerald-400 bg-emerald-500/10 rounded px-3 py-1",
      container: "gap-4 md:gap-8",
      icon: "text-emerald-500",
      mobileMenu: "bg-zinc-950",
      mobileLinkColor: "text-white",
      mobileActiveGlow: "text-emerald-400",
    },
    learn: {
      background: "bg-neutral-950/90 border-b border-amber-500/20 backdrop-blur-md",
      logo: "text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-white to-amber-400 bg-[length:200%_auto] animate-shine font-display font-bold tracking-tight text-xl md:text-2xl",
      link: "font-display text-xs font-bold tracking-widest uppercase text-neutral-500 hover:text-amber-400",
      active: "text-amber-400 border-b border-amber-500 pb-1",
      container: "gap-4 md:gap-8",
      icon: "text-amber-400",
      mobileMenu: "bg-neutral-950",
      mobileLinkColor: "text-amber-100",
      mobileActiveGlow: "text-amber-400",
    }
  };

  const currentTheme = themes[theme];
  
  const links = [
    { label: 'Tech', path: '/tech' },
    { label: 'Music', path: '/music' },
    { label: 'Media', path: '/media' },
    { label: 'Business', path: '/business' },
    { label: 'Learn', path: '/learn' },
  ];

  // Framer Motion variants for mobile overlay
  const overlayVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { duration: 0.3, ease: 'easeOut', staggerChildren: 0.06, delayChildren: 0.1 }
    },
    exit: { 
      opacity: 0, 
      transition: { duration: 0.2, ease: 'easeIn' }
    },
  };

  const linkVariants = {
    hidden: { opacity: 0, y: 20, filter: 'blur(4px)' },
    visible: { 
      opacity: 1, y: 0, filter: 'blur(0px)',
      transition: { duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }
    },
    exit: { opacity: 0, y: -10, transition: { duration: 0.15 } },
  };

  return (
    <nav className="fixed top-0 left-0 w-full z-[100] px-6 md:px-12 py-4 transition-all duration-300">
      {/* Dynamic Background Layer */}
      <div className={`absolute inset-0 transition-opacity duration-300 ${isOpen ? 'opacity-0 pointer-events-none' : 'opacity-100'} ${currentTheme.background}`} />

      <div className="flex justify-between items-center w-full relative z-50">
        <Link to="/" className={`transition-transform hover:scale-105 ${currentTheme.logo}`}>
          PureCreativity
          {theme !== 'music' && (
            <span className="hidden md:inline-block ml-2 text-sm font-light opacity-60 text-current">
               / {theme.charAt(0).toUpperCase() + theme.slice(1)}
            </span>
          )}
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
          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            className={`p-2 rounded-lg transition-all duration-300 hover:scale-110 active:scale-90 ${currentTheme.link}`}
            aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
          >
            {isDark ? <Sun size={16} /> : <Moon size={16} />}
          </button>
        </div>

        {/* Mobile Hamburger — 44px minimum touch target */}
        <button 
          className={`md:hidden p-2.5 -mr-2 focus:outline-none transition-transform active:scale-90 ${currentTheme.icon}`}
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle menu"
        >
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu Overlay with framer-motion */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            key="mobile-menu"
            variants={overlayVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className={`fixed inset-0 z-40 flex flex-col items-center justify-center gap-6 ${currentTheme.mobileMenu}`}
          >
            {/* Close zone for tap-outside-to-close */}
            <div className="absolute inset-0 z-0" onClick={() => setIsOpen(false)} />

            {/* Animated links */}
            <div className="flex flex-col items-center gap-6 relative z-10">
              {links.map((link) => {
                const isActive = location.pathname === link.path;
                return (
                  <motion.div key={link.path} variants={linkVariants}>
                    <Link
                      to={link.path}
                      onClick={() => setIsOpen(false)}
                      className={`text-2xl font-bold tracking-widest uppercase transition-colors ${currentTheme.mobileLinkColor} ${isActive ? currentTheme.mobileActiveGlow : 'opacity-60'}`}
                    >
                      {link.label}
                    </Link>
                  </motion.div>
                );
              })}
            </div>
            
            {/* Theme Toggle (Mobile) */}
            <motion.div variants={linkVariants} className="relative z-10">
              <button
                onClick={toggleTheme}
                className={`p-3 rounded-full border border-white/20 transition-all duration-300 hover:bg-white/10 active:scale-90 ${currentTheme.mobileLinkColor}`}
                aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
              >
                {isDark ? <Sun size={20} /> : <Moon size={20} />}
              </button>
            </motion.div>

            {/* CTA Button */}
            <motion.div variants={linkVariants} className="relative z-10 mt-4">
              <Link
                to="/"
                onClick={() => setIsOpen(false)}
                className="px-6 py-3 rounded-full border border-white/20 text-xs tracking-[0.2em] uppercase font-bold transition-all hover:bg-white/10"
              >
                ← Back to Hub
              </Link>
            </motion.div>

            {/* Mobile Menu Footer Branding */}
            <motion.div 
              variants={linkVariants}
              className="absolute bottom-10 text-xs opacity-30 tracking-[0.3em] uppercase"
            >
              PureCreativity / {theme}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navigation;