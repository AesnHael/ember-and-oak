import { AnimatePresence, MotionConfig } from 'framer-motion';
import { useCallback, useEffect, useState } from 'react';
import { About } from './components/About';
import { Cursor } from './components/Cursor';
import { Footer } from './components/Footer';
import { Gallery } from './components/Gallery';
import { Hero } from './components/Hero';
import { Menu } from './components/Menu';
import { Nav } from './components/Nav';
import { Preloader } from './components/Preloader';
import { Testimonials } from './components/Testimonials';
import { Ticker } from './components/Ticker';
import { Visit } from './components/Visit';
import { initSmoothScroll, lockScroll, ScrollTrigger } from './lib/scroll';

export default function App() {
  const [loading, setLoading] = useState(true);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if ('scrollRestoration' in history) history.scrollRestoration = 'manual';
    window.scrollTo(0, 0);
    const destroy = initSmoothScroll();
    return destroy;
  }, []);

  useEffect(() => {
    lockScroll(loading);
  }, [loading]);

  const handleDone = useCallback(() => setLoading(false), []);

  useEffect(() => {
    if (loading) return;
    // Hero copy starts while the curtain lifts.
    const t = window.setTimeout(() => setReady(true), 150);
    // Recalculate trigger positions once fonts/images have settled.
    document.fonts?.ready.then(() => ScrollTrigger.refresh());
    window.addEventListener('load', () => ScrollTrigger.refresh(), { once: true });
    return () => window.clearTimeout(t);
  }, [loading]);

  return (
    <MotionConfig reducedMotion="user">
      <a
        href="#main"
        className="fixed left-4 top-4 z-[95] -translate-y-24 rounded-full bg-cream px-5 py-3 text-sm font-semibold text-espresso transition-transform focus:translate-y-0"
      >
        Skip to content
      </a>

      <AnimatePresence>{loading && <Preloader key="preloader" onDone={handleDone} />}</AnimatePresence>

      <Cursor />
      <Nav ready={ready} />

      <main id="main">
        <Hero ready={ready} />
        <About />
        <Ticker />
        <Menu />
        <Gallery />
        <Testimonials />
        <Visit />
      </main>
      <Footer />

      <div className="grain" aria-hidden="true" />
    </MotionConfig>
  );
}
