import React from 'react';
import { Link } from 'react-router-dom';
import { logEvent } from '../lib/firebase';

// Social icons as inline SVGs to avoid adding icon dependencies
const YouTubeIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
  </svg>
);

const InstagramIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z" />
  </svg>
);

const TikTokIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
    <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z" />
  </svg>
);

const MetaIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
    <path d="M12 2.04c-5.5 0-10 4.49-10 10.02 0 5 3.66 9.15 8.44 9.9v-7H7.9v-2.9h2.54V9.85c0-2.51 1.49-3.89 3.78-3.89 1.09 0 2.24.19 2.24.19v2.47h-1.26c-1.24 0-1.63.77-1.63 1.56v1.88h2.78l-.45 2.9h-2.33v7a10 10 0 0 0 8.44-9.9c0-5.53-4.5-10.02-10-10.02z" />
  </svg>
);

// Theme configuration for footer styling
const themes = {
  home: {
    bg: 'bg-[#050505]',
    border: 'border-white/5',
    text: 'text-zinc-600',
    tagline: 'PureCreativity // The Convergence Hub',
    socialHover: 'hover:text-white',
    linkHover: 'hover:text-white',
  },
  tech: {
    bg: 'bg-slate-950',
    border: 'border-cyan-900/10',
    text: 'text-slate-600',
    tagline: 'PureCreativity.Tech // Code is Leverage',
    socialHover: 'hover:text-cyan-400',
    linkHover: 'hover:text-cyan-400',
  },
  music: {
    bg: 'bg-indigo-950',
    border: 'border-fuchsia-500/10',
    text: 'text-indigo-400',
    tagline: 'PureCreativity.Music // Sonic Identity',
    socialHover: 'hover:text-fuchsia-400',
    linkHover: 'hover:text-fuchsia-400',
  },
  media: {
    bg: 'bg-zinc-900',
    border: 'border-white/5',
    text: 'text-zinc-500',
    tagline: 'PureCreativity.Media // Perspective is Everything',
    socialHover: 'hover:text-orange-400',
    linkHover: 'hover:text-orange-400',
  },
  business: {
    bg: 'bg-zinc-950',
    border: 'border-emerald-900/10',
    text: 'text-zinc-600',
    tagline: 'PureCreativity.Business // Build The Future',
    socialHover: 'hover:text-emerald-400',
    linkHover: 'hover:text-emerald-400',
  },
  learn: {
    bg: 'bg-neutral-950',
    border: 'border-neutral-900',
    text: 'text-neutral-600',
    tagline: 'PureCreativity.Learn // Knowledge is Power',
    socialHover: 'hover:text-amber-400',
    linkHover: 'hover:text-amber-400',
  },
};

type FooterTheme = keyof typeof themes;

interface FooterProps {
  theme?: FooterTheme;
}

const socialLinks = [
  { icon: <YouTubeIcon />, href: 'https://www.youtube.com/@purecreativitypro', label: 'YouTube' },
  { icon: <InstagramIcon />, href: 'https://www.instagram.com/purecreativitypro', label: 'Instagram' },
  { icon: <TikTokIcon />, href: 'https://www.tiktok.com/@purecreativitypro', label: 'TikTok' },
  { icon: <MetaIcon />, href: 'https://www.facebook.com/purecreativitypro', label: 'Meta' },
];

const navLinks = [
  { to: '/tech', label: 'Tech' },
  { to: '/music', label: 'Music' },
  { to: '/media', label: 'Media' },
  { to: '/business', label: 'Business' },
  { to: '/learn', label: 'Learn' },
  { to: '/ai-advantage', label: 'A.I.' },
  { to: '/blog', label: 'Blog' },
];

const Footer: React.FC<FooterProps> = ({ theme = 'home' }) => {
  const t = themes[theme];

  return (
    <footer className={`${t.bg} py-16 px-6 border-t ${t.border}`}>
      <div className="container mx-auto max-w-6xl">
        {/* Top Row: Nav Links */}
        <div className="flex flex-wrap justify-center gap-x-8 gap-y-3 mb-10">
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className={`${t.text} text-xs tracking-[0.2em] uppercase font-medium ${t.linkHover} transition-colors`}
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Social Links */}
        <div className="flex justify-center gap-5 mb-10">
          {socialLinks.map((social) => (
            <a
              key={social.label}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              className={`${t.text} ${t.socialHover} transition-colors hover:scale-110 transform duration-200`}
              aria-label={social.label}
              onClick={() => logEvent('social_click', { platform: social.label, page: theme })}
            >
              {social.icon}
            </a>
          ))}
        </div>

        {/* Divider */}
        <div className={`w-16 h-px mx-auto mb-8 ${t.border} border-t`} />

        {/* Tagline */}
        <div className={`text-center ${t.text} text-xs tracking-[0.3em] uppercase font-sans mb-3`}>
          {t.tagline}
        </div>

        {/* Copyright */}
        <div className={`text-center ${t.text} text-[11px] opacity-60 font-light`}>
          &copy; PureCreativity {new Date().getFullYear()}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
