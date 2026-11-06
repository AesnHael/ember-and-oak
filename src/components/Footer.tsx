import { AnimatePresence, motion } from 'framer-motion';
import { ArrowRight, ArrowUp, ArrowUpRight, Check } from 'lucide-react';
import { useState, type FormEvent } from 'react';
import { navLinks, socials } from '../data';
import { scrollToTarget } from '../lib/scroll';
import { LogoMark } from './ui/Logo';

const ease = [0.16, 1, 0.3, 1] as const;

function Newsletter() {
  const [sent, setSent] = useState(false);
  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSent(true);
  };
  return (
    <form onSubmit={onSubmit} className="relative mt-8 max-w-md" aria-label="Newsletter sign-up">
      <label htmlFor="email" className="sr-only">
        Email address
      </label>
      <AnimatePresence mode="wait" initial={false}>
        {sent ? (
          <motion.p
            key="ok"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-3 border-b border-ember py-4 text-cream"
            role="status"
          >
            <Check className="h-5 w-5 text-ember" aria-hidden="true" />
            You&apos;re on the list. First roast notes land Friday.
          </motion.p>
        ) : (
          <motion.div key="form" exit={{ opacity: 0, y: -10 }} className="group flex items-center border-b border-cream/25 transition-colors focus-within:border-ember">
            <input
              id="email"
              type="email"
              required
              placeholder="you@email.com"
              autoComplete="email"
              className="w-full bg-transparent py-4 text-lg text-cream placeholder:text-ash/70 focus:outline-none"
            />
            <button
              type="submit"
              aria-label="Subscribe"
              className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-cream text-espresso transition-all duration-500 hover:bg-ember group-focus-within:bg-ember"
            >
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </form>
  );
}

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="relative overflow-hidden bg-[#0d0907] pt-24 sm:pt-32">
      <div className="container-x">
        <div className="grid gap-16 lg:grid-cols-12">
          <div className="lg:col-span-6">
            <h2 className="font-display text-[clamp(2.4rem,5vw,4.5rem)] font-light leading-[1] tracking-[-0.03em]">
              Roast notes, <span className="italic text-ember-soft">once a month.</span>
            </h2>
            <p className="mt-5 max-w-md text-oat/70">
              New origins, slow-bar dates and the occasional croissant giveaway. No spam — we&apos;re far too busy
              roasting.
            </p>
            <Newsletter />
          </div>

          <div className="grid grid-cols-2 gap-10 sm:grid-cols-3 lg:col-span-6 lg:pl-10">
            <div>
              <p className="text-[0.7rem] font-semibold uppercase tracking-[0.3em] text-ash">Explore</p>
              <ul className="mt-5 space-y-3">
                {navLinks.map((l) => (
                  <li key={l.href}>
                    <a
                      href={l.href}
                      onClick={(e) => {
                        e.preventDefault();
                        scrollToTarget(l.href);
                      }}
                      className="text-oat/80 transition-colors hover:text-cream"
                    >
                      {l.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="text-[0.7rem] font-semibold uppercase tracking-[0.3em] text-ash">Follow</p>
              <ul className="mt-5 space-y-3">
                {socials.map((s) => (
                  <li key={s.label}>
                    <a
                      href={s.href}
                      target="_blank"
                      rel="noreferrer"
                      className="group inline-flex items-center gap-1.5 text-oat/80 transition-colors hover:text-cream"
                    >
                      {s.label}
                      <ArrowUpRight
                        className="h-3.5 w-3.5 -translate-x-1 opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100"
                        aria-hidden="true"
                      />
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div className="col-span-2 sm:col-span-1">
              <p className="text-[0.7rem] font-semibold uppercase tracking-[0.3em] text-ash">Find us</p>
              <p className="mt-5 leading-relaxed text-oat/80">
                41 Cinder Lane
                <br />
                Brooklyn, NY 11211
              </p>
              <p className="mt-3 text-oat/80">Daily from 7am</p>
            </div>
          </div>
        </div>
      </div>

      <div className="relative mt-24 select-none overflow-hidden sm:mt-32" aria-hidden="true">
        <motion.p
          initial={{ y: '60%', opacity: 0 }}
          whileInView={{ y: '0%', opacity: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 1.4, ease }}
          className="container-x whitespace-nowrap font-display text-[17.5vw] font-light leading-[0.8] tracking-[-0.05em] text-cream"
        >
          Ember <span className="italic text-ember">&amp;</span> Oak
        </motion.p>
      </div>

      <div className="container-x mt-10 flex flex-col gap-6 border-t border-cream/10 py-8 text-xs text-ash sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <LogoMark className="h-6 w-6 text-brass" />
          <span>© {year} Ember &amp; Oak. A fictional brand — concept site for portfolio use.</span>
        </div>
        <div className="flex items-center gap-6">
          <a
            href="https://unsplash.com/license"
            target="_blank"
            rel="noreferrer"
            className="transition-colors hover:text-cream"
          >
            Photography via Unsplash
          </a>
          <button
            type="button"
            onClick={() => scrollToTarget('#top')}
            className="group inline-flex items-center gap-2 text-cream"
          >
            Back to top
            <span className="grid h-9 w-9 place-items-center rounded-full border border-cream/20 transition-colors duration-300 group-hover:border-ember group-hover:bg-ember group-hover:text-espresso">
              <ArrowUp className="h-4 w-4" aria-hidden="true" />
            </span>
          </button>
        </div>
      </div>
    </footer>
  );
}
