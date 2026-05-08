import React, { Suspense, useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation, Link } from 'react-router-dom';
import { ArrowUp } from 'lucide-react';
import { Helmet } from 'react-helmet-async';
import { AnimatePresence } from 'framer-motion';
import PageTransition from './components/PageTransition';
import { ThemeProvider } from './components/ThemeContext';
import SplashScreen from './components/SplashScreen';
import CustomCursor from './components/CustomCursor';
import { logPageView } from './lib/firebase';

// Lazy load pages to improve initial load performance
const Home = React.lazy(() => import('./pages/Home'));
const Tech = React.lazy(() => import('./pages/Tech'));
const Music = React.lazy(() => import('./pages/Music'));
const Media = React.lazy(() => import('./pages/Media'));
const Business = React.lazy(() => import('./pages/Business'));
const Learn = React.lazy(() => import('./pages/Learn'));
const Blog = React.lazy(() => import('./pages/Blog'));
const BlogPost = React.lazy(() => import('./pages/BlogPost'));

const ScrollToTopNav = () => {
  const { pathname } = useLocation();

  React.useEffect(() => {
    window.scrollTo(0, 0);
    // Log page view to Firebase Analytics
    logPageView(pathname, document.title);
  }, [pathname]);

  return null;
};

const FloatingScrollToTop = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      // Show button when page is scrolled down 500px
      if (window.scrollY > 500) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <button
      onClick={scrollToTop}
      className={`fixed bottom-6 right-6 z-[90] p-3 rounded-full bg-zinc-900/80 backdrop-blur-md border border-white/10 text-white shadow-[0_0_20px_rgba(0,0,0,0.5)] transition-all duration-500 hover:bg-zinc-800 hover:scale-110 flex items-center justify-center ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10 pointer-events-none'
      }`}
      aria-label="Scroll to top"
    >
      <ArrowUp size={20} />
    </button>
  );
};

// Simple loading indicator
const SkeletonPulse = ({ className = '' }: { className?: string }) => (
  <div className={`bg-white/[0.04] rounded-lg animate-pulse ${className}`} />
);

const PageLoader = () => (
  <div className="min-h-screen w-full bg-[var(--bg-primary)] px-6">
    {/* Fake nav */}
    <div className="container mx-auto max-w-6xl pt-6 flex items-center justify-between">
      <SkeletonPulse className="w-32 h-5" />
      <div className="flex gap-4">
        <SkeletonPulse className="w-12 h-4 hidden md:block" />
        <SkeletonPulse className="w-12 h-4 hidden md:block" />
        <SkeletonPulse className="w-12 h-4 hidden md:block" />
      </div>
    </div>
    {/* Fake hero */}
    <div className="container mx-auto max-w-4xl pt-32 flex flex-col items-center gap-6">
      <SkeletonPulse className="w-24 h-5 rounded-full" />
      <SkeletonPulse className="w-3/4 h-12 md:h-16" />
      <SkeletonPulse className="w-2/3 h-6" />
      <SkeletonPulse className="w-40 h-12 rounded-full mt-4" />
    </div>
    {/* Fake content blocks */}
    <div className="container mx-auto max-w-5xl pt-24 grid grid-cols-1 md:grid-cols-3 gap-6">
      <SkeletonPulse className="h-48 md:col-span-2" />
      <SkeletonPulse className="h-48" />
      <SkeletonPulse className="h-48" />
      <SkeletonPulse className="h-48 md:col-span-2" />
    </div>
  </div>
);

// 404 Not Found
const NotFound = () => (
  <div className="min-h-screen w-full bg-[var(--bg-primary)] flex flex-col items-center justify-center px-6 text-center">
    <Helmet>
      <title>Page Not Found | PureCreativity</title>
      <meta name="robots" content="noindex, nofollow" />
    </Helmet>
    <h1 className="text-[20vw] md:text-[15vw] font-bold text-white/5 leading-none select-none font-afro">404</h1>
    <p className="text-zinc-400 text-sm md:text-base mb-8 -mt-4 md:-mt-8">This page doesn't exist in the hub.</p>
    <Link
      to="/"
      className="bg-white text-black px-8 py-3 rounded-full font-bold text-xs tracking-[0.15em] hover:scale-105 transition-transform shadow-[0_0_30px_rgba(255,255,255,0.15)]"
    >
      RETURN TO HUB
    </Link>
  </div>
);

// Animated routes wrapper — needs useLocation so must be inside BrowserRouter
const AnimatedRoutes: React.FC = () => {
  const location = useLocation();

  return (
    <AnimatePresence mode="sync">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<PageTransition><Home /></PageTransition>} />
        <Route path="/tech" element={<PageTransition><Tech /></PageTransition>} />
        <Route path="/music" element={<PageTransition><Music /></PageTransition>} />
        <Route path="/media" element={<PageTransition><Media /></PageTransition>} />
        <Route path="/business" element={<PageTransition><Business /></PageTransition>} />
        <Route path="/learn" element={<PageTransition><Learn /></PageTransition>} />
        <Route path="/blog" element={<PageTransition><Blog /></PageTransition>} />
        <Route path="/blog/:slug" element={<PageTransition><BlogPost /></PageTransition>} />
        <Route path="*" element={<PageTransition><NotFound /></PageTransition>} />
      </Routes>
    </AnimatePresence>
  );
};

const App: React.FC = () => {
  return (
    <ThemeProvider>
      <SplashScreen>
        <BrowserRouter>
          <ScrollToTopNav />
          <FloatingScrollToTop />
          <CustomCursor />
          <main id="main-content">
            <Suspense fallback={<PageLoader />}>
              <AnimatedRoutes />
            </Suspense>
          </main>
        </BrowserRouter>
      </SplashScreen>
    </ThemeProvider>
  );
};

export default App;