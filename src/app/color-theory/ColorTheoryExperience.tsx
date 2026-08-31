'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import Link from 'next/link';
import {
  ArrowLeftRight, Waves, Triangle, Thermometer,
  SlidersHorizontal, ArrowRight, ChevronDown,
} from 'lucide-react';
import { cn } from '@/lib/utils';

const principles = [
  { title: 'Complementary', Icon: ArrowLeftRight, angle: '180°', pair: ['#EF4444', '#22C55E'],
    desc: 'Colors directly opposite on the wheel. They cancel in mixing but amplify each other visually, so each one makes the other look more intense.' },
  { title: 'Analogous', Icon: Waves, angle: '±30°', pair: ['#3B82F6', '#8B5CF6', '#EC4899'],
    desc: 'Three adjacent hues, 30° apart. They share wavelengths, so they feel naturally related. Good for gradients, light on built-in contrast.' },
  { title: 'Triadic', Icon: Triangle, angle: '120°', pair: ['#EF4444', '#22C55E', '#3B82F6'],
    desc: 'Three hues 120° apart, all pulling equal weight. The most vibrant scheme, and the one that most needs a hierarchy: one dominant, one secondary, one accent, or everything fights.' },
  { title: 'Split-Complementary', Icon: ArrowLeftRight, angle: '150°/210°', pair: ['#8B5CF6', '#EAB308', '#F97316'],
    desc: "The complement's two neighbors rather than the complement itself. Same contrast range, far easier to balance." },
  { title: 'Monochromatic', Icon: SlidersHorizontal, angle: '0° shift', pair: ['#C4B5FD', '#8B5CF6', '#3B0764'],
    desc: 'One hue across its full tonal range. Nothing in it can clash, so the only real risk is monotony. Solve that with dramatic value steps.' },
  { title: 'Warm vs Cool', Icon: Thermometer, angle: 'Temp.', pair: ['#F97316', '#EAB308', '#3B82F6'],
    desc: 'Warm hues (red, orange, yellow) advance and grab the eye first. Cool hues (blue, green, violet) recede. Use this to control spatial depth.' },
];

type ColorEntry = {
  name: string; hex: string; hue: string;
  shades: string[]; shadeNames: string[];
  complementary: { name: string; hex: string };
  emotions: string[]; psychology: string; inDesign: string;
  cultural: { place: string; note: string }[];
  brands: string[]; fact: string;
};

