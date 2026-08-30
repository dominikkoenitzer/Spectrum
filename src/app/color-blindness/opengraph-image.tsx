import { ogCard, OG_SIZE } from '@/lib/og';

export const alt = 'Spectrum Color Blindness Simulator';
export const size = OG_SIZE;
export const contentType = 'image/png';

export default function OpengraphImage() {
  return ogCard('Color through different eyes.', '8 vision types, simulated in your browser');
}
