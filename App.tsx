import React from 'react';
import { HashRouter, Routes, Route, useLocation } from 'react-router-dom';
import Home from './pages/Home';
import Tech from './pages/Tech';
import Music from './pages/Music';
import Media from './pages/Media';
import Business from './pages/Business';

const ScrollToTop = () => {
  const { pathname } = useLocation();

  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

const App: React.FC = () => {
  return (
    <HashRouter>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/tech" element={<Tech />} />
        <Route path="/music" element={<Music />} />
        <Route path="/media" element={<Media />} />
        <Route path="/business" element={<Business />} />
      </Routes>
    </HashRouter>
  );
};

export default App;