import type { Metadata } from 'next';
import { pageMetadata } from '@/lib/metadata';

export const metadata: Metadata = pageMetadata({
  title: 'Color Blindness Simulator: Test Your Designs for Accessibility',
  description:
    'See how images and colors look to people with protanopia, deuteranopia, tritanopia, and achromatopsia. Load any image and compare it side by side.',
  path: '/color-blindness',
});

export default function ColorBlindnessLayout({ children }: { children: React.ReactNode }) {
  return children;
}
