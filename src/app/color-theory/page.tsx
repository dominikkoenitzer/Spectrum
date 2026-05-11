import type { Metadata } from 'next';
import Link from 'next/link';
import {
  ArrowLeftRight, Palette, Waves, Triangle, Thermometer,
  SlidersHorizontal, ArrowRight, ChevronRight,
} from 'lucide-react';
import { AnimateIn } from '@/components/ui/AnimateIn';

export const metadata: Metadata = {
  title: 'Colour Theory — The Complete Guide',
  description: 'A complete guide to colour theory: the psychology, cultural meaning, design applications, and complementary colours for red, orange, yellow, green, blue, violet, pink, brown, black, white, and gray.',
  keywords: [
    'colour theory', 'color theory', 'color psychology', 'color meaning', 'color wheel',
    'complementary colors', 'analogous colors', 'triadic colors', 'color harmony',
    'what does red mean', 'what does blue mean', 'color in design', 'color for designers',
    'primary colors', 'secondary colors', 'color symbolism', 'color emotions',
  ],
  openGraph: {
    title: 'Colour Theory — The Complete Guide | Spectrum',
    description: 'The psychology, culture, and design logic behind every major colour.',
    url: '/color-theory',
  },
  alternates: { canonical: '/color-theory' },
};

const principles = [
  {
    title: 'Complementary',
    Icon: ArrowLeftRight,
    desc: 'Colours directly opposite on the wheel. They cancel in mixing but amplify each other visually — each makes the other look more intense.',
    pair: ['#EF4444', '#22C55E'],
    angle: '180°',
  },
  {
    title: 'Analogous',
    Icon: Waves,
    desc: 'Three adjacent hues — 30° apart. They share wavelengths so they feel naturally related. Sunsets work this way. Great for gradients; they lack built-in contrast.',
    pair: ['#3B82F6', '#8B5CF6', '#EC4899'],
    angle: '±30°',
  },
  {
    title: 'Triadic',
    Icon: Triangle,
    desc: 'Three hues 120° apart. All pull equal visual weight — pick one dominant, one secondary, one accent, or everything fights. The most vibrant multi-hue scheme.',
    pair: ['#EF4444', '#22C55E', '#3B82F6'],
    angle: '120°',
  },
  {
    title: 'Split-Complementary',
    Icon: ArrowLeftRight,
    desc: "The complement's two neighbours rather than the complement itself. Same contrast range as complementary, but far easier to balance — a softer landing.",
    pair: ['#8B5CF6', '#EAB308', '#F97316'],
    angle: '150°/210°',
  },
  {
    title: 'Monochromatic',
    Icon: SlidersHorizontal,
    desc: "One hue across its full tonal range. Always cohesive, never clashing — the risk is monotony. Solve it with dramatic value steps between light and dark.",
    pair: ['#C4B5FD', '#8B5CF6', '#3B0764'],
    angle: '0° shift',
  },
  {
    title: 'Warm vs Cool',
    Icon: Thermometer,
    desc: 'Warm hues (red, orange, yellow) advance — they appear closer and attract the eye first. Cool hues (blue, green, violet) recede. Use this to control spatial depth.',
    pair: ['#F97316', '#EAB308', '#3B82F6'],
    angle: 'Temp.',
  },
];

