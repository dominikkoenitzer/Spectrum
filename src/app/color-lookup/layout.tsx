import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Color Lookup & Converter — HEX, RGB, HSL, HSV & More',
  description: 'Convert any color between HEX, RGB, HSL, HSV, OKLCH, LAB, and XYZ formats instantly. Look up color names, view psychology, and explore related harmonies.',
  keywords: ['color converter', 'hex to rgb', 'rgb to hex', 'hsl color', 'color format converter', 'color lookup', 'oklch', 'color name finder', 'color code converter'],
  openGraph: {
    title: 'Color Lookup & Converter — HEX, RGB, HSL and More | Spectrum',
    description: 'Convert between HEX, RGB, HSL, HSV, and other color formats instantly. Find color names and explore related harmonies.',
    url: '/color-lookup',
  },
  alternates: { canonical: '/color-lookup' },
};

export default function ColorLookupLayout({ children }: { children: React.ReactNode }) {
  return children;
}
