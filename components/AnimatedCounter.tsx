import React, { useEffect, useRef, useState } from 'react';
import { useInView, animate } from 'framer-motion';

interface AnimatedCounterProps {
  target: number;
  suffix?: string;
  prefix?: string;
  duration?: number;
  label: string;
  labelColor?: string;
}

const AnimatedCounter: React.FC<AnimatedCounterProps> = ({
  target,
  suffix = '',
  prefix = '',
  duration = 2,
  label,
  labelColor = 'text-zinc-400',
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    if (!isInView) return;

    const controls = animate(0, target, {
      duration,
      ease: [0.25, 0.46, 0.45, 0.94],
      onUpdate: (v) => setDisplayValue(Math.round(v)),
    });

    return () => controls.stop();
  }, [isInView, target, duration]);

  return (
    <div ref={ref} className="flex flex-col items-center gap-2">
      <span className="text-4xl md:text-5xl font-afro font-bold text-white tabular-nums">
        {prefix}{displayValue}{suffix}
      </span>
      <span className={`text-xs md:text-sm font-mono tracking-widest uppercase ${labelColor}`}>
        {label}
      </span>
    </div>
  );
};

export default AnimatedCounter;