const colors: ColorEntry[] = [
  { name: 'Red', hex: '#EF4444', hue: '0°',
    shades: ['#FCA5A5', '#F87171', '#EF4444', '#DC2626', '#991B1B', '#7F1D1D'],
    shadeNames: ['Rose', 'Light', 'Red', 'Crimson', 'Dark', 'Maroon'],
    complementary: { name: 'Cyan', hex: '#06B6D4' },
    emotions: ['Passion', 'Urgency', 'Love', 'Danger', 'Energy'],
    psychology: 'No color acts faster on the brain than red. It raises heart rate, accelerates breathing, and pulls focus before conscious thought kicks in, which is exactly why stop signs and ambulances use it. In small doses it signals love and passion; in large doses, threat. Athletes wearing red in competitive sports win statistically more often.',
    inDesign: 'Red converts. Studies consistently show red CTAs outperform blue and green for high-urgency actions. The trade-off: overuse it and everything feels like an error state. One red element on a page feels important. Five feel panicked.',
    cultural: [
      { place: 'China', note: 'Luck and celebration: brides wear red, New Year is red' },
      { place: 'Western', note: 'Love and danger at once, which gives it its tension' },
      { place: 'India', note: 'Purity and prosperity; red sindoor marks married women' },
      { place: 'S. Africa', note: 'Mourning and loss' },
    ],
    brands: ['Coca-Cola', 'Netflix', 'YouTube', 'Ferrari', 'Target'],
    fact: "Red is the first color human infants can distinguish, and appears first in virtually every language's color vocabulary after black and white." },
  { name: 'Orange', hex: '#F97316', hue: '30°',
    shades: ['#FED7AA', '#FDBA74', '#F97316', '#EA580C', '#C2410C', '#9A3412'],
    shadeNames: ['Peach', 'Light', 'Orange', 'Burnt', 'Deep', 'Rust'],
    complementary: { name: 'Blue', hex: '#3B82F6' },
    emotions: ['Warmth', 'Enthusiasm', 'Playfulness', 'Confidence', 'Creativity'],
    psychology: "Orange sits between the urgency of red and the cheer of yellow, taking the best of both without their edge. It's the most social color: it stimulates conversation, signals approachability, and reads as energetic without being aggressive. It's also the color most associated with value and affordability.",
    inDesign: "Orange works where red feels too serious or alarming, which makes it the preferred CTA for brands that want action without anxiety. Food brands love it because it stimulates appetite while suggesting freshness. One underused quality: orange is extraordinarily legible against dark backgrounds at large sizes.",
    cultural: [
      { place: 'Netherlands', note: 'National color, after the royal House of Orange-Nassau' },
      { place: 'Buddhism', note: "Sacred; monks' saffron robes symbolize renunciation" },
      { place: 'Egypt', note: 'Historically associated with mourning and loss' },
      { place: 'Western', note: 'Halloween, autumn, construction, warnings, bargains' },
    ],
    brands: ['Amazon', 'Fanta', 'Firefox', 'Nickelodeon', 'Harley-Davidson'],
    fact: 'Orange is the only color in English named after a fruit. Before oranges reached Europe, the color was called "geoluread", literally yellow-red.' },
  { name: 'Yellow', hex: '#EAB308', hue: '60°',
    shades: ['#FEF9C3', '#FDE047', '#EAB308', '#CA8A04', '#A16207', '#854D0E'],
    shadeNames: ['Pale', 'Light', 'Yellow', 'Amber', 'Deep', 'Ochre'],
    complementary: { name: 'Violet', hex: '#7C3AED' },
    emotions: ['Optimism', 'Clarity', 'Caution', 'Energy', 'Warmth'],
    psychology: 'Yellow is the most visible color to the human eye in daylight, and the brain processes it before any other hue. That same visibility becomes a liability indoors: yellow rooms register as stimulating to the point of anxiety. In moderate use, yellow sharpens attention and boosts analytical thinking.',
    inDesign: "Yellow signals 'pay attention here' better than almost any other color at the same size, which makes it ideal for badges, highlights, and emphasis. But it's terrible for body text on white (contrast drops below WCAG minimums). Against dark backgrounds it becomes one of the most legible colors available.",
    cultural: [
      { place: 'China', note: 'Imperial color: only the emperor could wear true yellow' },
      { place: 'Japan', note: 'Courage and refinement; tied to the chrysanthemum' },
      { place: 'Western', note: 'Sunshine, happiness, caution signs, taxis' },
      { place: 'Egypt', note: 'Eternal and imperishable; used for gold in ancient art' },
    ],
    brands: ["McDonald's", 'IKEA', 'Snapchat', 'DHL', 'Nat Geo'],
    fact: "Yellow is the most commonly cited 'least favorite color' in surveys, yet it's the color most associated with optimism and creativity in testing." },
  { name: 'Green', hex: '#22C55E', hue: '120°',
    shades: ['#BBF7D0', '#6EE7B7', '#22C55E', '#16A34A', '#15803D', '#14532D'],
    shadeNames: ['Mint', 'Light', 'Green', 'Medium', 'Forest', 'Deep'],
    complementary: { name: 'Magenta', hex: '#DB2777' },
    emotions: ['Growth', 'Calm', 'Health', 'Harmony', 'Nature'],
    psychology: 'Humans distinguish more shades of green than any other color, a legacy of scanning vegetation for food and safety. Green at 120° sits at the center of the visible spectrum, making it the easiest wavelength for the eye to process. Green environments lower heart rate and reduce stress.',
    inDesign: "Green is the universal 'go' signal: confirmation dialogs, success states, 'in stock' badges. Healthcare and finance brands use it because it implies both health and growth. The challenge is that yellow-green reads sickly while forest green reads premium. Hue matters more for green than any other color.",
    cultural: [
      { place: 'Islam', note: "Sacred: paradise is green, the Prophet's flag was green" },
      { place: 'Ireland', note: 'Green is national identity, hence "The Emerald Isle"' },
      { place: 'Western', note: 'Go signals, money, environment, health, envy' },
      { place: 'Indonesia', note: 'Historically associated with bad fortune' },
    ],
    brands: ['Starbucks', 'Spotify', 'Whole Foods', 'WhatsApp', 'Animal Planet'],
    fact: 'Night-vision goggles display green because human eyes are most sensitive to that wavelength; we resolve more detail in green than in any other color.' },
  { name: 'Blue', hex: '#3B82F6', hue: '210°',
    shades: ['#BFDBFE', '#93C5FD', '#3B82F6', '#2563EB', '#1D4ED8', '#1E3A8A'],
    shadeNames: ['Pale', 'Light', 'Blue', 'Medium', 'Royal', 'Navy'],
    complementary: { name: 'Orange', hex: '#F97316' },
    emotions: ['Trust', 'Calm', 'Reliability', 'Clarity', 'Depth'],
    psychology: "Blue is the world's most universally popular color across cultures and genders. It lowers heart rate, slows metabolism, and suppresses appetite. Its dominance in banking, tech, and healthcare isn't arbitrary: trust is its core signal, and building trust is the central challenge in all three.",
    inDesign: "Blue is the safest primary brand color: it rarely alienates, and it scales from serious to friendly on saturation and value alone. Saturated mid-blues feel modern and digital; navy feels authoritative; sky blue feels open. The one trap is dark backgrounds, where blue disappears unless it's very bright.",
    cultural: [
      { place: 'Western', note: '"Feeling blue" yet "true blue", a contradiction that shows its range' },
      { place: 'Iran', note: 'Mourning, and protection against the evil eye' },
      { place: 'Judaism', note: 'Holiness and divinity; central to the Israeli flag' },
      { place: 'India', note: 'Krishna: divine, infinite, transcendent' },
    ],
    brands: ['Meta', 'PayPal', 'Samsung', 'Ford', 'IBM', 'Visa'],
    fact: "Ancient languages had no word for blue. Homer described the sea as 'wine-dark.' Blue appears almost nowhere in nature except the sky and deep water." },
  { name: 'Violet', hex: '#8B5CF6', hue: '263°',
    shades: ['#DDD6FE', '#C4B5FD', '#8B5CF6', '#7C3AED', '#6D28D9', '#3B0764'],
    shadeNames: ['Lavender', 'Light', 'Violet', 'Purple', 'Deep', 'Grape'],
    complementary: { name: 'Yellow', hex: '#EAB308' },
    emotions: ['Luxury', 'Creativity', 'Mystery', 'Wisdom', 'Ambition'],
    psychology: 'Violet sits at the extreme edge of human color perception, just before the spectrum crosses into ultraviolet. For most of history, purple dye required 12,000 shellfish per gram, which made it worth more than gold. That scarcity is still embedded in our perception: purple still reads as rare and expensive.',
    inDesign: "Purple covers a wide creative range. Bright violet signals innovation: tech tools, AI products, game platforms. Deep purple signals luxury and heritage. Lavender is calming and increasingly used in wellness. What holds across all of them is that purple signals something outside the mainstream.",
    cultural: [
      { place: 'Western', note: 'Royalty, ambition, spiritual authority, creativity' },
      { place: 'Thailand', note: 'Mourning, particularly for widows' },
      { place: 'Japan', note: 'Highest rank; tied to the imperial court' },
      { place: 'Brazil', note: 'Associated with death and worn at some funerals' },
    ],
    brands: ['Cadbury', 'Twitch', 'Hallmark', 'FedEx', 'Yahoo'],
    fact: "Until 1856, purple was so costly that laws banned anyone below a certain rank from wearing it. An 18-year-old accidentally invented synthetic purple and became a millionaire." },
  { name: 'Pink', hex: '#EC4899', hue: '330°',
    shades: ['#FBCFE8', '#F9A8D4', '#EC4899', '#DB2777', '#BE185D', '#831843'],
    shadeNames: ['Blush', 'Light', 'Pink', 'Hot', 'Fuchsia', 'Deep'],
    complementary: { name: 'Green', hex: '#22C55E' },
    emotions: ['Romance', 'Tenderness', 'Playfulness', 'Warmth', 'Care'],
    psychology: "Pink is physiologically calming; one specific shade has been shown to reduce aggression in correctional facilities. But pink's cultural meaning is almost entirely constructed: in the 1920s, pink was recommended for boys and blue for girls. The reversal solidified only in the 1980s.",
    inDesign: "Hot pink holds its own against any color, commanding attention without the aggression of red. Soft pink is calming and increasingly used in non-gendered wellness and skincare. The sweet spot is mid-saturation pink: distinctive, warm, and approachable.",
    cultural: [
      { place: 'Japan', note: 'Deeply loved: cherry blossoms, transience, youth' },
      { place: 'Western', note: 'Femininity and romance, a 20th-century construction' },
      { place: 'Korea', note: 'Trust and reliability in some business contexts' },
      { place: 'Global', note: 'Increasingly adopted across genders by the young' },
    ],
    brands: ['Barbie', 'T-Mobile', 'Glossier', 'Baskin-Robbins', 'Cosmopolitan'],
    fact: "Pink doesn't exist in the rainbow. It's what the brain constructs when you remove green from white light; there is no single pink wavelength." },
  { name: 'Brown', hex: '#92400E', hue: '27°',
    shades: ['#FDE68A', '#D97706', '#B45309', '#92400E', '#78350F', '#451A03'],
    shadeNames: ['Tan', 'Caramel', 'Amber', 'Brown', 'Chocolate', 'Espresso'],
    complementary: { name: 'Sky Blue', hex: '#7DD3FC' },
    emotions: ['Stability', 'Authenticity', 'Warmth', 'Earthiness', 'Reliability'],
    psychology: "Brown is the color of shelter: wood, earth, stone, hide. Every home before industrialization was built of it. That familiarity makes brown feel fundamentally safe and genuine. It's rarely anyone's declared favorite, yet it's universally recognized as trustworthy.",
    inDesign: "Brown is underused in digital design, which makes it distinctive. Rich chocolate browns signal premium quality; lighter tans feel organic and unpretentious, the register of craft brands, farmers markets, and sustainable goods. The challenge is that brown can feel dated or dirty if mishandled.",
    cultural: [
      { place: 'Western', note: 'Earth, reliability, autumn, natural materials, craft' },
      { place: 'India', note: 'Associated with mourning in certain contexts' },
      { place: 'Universal', note: 'Wood, earth, soil: the color of the ground itself' },
      { place: 'Colombia', note: 'Traditionally a color of discouragement' },
    ],
    brands: ['UPS', "Hershey's", 'Nespresso', 'Louis Vuitton', 'Timberland'],
    fact: "Brown doesn't exist on the visible spectrum. It's what the brain reads as dark, low-saturation orange, and changing its brightness context turns it back into 'orange.'" },
  { name: 'Black', hex: '#111827', hue: '—',
    shades: ['#6B7280', '#374151', '#1F2937', '#111827', '#030712'],
    shadeNames: ['Gray', 'Charcoal', 'Graphite', 'Jet', 'Black'],
    complementary: { name: 'White', hex: '#FFFFFF' },
    emotions: ['Power', 'Elegance', 'Authority', 'Mystery', 'Finality'],
    psychology: "Black is the absence of reflected light, and it conveys absolute authority and finality. It makes adjacent colors appear more saturated, which is why luxury brands use so much of it. 'Black-tie,' 'black card,' 'black label': the link to exclusivity is consistent across cultures.",
    inDesign: "Black is one of the most useful tools precisely because it's neutral and never competes. Against black, every other color becomes more vivid, and typography is high-impact. The danger is heaviness: too much black and designs feel oppressive rather than sophisticated.",
    cultural: [
      { place: 'Western', note: 'Mourning, formality, and the luxury of the little black dress' },
      { place: 'Egypt', note: 'Rebirth and fertility, from the black Nile soil' },
      { place: 'E. Asia', note: 'Wisdom, experience, and in some contexts prosperity' },
      { place: 'Fashion', note: 'A foundation for 200 years' },
    ],
    brands: ['Chanel', 'Nike', 'Apple', 'Adidas', 'Lamborghini'],
    fact: "The world's blackest material, Vantablack, absorbs 99.965% of light. After an artist bought exclusive rights, others retaliated with 'the world's pinkest paint.'" },
  { name: 'White', hex: '#F8FAFC', hue: '—',
    shades: ['#FFFFFF', '#F9FAFB', '#F3F4F6', '#E5E7EB', '#D1D5DB'],
    shadeNames: ['White', 'Snow', 'Pearl', 'Silver', 'Platinum'],
    complementary: { name: 'Black', hex: '#111827' },
    emotions: ['Purity', 'Clarity', 'Space', 'Simplicity', 'New beginnings'],
    psychology: "White reflects all wavelengths at once. It creates psychological space: white rooms feel larger. In design, white (negative space) does active work. The absence of color gives the eye nowhere to land, and that pause registers as breath, clarity, or calm.",
    inDesign: "White is the foundation of minimalist design because it amplifies everything against it: a single bold red on white hits harder than on a busy background. The practical trap is that pure white (#FFFFFF) on screens is harsh, so most systems use near-whites (94–97% lightness).",
    cultural: [
      { place: 'Western', note: 'Purity, marriage, cleanliness; the wedding default' },
      { place: 'E. Asia', note: 'Mourning and death, worn at funerals' },
      { place: 'Islam', note: 'Purity; pilgrims wear white ihram' },
      { place: 'India', note: 'Both peace and mourning; widows wear it' },
    ],
    brands: ['Apple', 'Tesla', 'Audi', 'Dove', 'Muji'],
    fact: "White light contains all colors at once. Newton proved it in 1666 by splitting sunlight through a prism into the full spectrum." },
  { name: 'Gray', hex: '#6B7280', hue: '—',
    shades: ['#F3F4F6', '#D1D5DB', '#9CA3AF', '#6B7280', '#374151', '#111827'],
    shadeNames: ['Light', 'Silver', 'Medium', 'Gray', 'Charcoal', 'Dark'],
    complementary: { name: 'Warm Amber', hex: '#D97706' },
    emotions: ['Balance', 'Neutrality', 'Professionalism', 'Precision', 'Restraint'],
    psychology: "Gray is the mediator. It holds no emotional position of its own, which makes it uniquely versatile. Warm gray reads sophisticated and inviting; cool gray reads technological and precise. The same hex can feel completely different depending solely on what's beside it.",
    inDesign: "Gray is the workhorse of UI: surfaces, borders, disabled states, secondary text. The irony is that the best designs make it invisible. You don't notice it, but remove it and everything falls apart. The common mistake is one gray everywhere; pro systems define 8–12 steps.",
    cultural: [
      { place: 'Western', note: 'Professionalism, age, compromise, the "gray area"' },
      { place: 'Scandinavia', note: 'Central to the aesthetic: warm, functional, elegant' },
      { place: 'Tech', note: 'The default interface color, read as precise and modern' },
      { place: 'Fashion', note: '"Greige" became its own design movement' },
    ],
    brands: ['Apple', 'Mercedes-Benz', 'Porsche', 'Wikipedia', 'LinkedIn'],
    fact: 'Gray is the only color with two correct English spellings for exactly the same color: "gray" (US) and "grey" (UK).' },
];

