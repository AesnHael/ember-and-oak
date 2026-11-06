import { motion } from 'framer-motion';
import { Clock, MapPin, Phone, Mail } from 'lucide-react';
import { useEffect, useState } from 'react';
import interior from '../assets/images/interior.webp';
import { hours } from '../data';
import { MagneticButton } from './ui/MagneticButton';
import { Reveal } from './ui/Reveal';
import { SectionLabel } from './ui/SectionLabel';
import { SplitWords } from './ui/SplitWords';

function useOpenStatus() {
  const [now, setNow] = useState(() => new Date());
  useEffect(() => {
    const id = window.setInterval(() => setNow(new Date()), 60_000);
    return () => window.clearInterval(id);
  }, []);
  const day = now.getDay();
  const h = now.getHours() + now.getMinutes() / 60;
  const today = hours.find((x) => x.dayIdx.includes(day));
  const open = !!today && h >= today.open && h < today.close;
  return { today, open };
}

const ease = [0.16, 1, 0.3, 1] as const;

function StylizedMap() {
  // Fictional neighbourhood, hand-drawn as SVG to match the brand palette.
  const streets = [
    'M-40 120 L640 -40',
    'M-40 230 L640 70',
    'M-40 340 L640 180',
    'M-40 450 L640 290',
    'M-40 560 L640 400',
    'M80 -20 L250 560',
    'M230 -20 L400 560',
    'M380 -20 L550 560',
    'M530 -20 L700 560',
  ];
  const minor = [
    'M-40 175 L640 15',
    'M-40 285 L640 125',
    'M-40 395 L640 235',
    'M-40 505 L640 345',
    'M155 -20 L325 560',
    'M305 -20 L475 560',
    'M455 -20 L625 560',
  ];
  return (
    <svg viewBox="0 0 600 520" preserveAspectRatio="xMidYMid slice" className="h-full w-full" role="img" aria-label="Stylised map showing Ember & Oak at 41 Cinder Lane, two blocks from Foundry Street station">
      <defs>
        <pattern id="water" width="10" height="10" patternUnits="userSpaceOnUse" patternTransform="rotate(35)">
          <line x1="0" y1="0" x2="0" y2="10" stroke="#B8925A" strokeOpacity="0.12" strokeWidth="1" />
        </pattern>
        <radialGradient id="glow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#D2652D" stopOpacity="0.45" />
          <stop offset="100%" stopColor="#D2652D" stopOpacity="0" />
        </radialGradient>
        <clipPath id="mapclip">
          <rect width="600" height="520" rx="0" />
        </clipPath>
      </defs>
      <g clipPath="url(#mapclip)">
        <rect width="600" height="520" fill="#1b130d" />
        {/* River */}
        <path d="M0 0 H120 C90 120 140 200 70 300 C20 380 60 460 30 520 H0 Z" fill="#0f0a07" />
        <path d="M0 0 H120 C90 120 140 200 70 300 C20 380 60 460 30 520 H0 Z" fill="url(#water)" />
        {/* Park */}
        <path d="M402 330 L520 290 L560 410 L440 450 Z" fill="#2a2617" stroke="#B8925A" strokeOpacity="0.15" />
        {minor.map((d) => (
          <path key={d} d={d} stroke="#F2EADC" strokeOpacity="0.05" strokeWidth="6" fill="none" />
        ))}
        {streets.map((d) => (
          <path key={d} d={d} stroke="#F2EADC" strokeOpacity="0.09" strokeWidth="14" fill="none" />
        ))}
        {/* Highlighted avenue */}
        <path d="M-40 340 L640 180" stroke="#B8925A" strokeOpacity="0.28" strokeWidth="14" fill="none" />

        {/* Route from station to café */}
        <motion.path
          d="M190 168 L213 248 L300 263 L316 315"
          fill="none"
          stroke="#D2652D"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeDasharray="1 9"
          initial={{ pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 2.2, ease: 'easeInOut', delay: 0.4 }}
        />

        {/* Station */}
        <g transform="translate(190 168)">
          <circle r="9" fill="#F2EADC" />
          <text y="3.5" textAnchor="middle" fontSize="9" fontWeight="700" fill="#140E0A" fontFamily="Manrope, sans-serif">
            L
          </text>
        </g>

        {/* Labels */}
        <g fontFamily="Manrope, sans-serif" fontSize="9.5" letterSpacing="2.5" fill="#8C7D70" fontWeight="600">
          <text transform="translate(360 222) rotate(-13.3)">KILN AVENUE</text>
          <text transform="translate(470 128) rotate(73.5)">FOUNDRY ST</text>
          <text transform="translate(230 70) rotate(-13.3)">MILLWRIGHT AVE</text>
          <text transform="translate(452 434) rotate(-18)" fill="#B8925A" fillOpacity="0.7">
            ASHGROVE PARK
          </text>
          <text transform="translate(42 330) rotate(-80)" fill="#B8925A" fillOpacity="0.5">
            EAST RIVER
          </text>
          <text x="204" y="152" fill="#F2EADC" fillOpacity="0.7">
            FOUNDRY ST STATION
          </text>
        </g>

        {/* Café pin */}
        <g transform="translate(316 315)">
          <circle r="70" fill="url(#glow)" />
          <circle r="16" fill="none" stroke="#D2652D" strokeWidth="1.5" className="map-pulse" />
          <circle r="16" fill="none" stroke="#D2652D" strokeWidth="1.5" className="map-pulse [animation-delay:1.2s]" />
          <circle r="11" fill="#D2652D" />
          <circle r="4" fill="#140E0A" />
        </g>
        <g transform="translate(338 348)">
          <rect width="150" height="44" rx="10" fill="#F2EADC" />
          <text x="14" y="19" fontFamily="Fraunces, serif" fontSize="14" fill="#140E0A">
            Ember &amp; Oak
          </text>
          <text x="14" y="34" fontFamily="Manrope, sans-serif" fontSize="9.5" fill="#3a2a1f">
            41 Cinder Lane · 4 min walk
          </text>
        </g>
      </g>
    </svg>
  );
}

