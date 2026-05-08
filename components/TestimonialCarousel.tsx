import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Quote } from 'lucide-react';

interface Testimonial {
  quote: string;
  name: string;
  title: string;
  accent?: string;
}

const testimonials: Testimonial[] = [
  {
    quote: "PureCreativity didn't just build us a system — they gave us back 15 hours a week. Our entire workflow runs on autopilot now.",
    name: "Jordan Mitchell",
    title: "Founder, Elevate Studios",
    accent: "text-cyan-400",
  },
  {
    quote: "The music they produced for our brand launch was unlike anything we'd heard. It wasn't just a track — it was our identity in sound.",
    name: "Aria Chen",
    title: "Creative Director, Bloom & Co",
    accent: "text-fuchsia-400",
  },
  {
    quote: "We went from posting random content to having a complete visual strategy in two weeks. The results spoke for themselves — 3x engagement.",
    name: "Marcus Rivera",
    title: "CEO, RiverFlow Media",
    accent: "text-orange-400",
  },
  {
    quote: "I was stuck in idea mode for a year. One clarity call and I had a real plan. Three months later, I had my first 5 paying clients.",
    name: "Priya Sharma",
    title: "Business Coach & Creator",
    accent: "text-emerald-400",
  },
  {
    quote: "The Learn program gave me the confidence to actually ship. I went from 'I don't know where to start' to 'I just launched my course.'",
    name: "Deon Williams",
    title: "Online Educator",
    accent: "text-amber-400",
  },
];

const TestimonialCarousel: React.FC = () => {
  const [current, setCurrent] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const next = useCallback(() => {
    setCurrent((prev) => (prev + 1) % testimonials.length);
  }, []);

  const prev = useCallback(() => {
    setCurrent((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  }, []);

  // Auto-advance
  useEffect(() => {
    if (isPaused) return;
    timerRef.current = setInterval(next, 5000);
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, [isPaused, next]);

  const t = testimonials[current];

  return (
    <div
      className="relative max-w-3xl mx-auto"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Quote Card */}
      <div className="relative min-h-[220px] md:min-h-[200px] flex items-center justify-center">
        <AnimatePresence mode="wait">
          <motion.div
            key={current}
            initial={{ opacity: 0, y: 20, filter: 'blur(4px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            exit={{ opacity: 0, y: -20, filter: 'blur(4px)' }}
            transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="text-center px-4"
          >
            <Quote className="w-8 h-8 text-white/10 mx-auto mb-4 rotate-180" />
            <p className="text-lg md:text-xl text-zinc-200 font-light leading-relaxed mb-6 italic max-w-2xl mx-auto">
              "{t.quote}"
            </p>
            <div className="flex flex-col items-center gap-1">
              <span className={`font-bold text-sm tracking-wide ${t.accent || 'text-white'}`}>
                {t.name}
              </span>
              <span className="text-zinc-500 text-xs tracking-wider uppercase">
                {t.title}
              </span>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Navigation */}
      <div className="flex items-center justify-center gap-6 mt-8">
        <button
          onClick={prev}
          className="p-2 rounded-full border border-white/10 text-zinc-400 hover:text-white hover:border-white/30 transition-all active:scale-90"
          aria-label="Previous testimonial"
        >
          <ChevronLeft size={18} />
        </button>

        {/* Dots */}
        <div className="flex items-center gap-2">
          {testimonials.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                i === current
                  ? 'bg-white w-6'
                  : 'bg-zinc-700 hover:bg-zinc-500'
              }`}
              aria-label={`Go to testimonial ${i + 1}`}
            />
          ))}
        </div>

        <button
          onClick={next}
          className="p-2 rounded-full border border-white/10 text-zinc-400 hover:text-white hover:border-white/30 transition-all active:scale-90"
          aria-label="Next testimonial"
        >
          <ChevronRight size={18} />
        </button>
      </div>
    </div>
  );
};

export default TestimonialCarousel;
