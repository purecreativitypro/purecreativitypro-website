import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation, Link } from 'react-router-dom';
import { ArrowUp } from 'lucide-react';
import { Helmet } from 'react-helmet-async';
import { ThemeProvider } from './components/ThemeContext';
import SplashScreen from './components/SplashScreen';
import CustomCursor from './components/CustomCursor';
import { logPageView } from './lib/firebase';

// Direct imports — all pages load with the bundle, no lazy/Suspense flash
import Home from './pages/Home';
import Tech from './pages/Tech';
import Music from './pages/Music';
import Media from './pages/Media';
import Business from './pages/Business';
import Learn from './pages/Learn';
import Blog from './pages/Blog';
import BlogPost from './pages/BlogPost';

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

const App: React.FC = () => {
  return (
    <ThemeProvider>
      <SplashScreen>
        <BrowserRouter>
          <ScrollToTopNav />
          <FloatingScrollToTop />
          <CustomCursor />
          <main id="main-content">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/tech" element={<Tech />} />
              <Route path="/music" element={<Music />} />
              <Route path="/media" element={<Media />} />
              <Route path="/business" element={<Business />} />
              <Route path="/learn" element={<Learn />} />
              <Route path="/blog" element={<Blog />} />
              <Route path="/blog/:slug" element={<BlogPost />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>
        </BrowserRouter>
      </SplashScreen>
    </ThemeProvider>
  );
};

export default App;