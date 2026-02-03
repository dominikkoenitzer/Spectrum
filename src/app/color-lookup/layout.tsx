import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Color Lookup',
  description: 'Convert between color formats - HEX, RGB, HSL, HSV. Find color names and values instantly.',
};

export default function ColorLookupLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
