import type { Metadata } from 'next';
import { ColorTheoryExperience } from './ColorTheoryExperience';
import { SITE_URL } from '@/lib/site';
import { pageMetadata } from '@/lib/metadata';

export const metadata: Metadata = pageMetadata({
  title: 'Color Theory: The Complete Guide',
  description:
    'A guide to color theory: the psychology, cultural meaning, design use, and complementary colors for red, orange, yellow, green, blue, violet, pink, brown, black, white, and gray.',
  path: '/color-theory',
  keywords: [
    'color theory', 'color psychology', 'color meaning', 'color wheel',
    'complementary colors', 'analogous colors', 'triadic colors', 'color harmony',
    'what does red mean', 'what does blue mean', 'color in design', 'color for designers',
    'primary colors', 'secondary colors', 'color symbolism', 'color emotions',
  ],
});

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: 'Color Theory: The Complete Guide',
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
