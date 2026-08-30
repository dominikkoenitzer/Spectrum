import type { Metadata } from 'next';
import { pageMetadata } from '@/lib/metadata';
import { pageJsonLd } from '@/lib/jsonld';

export const metadata: Metadata = pageMetadata({
  title: 'Browse Colors: Named Colors, Palettes and Brand Colors',
  description:
    'Hundreds of named CSS colors, curated design palettes, trending hues, and brand color libraries. Copy any swatch as hex, RGB, or HSL.',
  path: '/browse',
});

// A content library rather than an interactive tool, so breadcrumb only.
const jsonLd = pageJsonLd({
  name: 'Browse Colors',
  description:
    'Hundreds of named CSS colors, curated design palettes, trending hues, and brand color libraries. Copy any swatch as hex, RGB, or HSL.',
  path: '/browse',
  application: false,
});

export default function BrowseLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      {children}
    </>
  );
}