export function Visit() {
  const { today, open } = useOpenStatus();

  return (
    <section id="visit" aria-labelledby="visit-title" className="relative bg-espresso py-24 sm:py-32 lg:py-40">
      <div className="container-x grid gap-14 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-5">
          <SectionLabel index="05">Visit us</SectionLabel>
          <h2
            id="visit-title"
            className="mt-6 font-display text-[clamp(2.6rem,6.4vw,5.8rem)] font-light leading-[0.95] tracking-[-0.03em]"
          >
            <SplitWords
              text="Come in, stay a while."
              wordClassName={(w) => (w === 'while.' ? 'italic text-ember-soft' : undefined)}
            />
          </h2>

          <Reveal className="mt-10" delay={0.1}>
            <div className="flex items-center gap-3 text-sm">
              <span className={`relative flex h-2.5 w-2.5`}>
                {open && <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60 motion-reduce:animate-none" />}
                <span className={`relative inline-flex h-2.5 w-2.5 rounded-full ${open ? 'bg-emerald-400' : 'bg-ash'}`} />
              </span>
              <span className="font-medium text-cream">{open ? 'Open now' : 'Closed right now'}</span>
              <span className="text-ash">· today {today?.time}</span>
            </div>

            <dl className="mt-8 divide-y divide-cream/10 border-y border-cream/10">
              {hours.map((h) => {
                const isToday = h === today;
                return (
                  <div key={h.days} className="flex items-center justify-between py-5">
                    <dt className={`flex items-center gap-3 ${isToday ? 'text-cream' : 'text-oat/70'}`}>
                      <Clock className={`h-4 w-4 ${isToday ? 'text-ember' : 'text-ash'}`} aria-hidden="true" />
                      {h.days}
                    </dt>
                    <dd className={`font-display text-xl tabular-nums tracking-tight ${isToday ? 'text-cream' : 'text-oat/70'}`}>
                      {h.time}
                    </dd>
                  </div>
                );
              })}
            </dl>

            <address className="mt-10 grid gap-5 not-italic sm:grid-cols-2">
              <div className="flex gap-3">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-ember" aria-hidden="true" />
                <p className="text-sm leading-relaxed text-oat/80">
                  41 Cinder Lane
                  <br />
                  Brooklyn, NY 11211
                </p>
              </div>
              <div className="space-y-2 text-sm text-oat/80">
                <a href="tel:+15550142290" className="flex items-center gap-3 transition-colors hover:text-cream">
                  <Phone className="h-4 w-4 text-ember" aria-hidden="true" />
                  +1 (555) 014-2290
                </a>
                <a href="mailto:hello@emberandoak.example" className="flex items-center gap-3 transition-colors hover:text-cream">
                  <Mail className="h-4 w-4 text-ember" aria-hidden="true" />
                  hello@emberandoak.example
                </a>
              </div>
            </address>

            <div className="mt-10 flex flex-wrap gap-4">
              <MagneticButton href="https://maps.google.com/?q=Williamsburg,+Brooklyn,+NY" external>
                Get directions
              </MagneticButton>
            </div>
          </Reveal>
        </div>

        <motion.div
          className="relative lg:col-span-7"
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 1.2, ease }}
        >
          <div className="relative aspect-[6/5] overflow-hidden rounded-[28px] border border-cream/10 lg:aspect-auto lg:h-full lg:min-h-[640px]">
            <div className="absolute inset-0 [&>svg]:h-full [&>svg]:w-full [&>svg]:object-cover">
              <StylizedMap />
            </div>
          </div>
          <motion.figure
            initial={{ opacity: 0, y: 40, rotate: 4 }}
            whileInView={{ opacity: 1, y: 0, rotate: -3 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 1.2, delay: 0.4, ease }}
            className="absolute -bottom-8 left-4 w-40 overflow-hidden rounded-2xl border-4 border-espresso shadow-2xl sm:-left-6 sm:w-56 lg:-left-10 lg:w-64"
          >
            <img src={interior} alt="Inside Ember & Oak: oak-slatted walls and leather banquettes" loading="lazy" decoding="async" className="aspect-[4/3] w-full object-cover" />
          </motion.figure>
        </motion.div>
      </div>
    </section>
  );
}
