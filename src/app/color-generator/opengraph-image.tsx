import { ogCard, OG_SIZE } from '@/lib/og';

export const alt = 'Spectrum Color Palette Generator';
export const size = OG_SIZE;
export const contentType = 'image/png';

export default function OpengraphImage() {
  return ogCard('Palettes from a single color.', 'Harmonies, shades, tints and format conversion');
}
