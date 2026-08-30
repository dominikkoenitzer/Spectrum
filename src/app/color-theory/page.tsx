import type { Metadata } from 'next';
import { ColorTheoryExperience } from './ColorTheoryExperience';
import { SITE_URL } from '@/lib/site';
import { pageMetadata } from '@/lib/metadata';

export const metadata: Metadata = pageMetadata({
  title: 'Color Theory: The Complete Guide',
  description:
    'A guide to color theory: the psychology, cultural meaning, design use, and complementary colors for red, orange, yellow, green, blue, violet, pink, brown, black, white, and gray.',
  path: '/color-theory',
});

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  // Matches the on-page h1.
  headline: 'The Science of Color',
  description: 'The psychology, cultural meanings, and design applications of every major color.',
  author: { '@type': 'Person', name: 'dominikkoenitzer', url: 'https://dk.punds.ch' },
  publisher: {
    '@type': 'Organization',
    name: 'Spectrum',
    logo: { '@type': 'ImageObject', url: `${SITE_URL}/icon.svg` },
  },
  image: `${SITE_URL}/opengraph-image`,
  datePublished: '2026-05-11',
  dateModified: '2026-08-29',
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