const colors = [
  {
    name: 'Red',
    hex: '#EF4444',
    hue: '0°',
    gradient: 'from-red-500 to-rose-700',
    accent: 'text-red-400',
    border: 'border-red-500/20',
    bg: 'bg-red-500/[0.07]',
    shades: ['#FCA5A5', '#F87171', '#EF4444', '#DC2626', '#991B1B', '#7F1D1D'],
    shadeNames: ['Rose', 'Light', 'Red', 'Crimson', 'Dark', 'Maroon'],
    complementary: { name: 'Cyan', hex: '#06B6D4' },
    emotions: ['Passion', 'Urgency', 'Love', 'Danger', 'Energy'],
    psychology: 'No colour acts faster on the brain than red. It raises heart rate, accelerates breathing, and pulls focus before conscious thought kicks in — which is exactly why stop signs and ambulances use it. In small doses it signals love and passion; in large doses, threat. The effect is real enough that athletes wearing red in competitive sports win statistically more often.',
    inDesign: 'Red converts. Studies consistently show red CTAs outperform blue and green for high-urgency actions. The trade-off: overuse it and everything feels like an error state. One red element on a page feels important. Five feel panicked.',
    cultural: [
      { place: 'China', note: 'Luck and celebration — brides wear red, envelopes are red, New Year is red' },
      { place: 'Western', note: 'Love and danger simultaneously, which gives it its tension' },
      { place: 'India', note: 'Purity and prosperity; red sindoor marks married women' },
      { place: 'South Africa', note: 'Mourning and loss' },
    ],
    brands: ['Coca-Cola', 'Netflix', 'YouTube', 'Ferrari', 'Target'],
    fact: "Red is the first colour human infants can distinguish, and appears first in virtually every language's colour vocabulary after black and white.",
  },
  {
    name: 'Orange',
    hex: '#F97316',
    hue: '30°',
    gradient: 'from-orange-400 to-orange-600',
    accent: 'text-orange-400',
    border: 'border-orange-500/20',
    bg: 'bg-orange-500/[0.07]',
    shades: ['#FED7AA', '#FDBA74', '#F97316', '#EA580C', '#C2410C', '#9A3412'],
    shadeNames: ['Peach', 'Light', 'Orange', 'Burnt', 'Deep', 'Rust'],
    complementary: { name: 'Blue', hex: '#3B82F6' },
    emotions: ['Warmth', 'Enthusiasm', 'Playfulness', 'Confidence', 'Creativity'],
    psychology: "Orange sits between the urgency of red and the cheerfulness of yellow — it takes the best of both without their edge. It's the most social colour: stimulates conversation, signals approachability, and reads as energetic without being aggressive. It's also the colour most associated with value and affordability.",
    inDesign: "Orange works where red feels too serious or too alarming. It's the preferred CTA colour for brands that want action without anxiety. Food brands love it because it stimulates appetite while suggesting freshness. One underused quality: orange is extraordinarily legible against dark backgrounds at large sizes.",
    cultural: [
      { place: 'Netherlands', note: 'National colour — the royal House of Orange-Nassau' },
      { place: 'Buddhism', note: "Sacred; monks' robes are saffron-orange, symbolising renunciation" },
      { place: 'Egypt', note: 'Historically associated with mourning and loss' },
      { place: 'Western', note: 'Halloween, autumn, construction, warnings, bargains' },
    ],
    brands: ['Amazon', 'Fanta', 'Firefox', 'Nickelodeon', 'Harley-Davidson'],
    fact: 'Orange is the only colour in English named after a fruit. Before oranges reached Europe, the colour was called "geoluread" — yellow-red.',
  },
  {
    name: 'Yellow',
    hex: '#EAB308',
    hue: '60°',
    gradient: 'from-yellow-400 to-amber-500',
    accent: 'text-yellow-400',
    border: 'border-yellow-500/20',
    bg: 'bg-yellow-500/[0.07]',
    shades: ['#FEF9C3', '#FDE047', '#EAB308', '#CA8A04', '#A16207', '#854D0E'],
    shadeNames: ['Pale', 'Light', 'Yellow', 'Amber', 'Deep', 'Ochre'],
    complementary: { name: 'Violet', hex: '#7C3AED' },
    emotions: ['Optimism', 'Clarity', 'Caution', 'Energy', 'Warmth'],
    psychology: 'Yellow is the most visible colour to the human eye under daylight — the brain processes it before any other hue. That same visibility becomes a liability indoors: yellow rooms register as stimulating to the point of anxiety. In moderate use, yellow sharpens attention and boosts analytical thinking.',
    inDesign: "Yellow signals 'pay attention here' better than almost any other colour at the same size. It's ideal for badges, highlights, and emphasis — but terrible for body text on white (the contrast ratio drops below WCAG minimums at medium weights). Against dark backgrounds it becomes one of the most legible colours available.",
    cultural: [
      { place: 'China', note: 'Imperial colour for centuries — only the emperor could wear true yellow' },
      { place: 'Japan', note: 'Courage and refinement; associated with the chrysanthemum' },
      { place: 'Western', note: 'Sunshine, happiness, caution signs, taxis' },
      { place: 'Egypt', note: 'Eternal and imperishable; used for gold in ancient art' },
    ],
    brands: ["McDonald's", 'IKEA', 'Snapchat', 'DHL', 'National Geographic'],
    fact: "Yellow is the most commonly cited 'least favourite colour' in surveys, yet it's the colour most associated with optimism and creativity in psychological testing.",
  },
  {
    name: 'Green',
    hex: '#22C55E',
    hue: '120°',
    gradient: 'from-green-400 to-emerald-600',
    accent: 'text-green-400',
    border: 'border-green-500/20',
    bg: 'bg-green-500/[0.07]',
    shades: ['#BBF7D0', '#6EE7B7', '#22C55E', '#16A34A', '#15803D', '#14532D'],
    shadeNames: ['Mint', 'Light', 'Green', 'Medium', 'Forest', 'Deep'],
    complementary: { name: 'Magenta', hex: '#DB2777' },
    emotions: ['Growth', 'Calm', 'Health', 'Harmony', 'Nature'],
    psychology: 'Humans distinguish more shades of green than any other colour — an evolutionary legacy from scanning vegetation for food and safety. Green at 120° sits exactly at the centre of the visible spectrum, making it the easiest wavelength for the eye to process. Green environments lower heart rate and reduce stress.',
    inDesign: "Green is the universal 'go' signal — confirmation dialogs, success states, 'in stock' badges. Healthcare and finance brands use it because it implies both health and growth simultaneously. The challenge: a yellow-green reads as sickly; a forest green reads as premium. Hue matters more for green than any other colour.",
    cultural: [
      { place: 'Islam', note: "Sacred colour — paradise is described as green, the Prophet's flag was green" },
      { place: 'Ireland', note: '"The Emerald Isle" — green is national identity, not just a colour' },
      { place: 'Western', note: 'Go signals, money, environment, health, envy' },
      { place: 'Indonesia', note: 'Historically forbidden in some contexts, associated with bad fortune' },
    ],
    brands: ['Starbucks', 'Spotify', 'Whole Foods', 'WhatsApp', 'Animal Planet'],
    fact: 'Night vision goggles display green because human eyes are most sensitive to that wavelength — we can distinguish more detail in green than in any other colour.',
  },
  {
    name: 'Blue',
    hex: '#3B82F6',
    hue: '210°',
    gradient: 'from-blue-400 to-blue-700',
    accent: 'text-blue-400',
    border: 'border-blue-500/20',
    bg: 'bg-blue-500/[0.07]',
    shades: ['#BFDBFE', '#93C5FD', '#3B82F6', '#2563EB', '#1D4ED8', '#1E3A8A'],
    shadeNames: ['Pale', 'Light', 'Blue', 'Medium', 'Royal', 'Navy'],
    complementary: { name: 'Orange', hex: '#F97316' },
    emotions: ['Trust', 'Calm', 'Reliability', 'Clarity', 'Depth'],
    psychology: "Blue is the world's most universally popular colour across cultures and genders. It lowers heart rate, slows metabolism, and suppresses appetite. Blue's dominance in banking, tech, and healthcare isn't arbitrary: trust is its core psychological signal, and building trust is the primary challenge in all three industries.",
    inDesign: "Blue is the safest primary brand colour — it rarely alienates and scales across contexts from serious to friendly by adjusting saturation and value. Saturated mid-blues feel modern and digital. Navy feels traditional and authoritative. Sky blue feels friendly and open. The one trap: blue disappears on dark backgrounds unless it's very bright or very saturated.",
    cultural: [
      { place: 'Western', note: '"Feeling blue" for sadness; "true blue" for loyalty — contradictory, which reflects its range' },
      { place: 'Iran', note: 'Colour of mourning, and of protection against the evil eye' },
      { place: 'Judaism', note: 'Holiness and divinity; appears in the Israeli flag and religious textiles' },
      { place: 'India', note: 'Associated with Krishna — divine, infinite, and transcendent' },
    ],
    brands: ['Facebook/Meta', 'PayPal', 'Samsung', 'Ford', 'IBM', 'Visa'],
    fact: "Ancient languages had no word for blue. Homer described the sea as 'wine-dark.' The colour blue appears almost nowhere in nature except the sky and deep water.",
  },
  {
    name: 'Violet',
    hex: '#8B5CF6',
    hue: '263°',
    gradient: 'from-violet-400 to-purple-700',
    accent: 'text-violet-400',
    border: 'border-violet-500/20',
    bg: 'bg-violet-500/[0.07]',
    shades: ['#DDD6FE', '#C4B5FD', '#8B5CF6', '#7C3AED', '#6D28D9', '#3B0764'],
    shadeNames: ['Lavender', 'Light', 'Violet', 'Purple', 'Deep', 'Grape'],
    complementary: { name: 'Yellow', hex: '#EAB308' },
    emotions: ['Luxury', 'Creativity', 'Mystery', 'Wisdom', 'Ambition'],
    psychology: 'Violet sits at the extreme edge of human colour perception — just before the spectrum crosses into invisible ultraviolet. For most of history, purple dye required 12,000 shellfish per gram, making it literally worth more than gold. That history of scarcity is still embedded in our perception: purple reads as rare, elevated, and unusual.',
    inDesign: "Purple covers a wide creative range depending on shade. Bright violet signals innovation and creativity — tech tools, AI products, game platforms. Deep purple signals luxury and heritage. Lavender is calming and increasingly used in wellness branding. The consistent quality: purple signals that something isn't mainstream.",
    cultural: [
      { place: 'Western', note: 'Royalty, ambition, spiritual authority, creativity' },
      { place: 'Thailand', note: 'Mourning, particularly for widows' },
      { place: 'Japan', note: 'Highest rank and status; associated with the imperial court' },
      { place: 'Brazil', note: 'Associated with death and worn at some funerals' },
    ],
    brands: ['Cadbury', 'Twitch', 'Hallmark', 'FedEx', 'Yahoo'],
    fact: "Until 1856, purple dye was so expensive that laws made it illegal for anyone below a certain rank to wear it. An 18-year-old chemistry student accidentally invented synthetic purple (mauveine) and became a millionaire.",
  },
  {
    name: 'Pink',
    hex: '#EC4899',
    hue: '330°',
    gradient: 'from-pink-400 to-rose-600',
    accent: 'text-pink-400',
    border: 'border-pink-500/20',
    bg: 'bg-pink-500/[0.07]',
    shades: ['#FBCFE8', '#F9A8D4', '#EC4899', '#DB2777', '#BE185D', '#831843'],
    shadeNames: ['Blush', 'Light', 'Pink', 'Hot', 'Fuchsia', 'Deep'],
    complementary: { name: 'Green', hex: '#22C55E' },
    emotions: ['Romance', 'Tenderness', 'Playfulness', 'Warmth', 'Care'],
    psychology: "Pink is physiologically calming — one specific shade has been shown to reduce aggressive behaviour in correctional facilities. But pink's cultural meaning is almost entirely constructed: in the 1920s, pink was recommended for boys and blue for girls. The reversal happened gradually after World War II and solidified in the 1980s.",
    inDesign: "Hot pink is bold enough to hold its own against any other colour — it commands attention without the aggression of red. Soft pink is calming and increasingly used in non-gendered wellness and skincare contexts. The sweet spot: mid-saturation pink — distinctive, warm, and approachable.",
    cultural: [
      { place: 'Japan', note: 'Cherry blossoms, transience, youth — one of the most loved colours' },
      { place: 'Western', note: 'Femininity and romance — entirely a 20th-century construction' },
      { place: 'Korea', note: 'Trust and reliability in some business contexts' },
      { place: 'Global', note: 'Increasingly adopted across genders by younger generations' },
    ],
    brands: ['Barbie', 'T-Mobile', 'Glossier', 'Baskin-Robbins', 'Cosmopolitan'],
    fact: "Pink doesn't exist in the rainbow or the visible light spectrum. It's what the brain constructs when you remove green from white light — there is no single pink wavelength.",
  },
  {
    name: 'Brown',
    hex: '#92400E',
    hue: '27°',
    gradient: 'from-amber-700 to-stone-800',
    accent: 'text-amber-600',
    border: 'border-amber-700/20',
    bg: 'bg-amber-700/[0.07]',
    shades: ['#FDE68A', '#D97706', '#B45309', '#92400E', '#78350F', '#451A03'],
    shadeNames: ['Tan', 'Caramel', 'Amber', 'Brown', 'Chocolate', 'Espresso'],
    complementary: { name: 'Sky Blue', hex: '#7DD3FC' },
    emotions: ['Stability', 'Authenticity', 'Warmth', 'Earthiness', 'Reliability'],
    psychology: "Brown is the colour of shelter — wood, earth, stone, animal hide. Every home before industrialisation was built of it. That deep familiarity makes brown feel fundamentally safe and genuine. It's rarely anyone's declared favourite colour, yet it's universally recognised as trustworthy.",
    inDesign: "Brown is underused in digital design, which makes it distinctive. Rich chocolate browns signal premium quality. Lighter tans feel organic and unpretentious — craft brands, farmers markets, sustainable goods. The challenge: brown can feel dated or dirty if not handled carefully.",
    cultural: [
      { place: 'Western', note: 'Earth, reliability, autumn, natural materials, traditional craft' },
      { place: 'India', note: 'Associated with mourning in certain funeral contexts' },
      { place: 'Universal', note: 'Wood, earth, soil — the colour of the ground itself' },
      { place: 'Colombia', note: 'Traditionally a colour of discouragement or disapproval' },
    ],
    brands: ['UPS', "Hershey's", 'Nespresso', 'Louis Vuitton', 'Timberland'],
    fact: "Brown doesn't exist on the visible light spectrum. It's what the brain perceives as dark, low-saturation orange. Change its brightness context and it becomes 'orange.'",
  },
  {
    name: 'Black',
    hex: '#111827',
    hue: '—',
    gradient: 'from-gray-700 to-gray-950',
    accent: 'text-gray-300',
    border: 'border-white/10',
    bg: 'bg-white/[0.04]',
    shades: ['#6B7280', '#374151', '#1F2937', '#111827', '#030712'],
    shadeNames: ['Gray', 'Charcoal', 'Graphite', 'Jet', 'Black'],
    complementary: { name: 'White', hex: '#FFFFFF' },
    emotions: ['Power', 'Elegance', 'Authority', 'Mystery', 'Finality'],
    psychology: "Black is the absence of reflected light. It conveys absolute authority and finality. It makes adjacent colours appear more saturated — which is why luxury brands use so much of it. 'Black-tie,' 'black card,' 'black label' — the association with exclusivity is remarkably consistent across languages and cultures.",
    inDesign: "Black is one of the most useful tools in a designer's kit precisely because it's neutral — it never competes. Against black, every other colour becomes more vivid. Typography on black is high-impact. The danger is heaviness: too much black and designs feel oppressive rather than sophisticated.",
    cultural: [
      { place: 'Western', note: 'Mourning, formality, luxury — the little black dress, black tie events' },
      { place: 'Ancient Egypt', note: 'Rebirth and fertility — the black Nile soil that sustained civilisation' },
      { place: 'East Asia', note: 'Wisdom, experience, and in some contexts, prosperity' },
      { place: 'Fashion', note: 'Timelessness — foundation of western fashion for 200 years' },
    ],
    brands: ['Chanel', 'Nike', 'Apple', 'Adidas', 'Lamborghini'],
    fact: "The world's blackest material, Vantablack, absorbs 99.965% of visible light. Artist Anish Kapoor bought exclusive artistic rights to it — other artists responded by releasing 'the world's pinkest paint.'",
  },
  {
    name: 'White',
    hex: '#F8FAFC',
    hue: '—',
    gradient: 'from-gray-100 to-slate-200',
    accent: 'text-gray-200',
    border: 'border-white/15',
    bg: 'bg-white/[0.04]',
    shades: ['#FFFFFF', '#F9FAFB', '#F3F4F6', '#E5E7EB', '#D1D5DB'],
    shadeNames: ['White', 'Snow', 'Pearl', 'Silver', 'Platinum'],
    complementary: { name: 'Black', hex: '#111827' },
    emotions: ['Purity', 'Clarity', 'Space', 'Simplicity', 'New beginnings'],
    psychology: "White reflects all visible wavelengths simultaneously. It creates psychological space: white rooms feel larger and less constrained. In design, white (or negative space) functions as an active element, not empty filler. The absence of colour gives the eye nowhere to land — and that pause registers as breath, clarity, or calm depending on context.",
    inDesign: "White is the foundation of minimalist design because it amplifies everything placed against it. A single bold red element on white hits harder than the same red on a patterned background. The practical trap: pure white (#FFFFFF) on screens is harsh. Most design systems use near-whites (94–97% lightness) to reduce eye strain.",
    cultural: [
      { place: 'Western', note: 'Purity, marriage, cleanliness — the default wedding colour' },
      { place: 'East Asia', note: 'Mourning and death — worn at funerals in China, Japan, and Korea' },
      { place: 'Islam', note: 'Purity and spiritual cleanliness; pilgrims wear white ihram' },
      { place: 'India', note: 'Both peace and mourning — white is worn by widows' },
    ],
    brands: ['Apple', 'Tesla', 'Audi', 'Dove', 'Muji'],
    fact: "White light contains all colours simultaneously. Newton demonstrated this in 1666 by passing sunlight through a prism and revealing the full spectrum.",
  },
  {
    name: 'Gray',
    hex: '#6B7280',
    hue: '—',
    gradient: 'from-gray-400 to-gray-700',
    accent: 'text-gray-400',
    border: 'border-gray-500/20',
    bg: 'bg-gray-500/[0.07]',
    shades: ['#F3F4F6', '#D1D5DB', '#9CA3AF', '#6B7280', '#374151', '#111827'],
    shadeNames: ['Light', 'Silver', 'Medium', 'Gray', 'Charcoal', 'Dark'],
    complementary: { name: 'Warm Amber', hex: '#D97706' },
    emotions: ['Balance', 'Neutrality', 'Professionalism', 'Precision', 'Restraint'],
    psychology: "Gray is the mediator — it holds no emotional position of its own, which makes it uniquely versatile. Warm gray (with yellow or red undertones) reads as sophisticated and inviting. Cool gray reads as technological and precise. The same hex code can feel completely different depending solely on what's next to it.",
    inDesign: "Gray is the workhorse of UI design — surfaces, borders, disabled states, secondary text. The irony is that the best designs make gray invisible: you don't notice it, but remove it and everything falls apart. The most common mistake is using a single gray throughout a system; professional design systems define 8–12 gray steps.",
    cultural: [
      { place: 'Western', note: 'Professionalism, age, compromise — "gray area"' },
      { place: 'Scandinavia', note: 'Central to the design aesthetic — warm, functional, elegant' },
      { place: 'Tech industry', note: 'Precision, modernity, functionality — the default interface colour' },
      { place: 'Fashion', note: 'The sophisticated alternative to black — "greige" became a design movement' },
    ],
    brands: ['Apple', 'Mercedes-Benz', 'Porsche', 'Wikipedia', 'LinkedIn'],
    fact: 'Gray is the only colour with two correct spellings in English — "gray" (American) and "grey" (British). They refer to exactly the same colour.',
  },
];

