import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contrast Checker',
  description: 'Check color contrast ratios for WCAG compliance. Ensure your designs meet accessibility standards.',
};

export default function ContrastLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
