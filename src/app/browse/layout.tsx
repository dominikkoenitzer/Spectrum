import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Browse Colors',
  description: 'Explore comprehensive collections of named colors, web colors, and color palettes.',
};

export default function BrowseLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