/* ── auto-contrast: choose readable ink + scrims for a given background ── */
function luminance(hex: string) {
  const c = [1, 3, 5].map((i) => parseInt(hex.slice(i, i + 2), 16) / 255)
    .map((v) => (v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4)));
  return 0.2126 * c[0] + 0.7152 * c[1] + 0.0722 * c[2];
}
function tint(hex: string) {
  const L = luminance(hex);
  const onDark = (L + 0.05) / 0.05 < 1.05 / (L + 0.05); // white text wins
  return onDark
    ? { fg: '#ffffff', soft: 'rgba(255,255,255,0.86)', muted: 'rgba(255,255,255,0.62)',
        panelBg: 'rgba(255,255,255,0.10)', panelBd: 'rgba(255,255,255,0.22)', chipBg: 'rgba(255,255,255,0.15)' }
    : { fg: '#15151a', soft: 'rgba(21,21,26,0.82)', muted: 'rgba(21,21,26,0.58)',
        panelBg: 'rgba(0,0,0,0.05)', panelBd: 'rgba(0,0,0,0.13)', chipBg: 'rgba(0,0,0,0.07)' };
}

const SECTION = 'snap-start flex min-h-[calc(100svh-4rem)] w-full';
// Gently eased entrance, softer than a hard snap pop.
const REVEAL = 'transition-[opacity,transform] duration-[800ms] ease-[cubic-bezier(0.22,1,0.36,1)] will-change-[opacity,transform] motion-reduce:transition-none';
const navItems = [{ label: 'Intro', hex: null as string | null }, { label: 'Harmony', hex: null as string | null },
  ...colors.map((c) => ({ label: c.name, hex: c.hex }))];

