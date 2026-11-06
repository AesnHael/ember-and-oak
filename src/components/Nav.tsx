import { AnimatePresence, motion, useMotionValueEvent, useScroll } from 'framer-motion';
import { useEffect, useState, type MouseEvent } from 'react';
import { navLinks, socials } from '../data';
import { lockScroll, scrollToTarget } from '../lib/scroll';
import { LogoMark, Wordmark } from './ui/Logo';

export function Nav({ ready }: { ready: boolean }) {
  const { scrollY } = useScroll();
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<string>('');

  useMotionValueEvent(scrollY, 'change', (y) => {
    const prev = scrollY.getPrevious() ?? 0;
    setScrolled(y > 40);
    setHidden(y > 700 && y > prev && !open);
  });

  useEffect(() => {
    lockScroll(open);
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);

  // Scroll-spy for the active section
  useEffect(() => {
    const sections = navLinks
      .map((l) => document.querySelector(l.href))
      .filter((el): el is Element => !!el);
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => e.isIntersecting && setActive(`#${e.target.id}`));
      },
      { rootMargin: '-45% 0px -50% 0px' },
    );
    sections.forEach((s) => io.observe(s));
    return () => io.disconnect();
  }, [ready]);

  const go = (e: MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setOpen(false);
    // let the menu close before scrolling on mobile
    window.setTimeout(() => scrollToTarget(href), open ? 450 : 0);
  };

  return (
    <>
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={ready ? { y: hidden ? -110 : 0, opacity: 1 } : { y: -100, opacity: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: ready && !scrolled ? 0.9 : 0 }}
        className="fixed inset-x-0 top-0 z-[58]"
      >
        <div className={`container-x transition-[padding] duration-500 ${scrolled ? 'pt-3' : 'pt-5 sm:pt-7'}`}>
          <nav
            aria-label="Primary"
            className={`flex items-center justify-between rounded-full transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
              scrolled
                ? 'border border-cream/10 bg-espresso/70 py-2 pl-4 pr-2 shadow-[0_10px_40px_-10px_rgba(0,0,0,0.6)] backdrop-blur-xl'
                : 'border border-transparent py-2 pl-0 pr-0'
            }`}
          >
            <a href="#top" onClick={(e) => go(e, '#top')} className="flex items-center gap-2.5 text-cream" aria-label="Ember & Oak — back to top">
              <LogoMark className="h-8 w-8 text-brass" />
              <Wordmark />
            </a>

            <ul className="hidden items-center gap-1 lg:flex">
              {navLinks.map((l) => (
                <li key={l.href}>
                  <a
                    href={l.href}
                    onClick={(e) => go(e, l.href)}
                    className="group relative block px-4 py-2 text-sm font-medium text-cream/80 transition-colors hover:text-cream"
                    aria-current={active === l.href ? 'true' : undefined}
                  >
                    {l.label}
                    <span
                      className={`absolute bottom-1 left-1/2 h-1 w-1 -translate-x-1/2 rounded-full bg-ember transition-transform duration-300 ${
                        active === l.href ? 'scale-100' : 'scale-0 group-hover:scale-100'
                      }`}
                    />
                  </a>
                </li>
              ))}
            </ul>

            <div className="flex items-center gap-2">
              <a
                href="#visit"
                onClick={(e) => go(e, '#visit')}
                className="hidden rounded-full bg-cream px-5 py-2.5 text-sm font-semibold text-espresso transition-colors duration-300 hover:bg-ember sm:inline-block"
              >
                Reserve a table
              </a>
              <button
                type="button"
                onClick={() => setOpen((o) => !o)}
                aria-expanded={open}
                aria-controls="mobile-menu"
                aria-label={open ? 'Close menu' : 'Open menu'}
                className="relative z-[70] grid h-11 w-11 place-items-center rounded-full bg-cream/10 backdrop-blur lg:hidden"
              >
                <span className="relative block h-3 w-5">
                  <motion.span
                    className="absolute left-0 top-0 h-[1.5px] w-5 bg-cream"
                    animate={open ? { rotate: 45, y: 5.5 } : { rotate: 0, y: 0 }}
                    transition={{ duration: 0.4, ease: [0.76, 0, 0.24, 1] }}
                  />
                  <motion.span
                    className="absolute bottom-0 left-0 h-[1.5px] w-5 bg-cream"
                    animate={open ? { rotate: -45, y: -5.5, width: 20 } : { rotate: 0, y: 0, width: 13 }}
                    transition={{ duration: 0.4, ease: [0.76, 0, 0.24, 1] }}
                  />
                </span>
              </button>
            </div>
          </nav>
        </div>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            role="dialog"
            aria-modal="true"
            aria-label="Site menu"
            className="fixed inset-0 z-[55] flex flex-col bg-roast lg:hidden"
            initial={{ clipPath: 'circle(0% at calc(100% - 44px) 44px)' }}
            animate={{ clipPath: 'circle(150% at calc(100% - 44px) 44px)' }}
            exit={{ clipPath: 'circle(0% at calc(100% - 44px) 44px)' }}
            transition={{ duration: 0.75, ease: [0.76, 0, 0.24, 1] }}
          >
            <div className="container-x flex flex-1 flex-col justify-between pb-10 pt-28">
              <ul className="space-y-1">
                {navLinks.map((l, i) => (
                  <li key={l.href} className="overflow-hidden">
                    <motion.a
                      href={l.href}
                      onClick={(e) => go(e, l.href)}
                      initial={{ y: '110%' }}
                      animate={{ y: '0%' }}
                      exit={{ y: '110%', transition: { duration: 0.3 } }}
                      transition={{ duration: 0.8, delay: 0.25 + i * 0.06, ease: [0.16, 1, 0.3, 1] }}
                      className="flex items-baseline gap-4 font-display text-[3.4rem] leading-[1.05] tracking-tight text-cream"
                    >
                      <span className="font-sans text-xs tabular-nums text-ember">0{i + 1}</span>
                      {l.label}
                    </motion.a>
                  </li>
                ))}
              </ul>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ delay: 0.6, duration: 0.6 }}
                className="space-y-6 border-t border-cream/10 pt-6 text-sm text-cream/70"
              >
                <p>
                  41 Cinder Lane, Brooklyn
                  <br />
                  Open daily from 7am
                </p>
                <div className="flex flex-wrap gap-x-5 gap-y-2">
                  {socials.map((s) => (
                    <a key={s.label} href={s.href} target="_blank" rel="noreferrer" className="text-cream underline-offset-4 hover:underline">
                      {s.label}
                    </a>
                  ))}
                </div>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
