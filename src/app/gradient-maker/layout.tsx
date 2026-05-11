import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'CSS Gradient Maker — Linear, Radial & Conic Gradients',
  description: 'Create beautiful CSS gradients with live preview. Build linear, radial, and conic gradients with multiple color stops. Export ready-to-use CSS code instantly.',
  keywords: ['css gradient generator', 'gradient maker', 'linear gradient', 'radial gradient', 'conic gradient', 'css gradient tool', 'background gradient', 'gradient css code'],
  openGraph: {
    title: 'CSS Gradient Maker — Linear, Radial & Conic Gradients | Spectrum',
    description: 'Build linear, radial, and conic CSS gradients with live preview and instant CSS code export.',
    url: '/gradient-maker',
  },
  alternates: { canonical: '/gradient-maker' },
};

export default function GradientLayout({ children }: { children: React.ReactNode }) {
  return children;
}
