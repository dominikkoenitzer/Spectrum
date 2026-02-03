import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Color Generator',
  description: 'Generate beautiful color palettes with various schemes - monochromatic, complementary, analogous, and more.',
};

export default function GeneratorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
