import type { Metadata } from 'next';
import { pageMetadata } from '@/lib/metadata';
import { pageJsonLd } from '@/lib/jsonld';

export const metadata: Metadata = pageMetadata({
  title: 'Color Blindness Simulator: Test Your Designs for Accessibility',
  description:
    'See how images and colors look to people with protanopia, deuteranopia, tritanopia, and achromatopsia. Load any image and compare it side by side.',
  path: '/color-blindness',
});

const jsonLd = pageJsonLd({
  name: 'Color Blindness Simulator',
  description:
    'See how images and colors look to people with protanopia, deuteranopia, tritanopia, and achromatopsia. Load any image and compare it side by side.',
  path: '/color-blindness',
});

export default function ColorBlindnessLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      {children}
    </>
  );
}
