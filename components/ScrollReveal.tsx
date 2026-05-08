import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';

type RevealDirection = 'up' | 'down' | 'left' | 'right' | 'none';

interface ScrollRevealProps {
  children: React.ReactNode;
  direction?: RevealDirection;
  delay?: number;
  duration?: number;
  /** Distance in px the element slides from */
  distance?: number;
  /** Scale from (1 = no scale) */
  scale?: number;
  /** Blur amount in px on entry */
  blur?: number;
  /** Viewport amount visible before triggering (0-1) */
  threshold?: number;
  /** Only animate once */
  once?: boolean;
  className?: string;
}

const directionOffset = (direction: RevealDirection, distance: number) => {
  switch (direction) {
    case 'up':    return { y: distance };
    case 'down':  return { y: -distance };
    case 'left':  return { x: distance };
    case 'right': return { x: -distance };
    case 'none':  return {};
  }
};

/**
 * Scroll-triggered reveal animation using framer-motion's whileInView.
 * Respects prefers-reduced-motion automatically.
 */
const ScrollReveal: React.FC<ScrollRevealProps> = ({
  children,
  direction = 'up',
  delay = 0,
  duration = 0.6,
  distance = 40,
  scale = 1,
  blur = 0,
  threshold = 0.15,
  once = true,
  className = '',
}) => {
  const shouldReduceMotion = useReducedMotion();

  // If user prefers reduced motion, render without animation
  if (shouldReduceMotion) {
    return <div className={className}>{children}</div>;
  }

  const offset = directionOffset(direction, distance);
  const blurFilter = blur > 0 ? `blur(${blur}px)` : 'blur(0px)';

  return (
    <motion.div
      className={className}
      initial={{
        opacity: 0,
        scale,
        filter: blurFilter,
        ...offset,
      }}
      whileInView={{
        opacity: 1,
        x: 0,
        y: 0,
        scale: 1,
        filter: 'blur(0px)',
      }}
      viewport={{ once, amount: threshold }}
      transition={{
        duration,
        delay,
        ease: [0.25, 0.46, 0.45, 0.94], // ease-out-quad
      }}
    >
      {children}
    </motion.div>
  );
};

/**
 * Stagger container — wraps children and staggers their reveal.
 * Each direct child should be a ScrollReveal.
 */
interface StaggerContainerProps {
  children: React.ReactNode;
  staggerDelay?: number;
  className?: string;
}

export const StaggerContainer: React.FC<StaggerContainerProps> = ({
  children,
  staggerDelay = 0.1,
  className = '',
}) => {
  return (
    <div className={className}>
      {React.Children.map(children, (child, index) => {
        if (React.isValidElement<ScrollRevealProps>(child)) {
          return React.cloneElement(child, {
            delay: (child.props.delay || 0) + index * staggerDelay,
          });
        }
        return child;
      })}
    </div>
  );
};

export default ScrollReveal;
