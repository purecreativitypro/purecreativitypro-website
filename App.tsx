import React, { Suspense, useState, useEffect } from 'react';
import { HashRouter, Routes, Route, useLocation } from 'react-router-dom';
import { ArrowUp } from 'lucide-react';

// Lazy load pages to improve initial load performance
const Home = React.lazy(() => import('./pages/Home'));
const Tech = React.lazy(() => import('./pages/Tech'));
const Music = React.lazy(() => import('./pages/Music'));
const Media = React.lazy(() => import('./pages/Media'));
const Business = React.lazy(() => import('./pages/Business'));
const Learn = React.lazy(() => import('./pages/Learn'));

const ScrollToTopNav = () => {
  const { pathname } = useLocation();

  React.useEffect(() => {
    window.scrollTo(0, 0);
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
      className={`fixed bottom-6 right-6 z-[90] p-3 rounded-full bg-zinc-900/80 backdrop-blur-md border border-white/10 text-white shadow-[0_0_20px_rgba(0,0,0,0.5)] transition-all duration-500 hover:bg-zinc-800 md:hidden flex items-center justify-center ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10 pointer-events-none'
      }`}
      aria-label="Scroll to top"
    >
      <ArrowUp size={20} />
    </button>
  );
};

// Simple loading indicator
const PageLoader = () => (
  <div className="min-h-screen w-full bg-[#050505] flex items-center justify-center">
    <div className="w-8 h-8 border-2 border-white/20 border-t-white rounded-full animate-spin"></div>
  </div>
);

const App: React.FC = () => {
  return (
    <HashRouter>
      <ScrollToTopNav />
      <FloatingScrollToTop />
      <Suspense fallback={<PageLoader />}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/tech" element={<Tech />} />
          <Route path="/music" element={<Music />} />
          <Route path="/media" element={<Media />} />
          <Route path="/business" element={<Business />} />
          <Route path="/learn" element={<Learn />} />
        </Routes>
      </Suspense>
    </HashRouter>
  );
};

export default App;