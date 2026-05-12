import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from './ThemeContext';

interface NavigationProps {
  theme: 'tech' | 'music' | 'media' | 'business' | 'learn';
}

const Navigation: React.FC<NavigationProps> = ({ theme }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const { isDark } = useTheme();

  // Track scroll to add background when user scrolls down
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Per-theme accent colors — used for hover glows, active states, and mobile highlights
  const accents = {
    tech:     { color: 'cyan',    glow: 'rgba(34,211,238,0.8)',  bg: 'bg-slate-950/90 border-cyan-900/50',    mobile: 'bg-[#050505]' },
    music:    { color: 'fuchsia', glow: 'rgba(232,121,249,0.8)', bg: 'bg-indigo-950/90 border-fuchsia-500/20', mobile: 'bg-indigo-950' },
    media:    { color: 'orange',  glow: 'rgba(251,146,60,0.8)',  bg: 'bg-zinc-950/90 border-orange-500/20',   mobile: 'bg-[#050505]' },
    business: { color: 'emerald', glow: 'rgba(52,211,153,0.8)',  bg: 'bg-zinc-950/90 border-emerald-900/30',  mobile: 'bg-zinc-950'  },
    learn:    { color: 'amber',   glow: 'rgba(251,191,36,0.8)',  bg: 'bg-neutral-950/90 border-amber-500/20', mobile: 'bg-neutral-950' },
  };

  const accent = accents[theme];

  const links = [
    { label: 'Tech', path: '/tech', dept: 'tech' },
    { label: 'Music', path: '/music', dept: 'music' },
    { label: 'Media', path: '/media', dept: 'media' },
    { label: 'Business', path: '/business', dept: 'business' },
    { label: 'Learn', path: '/learn', dept: 'learn' },
    { label: 'A.I.', path: '/ai-advantage', dept: 'ai' },
  ];

  // Per-link glow colors (matching the home page exactly)
  const linkGlows: Record<string, string> = {
    tech:     'group-hover:drop-shadow-[0_0_8px_rgba(34,211,238,0.8)]',
    music:    'group-hover:drop-shadow-[0_0_8px_rgba(232,121,249,0.8)]',
    media:    'group-hover:drop-shadow-[0_0_8px_rgba(251,146,60,0.8)]',
    business: 'group-hover:drop-shadow-[0_0_8px_rgba(52,211,153,0.8)]',
    learn:    'group-hover:drop-shadow-[0_0_8px_rgba(251,191,36,0.8)]',
    ai:       'group-hover:drop-shadow-[0_0_8px_rgba(139,92,246,0.8)]',
  };

  const linkUnderlines: Record<string, string> = {
    tech:     'bg-cyan-400 shadow-[0_0_10px_rgba(34,211,238,1)]',
    music:    'bg-fuchsia-400 shadow-[0_0_10px_rgba(232,121,249,1)]',
    media:    'bg-orange-400 shadow-[0_0_10px_rgba(251,146,60,1)]',
    business: 'bg-emerald-400 shadow-[0_0_10px_rgba(52,211,153,1)]',
    learn:    'bg-amber-400 shadow-[0_0_10px_rgba(251,191,36,1)]',
    ai:       'bg-violet-400 shadow-[0_0_10px_rgba(139,92,246,1)]',
  };

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
    <nav className="fixed top-0 left-0 w-full z-[100] pointer-events-auto">
      {/* Background — transparent by default, fades in on scroll */}
      <div
        className={`absolute inset-0 transition-all duration-500 ${
          scrolled
            ? `${accent.bg} backdrop-blur-md border-b shadow-[0_4px_30px_rgba(0,0,0,0.3)]`
            : 'bg-transparent border-b border-transparent'
        } ${isOpen ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}
      />

      {/* Header Bar — matches Home page: p-6 md:p-12, mix-blend when transparent */}
      <div className={`relative z-50 flex justify-between items-center p-6 md:p-12 ${
        !scrolled && !isOpen ? 'mix-blend-plus-lighter' : ''
      }`}>
        {/* Logo Lockup — same style as home page */}
        <Link
          to="/"
          className="flex items-center group cursor-pointer select-none transition-transform hover:scale-105"
        >
          <span className="text-xl md:text-xl font-afro font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-white via-zinc-400 to-white bg-[length:200%_auto] animate-shine drop-shadow-[0_0_15px_rgba(255,255,255,0.8)]">
            PureCreativity
          </span>
        </Link>

        {/* Desktop Nav Links — same style as home page */}
        <div className="hidden md:flex items-center gap-12">
          {links.map((link) => {
            const isActive = location.pathname === link.path;
            return (
              <Link
                key={link.path}
                to={link.path}
                className="group relative py-2"
              >
                <span className={`text-[11px] font-bold uppercase tracking-[0.3em] transition-all duration-300
                  group-hover:text-white group-hover:animate-pulse-fast
                  ${linkGlows[link.dept]}
                  ${isActive ? 'text-white' : 'text-zinc-300'}
                `}>
                  {link.label}
                </span>
                {/* Animated underline — shows on hover OR when active */}
                <span className={`absolute -bottom-1 left-0 w-full h-[1px] transition-transform duration-300 origin-right group-hover:origin-left
                  ${linkUnderlines[link.dept]}
                  ${isActive ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'}
                `}></span>
              </Link>
            );
          })}
        </div>

        {/* Mobile Hamburger — 44px minimum touch target */}
        <button
          className="md:hidden text-white p-2.5 -mr-2 focus:outline-none z-[200] relative transition-transform active:scale-90"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle menu"
        >
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu Overlay — Portal to body to escape transform containing blocks */}
      {ReactDOM.createPortal(
        <AnimatePresence>
          {isOpen && (
            <motion.div
              key="mobile-menu"
              variants={overlayVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className={`fixed inset-0 z-[150] flex flex-col items-center justify-center gap-6 md:hidden ${accent.mobile}`}
            >
              {/* Close button inside portal */}
              <button
                className="absolute top-6 right-4 text-white p-2.5 z-20 transition-transform active:scale-90"
                onClick={() => setIsOpen(false)}
                aria-label="Close menu"
              >
                <X size={28} />
              </button>

              {/* Close zone for tap-outside-to-close */}
              <div className="absolute inset-0 z-0" onClick={() => setIsOpen(false)} />

              {/* Animated links */}
              <div className="flex flex-col items-center gap-10 relative z-10 text-center">
                {links.map((link) => {
                  const isActive = location.pathname === link.path;
                  return (
                    <motion.div key={link.path} variants={linkVariants}>
                      <Link
                        to={link.path}
                        onClick={() => setIsOpen(false)}
                        className={`text-4xl font-afro font-bold uppercase tracking-tight transition-all duration-500 hover:scale-110
                          ${isActive ? 'text-white' : 'text-zinc-400 hover:text-white'}
                        `}
                      >
                        {link.label}
                      </Link>
                    </motion.div>
                  );
                })}
              </div>


              {/* CTA Button */}
              <motion.div variants={linkVariants} className="relative z-10 mt-4">
                <Link
                  to="/"
                  onClick={() => setIsOpen(false)}
                  className="px-6 py-3 rounded-full border border-white/20 text-xs tracking-[0.2em] uppercase font-bold text-white transition-all hover:bg-white/10"
                >
                  ← Back to Hub
                </Link>
              </motion.div>

              {/* Mobile Menu Footer Branding */}
              <motion.div
                variants={linkVariants}
                className="absolute bottom-10 text-xs opacity-30 tracking-[0.3em] uppercase text-white"
              >
                PureCreativity / {theme}
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>,
        document.body
      )}
    </nav>
  );
};

export default Navigation;