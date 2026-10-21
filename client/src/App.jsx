import { lazy, Suspense, useEffect } from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import WhatsAppButton from './components/WhatsAppButton';
import Home from './pages/Home';

const Supplements = lazy(() => import('./pages/Supplements'));
const ProductDetails = lazy(() => import('./pages/ProductDetails'));
const About = lazy(() => import('./pages/About'));
const Contact = lazy(() => import('./pages/Contact'));
const NotFound = lazy(() => import('./pages/NotFound'));

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => { window.scrollTo(0, 0); }, [pathname]);
  return null;
}

export default function App() {
  const location = useLocation();
  return (
    <>
      <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[100] focus:bg-gold focus:text-black focus:px-4 focus:py-2 font-bold">
        Skip to content
      </a>
      <ScrollToTop />
      <Navbar />
      <AnimatePresence mode="wait" initial={false}>
        <motion.main
          id="main"
          key={location.pathname}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.28, ease: 'easeOut' }}
        >
          <Suspense fallback={<div className="min-h-[70vh]" />}>
            <Routes location={location}>
              <Route path="/" element={<Home />} />
              <Route path="/supplements" element={<Supplements />} />
              <Route path="/supplements/:slug" element={<ProductDetails />} />
              {/* Old links from the previous catalogue */}
              <Route path="/equipment/*" element={<Navigate to="/supplements" replace />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
        </motion.main>
      </AnimatePresence>
      <Footer />
      <WhatsAppButton />
    </>
  );
}
