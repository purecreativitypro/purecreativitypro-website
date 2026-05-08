import React, { useEffect, useRef, useState } from 'react';
import { useInView, animate } from 'framer-motion';
import ScrollReveal from './ScrollReveal';

interface Stat {
  value: number;
  suffix?: string;
  prefix?: string;
  label: string;
}

interface SocialProofBarProps {
  stats: Stat[];
  accentColor?: string;
}

const CountUp: React.FC<{ target: number; duration?: number }> = ({ target, duration = 1.5 }) => {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!isInView) return;
    const controls = animate(0, target, {
      duration,
      ease: [0.25, 0.46, 0.45, 0.94],
      onUpdate: (v) => setValue(Math.round(v)),
    });
    return () => controls.stop();
  }, [isInView, target, duration]);

  return <span ref={ref}>{value}</span>;
};

const SocialProofBar: React.FC<SocialProofBarProps> = ({ stats, accentColor = 'cyan' }) => {
  const accentMap: Record<string, string> = {
    cyan: 'text-cyan-400',
    fuchsia: 'text-fuchsia-400',
    orange: 'text-orange-400',
    emerald: 'text-emerald-400',
    amber: 'text-amber-400',
  };

  const color = accentMap[accentColor] || accentMap.cyan;

  return (
    <ScrollReveal direction="up" distance={10}>
      <div className="border-y border-white/5 bg-white/[0.02] backdrop-blur-sm py-8 px-6">
        <div className="container mx-auto max-w-4xl">
          <div className="flex flex-wrap items-center justify-center gap-8 md:gap-16">
            {stats.map((stat, i) => (
              <div key={i} className="flex flex-col items-center text-center">
                <div className={`text-2xl md:text-3xl font-bold ${color} font-mono`}>
                  {stat.prefix && <span>{stat.prefix}</span>}
                  <CountUp target={stat.value} />
                  {stat.suffix && <span>{stat.suffix}</span>}
                </div>
                <span className="text-zinc-500 text-xs tracking-wide uppercase mt-1">{stat.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </ScrollReveal>
  );
};

export default SocialProofBar;
