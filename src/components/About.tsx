import { useLayoutEffect, useRef } from 'react';
import roasting from '../assets/images/roasting.webp';
import barista from '../assets/images/barista.webp';
import { gsap } from '../lib/scroll';
import { Counter } from './ui/Counter';
import { Reveal } from './ui/Reveal';
import { SectionLabel } from './ui/SectionLabel';

const statement =
  'We started with a secondhand roaster, one oak log from a Catskills farm and a stubborn idea: coffee should taste like the place it was grown. Ten years on, every batch is still roasted by hand.';
const highlight = new Set(['oak', 'stubborn', 'place', 'hand.']);

const stats = [
  { to: 12, suffix: '', label: 'Single origins on rotation' },
  { to: 72, suffix: 'h', label: 'Croissant lamination' },
  { to: 4.9, suffix: '', decimals: 1, label: 'Average from 2,300+ reviews' },
  { to: 2014, suffix: '', label: 'Our very first roast' },
];

export function About() {
  const root = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();
      mm.add('(prefers-reduced-motion: no-preference)', () => {
        gsap.fromTo(
          '[data-scrub-word]',
          { opacity: 0.14 },
          {
            opacity: 1,
            stagger: 0.1,
            ease: 'none',
            scrollTrigger: { trigger: '[data-statement]', start: 'top 82%', end: 'bottom 50%', scrub: 0.6 },
          },
        );

        gsap.utils.toArray<HTMLElement>('[data-clip]').forEach((el) => {
          gsap.fromTo(
            el,
            { clipPath: 'inset(14% 10% 14% 10% round 28px)' },
            {
              clipPath: 'inset(0% 0% 0% 0% round 28px)',
              ease: 'none',
              scrollTrigger: { trigger: el, start: 'top 90%', end: 'top 35%', scrub: true },
            },
          );
          const img = el.querySelector('img');
          if (img) {
            gsap.fromTo(
              img,
              { yPercent: -8, scale: 1.18 },
              { yPercent: 8, scale: 1.05, ease: 'none', scrollTrigger: { trigger: el, start: 'top bottom', end: 'bottom top', scrub: true } },
            );
          }
        });
      });
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section id="story" ref={root} aria-labelledby="story-title" className="relative bg-cream py-24 text-espresso sm:py-32 lg:py-44">
      <div className="container-x">
        <div className="grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-3">
            <SectionLabel index="01" tone="dark">
              Our story
            </SectionLabel>
            <h2 id="story-title" className="sr-only">
              The story of Ember &amp; Oak
            </h2>
          </div>
          <p
            data-statement
            className="font-display text-[clamp(1.75rem,3.7vw,3.6rem)] font-light leading-[1.12] tracking-[-0.02em] text-balance lg:col-span-9"
          >
            {statement.split(' ').map((w, i) => (
              <span key={i} data-scrub-word className={highlight.has(w) ? 'italic text-ember' : undefined}>
                {w}{' '}
              </span>
            ))}
          </p>
        </div>

        <div className="mt-20 grid gap-6 sm:mt-28 md:grid-cols-12 md:gap-8 lg:mt-36">
          <figure className="md:col-span-7">
            <div data-clip className="relative aspect-[4/5] overflow-hidden rounded-[28px] bg-bark sm:aspect-[5/4] md:aspect-[4/5] lg:aspect-[5/6]">
              <img
                src={roasting}
                alt="Hands scooping dark roasted coffee beans out of a steel roasting drum"
                loading="lazy"
                decoding="async"
                className="absolute inset-0 h-full w-full object-cover"
              />
            </div>
            <figcaption className="mt-4 flex justify-between text-xs uppercase tracking-[0.2em] text-bark/60">
              <span>The roastery, Greenpoint</span>
              <span>Fig. 01</span>
            </figcaption>
          </figure>

          <div className="flex flex-col justify-between gap-12 md:col-span-5 md:pt-24 lg:pl-8">
            <Reveal>
              <h3 className="font-display text-3xl leading-tight tracking-tight sm:text-4xl">
                Fire, wood &amp; <span className="italic">patience.</span>
              </h3>
              <p className="mt-6 max-w-md text-base leading-relaxed text-bark/80 sm:text-lg">
                Our drum roaster is fired with reclaimed white oak, which gives each bean a gentle, rounded sweetness
                you can&apos;t fake with gas. We buy directly from eleven farms across Ethiopia, Colombia and Guatemala
                — and pay well above fair-trade, because great coffee starts with people who are looked after.
              </p>
              <p className="mt-6 font-display text-lg italic text-bark/70">— Ines &amp; Caleb Moreau, founders</p>
            </Reveal>

            <figure>
              <div data-clip className="relative aspect-[4/3] overflow-hidden rounded-[28px] bg-bark">
                <img
                  src={barista}
                  alt="Barista presenting a cappuccino with a tulip of latte art"
                  loading="lazy"
                  decoding="async"
                  className="absolute inset-0 h-full w-full object-cover"
                />
              </div>
              <figcaption className="mt-4 flex justify-between text-xs uppercase tracking-[0.2em] text-bark/60">
                <span>The bar, Cinder Lane</span>
                <span>Fig. 02</span>
              </figcaption>
            </figure>
          </div>
        </div>

        <dl className="mt-24 grid grid-cols-2 gap-x-6 gap-y-12 border-t border-bark/15 pt-12 sm:mt-32 lg:grid-cols-4">
          {stats.map((s, i) => (
            <Reveal key={s.label} delay={i * 0.08}>
              <dt className="sr-only">{s.label}</dt>
              <dd className="font-display text-[clamp(3rem,6vw,5.5rem)] font-light leading-none tracking-tight">
                <Counter to={s.to} suffix={s.suffix} decimals={s.decimals} />
                {s.to === 4.9 && <span className="ml-1 align-top text-[0.45em] text-ember">★</span>}
              </dd>
              <dd aria-hidden="true" className="mt-3 max-w-[16ch] text-sm text-bark/70">
                {s.label}
              </dd>
            </Reveal>
          ))}
        </dl>
      </div>
    </section>
  );
}
