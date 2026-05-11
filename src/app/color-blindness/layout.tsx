import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Color Blindness Simulator — Test Your Designs for Accessibility',
  description: 'Simulate how images and colors appear to people with protanopia, deuteranopia, tritanopia, and achromatopsia. Upload any image and compare side-by-side. Essential for accessible design.',
  keywords: ['color blindness simulator', 'protanopia', 'deuteranopia', 'tritanopia', 'achromatopsia', 'color vision deficiency', 'accessible design', 'color blind test', 'cvd simulation'],
  openGraph: {
    title: 'Color Blindness Simulator | Spectrum',
    description: 'Simulate how images appear to people with protanopia, deuteranopia, tritanopia, and other color vision deficiencies.',
    url: '/color-blindness',
  },
  alternates: { canonical: '/color-blindness' },
};

export default function ColorBlindnessLayout({ children }: { children: React.ReactNode }) {
  return children;
}
