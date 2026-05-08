import React, { useEffect, useRef, useState, useCallback } from 'react';

const CustomCursor: React.FC = () => {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const [isHovering, setIsHovering] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const posRef = useRef({ x: 0, y: 0 });
  const ringPosRef = useRef({ x: 0, y: 0 });
  const rafRef = useRef<number>(0);

  // Only render on devices with hover capability (desktop)
  const [hasHover, setHasHover] = useState(false);

  useEffect(() => {
    setHasHover(window.matchMedia('(hover: hover) and (pointer: fine)').matches);
  }, []);

  const animateRing = useCallback(() => {
    const dx = posRef.current.x - ringPosRef.current.x;
    const dy = posRef.current.y - ringPosRef.current.y;
    ringPosRef.current.x += dx * 0.15;
    ringPosRef.current.y += dy * 0.15;

    if (ringRef.current) {
      ringRef.current.style.transform = `translate(${ringPosRef.current.x}px, ${ringPosRef.current.y}px) translate(-50%, -50%)`;
    }

    rafRef.current = requestAnimationFrame(animateRing);
  }, []);

  useEffect(() => {
    if (!hasHover) return;

    const onMouseMove = (e: MouseEvent) => {
      posRef.current = { x: e.clientX, y: e.clientY };
      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${e.clientX}px, ${e.clientY}px) translate(-50%, -50%)`;
      }
      if (!isVisible) setIsVisible(true);
    };

    const onMouseEnter = () => setIsVisible(true);
    const onMouseLeave = () => setIsVisible(false);

    // Detect hoverable elements
    const onMouseOverInteractive = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const interactive = target.closest('a, button, [role="button"], input, textarea, select, [data-cursor="pointer"]');
      setIsHovering(!!interactive);
    };

    document.addEventListener('mousemove', onMouseMove, { passive: true });
    document.addEventListener('mouseenter', onMouseEnter);
    document.addEventListener('mouseleave', onMouseLeave);
    document.addEventListener('mouseover', onMouseOverInteractive, { passive: true });

    // Add cursor-custom class
    document.body.classList.add('cursor-custom');

    rafRef.current = requestAnimationFrame(animateRing);

    return () => {
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseenter', onMouseEnter);
      document.removeEventListener('mouseleave', onMouseLeave);
      document.removeEventListener('mouseover', onMouseOverInteractive);
      document.body.classList.remove('cursor-custom');
      cancelAnimationFrame(rafRef.current);
    };
  }, [hasHover, isVisible, animateRing]);

  if (!hasHover) return null;

  return (
    <>
      {/* Dot */}
      <div
        ref={dotRef}
        className="fixed top-0 left-0 z-[10000] pointer-events-none"
        style={{
          width: 6,
          height: 6,
          borderRadius: '50%',
          backgroundColor: '#ffffff',
          opacity: isVisible ? 1 : 0,
          transition: 'opacity 0.2s, width 0.2s, height 0.2s',
          mixBlendMode: 'difference',
        }}
      />
      {/* Ring */}
      <div
        ref={ringRef}
        className="fixed top-0 left-0 z-[9999] pointer-events-none"
        style={{
          width: isHovering ? 48 : 32,
          height: isHovering ? 48 : 32,
          borderRadius: '50%',
          border: `1.5px solid rgba(255, 255, 255, ${isHovering ? 0.5 : 0.2})`,
          opacity: isVisible ? 1 : 0,
          transition: 'opacity 0.2s, width 0.3s ease, height 0.3s ease, border 0.3s ease',
          mixBlendMode: 'difference',
        }}
      />
    </>
  );
};

export default CustomCursor;
