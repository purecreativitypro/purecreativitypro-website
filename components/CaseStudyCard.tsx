import React from 'react';
import { ArrowUpRight } from 'lucide-react';

interface CaseStudyProps {
  title: string;
  client: string;
  description: string;
  result: string;
  imageUrl: string;
  accent?: string;
  link?: string;
}

const CaseStudyCard: React.FC<CaseStudyProps> = ({
  title,
  client,
  description,
  result,
  imageUrl,
  accent = 'text-white',
  link,
}) => {
  const Wrapper = link ? 'a' : 'div';
  const wrapperProps = link ? { href: link, target: '_blank', rel: 'noopener noreferrer' } : {};

  return (
    <Wrapper
      {...wrapperProps}
      className="group relative block rounded-xl overflow-hidden border border-white/5 bg-white/[0.02] hover:border-white/15 transition-all duration-300 hover:-translate-y-1 cursor-pointer"
    >
      {/* Image */}
      <div className="relative h-48 overflow-hidden">
        <img
          src={imageUrl}
          alt={title}
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 grayscale group-hover:grayscale-0"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

        {/* Hover overlay */}
        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
          <span className="text-xs font-bold tracking-[0.2em] uppercase text-white flex items-center gap-2 border border-white/30 px-4 py-2 rounded-full backdrop-blur-sm">
            View Case Study <ArrowUpRight size={14} />
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-5">
        <p className="text-zinc-500 text-[10px] font-mono tracking-[0.15em] uppercase mb-1.5">{client}</p>
        <h3 className={`font-bold text-base mb-2 ${accent} group-hover:brightness-125 transition-all`}>{title}</h3>
        <p className="text-zinc-400 text-sm leading-relaxed mb-3">{description}</p>
        <div className="flex items-center gap-2 text-[11px] font-bold tracking-wider">
          <span className="px-2.5 py-1 rounded-full bg-white/5 border border-white/10 text-zinc-300">
            {result}
          </span>
        </div>
      </div>
    </Wrapper>
  );
};

export default CaseStudyCard;
