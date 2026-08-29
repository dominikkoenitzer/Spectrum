import type { Metadata } from 'next';
import { pageMetadata } from '@/lib/metadata';

export const metadata: Metadata = pageMetadata({
  title: 'Color Blindness Simulator: Test Your Designs for Accessibility',
  description:
    'See how images and colors look to people with protanopia, deuteranopia, tritanopia, and achromatopsia. Load any image and compare it side by side.',
  path: '/color-blindness',
  keywords: ['color blindness simulator', 'protanopia', 'deuteranopia', 'tritanopia', 'achromatopsia', 'color vision deficiency', 'accessible design', 'color blind test', 'cvd simulation'],
});

export default function ColorBlindnessLayout({ children }: { children: React.ReactNode }) {
  return children;
}
