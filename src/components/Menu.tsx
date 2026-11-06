import { AnimatePresence, LayoutGroup, motion } from 'framer-motion';
import { useMemo, useState } from 'react';
import { categories, menu, type MenuItem } from '../data';
import { SectionLabel } from './ui/SectionLabel';
import { SplitWords } from './ui/SplitWords';
import { Reveal } from './ui/Reveal';

type Filter = (typeof categories)[number];

const price = (n: number) => `$${n.toFixed(2)}`;

function MenuCard({ item, index }: { item: MenuItem; index: number }) {
  return (
    <motion.li
      layout
      initial={{ opacity: 0, y: 40, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95, transition: { duration: 0.25 } }}
      transition={{ duration: 0.7, delay: index * 0.05, ease: [0.16, 1, 0.3, 1] }}
      className="group"
    >
      <article data-cursor="Sip" className="relative">
        <div className="relative aspect-[4/5] overflow-hidden rounded-[22px] bg-roast">
          <img
            src={item.image}
            alt={item.alt}
            loading="lazy"
            decoding="async"
            className="absolute inset-0 h-full w-full object-cover transition-transform duration-[1.4s] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.08]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-espresso/90 via-espresso/10 to-transparent opacity-70 transition-opacity duration-700 group-hover:opacity-100" />
          {item.badge && (
            <span className="absolute left-4 top-4 rounded-full border border-cream/20 bg-espresso/50 px-3 py-1.5 text-[0.65rem] font-semibold uppercase tracking-[0.18em] text-cream backdrop-blur-md">
              {item.badge}
            </span>
          )}
          <span className="absolute right-4 top-4 grid h-14 w-14 place-items-center rounded-full bg-cream font-display text-[0.95rem] font-medium text-espresso transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:rotate-[-12deg] group-hover:bg-ember">
            {price(item.price)}
          </span>
          <p className="absolute inset-x-5 bottom-5 translate-y-3 text-sm leading-relaxed text-oat opacity-0 transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-y-0 group-hover:opacity-100 max-md:hidden">
            {item.description}
          </p>
        </div>
        <div className="mt-5 flex items-start justify-between gap-4">
          <div>
            <h3 className="font-display text-2xl leading-tight tracking-tight text-cream">{item.name}</h3>
            <p className="mt-1.5 text-sm text-ash">{item.notes}</p>
          </div>
          <span className="mt-1 text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-brass">{item.category}</span>
        </div>
        <p className="mt-3 text-sm leading-relaxed text-oat/70 md:hidden">{item.description}</p>
      </article>
    </motion.li>
  );
}

export function Menu() {
  const [filter, setFilter] = useState<Filter>('All');
  const items = useMemo(() => (filter === 'All' ? menu : menu.filter((m) => m.category === filter)), [filter]);

  return (
    <section id="menu" aria-labelledby="menu-title" className="relative bg-espresso py-24 sm:py-32 lg:py-40">
      <div className="container-x">
        <div className="grid gap-10 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <SectionLabel index="02">The menu</SectionLabel>
            <h2
              id="menu-title"
              className="mt-6 font-display text-[clamp(2.6rem,6.4vw,6rem)] font-light leading-[0.95] tracking-[-0.03em]"
            >
              <SplitWords
                text="Made to be savoured, not rushed."
                wordClassName={(w) => (w === 'savoured,' ? 'italic text-ember-soft' : undefined)}
              />
            </h2>
          </div>
          <Reveal className="lg:col-span-5 lg:pb-3" delay={0.2}>
            <p className="max-w-md text-base leading-relaxed text-oat/75 lg:ml-auto">
              A short menu, done properly. Oat, almond and whole milk at no extra charge — and our slow bar rotates a
              new single origin every Thursday.
            </p>
          </Reveal>
        </div>

        <LayoutGroup>
          <div
            role="group"
            aria-label="Filter menu by category"
            className="-mx-5 mt-12 flex gap-2 overflow-x-auto px-5 pb-2 [scrollbar-width:none] sm:mx-0 sm:flex-wrap sm:px-0 [&::-webkit-scrollbar]:hidden"
          >
            {categories.map((c) => {
              const active = c === filter;
              return (
                <button
                  key={c}
                  type="button"
                  aria-pressed={active}
                  onClick={() => setFilter(c)}
                  className={`relative shrink-0 rounded-full border px-5 py-2.5 text-sm font-medium transition-colors duration-300 ${
                    active ? 'border-transparent text-espresso' : 'border-cream/15 text-cream/75 hover:border-cream/40 hover:text-cream'
                  }`}
                >
                  {active && (
                    <motion.span
                      layoutId="menu-pill"
                      className="absolute inset-0 -z-0 rounded-full bg-cream"
                      transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                    />
                  )}
                  <span className="relative">
                    {c}
                    <span className={`ml-2 text-xs ${active ? 'text-espresso/60' : 'text-ash'}`}>
                      {c === 'All' ? menu.length : menu.filter((m) => m.category === c).length}
                    </span>
                  </span>
                </button>
              );
            })}
          </div>

          <Reveal y={60} amount={0.02}>
            <motion.ul layout className="mt-12 grid gap-x-6 gap-y-14 sm:grid-cols-2 lg:grid-cols-3 lg:gap-x-8" aria-live="polite">
              <AnimatePresence mode="popLayout" initial={false}>
                {items.map((item, i) => (
                  <MenuCard key={item.id} item={item} index={i} />
                ))}
              </AnimatePresence>
            </motion.ul>
          </Reveal>
        </LayoutGroup>
      </div>
    </section>
  );
}
