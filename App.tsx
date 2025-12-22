import React, { Suspense } from 'react';
import { HashRouter, Routes, Route, useLocation } from 'react-router-dom';

// Lazy load pages to improve initial load performance
const Home = React.lazy(() => import('./pages/Home'));
const Tech = React.lazy(() => import('./pages/Tech'));
const Music = React.lazy(() => import('./pages/Music'));
const Media = React.lazy(() => import('./pages/Media'));
const Business = React.lazy(() => import('./pages/Business'));
const Learn = React.lazy(() => import('./pages/Learn'));

const ScrollToTop = () => {
  const { pathname } = useLocation();

  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
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
      <ScrollToTop />
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