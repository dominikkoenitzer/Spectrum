import type { Metadata } from 'next';
import { pageMetadata } from '@/lib/metadata';

export const metadata: Metadata = pageMetadata({
  title: 'Color Palette Generator: Harmonious Palettes from Any Color',
  description:
    'Build complementary, analogous, triadic, and tetradic palettes from any starting color, with shades, tints, and live WCAG contrast checking.',
  path: '/color-generator',
});

export default function GeneratorLayout({ children }: { children: React.ReactNode }) {
  return children;
}
