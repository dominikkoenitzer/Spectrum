import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Color Blindness Simulator',
  description: 'Simulate how colors appear to people with different types of color vision deficiency.',
};

export default function ColorBlindnessLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
