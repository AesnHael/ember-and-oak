import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { LogoMark } from './ui/Logo';

interface PreloaderProps {
  onDone: () => void;
}

const DURATION = 1150; // counter duration (ms); exit animation finishes well under 1.5s total

/** Logo + counter intro. Calls `onDone` when the curtain starts lifting. */
export function Preloader({ onDone }: PreloaderProps) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let raf = 0;
    const start = performance.now();
    const step = (now: number) => {
      const p = Math.min(1, (now - start) / DURATION);
      const eased = 1 - Math.pow(1 - p, 3);
      setCount(Math.round(eased * 100));
      if (p < 1) raf = requestAnimationFrame(step);
      else onDone();
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [onDone]);

  return (
    <motion.div
      role="status"
      aria-live="polite"
      aria-label="Loading Ember & Oak"
      className="fixed inset-0 z-[90] flex flex-col items-center justify-center bg-espresso text-cream"
      initial={{ clipPath: 'inset(0% 0% 0% 0%)' }}
      exit={{ clipPath: 'inset(0% 0% 100% 0%)', transition: { duration: 0.75, ease: [0.76, 0, 0.24, 1] } }}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, y: -30, transition: { duration: 0.4 } }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="flex flex-col items-center gap-5"
      >
        <LogoMark className="h-16 w-16 text-brass" draw />
        <div className="overflow-hidden">
          <motion.p
            initial={{ y: '100%' }}
            animate={{ y: '0%' }}
            transition={{ duration: 0.8, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="font-display text-3xl tracking-tight"
          >
            Ember <span className="italic text-brass">&amp;</span> Oak
          </motion.p>
        </div>
      </motion.div>

      <div className="absolute inset-x-0 bottom-0 container-x flex items-end justify-between pb-8 text-xs uppercase tracking-[0.25em] text-ash">
        <span>Roasting since 2014</span>
        <span className="font-display text-5xl tabular-nums tracking-tight text-cream normal-case sm:text-7xl">
          {count}
          <span className="text-ember">%</span>
        </span>
      </div>
      <motion.div
        aria-hidden="true"
        className="absolute bottom-0 left-0 h-[2px] bg-ember"
        style={{ width: `${count}%` }}
      />
    </motion.div>
  );
}
