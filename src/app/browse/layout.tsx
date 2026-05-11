import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Browse Colors — Named Colors, Palettes & Brand Colors',
  description: 'Explore thousands of named CSS colors, curated design palettes, trending hues, and brand color libraries. Instantly copy hex, RGB, or HSL values.',
  keywords: ['named colors', 'color library', 'color palette', 'brand colors', 'css color names', 'color swatches', 'trending colors', 'web colors'],
  openGraph: {
    title: 'Browse Colors — Named Colors, Palettes & Brand Colors | Spectrum',
    description: 'Explore thousands of named CSS colors, curated palettes, trending hues, and brand color libraries.',
    url: '/browse',
  },
  alternates: { canonical: '/browse' },
};

export default function BrowseLayout({ children }: { children: React.ReactNode }) {
  return children;
}
