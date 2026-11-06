import { motion } from 'framer-motion';
import { useLayoutEffect, useRef } from 'react';
import heroLg from '../assets/images/hero.webp';
import heroSm from '../assets/images/hero-sm.webp';
import { gsap } from '../lib/scroll';
import { MagneticButton } from './ui/MagneticButton';
import { SplitWords } from './ui/SplitWords';

const ease = [0.16, 1, 0.3, 1] as const;

export function Hero({ ready }: { ready: boolean }) {
  const root = useRef<HTMLElement>(null);
  const img = useRef<HTMLImageElement>(null);
  const content = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();
      mm.add('(prefers-reduced-motion: no-preference)', () => {
        gsap.to(img.current, {
          yPercent: 22,
          scale: 1.08,
          ease: 'none',
          scrollTrigger: { trigger: root.current, start: 'top top', end: 'bottom top', scrub: true },
        });
        gsap.to(content.current, {
          yPercent: -18,
          opacity: 0.1,
          ease: 'none',
          scrollTrigger: { trigger: root.current, start: 'top top', end: 'bottom top', scrub: true },
        });
      });
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section
      id="top"
      ref={root}
      aria-labelledby="hero-title"
      className="relative isolate flex h-[100svh] min-h-[640px] items-end overflow-hidden bg-espresso"
    >
      {/* Background photo with intro zoom + scroll parallax */}
      <motion.div
        className="absolute inset-0 -z-10"
        initial={{ scale: 1.25, opacity: 0 }}
        animate={ready ? { scale: 1, opacity: 1 } : {}}
        transition={{ duration: 2.2, ease, opacity: { duration: 0.9, ease: 'easeOut' } }}
      >
        <img
          ref={img}
          src={heroLg}
          srcSet={`${heroSm} 1100w, ${heroLg} 2400w`}
          sizes="100vw"
          alt="A roaster tipping freshly roasted coffee beans into a cooling tray under a warm desk lamp"
          fetchPriority="high"
          decoding="async"
          className="h-full w-full origin-center scale-[1.04] object-cover object-[30%_50%]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-espresso via-espresso/35 to-espresso/40" />
        <div className="absolute inset-0 bg-gradient-to-r from-espresso/80 via-espresso/20 to-transparent" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_70%_35%,rgba(210,101,45,0.18),transparent_55%)]" />
      </motion.div>

      <div ref={content} className="container-x relative pb-12 sm:pb-16 lg:pb-20">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={ready ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9, delay: 0.2, ease }}
          className="mb-6 flex items-center gap-3 text-[0.65rem] font-semibold uppercase tracking-[0.22em] text-oat/80 sm:text-xs sm:tracking-[0.32em]"
        >
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-ember opacity-60 motion-reduce:animate-none" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-ember" />
          </span>
          Small-batch roasters · Brooklyn, NY
        </motion.p>

        <h1
          id="hero-title"
          className="font-display text-[clamp(2.45rem,10.5vw,10rem)] font-light leading-[0.9] tracking-[-0.035em] text-cream"
        >
          <SplitWords text="Roasted over oak." play={ready} delay={0.3} className="block" />
          <SplitWords
            text="Poured with intent."
            play={ready}
            delay={0.55}
            className="block"
            wordClassName={(w) => (w.startsWith('intent') ? 'italic text-ember-soft' : undefined)}
          />
        </h1>

        <div className="mt-8 flex flex-col gap-8 sm:mt-10 lg:flex-row lg:items-end lg:justify-between">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={ready ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1, delay: 1.05, ease }}
            className="max-w-md"
          >
            <p className="text-base leading-relaxed text-oat/85 sm:text-lg">
              Single-origin coffee, slow-roasted in twelve-kilo batches over seasoned white oak — then brewed
              by people who still get excited about it.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <MagneticButton href="#menu">Explore the menu</MagneticButton>
              <MagneticButton href="#visit" variant="ghost">
                Plan a visit
              </MagneticButton>
            </div>
          </motion.div>

          <motion.aside
            aria-label="Now roasting"
            initial={{ opacity: 0, x: 30 }}
            animate={ready ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 1, delay: 1.25, ease }}
            className="hidden w-72 rounded-2xl border border-cream/10 bg-espresso/40 p-5 backdrop-blur-md lg:block"
          >
            <div className="flex items-center justify-between text-[0.65rem] font-semibold uppercase tracking-[0.25em] text-ash">
              <span>Now roasting</span>
              <span className="text-ember">Lot 07</span>
            </div>
            <p className="mt-3 font-display text-2xl leading-tight text-cream">Ethiopia Guji</p>
            <p className="mt-1 text-sm text-oat/70">Bergamot · Apricot · Jasmine</p>
            <div className="mt-4 h-px w-full bg-cream/10">
              <motion.div
                className="h-px bg-ember"
                initial={{ width: '0%' }}
                animate={ready ? { width: '68%' } : {}}
                transition={{ duration: 2, delay: 1.6, ease }}
              />
            </div>
            <p className="mt-2 text-[0.7rem] text-ash">Batch 68% complete · out of the drum at 11:40</p>
          </motion.aside>
        </div>
      </div>

      {/* Scroll cue */}
      <motion.div
        aria-hidden="true"
        initial={{ opacity: 0 }}
        animate={ready ? { opacity: 1 } : {}}
        transition={{ delay: 1.6, duration: 1 }}
        className="absolute bottom-8 right-5 hidden flex-col items-center gap-3 text-[0.6rem] uppercase tracking-[0.3em] text-oat/60 sm:right-8 sm:flex lg:hidden xl:right-10 xl:flex xl:bottom-auto xl:top-1/2 xl:-translate-y-1/2"
      >
        <span className="[writing-mode:vertical-rl]">Scroll</span>
        <span className="relative h-16 w-px overflow-hidden bg-cream/15">
          <span className="absolute inset-x-0 top-0 h-1/2 animate-[scrollcue_2s_cubic-bezier(0.76,0,0.24,1)_infinite] bg-ember motion-reduce:animate-none" />
        </span>
      </motion.div>
    </section>
  );
}
