import type { Metadata } from 'next';
import { pageMetadata } from '@/lib/metadata';
import { pageJsonLd } from '@/lib/jsonld';

export const metadata: Metadata = pageMetadata({
  title: 'CSS Gradient Maker: Linear, Radial and Conic Gradients',
  description:
    'Build linear, radial, and conic CSS gradients with a live preview and as many color stops as you need, then copy the CSS when it looks right.',
  path: '/gradient-maker',
});

const jsonLd = pageJsonLd({
  name: 'CSS Gradient Maker',
  description:
    'Build linear, radial, and conic CSS gradients with a live preview and as many color stops as you need, then copy the CSS when it looks right.',
  path: '/gradient-maker',
});

export default function GradientLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      {children}
    </>
  );
}
