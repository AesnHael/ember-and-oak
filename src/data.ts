import espresso from './assets/images/espresso.webp';
import cappuccino from './assets/images/cappuccino.webp';
import cortado from './assets/images/cortado.webp';
import chemex from './assets/images/chemex.webp';
import coldbrew from './assets/images/coldbrew.webp';
import mocha from './assets/images/mocha.webp';
import matcha from './assets/images/matcha.webp';
import croissant from './assets/images/croissant.webp';
import almond from './assets/images/almond.webp';

export const categories = ['All', 'Espresso', 'Slow & Cold', 'Signatures', 'Bakery'] as const;
export type Category = Exclude<(typeof categories)[number], 'All'>;

export interface MenuItem {
  id: string;
  name: string;
  category: Category;
  price: number;
  notes: string;
  description: string;
  image: string;
  alt: string;
  badge?: string;
}

export const menu: MenuItem[] = [
  {
    id: 'ember-espresso',
    name: 'Ember Espresso',
    category: 'Espresso',
    price: 4.25,
    notes: 'Cocoa · Molasses · Orange peel',
    description: 'A double ristretto of our house Ember blend, roasted over seasoned oak until it turns to syrup.',
    image: espresso,
    alt: 'Espresso streaming from a bottomless portafilter in a dark café',
    badge: 'House blend',
  },
  {
    id: 'velvet-cappuccino',
    name: 'Velvet Cappuccino',
    category: 'Espresso',
    price: 5.5,
    notes: 'Hazelnut · Milk chocolate',
    description: 'Silky microfoam folded into a double shot. Poured slow, served warm, never scalded.',
    image: cappuccino,
    alt: 'Cappuccino with a heart of latte art in a deep brown cup on a wooden table',
  },
  {
    id: 'oak-cortado',
    name: 'Smoked Oak Cortado',
    category: 'Espresso',
    price: 5,
    notes: 'Toffee · Sea salt',
    description: 'Equal parts espresso and steamed oat milk, finished with a pinch of oak-smoked sea salt.',
    image: cortado,
    alt: 'Cortado with rosetta latte art on a saucer beside a sunlit wooden table',
    badge: 'Guest favorite',
  },
  {
    id: 'chemex',
    name: 'Chemex for Two',
    category: 'Slow & Cold',
    price: 9,
    notes: 'Bergamot · Apricot · Jasmine',
    description: "Hand-poured at the slow bar. This week's origin: Ethiopia Guji, washed and impossibly floral.",
    image: chemex,
    alt: 'Barista pouring hot water from a gooseneck kettle into a Chemex brewer',
  },
  {
    id: 'cold-brew',
    name: '18-Hour Cold Brew',
    category: 'Slow & Cold',
    price: 6,
    notes: 'Dark cherry · Cacao nib',
    description: 'Steeped cold for eighteen hours, poured over clear ice with a slow ribbon of sweet cream.',
    image: coldbrew,
    alt: 'Iced cold brew with swirls of cream in a tall glass on a café counter',
  },
  {
    id: 'midnight-mocha',
    name: 'Midnight Mocha',
    category: 'Signatures',
    price: 6.5,
    notes: '70% cacao · Vanilla bean',
    description: 'Single-estate dark chocolate melted into espresso and whole milk. Rich, not sweet. Never sweet.',
    image: mocha,
    alt: 'Glass mug of mocha with cocoa-dusted foam on a dark wooden table',
    badge: 'Signature',
  },
  {
    id: 'iced-matcha',
    name: 'Ceremonial Iced Matcha',
    category: 'Signatures',
    price: 6.75,
    notes: 'Umami · Sweet grass',
    description: 'Stone-ground Uji matcha whisked by hand and layered over vanilla oat milk and ice.',
    image: matcha,
    alt: 'Layered iced matcha latte in a glass on a moody wooden bar',
  },
  {
    id: 'butter-croissant',
    name: '72-Hour Croissant',
    category: 'Bakery',
    price: 4.75,
    notes: 'Cultured butter · Sea salt flakes',
    description: 'Three days of lamination, eighty-one layers, one very satisfying shatter. Sells out by ten.',
    image: croissant,
    alt: 'Two golden croissants dusted with powdered sugar on a dark slate board',
    badge: 'Limited daily',
  },
  {
    id: 'almond-croissant',
    name: 'Twice-Baked Almond',
    category: 'Bakery',
    price: 5.75,
    notes: 'Frangipane · Toasted almond',
    description: "Yesterday's croissant reborn with almond cream, toasted flakes and a snowfall of sugar.",
    image: almond,
    alt: 'Croissants on a dark plate beside a glass of milk on a rustic wooden table',
  },
];

export interface Testimonial {
  quote: string;
  name: string;
  detail: string;
}

export const testimonials: Testimonial[] = [
  {
    quote: "The best cortado I've had outside Melbourne. I've stopped pretending I come here for the Wi-Fi.",
    name: 'Hannah R.',
    detail: 'Regular since 2019',
  },
  {
    quote: "It feels like someone's beautiful living room that happens to pull world-class espresso.",
    name: 'Marcus O.',
    detail: 'Architect, Williamsburg',
  },
  {
    quote: 'The slow bar is a ritual. They talk you through the origin like a sommelier, minus the pretension.',
    name: 'Priya S.',
    detail: 'Food writer',
  },
  {
    quote: 'I order the Midnight Mocha every single morning. My dentist knows. My dentist has made peace with it.',
    name: 'Daniel K.',
    detail: 'Local, 4 blocks away',
  },
  {
    quote: 'The croissants sell out by ten for a reason. Set an alarm. You will not regret it.',
    name: 'Elise M.',
    detail: 'Pastry obsessive',
  },
  {
    quote: 'Warm light, slow music, and a barista who remembered my name on the second visit. Rare magic.',
    name: 'Jonah T.',
    detail: 'Remote designer',
  },
  {
    quote: 'Their beans ruined every other coffee for me. I buy a bag of the Ember blend every Saturday.',
    name: 'Sofia L.',
    detail: 'Home brewer',
  },
  {
    quote: 'Came for a meeting, stayed three hours. The cold brew is dangerously smooth.',
    name: 'Theo W.',
    detail: 'Founder, Studio North',
  },
];

export const hours = [
  { days: 'Monday — Friday', time: '7:00 — 19:00', open: 7, close: 19, dayIdx: [1, 2, 3, 4, 5] },
  { days: 'Saturday', time: '8:00 — 20:00', open: 8, close: 20, dayIdx: [6] },
  { days: 'Sunday', time: '8:00 — 17:00', open: 8, close: 17, dayIdx: [0] },
];

export const navLinks = [
  { href: '#story', label: 'Story' },
  { href: '#menu', label: 'Menu' },
  { href: '#gallery', label: 'Gallery' },
  { href: '#reviews', label: 'Reviews' },
  { href: '#visit', label: 'Visit' },
];

export const socials = [
  { label: 'Instagram', href: 'https://instagram.com' },
  { label: 'TikTok', href: 'https://tiktok.com' },
  { label: 'Pinterest', href: 'https://pinterest.com' },
  { label: 'Spotify', href: 'https://spotify.com' },
];
