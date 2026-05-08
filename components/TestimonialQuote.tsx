import React from 'react';
import ScrollReveal from './ScrollReveal';

interface TestimonialQuoteProps {
  quote: string;
  author: string;
  role?: string;
  accentColor?: string;
}

const accentMap: Record<string, string> = {
  cyan: 'border-cyan-500/30 text-cyan-300/60',
  fuchsia: 'border-fuchsia-500/30 text-fuchsia-300/60',
  orange: 'border-orange-500/30 text-orange-300/60',
  emerald: 'border-emerald-500/30 text-emerald-300/60',
  amber: 'border-amber-500/30 text-amber-300/60',
};

const TestimonialQuote: React.FC<TestimonialQuoteProps> = ({
  quote,
  author,
  role,
  accentColor = 'cyan',
}) => {
  const colors = accentMap[accentColor] || accentMap.cyan;
  const [borderColor, textColor] = colors.split(' ');

  return (
    <ScrollReveal direction="up" distance={15}>
      <div className="py-16 px-6">
        <div className="container mx-auto max-w-2xl text-center">
          <blockquote className={`border-l-2 ${borderColor} pl-6 text-left`}>
            <p className="text-lg md:text-xl text-zinc-300 italic leading-relaxed font-serif">
              "{quote}"
            </p>
            <footer className="mt-4">
              <span className="text-sm text-zinc-500 font-mono">
                — {author}
                {role && <span className={`${textColor} ml-2`}>{role}</span>}
              </span>
            </footer>
          </blockquote>
        </div>
      </div>
    </ScrollReveal>
  );
};

export default TestimonialQuote;
