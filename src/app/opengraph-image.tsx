import { ogCard, OG_SIZE } from '@/lib/og';
import { OG_IMAGE } from '@/lib/site';

export const alt = OG_IMAGE.alt;
export const size = OG_SIZE;
export const contentType = OG_IMAGE.type;

export default function OpengraphImage() {
  return ogCard(
    'Free color tools that run in your browser.',
    'Pick · Convert · Contrast · Palettes · Gradients · Vision',
  );
}