export default function ColorTheoryPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: 'Colour Theory — The Complete Guide',
    description: 'The psychology, cultural meanings, and design applications of every major colour.',
    author: { '@type': 'Organization', name: 'Spectrum' },
    publisher: { '@type': 'Organization', name: 'Spectrum' },
    url: 'https://spectrumcolor.app/color-theory',
    mainEntityOfPage: 'https://spectrumcolor.app/color-theory',
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <div className="min-h-screen">
        <div className="max-w-5xl mx-auto px-4 py-12 sm:py-20">

          {/* Hero */}
          <header className="mb-16 sm:mb-24">
            <AnimateIn direction="up" delay={0}>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-violet-500/10 border border-violet-500/20 text-violet-400 text-xs font-medium mb-6">
                <Palette className="h-3.5 w-3.5" />
                Colour Theory
              </div>
            </AnimateIn>
            <AnimateIn direction="up" delay={80}>
              <h1 className="text-4xl sm:text-6xl font-bold text-white mb-5 leading-none tracking-tight">
                The Science<br />
                <span className="bg-gradient-to-r from-violet-400 via-fuchsia-400 to-pink-400 bg-clip-text text-transparent">
                  of Colour
                </span>
              </h1>
            </AnimateIn>
            <AnimateIn direction="up" delay={160}>
              <p className="text-base sm:text-lg text-gray-400 max-w-xl leading-relaxed">
                Every colour has physics, psychology, and history behind it. Here&apos;s what actually matters — and how to use it.
              </p>
            </AnimateIn>
          </header>

          {/* Quick-nav */}
          <AnimateIn direction="up" delay={0} className="mb-20 sm:mb-28">
            <p className="text-[10px] font-semibold text-gray-600 uppercase tracking-widest mb-3">Jump to</p>
            <div className="flex flex-wrap gap-2">
              {colors.map((c, i) => (
                <a
                  key={c.name}
                  href={`#${c.name.toLowerCase()}`}
                  className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/[0.04] border border-white/[0.07] hover:bg-white/[0.09] hover:border-white/[0.14] transition-all duration-200 group shimmer-hover"
                  style={{ animationDelay: `${i * 30}ms` }}
                >
                  <div
                    className="w-2.5 h-2.5 rounded-full flex-shrink-0 ring-1 ring-white/20 transition-transform duration-200 group-hover:scale-125"
                    style={{ backgroundColor: c.hex }}
                  />
                  <span className="text-xs text-gray-400 group-hover:text-gray-100 transition-colors duration-200 font-medium">{c.name}</span>
                </a>
              ))}
            </div>
          </AnimateIn>

          {/* Principles */}
          <AnimateIn direction="up" className="mb-20 sm:mb-28">
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-2">How colours work together</h2>
            <p className="text-gray-400 mb-8 text-sm sm:text-base max-w-lg">
              Colour harmony is the geometry of the colour wheel. These six relationships cover the vast majority of palette decisions you&apos;ll ever make.
            </p>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {principles.map((p, i) => (
                <AnimateIn key={p.title} direction="up" delay={i * 60}>
                  <div className="rounded-2xl bg-white/[0.025] border border-white/[0.07] overflow-hidden hover:bg-white/[0.045] transition-all duration-300 card-lift shimmer-hover group h-full">
                    <div className="flex h-10">
                      {p.pair.map((hex, j) => (
                        <div key={j} className="flex-1 transition-all duration-300 group-hover:opacity-90" style={{ backgroundColor: hex }} />
                      ))}
                    </div>
                    <div className="p-4">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <p.Icon className="h-3.5 w-3.5 text-gray-500" />
                          <h3 className="text-sm font-semibold text-white">{p.title}</h3>
                        </div>
                        <code className="text-[10px] font-mono text-gray-600 bg-white/5 px-1.5 py-0.5 rounded">{p.angle}</code>
                      </div>
                      <p className="text-xs text-gray-400 leading-relaxed">{p.desc}</p>
                    </div>
                  </div>
                </AnimateIn>
              ))}
            </div>
          </AnimateIn>

          {/* Divider */}
          <div className="relative mb-16 sm:mb-24">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-white/[0.07]" />
            </div>
            <div className="relative flex justify-center">
              <span className="px-4 bg-gray-950 text-gray-600 text-[10px] font-semibold uppercase tracking-widest">Every colour, explained</span>
            </div>
          </div>

          {/* Individual colours */}
          <div className="space-y-24 sm:space-y-32">
            {colors.map((c, idx) => (
              <AnimateIn key={c.name} direction="up" threshold={0.06}>
                <article id={c.name.toLowerCase()}>

                  {/* Header */}
                  <div className="flex items-end gap-5 mb-6">
                    <div className={`w-14 h-14 sm:w-20 sm:h-20 rounded-2xl bg-gradient-to-br ${c.gradient} flex-shrink-0 shadow-2xl ring-1 ring-white/10 transition-transform duration-300 hover:scale-105`} />
                    <div>
                      <div className="text-[10px] font-semibold text-gray-600 uppercase tracking-widest mb-1.5">
                        {String(idx + 1).padStart(2, '0')} / {String(colors.length).padStart(2, '0')}
                      </div>
                      <h2 className={`text-4xl sm:text-6xl font-bold bg-gradient-to-r ${c.gradient} bg-clip-text text-transparent leading-none`}>
                        {c.name}
                      </h2>
                    </div>
                  </div>

                  {/* Shade strip */}
                  <div className="flex rounded-xl overflow-hidden mb-2 h-10 sm:h-12 ring-1 ring-white/[0.06] group">
                    {c.shades.map((hex, i) => (
                      <div
                        key={i}
                        className="flex-1 relative overflow-hidden"
                        style={{ backgroundColor: hex }}
                        title={`${c.shadeNames[i]}: ${hex}`}
                      >
                        <div className="absolute inset-x-0 bottom-0 pb-1 flex justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                          <span className="text-[8px] font-mono text-white/80 drop-shadow-sm">{hex}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="flex mb-8">
                    {c.shades.map((_, i) => (
                      <div key={i} className="flex-1 text-center">
                        <span className="text-[9px] text-gray-600">{c.shadeNames[i]}</span>
                      </div>
                    ))}
                  </div>

                  {/* Content grid */}
                  <div className="grid gap-3 lg:grid-cols-3">

                    {/* Psychology */}
                    <div className={`lg:col-span-2 rounded-2xl ${c.bg} border ${c.border} p-5 sm:p-6 transition-all duration-300 hover:border-opacity-40`}>
                      <h3 className={`text-[10px] font-semibold uppercase tracking-widest ${c.accent} mb-3`}>Psychology</h3>
                      <p className="text-sm sm:text-base text-gray-200 leading-relaxed">{c.psychology}</p>
                      <div className="mt-4 flex flex-wrap gap-1.5">
                        {c.emotions.map(e => (
                          <span key={e} className={`px-2.5 py-1 rounded-full text-xs font-medium ${c.bg} ${c.accent} border ${c.border} transition-all duration-200 hover:scale-105`}>{e}</span>
                        ))}
                      </div>
                    </div>

                    {/* Complementary */}
                    <div className="rounded-2xl bg-white/[0.025] border border-white/[0.07] p-5 flex flex-col justify-between hover:bg-white/[0.04] transition-colors duration-200">
                      <div>
                        <h3 className="text-[10px] font-semibold uppercase tracking-widest text-gray-500 mb-3">Complementary</h3>
                        <div className="flex gap-2 mb-3 items-center">
                          <div className="flex-1 h-10 rounded-lg ring-1 ring-white/10 transition-transform duration-200 hover:scale-105" style={{ backgroundColor: c.hex }} />
                          <ArrowLeftRight className="h-3.5 w-3.5 text-gray-600 flex-shrink-0" />
                          <div className="flex-1 h-10 rounded-lg ring-1 ring-white/10 transition-transform duration-200 hover:scale-105" style={{ backgroundColor: c.complementary.hex }} />
                        </div>
                        <p className="text-sm font-medium text-gray-200">{c.complementary.name}</p>
                        <code className="text-xs font-mono text-gray-500">{c.complementary.hex}</code>
                      </div>
                      {c.hue !== '—' && (
                        <div className="mt-4 pt-4 border-t border-white/[0.06]">
                          <span className="text-[10px] text-gray-600 font-semibold uppercase tracking-widest">Hue angle</span>
                          <div className="text-2xl font-bold text-white mt-0.5">{c.hue}</div>
                        </div>
                      )}
                    </div>

                    {/* In design */}
                    <div className="rounded-2xl bg-white/[0.025] border border-white/[0.07] p-5 hover:bg-white/[0.04] transition-colors duration-200">
                      <h3 className="text-[10px] font-semibold uppercase tracking-widest text-gray-500 mb-3">In design</h3>
                      <p className="text-xs text-gray-300 leading-relaxed">{c.inDesign}</p>
                    </div>

                    {/* Cultural */}
                    <div className="rounded-2xl bg-white/[0.025] border border-white/[0.07] p-5 hover:bg-white/[0.04] transition-colors duration-200">
                      <h3 className="text-[10px] font-semibold uppercase tracking-widest text-gray-500 mb-3">Cultural meanings</h3>
                      <div className="space-y-2.5">
                        {c.cultural.map(item => (
                          <div key={item.place} className="flex gap-2.5">
                            <span className="text-[10px] font-semibold text-gray-600 w-20 flex-shrink-0 pt-0.5 uppercase tracking-wide">{item.place}</span>
                            <span className="text-xs text-gray-300 leading-relaxed">{item.note}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Brands + fact */}
                    <div className="rounded-2xl bg-white/[0.025] border border-white/[0.07] p-5 flex flex-col gap-4 hover:bg-white/[0.04] transition-colors duration-200">
                      <div>
                        <h3 className="text-[10px] font-semibold uppercase tracking-widest text-gray-500 mb-2.5">Brands</h3>
                        <div className="flex flex-wrap gap-1.5">
                          {c.brands.map(b => (
                            <span key={b} className="px-2 py-0.5 rounded-md text-xs text-gray-400 bg-white/5 border border-white/[0.07] hover:bg-white/10 hover:text-gray-200 transition-all duration-150 cursor-default">{b}</span>
                          ))}
                        </div>
                      </div>
                      <div className="pt-3 border-t border-white/[0.06]">
                        <h3 className="text-[10px] font-semibold uppercase tracking-widest text-gray-500 mb-2">Worth knowing</h3>
                        <p className="text-xs text-gray-400 leading-relaxed">{c.fact}</p>
                      </div>
                    </div>

                  </div>

                  {/* Try it */}
                  <div className="mt-4">
                    <Link
                      href={`/color-generator?color=${c.hex.replace('#', '')}`}
                      className={`inline-flex items-center gap-1.5 text-xs font-medium ${c.accent} hover:opacity-70 transition-opacity duration-150 group`}
                    >
                      Analyse this colour in the generator
                      <ChevronRight className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-0.5" />
                    </Link>
                  </div>
                </article>
              </AnimateIn>
            ))}
          </div>

          {/* Bottom CTA */}
          <AnimateIn direction="up" className="mt-24 sm:mt-32">
            <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-b from-violet-500/10 to-purple-500/5 border border-violet-500/20 text-center hover:border-violet-500/30 transition-colors duration-300">
              <h2 className="text-2xl sm:text-3xl font-bold text-white mb-3">Put it to work</h2>
              <p className="text-gray-400 mb-7 max-w-md mx-auto text-sm sm:text-base">
                Theory only matters if you can test it. Spectrum&apos;s tools let you verify every instinct in real time.
              </p>
              <div className="flex flex-wrap gap-2.5 justify-center">
                {[
                  { href: '/color-generator', label: 'Color Analysis' },
                  { href: '/contrast-checker', label: 'Contrast Checker' },
                  { href: '/color-blindness', label: 'Vision Simulator' },
                  { href: '/gradient-maker', label: 'Gradient Maker' },
                ].map(link => (
                  <a
                    key={link.href}
                    href={link.href}
                    className="group inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white/[0.07] border border-white/[0.1] text-white text-sm font-medium hover:bg-white/[0.12] hover:border-violet-500/30 transition-all duration-200 shimmer-hover"
                  >
                    {link.label}
                    <ArrowRight className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-0.5" />
                  </a>
                ))}
              </div>
            </div>
          </AnimateIn>

        </div>
      </div>
    </>
  );
}
