export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || 'https://thetech.vercel.app').replace(/\/$/, '');

// Pitch site: keep it out of Google until the client approves it. Set to false (here AND in next.config.mjs) to go public.
export const HIDE_FROM_SEARCH = true;

const T = 'https://thetech.plus';
const W = 'https://whop.com/the-tech-7790';

// Every link points at his existing site / Whop store, so this page can replace his homepage as-is.
export const LINKS = {
  free: `${W}/free-access-0f-b9dc/`,
  tier1: `${W}/products/tier-1-mentorship/`,
  tier2: `${W}/products/tier-2-mentorship-indicator/`,
  call: `${W}/products/1-on-1-mentor-call-1-hour/`,
  apply: `${T}/apply`,
  applyLifetime: `${T}/apply?interest=lifetime`,
  orb: `${T}/orb`,
  outlooks: `${T}/outlooks`,
  discord: `${T}/discord`,
  terms: `${T}/terms`,
  privacy: `${T}/privacy`,
  instagram: 'https://www.instagram.com/junithetech/',
  email: 'trade@thetech.plus',
};

export const PAYOUT_HIGHLIGHTS = [
  { m: 'Oct', href: 'https://www.instagram.com/stories/highlights/18160071724396135/' },
  { m: 'Nov', href: 'https://www.instagram.com/stories/highlights/18059991875246926/' },
  { m: 'Dec', href: 'https://www.instagram.com/stories/highlights/18082165624895043/' },
  { m: 'Jan', href: 'https://www.instagram.com/stories/highlights/18388875607151154/' },
  { m: 'Feb', href: 'https://www.instagram.com/stories/highlights/18183209452368917/' },
  { m: 'Sept', href: 'https://www.instagram.com/stories/highlights/17975042958130473/' },
];
export const TESTIMONIALS_URL = 'https://www.instagram.com/stories/highlights/18086614909635807/';

export const TIERS = [
  {
    n: 'Tier 1', name: 'Mentorship', price: 200, href: LINKS.tier1, cta: 'Choose Mentorship',
    blurb: 'Mentorship, live sessions and trade breakdowns.',
    items: ['Complete A–Z ICT and SMC trading course', 'Daily NQ market outlooks', 'Live trade breakdowns', 'Journal accountability and psychology support', 'Direct mentor Q&A'],
  },
  {
    n: 'Tier 2', name: 'Indicators', price: 250, href: LINKS.tier2, cta: 'Choose Indicators', featured: true,
    blurb: 'Mentorship plus the private strategy indicator.',
    items: ['Everything in Mentorship', 'The Tech+ proprietary IFVG indicator', 'The Tech Journal', 'Live signal alerts in Discord', 'Setup, install and strategy support'],
  },
  {
    n: 'Tier 3', name: 'ORB', price: null, href: LINKS.orb, cta: 'Join the ORB waitlist',
    blurb: 'The complete package, including ORB.',
    items: ['Everything in Indicators', 'ORB, our automated bot', 'ORB strategy automation', 'ORB alerts in Discord', 'Dedicated ORB support'],
  },
] as const;

export const FAQ = [
  { q: 'Can I cancel anytime?', a: "Yes. Monthly tiers can be cancelled anytime from your Whop account. You keep access until the end of the period you've paid for." },
  { q: 'Is there a refund?', a: "Yes. If it's not for you, message us within 7 days of your first payment on any monthly tier for a full refund. Email trade@thetech.plus." },
  { q: "I'm a complete beginner. Is this for me?", a: 'Yes. Tier 1 includes a complete A to Z course, so you start from the foundations and build up to the strategy.' },
  { q: 'What do you trade?', a: 'Our strategy is built around NQ futures. The indicator, outlooks and live breakdowns all focus on it.' },
  { q: 'What happens after I pay?', a: 'Your purchase is completed on Whop. Check your Whop access details, or contact us if your Discord role is missing. For Tier 2, share your TradingView username with our team so indicator access can be added.' },
  { q: 'When does ORB open?', a: "There's no date yet. Join the ORB waitlist and we'll email you when it opens." },
  { q: 'Is this financial advice?', a: "No. Everything we teach is education. Trading involves risk, and past performance doesn't guarantee future results." },
];
