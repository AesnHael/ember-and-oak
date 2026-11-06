import { useLayoutEffect, useRef } from 'react';
import { gsap } from '../lib/scroll';

const rowA = ['Single origin', 'Roasted over oak', 'Brewed by hand', 'Direct trade'];
const rowB = ['72-hour croissants', 'Slow bar Thursdays', 'Open from 7am', 'Since 2014'];

function Row({ words, outline }: { words: string[]; outline?: boolean }) {
  const items = [...words, ...words, ...words];
  return (
    <div className="flex shrink-0 items-center gap-10 whitespace-nowrap pr-10">
      {items.map((w, i) => (
        <span key={i} className="flex items-center gap-10">
          <span
            className={`font-display text-[clamp(3rem,8vw,7.5rem)] font-light italic leading-none tracking-tight ${
              outline ? 'text-transparent [-webkit-text-stroke:1px_rgba(242,234,220,0.35)]' : 'text-cream'
            }`}
          >
            {w}
          </span>
          <svg viewBox="0 0 24 24" className="h-7 w-7 shrink-0 text-ember sm:h-10 sm:w-10" aria-hidden="true">
            <path fill="currentColor" d="M12 0l2.4 9.6L24 12l-9.6 2.4L12 24l-2.4-9.6L0 12l9.6-2.4z" />
          </svg>
        </span>
      ))}
    </div>
  );
}

/** Two oversized rows of type that slide in opposite directions as you scroll. */
export function Ticker() {
  const root = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();
      mm.add('(prefers-reduced-motion: no-preference)', () => {
        const st = { trigger: root.current, start: 'top bottom', end: 'bottom top', scrub: 0.8 };
        gsap.fromTo('[data-row="a"]', { xPercent: 0 }, { xPercent: -22, ease: 'none', scrollTrigger: st });
        gsap.fromTo('[data-row="b"]', { xPercent: -22 }, { xPercent: 0, ease: 'none', scrollTrigger: st });
      });
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={root} aria-hidden="true" className="relative overflow-hidden border-y border-cream/10 bg-espresso py-10 sm:py-14">
      <div data-row="a" className="flex">
        <Row words={rowA} />
      </div>
      <div data-row="b" className="mt-4 flex sm:mt-6">
        <Row words={rowB} outline />
      </div>
    </div>
  );
}
