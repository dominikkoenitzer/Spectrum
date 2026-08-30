import type { Metadata } from 'next';
import { pageMetadata } from '@/lib/metadata';

export const metadata: Metadata = pageMetadata({
  title: 'Browse Colors: Named Colors, Palettes and Brand Colors',
  description:
    'Hundreds of named CSS colors, curated design palettes, trending hues, and brand color libraries. Copy any swatch as hex, RGB, or HSL.',
  path: '/browse',
});

export default function BrowseLayout({ children }: { children: React.ReactNode }) {
  return children;
}
