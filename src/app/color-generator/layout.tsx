import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Color Palette Generator — Harmonious Palettes from Any Color',
  description: 'Generate complementary, analogous, triadic, and tetradic color palettes from any starting color. Explore shades, tints, and color harmonies with real-time WCAG contrast checking.',
  keywords: ['color palette generator', 'complementary colors', 'analogous colors', 'triadic colors', 'color harmony', 'color scheme generator', 'design palette', 'color combinations'],
  openGraph: {
    title: 'Color Palette Generator | Spectrum',
    description: 'Generate beautiful complementary, analogous, triadic color palettes with WCAG contrast checking — in seconds.',
    url: '/color-generator',
  },
  alternates: { canonical: '/color-generator' },
};

export default function GeneratorLayout({ children }: { children: React.ReactNode }) {
  return children;
}
