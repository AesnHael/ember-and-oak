import { Star } from 'lucide-react';
import { testimonials, type Testimonial } from '../data';
import { Reveal } from './ui/Reveal';
import { SectionLabel } from './ui/SectionLabel';
import { SplitWords } from './ui/SplitWords';

function Card({ t, hidden }: { t: Testimonial; hidden?: boolean }) {
  const initials = t.name
    .split(' ')
    .map((p) => p[0])
    .join('');
  return (
    <figure
      aria-hidden={hidden || undefined}
      className="flex w-[300px] shrink-0 flex-col justify-between rounded-[24px] border border-bark/10 bg-[#f8f3ea] p-7 shadow-[0_1px_0_rgba(20,14,10,0.04)] transition-colors duration-500 hover:border-ember/40 sm:w-[400px] sm:p-9"
    >
      <div>
        <div className="flex gap-1 text-ember" aria-label="Rated 5 out of 5">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star key={i} className="h-3.5 w-3.5 fill-current" aria-hidden="true" />
          ))}
        </div>
        <blockquote className="mt-5 font-display text-xl leading-snug tracking-tight text-espresso sm:text-[1.45rem]">
          “{t.quote}”
        </blockquote>
      </div>
      <figcaption className="mt-8 flex items-center gap-3">
        <span className="grid h-10 w-10 place-items-center rounded-full bg-espresso font-display text-sm text-oat">{initials}</span>
        <span>
          <span className="block text-sm font-semibold text-espresso">{t.name}</span>
          <span className="block text-xs text-bark/60">{t.detail}</span>
        </span>
      </figcaption>
    </figure>
  );
}

function MarqueeRow({ items, reverse, duration }: { items: Testimonial[]; reverse?: boolean; duration: string }) {
  return (
    <div className="flex overflow-hidden motion-reduce:overflow-x-auto [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]">
      <div
        className={`marquee-track flex w-max gap-5 pr-5 ${reverse ? 'animate-marquee-reverse' : 'animate-marquee'}`}
        style={{ ['--marquee-duration' as string]: duration }}
      >
        {items.map((t) => (
          <Card key={t.name} t={t} />
        ))}
        {items.map((t) => (
          <Card key={`${t.name}-dup`} t={t} hidden />
        ))}
      </div>
    </div>
  );
}

export function Testimonials() {
  const half = Math.ceil(testimonials.length / 2);
  return (
    <section id="reviews" aria-labelledby="reviews-title" className="relative overflow-hidden bg-cream py-24 text-espresso sm:py-32 lg:py-40">
      <div className="container-x">
        <div className="grid gap-10 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-8">
            <SectionLabel index="04" tone="dark">
              Kind words
            </SectionLabel>
            <h2
              id="reviews-title"
              className="mt-6 font-display text-[clamp(2.6rem,6.4vw,6rem)] font-light leading-[0.95] tracking-[-0.03em]"
            >
              <SplitWords
                text="Our regulars say it best."
                wordClassName={(w) => (w === 'best.' ? 'italic text-ember' : undefined)}
              />
            </h2>
          </div>
          <Reveal className="flex items-end gap-5 lg:col-span-4 lg:justify-end" delay={0.15}>
            <span className="font-display text-7xl font-light leading-none tracking-tight sm:text-8xl">4.9</span>
            <span className="pb-2 text-sm leading-snug text-bark/70">
              <span className="mb-1 flex gap-0.5 text-ember">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-current" aria-hidden="true" />
                ))}
              </span>
              from 2,300+ reviews
              <br />
              on Google &amp; Yelp
            </span>
          </Reveal>
        </div>
      </div>

      <div className="mt-16 space-y-5 sm:mt-20">
        <MarqueeRow items={testimonials.slice(0, half)} duration="70s" />
        <MarqueeRow items={testimonials.slice(half)} duration="80s" reverse />
      </div>
    </section>
  );
}
