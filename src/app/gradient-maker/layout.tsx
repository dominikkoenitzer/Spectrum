import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Gradient Maker',
  description: 'Create beautiful CSS gradients with live preview and instant code generation.',
};

export default function GradientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
