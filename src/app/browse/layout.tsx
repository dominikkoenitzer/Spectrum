import type { Metadata } from 'next';
import { pageMetadata } from '@/lib/metadata';

export const metadata: Metadata = pageMetadata({
  title: 'Browse Colors: Named Colors, Palettes and Brand Colors',
  description:
    'Thousands of named CSS colors, curated design palettes, trending hues, and brand color libraries. Copy any swatch as hex, RGB, or HSL.',
  path: '/browse',
  keywords: ['named colors', 'color library', 'color palette', 'brand colors', 'css color names', 'color swatches', 'trending colors', 'web colors'],
});

export default function BrowseLayout({ children }: { children: React.ReactNode }) {
  return children;
}
