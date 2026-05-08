import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';
import ScrollReveal from './ScrollReveal';

interface FAQItem {
  q: string;
  a: string;
}

interface FAQAccordionProps {
  items: FAQItem[];
  accentColor?: string; // e.g. 'cyan', 'fuchsia', 'orange', 'emerald', 'amber'
}

const AccordionItem: React.FC<{ item: FAQItem; isOpen: boolean; onToggle: () => void; accentColor: string; index: number }> = ({ item, isOpen, onToggle, accentColor, index }) => {
  const contentRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    if (contentRef.current) {
      setHeight(contentRef.current.scrollHeight);
    }
  }, [item.a]);

  const accentMap: Record<string, { border: string; text: string; bg: string }> = {
    cyan: { border: 'border-cyan-500/30', text: 'text-cyan-400', bg: 'hover:bg-cyan-950/10' },
    fuchsia: { border: 'border-fuchsia-500/30', text: 'text-fuchsia-400', bg: 'hover:bg-fuchsia-950/10' },
    orange: { border: 'border-orange-500/30', text: 'text-orange-400', bg: 'hover:bg-orange-950/10' },
    emerald: { border: 'border-emerald-500/30', text: 'text-emerald-400', bg: 'hover:bg-emerald-950/10' },
    amber: { border: 'border-amber-500/30', text: 'text-amber-400', bg: 'hover:bg-amber-950/10' },
  };

  const colors = accentMap[accentColor] || accentMap.cyan;

  return (
    <ScrollReveal direction="up" delay={index * 0.05} distance={15}>
      <div className={`border ${isOpen ? colors.border : 'border-white/10'} rounded-xl transition-all duration-300 ${colors.bg} bg-white/[0.02]`}>
        <button
          onClick={onToggle}
          className="w-full flex items-center justify-between p-5 md:p-6 text-left cursor-pointer group"
          aria-expanded={isOpen}
        >
          <span className="font-bold text-white text-sm md:text-base pr-4">{item.q}</span>
          <ChevronDown
            size={18}
            className={`${colors.text} shrink-0 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
          />
        </button>
        <div
          ref={contentRef}
          style={{ maxHeight: isOpen ? `${height}px` : '0px' }}
          className="overflow-hidden transition-[max-height] duration-300 ease-in-out"
        >
          <p className="px-5 md:px-6 pb-5 md:pb-6 text-zinc-400 text-sm leading-relaxed">{item.a}</p>
        </div>
      </div>
    </ScrollReveal>
  );
};

const FAQAccordion: React.FC<FAQAccordionProps> = ({ items, accentColor = 'cyan' }) => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div className="max-w-2xl mx-auto space-y-3">
      {items.map((item, i) => (
        <AccordionItem
          key={i}
          item={item}
          isOpen={openIndex === i}
          onToggle={() => setOpenIndex(openIndex === i ? null : i)}
          accentColor={accentColor}
          index={i}
        />
      ))}
    </div>
  );
};

export default FAQAccordion;
