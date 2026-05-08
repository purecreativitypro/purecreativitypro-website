import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Cpu, Music, Aperture, TrendingUp, BookOpen } from 'lucide-react';
import ScrollReveal from './ScrollReveal';

const studios = [
  { path: '/tech', label: 'Tech', icon: Cpu, color: 'text-cyan-400', hoverBg: 'hover:bg-cyan-950/30', border: 'hover:border-cyan-500/40' },
  { path: '/music', label: 'Music', icon: Music, color: 'text-fuchsia-400', hoverBg: 'hover:bg-fuchsia-950/30', border: 'hover:border-fuchsia-500/40' },
  { path: '/media', label: 'Media', icon: Aperture, color: 'text-orange-400', hoverBg: 'hover:bg-orange-950/30', border: 'hover:border-orange-500/40' },
  { path: '/business', label: 'Business', icon: TrendingUp, color: 'text-emerald-400', hoverBg: 'hover:bg-emerald-950/30', border: 'hover:border-emerald-500/40' },
  { path: '/learn', label: 'Learn', icon: BookOpen, color: 'text-amber-400', hoverBg: 'hover:bg-amber-950/30', border: 'hover:border-amber-500/40' },
];

const CrossStudioLinks: React.FC = () => {
  const location = useLocation();
  const filtered = studios.filter(s => s.path !== location.pathname);

  return (
    <section className="py-16 px-6 bg-[#080808] border-t border-white/5">
      <div className="container mx-auto max-w-4xl">
        <ScrollReveal direction="up" distance={15}>
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-3 text-zinc-500 text-xs tracking-[0.3em] uppercase font-mono">
              <div className="h-px w-8 bg-zinc-800" />
              Explore the Ecosystem
              <div className="h-px w-8 bg-zinc-800" />
            </div>
          </div>
        </ScrollReveal>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {filtered.map((studio) => {
            const Icon = studio.icon;
            return (
              <Link
                key={studio.path}
                to={studio.path}
                className={`group flex flex-col items-center gap-3 p-5 rounded-xl border border-white/5 ${studio.border} ${studio.hoverBg} transition-all duration-300 hover:-translate-y-1`}
              >
                <Icon size={22} className={`${studio.color} opacity-60 group-hover:opacity-100 group-hover:scale-110 transition-all duration-300`} />
                <span className="text-sm font-bold text-zinc-400 group-hover:text-white transition-colors">{studio.label}</span>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default CrossStudioLinks;
