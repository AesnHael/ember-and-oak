import { AnimatePresence, motion } from 'framer-motion';
import { X } from 'lucide-react';
import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import interior from '../assets/images/interior.webp';
import croissant from '../assets/images/croissant.webp';
import chemex from '../assets/images/chemex.webp';
import hands from '../assets/images/hands.webp';
import beans from '../assets/images/beans.webp';
import cappuccino from '../assets/images/cappuccino.webp';
import mocha from '../assets/images/mocha.webp';
import { gsap, lockScroll } from '../lib/scroll';
import { MagneticButton } from './ui/MagneticButton';
import { SectionLabel } from './ui/SectionLabel';
import { SplitWords } from './ui/SplitWords';

interface Shot {
  src: string;
  alt: string;
  caption: string;
  span: string;
  speed: number;
}

const shots: Shot[] = [
  {
    src: interior,
    alt: 'Warm café interior with oak-slatted walls, leather banquettes and round wooden tables',
    caption: 'The back room',
    span: 'col-span-2 row-span-2 md:col-span-4 lg:col-span-7',
    speed: 10,
  },
  {
    src: croissant,
    alt: 'Two croissants dusted with powdered sugar on dark slate',
    caption: 'Out of the oven, 6:40am',
    span: 'md:col-span-2 lg:col-span-5',
    speed: 14,
  },
  {
    src: chemex,
    alt: 'Gooseneck kettle pouring water into a Chemex at the slow bar',
    caption: 'Slow bar',
    span: 'md:col-span-2 lg:col-span-5',
    speed: 8,
  },
  {
    src: hands,
    alt: 'Barista in an apron holding a cappuccino on a saucer',
    caption: 'Service with a smile',
    span: 'row-span-2 md:col-span-2 lg:col-span-4',
    speed: 12,
  },
  {
    src: beans,
    alt: 'Close-up texture of freshly roasted coffee beans',
    caption: 'House Ember blend',
    span: 'md:col-span-2 lg:col-span-4',
    speed: 6,
  },
  {
    src: cappuccino,
    alt: 'Cappuccino with heart latte art in a brown cup on a wooden table',
    caption: 'The 8am ritual',
    span: 'md:col-span-2 md:row-span-2 lg:col-span-4',
    speed: 12,
  },
  {
    src: mocha,
    alt: 'Mocha in a glass mug against an exposed brick wall',
    caption: 'Midnight Mocha',
    span: 'col-span-2 md:col-span-2 lg:col-span-4',
    speed: 8,
  },
];

export function Gallery() {
  const root = useRef<HTMLElement>(null);
  const [open, setOpen] = useState<number | null>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();
      mm.add('(prefers-reduced-motion: no-preference)', () => {
        gsap.utils.toArray<HTMLElement>('[data-parallax]').forEach((el) => {
          const speed = Number(el.dataset.parallax);
          gsap.fromTo(
            el,
            { yPercent: -speed },
            { yPercent: speed, ease: 'none', scrollTrigger: { trigger: el.parentElement, start: 'top bottom', end: 'bottom top', scrub: true } },
          );
        });
      });
    }, root);
    return () => ctx.revert();
  }, []);

  useEffect(() => {
    if (open === null) return;
    lockScroll(true);
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(null);
      if (e.key === 'ArrowRight') setOpen((o) => (o === null ? o : (o + 1) % shots.length));
      if (e.key === 'ArrowLeft') setOpen((o) => (o === null ? o : (o - 1 + shots.length) % shots.length));
    };
    window.addEventListener('keydown', onKey);
    return () => {
      lockScroll(false);
      window.removeEventListener('keydown', onKey);
    };
  }, [open]);

  return (
    <section id="gallery" ref={root} aria-labelledby="gallery-title" className="relative bg-roast py-24 sm:py-32 lg:py-40">
      <div className="container-x">
        <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <div>
            <SectionLabel index="03">Inside the café</SectionLabel>
            <h2
              id="gallery-title"
              className="mt-6 max-w-[13ch] font-display text-[clamp(2.6rem,6.4vw,6rem)] font-light leading-[0.95] tracking-[-0.03em]"
            >
              <SplitWords
                text="A room that smells like home."
                wordClassName={(w) => (w === 'home.' ? 'italic text-ember-soft' : undefined)}
              />
            </h2>
          </div>
          <MagneticButton href="https://instagram.com" variant="ghost" external className="self-start md:self-auto">
            @emberandoak
          </MagneticButton>
        </div>

        <ul className="mt-14 grid grid-flow-dense auto-rows-[44vw] grid-cols-2 gap-3 sm:auto-rows-[200px] sm:gap-4 md:grid-cols-6 md:auto-rows-[210px] lg:mt-20 lg:grid-cols-12 lg:auto-rows-[clamp(220px,19vw,300px)] lg:gap-5">
          {shots.map((s, i) => (
            <motion.li
              key={s.src}
              className={s.span}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 1, delay: (i % 3) * 0.08, ease: [0.16, 1, 0.3, 1] }}
            >
              <button
                type="button"
                data-cursor="View"
                onClick={() => setOpen(i)}
                aria-label={`Open photo: ${s.caption}`}
                className="group relative block h-full w-full overflow-hidden rounded-[18px] bg-bark text-left lg:rounded-[24px]"
              >
                <div data-parallax={s.speed} className="absolute -inset-y-[14%] inset-x-0">
                  <img
                    src={s.src}
                    alt={s.alt}
                    loading="lazy"
                    decoding="async"
                    className="h-full w-full object-cover transition-transform duration-[1.4s] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-110"
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-espresso/70 via-transparent to-transparent opacity-0 transition-opacity duration-700 group-hover:opacity-100" />
                <span className="absolute bottom-4 left-4 translate-y-4 text-sm font-medium text-cream opacity-0 transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-y-0 group-hover:opacity-100 lg:bottom-6 lg:left-6 lg:text-base">
                  <span className="mr-2 text-ember">0{i + 1}</span>
                  {s.caption}
                </span>
              </button>
            </motion.li>
          ))}
        </ul>
      </div>

      <AnimatePresence>
        {open !== null && (
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label={shots[open].caption}
            className="fixed inset-0 z-[80] flex items-center justify-center bg-espresso/95 p-4 backdrop-blur-sm sm:p-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setOpen(null)}
          >
            <motion.figure
              key={open}
              initial={{ opacity: 0, scale: 0.94, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="relative max-h-full max-w-6xl"
              onClick={(e) => e.stopPropagation()}
            >
              <img src={shots[open].src} alt={shots[open].alt} className="max-h-[80vh] w-auto rounded-2xl object-contain" />
              <figcaption className="mt-4 flex items-center justify-between text-sm text-oat/80">
                <span>
                  <span className="mr-2 text-ember">0{open + 1}</span>
                  {shots[open].caption}
                </span>
                <span className="text-ash">← → to browse</span>
              </figcaption>
            </motion.figure>
            <button
              type="button"
              onClick={() => setOpen(null)}
              aria-label="Close photo"
              autoFocus
              className="absolute right-5 top-5 grid h-12 w-12 place-items-center rounded-full bg-cream text-espresso transition-colors hover:bg-ember"
            >
              <X className="h-5 w-5" aria-hidden="true" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
