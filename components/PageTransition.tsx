import { motion } from 'framer-motion';
import React from 'react';
import { useLocation } from 'react-router-dom';

interface PageTransitionProps {
  children: React.ReactNode;
}

/* ----------------------------------------------------------------
   Page transition — the new page fades in over the current bg.
   We do NOT use AnimatePresence mode="wait" (handled in App.tsx
   with mode="sync") so there is never a gap where bare bg shows.
   The dark curtain sweeps to cover any content swap.
   ---------------------------------------------------------------- */

const PageTransition: React.FC<PageTransitionProps> = ({ children }) => {
  const location = useLocation();

  return (
    <div style={{ position: 'relative' }}>
      {/* Curtain wipe: a full-screen dark overlay that plays on every route change */}
      <motion.div
        key={`curtain-${location.pathname}`}
        initial={{ scaleY: 1 }}
        animate={{
          scaleY: 0,
          transition: {
            duration: 0.5,
            ease: [0.76, 0, 0.24, 1],
            delay: 0.1,
          },
        }}
        style={{
          position: 'fixed',
          inset: 0,
          zIndex: 9999,
          background: 'linear-gradient(180deg, #050505 0%, #0a0a0a 50%, #050505 100%)',
          transformOrigin: 'top',
          pointerEvents: 'none',
        }}
      >
        {/* Thin accent line that travels with the wipe */}
        <motion.div
          initial={{ opacity: 0.4 }}
          animate={{ opacity: 0 }}
          transition={{ duration: 0.5, delay: 0.15 }}
          style={{
            position: 'absolute',
            left: 0,
            right: 0,
            bottom: 0,
            height: 1,
            background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent)',
          }}
        />
      </motion.div>

      {/* Page content fades in slightly after the curtain begins to lift */}
      <motion.div
        key={location.pathname}
        initial={{ opacity: 0, y: 12 }}
        animate={{
          opacity: 1,
          y: 0,
          transition: {
            duration: 0.45,
            delay: 0.2,
            ease: [0.25, 0.1, 0.25, 1],
          },
        }}
      >
        {children}
      </motion.div>
    </div>
  );
};

export default PageTransition;