export function ColorTheoryExperience() {
  const containerRef = useRef<HTMLDivElement>(null);
  const sectionRefs = useRef<(HTMLElement | null)[]>([]);
  const [active, setActive] = useState(0);
  const activeRef = useRef(0);
  useEffect(() => { activeRef.current = active; }, [active]);

  const goTo = useCallback((i: number) => {
    const idx = Math.max(0, Math.min(navItems.length - 1, i));
    sectionRefs.current[idx]?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, []);

  // Track the active section
  useEffect(() => {
    const root = containerRef.current;
    const secs = sectionRefs.current.filter(Boolean) as HTMLElement[];
    if (!root || secs.length === 0) return;
    const io = new IntersectionObserver(
      (entries) => {
        let best = -1, bestRatio = 0;
        for (const e of entries) {
          if (e.isIntersecting && e.intersectionRatio > bestRatio) {
            bestRatio = e.intersectionRatio;
            best = secs.indexOf(e.target as HTMLElement);
          }
        }
        if (best >= 0 && bestRatio >= 0.5) setActive(best);
      },
      { root, threshold: [0.5, 0.7, 0.9] },
    );
    secs.forEach((s) => io.observe(s));
    return () => io.disconnect();
  }, []);

  // Arrow keys / page keys move one section at a time
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const tag = (e.target as HTMLElement)?.tagName;
      if (tag === 'INPUT' || tag === 'TEXTAREA') return;
      if (e.key === 'ArrowDown' || e.key === 'PageDown' || (e.key === ' ' && !e.shiftKey)) {
        e.preventDefault(); goTo(activeRef.current + 1);
      } else if (e.key === 'ArrowUp' || e.key === 'PageUp' || (e.key === ' ' && e.shiftKey)) {
        e.preventDefault(); goTo(activeRef.current - 1);
      } else if (e.key === 'Home') { e.preventDefault(); goTo(0); }
      else if (e.key === 'End') { e.preventDefault(); goTo(navItems.length - 1); }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [goTo]);

  return (
    <>
      <div
        ref={containerRef}
        className="h-[calc(100svh-4rem)] snap-y snap-mandatory overflow-x-hidden overflow-y-auto scroll-smooth"
      >
        {/* 0: Intro */}
        <section
          ref={(el) => { sectionRefs.current[0] = el; }}
          className={cn(SECTION, 'items-center bg-paper')}
        >
          <div className={cn('mx-auto w-full max-w-4xl px-5 sm:px-8', REVEAL, active === 0 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8')}>
            <span className="brand-mark mb-7 block h-12 w-12 rounded-xl" aria-hidden />
            <p className="label-caps text-ink-3">Color Theory</p>
            <h1 className="mt-4 font-display text-6xl font-extrabold leading-[0.9] tracking-[-0.04em] text-ink sm:text-8xl">
              The Science<br />of Color
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-ink-2">
              Every color has physics, psychology, and history behind it. Scroll through them one hue at a time, full screen.
            </p>
            <button
              onClick={() => goTo(1)}
              className="group mt-10 inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.18em] text-ink-3 transition-colors hover:text-ink"
            >
              Scroll, or use <kbd className="rounded border border-line bg-surface px-1.5 py-0.5 not-italic">↑</kbd><kbd className="rounded border border-line bg-surface px-1.5 py-0.5">↓</kbd>
              <ChevronDown className="h-4 w-4 animate-bounce" />
            </button>
          </div>
        </section>

        {/* 1: Harmony */}
        <section
          ref={(el) => { sectionRefs.current[1] = el; }}
          className={cn(SECTION, 'items-center bg-paper')}
        >
          <div className={cn('mx-auto w-full max-w-6xl px-5 sm:px-8 py-12', REVEAL, active === 1 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8')}>
            <p className="label-caps text-ink-3">How colors work together</p>
            <h2 className="mt-3 max-w-2xl font-display text-3xl font-extrabold tracking-[-0.03em] text-ink sm:text-5xl">
              Harmony is the geometry of the wheel.
            </h2>
            <p className="mt-3 max-w-xl text-sm text-ink-2 sm:text-base">
              These six relationships cover most of the palette decisions you&apos;ll make.
            </p>
            <div className="mt-7 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {principles.map((p) => (
                <div key={p.title} className="overflow-hidden rounded-2xl border border-line bg-surface">
                  <div className="flex h-8">
                    {p.pair.map((hex, j) => (
                      <div key={j} className="flex-1" style={{ background: hex }} />
                    ))}
                  </div>
                  <div className="p-4">
                    <div className="mb-1.5 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <p.Icon className="h-3.5 w-3.5 text-ink-3" strokeWidth={1.75} />
                        <h3 className="text-sm font-semibold text-ink">{p.title}</h3>
                      </div>
                      <code className="font-mono text-[10px] text-ink-3">{p.angle}</code>
                    </div>
                    <p className="text-xs leading-relaxed text-ink-2">{p.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 2..n: one fullscreen section per color */}
        {colors.map((c, idx) => {
          const i = idx + 2;
          const t = tint(c.hex);
          const isActive = active === i;
          return (
            <section
              key={c.name}
              ref={(el) => { sectionRefs.current[i] = el; }}
              className={cn(SECTION, 'items-start')}
              style={{ background: `linear-gradient(158deg, rgba(255,255,255,0.10), rgba(0,0,0,0.14)), ${c.hex}`, color: t.fg }}
            >
              <div className={cn('mx-auto w-full max-w-6xl px-5 pb-12 pt-[6vh] sm:px-8 sm:pt-[7vh]', REVEAL, isActive ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8')}>
                {/* meta */}
                <div className="flex items-center justify-between font-mono text-[11px] uppercase tracking-wider sm:text-xs" style={{ color: t.muted }}>
                  <span>{String(idx + 1).padStart(2, '0')} / {String(colors.length).padStart(2, '0')}</span>
                  <span>{c.hue !== '—' ? `Hue ${c.hue}` : 'Neutral'} · {c.hex}</span>
                </div>

                {/* name: relaxed leading + descender padding so g/y clear the scale below */}
                <h2 className="font-display font-extrabold leading-[0.92] tracking-[-0.045em] text-[clamp(3.5rem,13vw,9rem)] pb-[0.06em]">
                  {c.name}
                </h2>

                {/* shade scale */}
                <div className="mt-6 flex h-8 w-full overflow-hidden rounded-lg sm:h-10" style={{ boxShadow: `inset 0 0 0 1px ${t.panelBd}` }}>
                  {c.shades.map((hex, k) => (
                    <div key={k} className="flex-1" style={{ background: hex }} title={`${c.shadeNames[k]} · ${hex}`} />
                  ))}
                </div>

                {/* content */}
                <div className="mt-6 grid gap-5 lg:grid-cols-12">
                  {/* psychology + in design */}
                  <div className="lg:col-span-7">
                    <h3 className="font-mono text-[10px] uppercase tracking-[0.2em]" style={{ color: t.muted }}>Psychology</h3>
                    <p className="mt-1.5 text-[13px] leading-relaxed sm:text-[15px]">{c.psychology}</p>
                    <div className="mt-3 flex flex-wrap gap-1.5">
                      {c.emotions.map((e) => (
                        <span key={e} className="rounded-full px-2.5 py-1 text-xs font-medium" style={{ background: t.chipBg }}>{e}</span>
                      ))}
                    </div>
                    <h3 className="mt-5 font-mono text-[10px] uppercase tracking-[0.2em]" style={{ color: t.muted }}>In design</h3>
                    <p className="mt-1.5 text-[12px] leading-relaxed sm:text-[13.5px]" style={{ color: t.soft }}>{c.inDesign}</p>
                  </div>

                  {/* right column */}
                  <div className="grid gap-3 sm:grid-cols-2 lg:col-span-5 lg:grid-cols-1">
                    <div className="rounded-2xl p-4" style={{ background: t.panelBg, border: `1px solid ${t.panelBd}` }}>
                      <h3 className="mb-2.5 font-mono text-[10px] uppercase tracking-[0.2em]" style={{ color: t.muted }}>Complementary</h3>
                      <div className="flex items-center gap-2">
                        <div className="h-9 flex-1 rounded-md" style={{ background: c.hex, boxShadow: `inset 0 0 0 1px ${t.panelBd}` }} />
                        <ArrowLeftRight className="h-3.5 w-3.5 flex-shrink-0" style={{ color: t.muted }} />
                        <div className="h-9 flex-1 rounded-md" style={{ background: c.complementary.hex, boxShadow: `inset 0 0 0 1px ${t.panelBd}` }} />
                      </div>
                      <p className="mt-2 text-sm font-medium">
                        {c.complementary.name}{' '}
                        <span className="font-mono text-xs" style={{ color: t.muted }}>{c.complementary.hex}</span>
                      </p>
                    </div>
                    <div className="rounded-2xl p-4" style={{ background: t.panelBg, border: `1px solid ${t.panelBd}` }}>
                      <h3 className="mb-2.5 font-mono text-[10px] uppercase tracking-[0.2em]" style={{ color: t.muted }}>Across cultures</h3>
                      <div className="space-y-1.5">
                        {c.cultural.map((item) => (
                          <div key={item.place} className="flex gap-2 text-[12px] leading-snug">
                            <span className="w-16 flex-shrink-0 pt-0.5 font-mono text-[9px] uppercase tracking-wide" style={{ color: t.muted }}>{item.place}</span>
                            <span style={{ color: t.soft }}>{item.note}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* worth knowing + brands + cta */}
                <div className="mt-5 grid items-end gap-5 lg:grid-cols-12">
                  <div className="lg:col-span-8">
                    <h3 className="font-mono text-[10px] uppercase tracking-[0.2em]" style={{ color: t.muted }}>Worth knowing</h3>
                    <p className="mt-1.5 text-[12px] leading-relaxed sm:text-[13px]" style={{ color: t.soft }}>{c.fact}</p>
                    <div className="mt-3 flex flex-wrap gap-1.5">
                      {c.brands.map((b) => (
                        <span key={b} className="rounded-md px-2 py-0.5 text-[11px]" style={{ background: t.chipBg }}>{b}</span>
                      ))}
                    </div>
                  </div>
                  <div className="lg:col-span-4 lg:text-right">
                    <Link
                      href={`/color-generator?color=${c.hex.replace('#', '')}`}
                      className="inline-flex items-center gap-1.5 rounded-lg px-4 py-2 text-sm font-semibold transition-transform active:scale-95"
                      style={{ background: t.fg, color: c.hex }}
                    >
                      Open in the generator
                      <ArrowRight className="h-3.5 w-3.5" />
                    </Link>
                  </div>
                </div>
              </div>
            </section>
          );
        })}
      </div>

      {/* Dot navigation */}
      <nav
        aria-label="Jump to color"
        className="fixed right-3 top-1/2 z-40 hidden -translate-y-1/2 flex-col items-center gap-2.5 sm:right-5 sm:flex"
      >
        {navItems.map((n, i) => (
          <button
            key={n.label}
            onClick={() => goTo(i)}
            title={n.label}
            aria-label={`Go to ${n.label}`}
            aria-current={active === i ? 'true' : undefined}
            className="group relative grid h-4 w-4 place-items-center"
          >
            <span
              className={cn('rounded-full transition-all duration-200', active === i ? 'h-3 w-3' : 'h-2 w-2 group-hover:h-2.5 group-hover:w-2.5')}
              style={{
                background: n.hex ?? 'var(--ink-3)',
                boxShadow: active === i
                  ? '0 0 0 2px rgba(255,255,255,0.9), 0 1px 4px rgba(0,0,0,0.3)'
                  : 'inset 0 0 0 1px rgba(0,0,0,0.15)',
              }}
            />
            <span className="pointer-events-none absolute right-6 whitespace-nowrap rounded-md bg-ink px-2 py-1 font-mono text-[10px] uppercase tracking-wider text-paper opacity-0 transition-opacity group-hover:opacity-100">
              {n.label}
            </span>
          </button>
        ))}
      </nav>
    </>
  );
}
