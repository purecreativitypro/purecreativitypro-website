import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const SplashScreen: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [showSplash, setShowSplash] = useState(() => {
    // Only show on first visit per session
    return !sessionStorage.getItem('pc-splash-shown');
  });

  useEffect(() => {
    if (!showSplash) return;
    const timer = setTimeout(() => {
      setShowSplash(false);
      sessionStorage.setItem('pc-splash-shown', 'true');
    }, 2200);
    return () => clearTimeout(timer);
  }, [showSplash]);

  return (
    <>
      <AnimatePresence>
        {showSplash && (
          <motion.div
            key="splash"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6, ease: 'easeInOut' }}
            className="fixed inset-0 z-[9999] bg-[#020202] flex items-center justify-center"
          >
            {/* Background glow orbs */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
              <motion.div
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 0.3, scale: 1 }}
                transition={{ duration: 1.5, ease: 'easeOut' }}
                className="absolute top-1/4 left-1/4 w-[50vw] h-[50vw] bg-cyan-600/20 rounded-full blur-[120px]"
              />
              <motion.div
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 0.3, scale: 1 }}
                transition={{ duration: 1.5, ease: 'easeOut', delay: 0.2 }}
                className="absolute bottom-1/4 right-1/4 w-[50vw] h-[50vw] bg-fuchsia-600/20 rounded-full blur-[120px]"
              />
            </div>

            {/* Logo Text */}
            <div className="relative z-10 flex flex-col items-center">
              <motion.div
                initial={{ opacity: 0, y: 20, filter: 'blur(10px)' }}
                animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                transition={{ duration: 0.8, delay: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
              >
                <h1 className="text-4xl md:text-6xl font-afro font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-white via-zinc-400 to-white">
                  PureCreativity
                </h1>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, scaleX: 0 }}
                animate={{ opacity: 1, scaleX: 1 }}
                transition={{ duration: 0.6, delay: 0.9, ease: 'easeOut' }}
                className="h-[1px] w-48 bg-gradient-to-r from-transparent via-white/30 to-transparent mt-4"
              />

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 1.2 }}
                className="text-zinc-500 text-[10px] tracking-[0.4em] uppercase font-mono mt-3"
              >
                The Convergence Hub
              </motion.p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      {children}
    </>
  );
};

export default SplashScreen;
