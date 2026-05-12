import React, { useState, useEffect, useRef } from 'react';
import { BrowserRouter, Routes, Route, useLocation, Link } from 'react-router-dom';
import { ArrowUp } from 'lucide-react';
import { Helmet } from 'react-helmet-async';
import { ThemeProvider } from './components/ThemeContext';
import SplashScreen from './components/SplashScreen';
import CustomCursor from './components/CustomCursor';
import { logPageView } from './lib/firebase';

// ─── Lazy-loaded pages (code-split into separate chunks) ────────
const Home = React.lazy(() => import('./pages/Home'));
const Tech = React.lazy(() => import('./pages/Tech'));
const Music = React.lazy(() => import('./pages/Music'));
const Media = React.lazy(() => import('./pages/Media'));
const Business = React.lazy(() => import('./pages/Business'));
const Learn = React.lazy(() => import('./pages/Learn'));
const AIAdvantage = React.lazy(() => import('./pages/AIAdvantage'));
const Blog = React.lazy(() => import('./pages/Blog'));
const BlogPost = React.lazy(() => import('./pages/BlogPost'));

// ─── Prefetch all pages in the background after initial load ────
// This ensures chunks are already cached when the user clicks a nav link.
// The Suspense fallback will never appear because imports resolve instantly.
function usePrefetchPages() {
  useEffect(() => {
    const timer = setTimeout(() => {
      import('./pages/Home');
      import('./pages/Tech');
      import('./pages/Music');
      import('./pages/Media');
      import('./pages/Business');
      import('./pages/Learn');
      import('./pages/AIAdvantage');
      import('./pages/Blog');
      import('./pages/BlogPost');
    }, 1000); // wait 1s after mount so we don't compete with initial render
    return () => clearTimeout(timer);
  }, []);
}

// ─── Scroll to top on route change + analytics ─────────────────
const ScrollToTopNav = () => {
  const { pathname } = useLocation();

  React.useEffect(() => {
    window.scrollTo(0, 0);
    logPageView(pathname, document.title);
  }, [pathname]);

  return null;
};

// ─── Floating scroll-to-top button ──────────────────────────────
const FloatingScrollToTop = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
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

// ─── Skeleton loader (shown only on very first page if not yet cached) ──
const SkeletonPulse = ({ className = '' }: { className?: string }) => (
  <div className={`bg-white/[0.04] rounded-lg animate-pulse ${className}`} />
);

const PageLoader = () => (
  <div className="min-h-screen w-full bg-[var(--bg-primary)] px-6">
    <div className="container mx-auto max-w-6xl pt-6 flex items-center justify-between">
      <SkeletonPulse className="w-32 h-5" />
      <div className="flex gap-4">
        <SkeletonPulse className="w-12 h-4 hidden md:block" />
        <SkeletonPulse className="w-12 h-4 hidden md:block" />
        <SkeletonPulse className="w-12 h-4 hidden md:block" />
      </div>
    </div>
    <div className="container mx-auto max-w-4xl pt-32 flex flex-col items-center gap-6">
      <SkeletonPulse className="w-24 h-5 rounded-full" />
      <SkeletonPulse className="w-3/4 h-12 md:h-16" />
      <SkeletonPulse className="w-2/3 h-6" />
      <SkeletonPulse className="w-40 h-12 rounded-full mt-4" />
    </div>
    <div className="container mx-auto max-w-5xl pt-24 grid grid-cols-1 md:grid-cols-3 gap-6">
      <SkeletonPulse className="h-48 md:col-span-2" />
      <SkeletonPulse className="h-48" />
      <SkeletonPulse className="h-48" />
      <SkeletonPulse className="h-48 md:col-span-2" />
    </div>
  </div>
);

// ─── 404 Not Found ──────────────────────────────────────────────
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

// ─── CSS-based page transition (no AnimatePresence, no exit gap) ──
// Re-triggers a fade-in on every route change via a key reset.
const FadeIn: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const location = useLocation();
  const [visible, setVisible] = useState(false);
  const prevPath = useRef(location.pathname);

  useEffect(() => {
    if (location.pathname !== prevPath.current) {
      // Route changed — reset opacity, then fade in on next frame
      setVisible(false);
      prevPath.current = location.pathname;
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          setVisible(true);
        });
      });
    } else {
      // Initial mount
      setVisible(true);
    }
  }, [location.pathname]);

  return (
    <div
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(8px)',
        transition: 'opacity 0.35s ease, transform 0.35s ease',
      }}
    >
      {children}
    </div>
  );
};

// ─── App ────────────────────────────────────────────────────────
const App: React.FC = () => {
  usePrefetchPages();

  return (
    <ThemeProvider>
      <SplashScreen>
        <BrowserRouter>
          <ScrollToTopNav />
          <FloatingScrollToTop />
          <CustomCursor />
          <main id="main-content">
            <React.Suspense fallback={<PageLoader />}>
              <FadeIn>
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/tech" element={<Tech />} />
                  <Route path="/music" element={<Music />} />
                  <Route path="/media" element={<Media />} />
                  <Route path="/business" element={<Business />} />
                  <Route path="/learn" element={<Learn />} />
                  <Route path="/ai-advantage" element={<AIAdvantage />} />
                  <Route path="/blog" element={<Blog />} />
                  <Route path="/blog/:slug" element={<BlogPost />} />
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </FadeIn>
            </React.Suspense>
          </main>
        </BrowserRouter>
      </SplashScreen>
    </ThemeProvider>
  );
};

export default App;