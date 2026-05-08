import { motion, AnimatePresence } from 'framer-motion';
import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

interface PageTransitionProps {
  children: React.ReactNode;
}

/* ----------------------------------------------------------------
   Cinematic curtain wipe —
   A dark overlay sweeps DOWN over the old page, holds briefly,
   then sweeps DOWN off-screen revealing the new page beneath.
   The page content fades-in from below as the curtain leaves.
   ---------------------------------------------------------------- */

const curtainVariants = {
  initial: { scaleY: 0, originY: 0 },
  enter:   {
    scaleY: [0, 1, 1, 0],
    originY: [0, 0, 1, 1],
    transition: {
      duration: 0.8,
      ease: [0.76, 0, 0.24, 1],
      times: [0, 0.4, 0.6, 1],
    },
  },
};

const contentVariants = {
  hidden: {
    opacity: 0,
    y: 20,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      delay: 0.45,
      ease: [0.25, 0.1, 0.25, 1],
    },
  },
  exit: {
    opacity: 0,
    transition: {
      duration: 0.15,
      ease: 'easeIn',
    },
  },
};

const PageTransition: React.FC<PageTransitionProps> = ({ children }) => {
  const location = useLocation();
  const [showCurtain, setShowCurtain] = useState(false);
  const [curtainKey, setCurtainKey] = useState(0);

  useEffect(() => {
    // Trigger curtain on every route change (skip initial mount)
    setCurtainKey(prev => prev + 1);
    setShowCurtain(true);
    const timer = setTimeout(() => setShowCurtain(false), 900);
    return () => clearTimeout(timer);
  }, [location.pathname]);

  return (
    <>
      {/* Curtain overlay — sits above everything during transition */}
      <AnimatePresence>
        {showCurtain && (
          <motion.div
            key={`curtain-${curtainKey}`}
            variants={curtainVariants}
            initial="initial"
            animate="enter"
            style={{
              position: 'fixed',
              inset: 0,
              zIndex: 9999,
              background: 'linear-gradient(180deg, #050505 0%, #0a0a0a 50%, #050505 100%)',
              transformOrigin: 'top',
              pointerEvents: 'none',
            }}
          >
            {/* Subtle brand glow during the wipe */}
            <div
              style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                width: 120,
                height: 120,
                borderRadius: '50%',
                background: 'radial-gradient(circle, rgba(255,255,255,0.06) 0%, transparent 70%)',
              }}
            />
            {/* Thin accent line that travels with the wipe */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 0.4, 0.4, 0] }}
              transition={{ duration: 0.8, times: [0, 0.3, 0.7, 1] }}
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
        )}
      </AnimatePresence>

      {/* Page content */}
      <motion.div
        key={location.pathname}
        variants={contentVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
      >
        {children}
      </motion.div>
    </>
  );
};

export default PageTransition;
