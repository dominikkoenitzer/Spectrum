import type { Metadata } from 'next';
import { pageMetadata } from '@/lib/metadata';

export const metadata: Metadata = pageMetadata({
  title: 'WCAG Contrast Checker: Accessibility Color Testing',
  description:
    'Check color contrast ratios against WCAG 2.1 AA and AAA. Scores for text, large text, and UI components, with accessible alternatives when a pair fails.',
  path: '/contrast-checker',
});

export default function ContrastLayout({ children }: { children: React.ReactNode }) {
  return children;
}
