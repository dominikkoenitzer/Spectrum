import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'WCAG Contrast Checker — Accessibility Color Testing',
  description: 'Check color contrast ratios against WCAG 2.1 AA and AAA standards. Get instant accessibility scores for text, large text, and UI components. Auto-suggest accessible color alternatives.',
  keywords: ['wcag contrast checker', 'color contrast ratio', 'accessibility contrast', 'wcag aa', 'wcag aaa', 'color accessibility', 'ada compliant colors', 'contrast ratio calculator'],
  openGraph: {
    title: 'WCAG Contrast Checker — Accessibility Color Testing | Spectrum',
    description: 'Check color contrast ratios against WCAG AA and AAA standards. Get instant scores and accessible color suggestions.',
    url: '/contrast-checker',
  },
  alternates: { canonical: '/contrast-checker' },
};

export default function ContrastLayout({ children }: { children: React.ReactNode }) {
  return children;
}
