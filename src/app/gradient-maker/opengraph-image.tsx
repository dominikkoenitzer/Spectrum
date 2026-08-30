import { ogCard, OG_SIZE } from '@/lib/og';

export const alt = 'Spectrum CSS Gradient Maker';
export const size = OG_SIZE;
export const contentType = 'image/png';

export default function OpengraphImage() {
  return ogCard('CSS gradients, live.', 'Linear, radial and conic, with copyable CSS');
}
