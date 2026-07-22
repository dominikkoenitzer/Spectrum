import type { Metadata } from 'next';
import { ColorTheoryExperience } from './ColorTheoryExperience';
import { SITE_URL } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Color Theory — The Complete Guide',
  description: 'A complete guide to color theory: the psychology, cultural meaning, design applications, and complementary colors for red, orange, yellow, green, blue, violet, pink, brown, black, white, and gray.',
  keywords: [
    'color theory', 'color psychology', 'color meaning', 'color wheel',
    'complementary colors', 'analogous colors', 'triadic colors', 'color harmony',
    'what does red mean', 'what does blue mean', 'color in design', 'color for designers',
    'primary colors', 'secondary colors', 'color symbolism', 'color emotions',
  ],
  openGraph: {
    title: 'Color Theory — The Complete Guide | Spectrum',
    description: 'The psychology, culture, and design logic behind every major color.',
    url: '/color-theory',
  },
  alternates: { canonical: '/color-theory' },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: 'Color Theory — The Complete Guide',
  description: 'The psychology, cultural meanings, and design applications of every major color.',
  author: { '@type': 'Organization', name: 'Spectrum' },
  publisher: { '@type': 'Organization', name: 'Spectrum' },
  url: `${SITE_URL}/color-theory`,
  mainEntityOfPage: `${SITE_URL}/color-theory`,
};

export default function ColorTheoryPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <ColorTheoryExperience />
    </>
  );
}
