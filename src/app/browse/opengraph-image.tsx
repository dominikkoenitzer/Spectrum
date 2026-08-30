import { ogCard, OG_SIZE } from '@/lib/og';

export const alt = 'Spectrum Color Library';
export const size = OG_SIZE;
export const contentType = 'image/png';

export default function OpengraphImage() {
  return ogCard('Named colors, ready to copy.', 'Hex, RGB and HSL for every swatch and palette');
}
