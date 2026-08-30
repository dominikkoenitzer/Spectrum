import { ogCard, OG_SIZE } from '@/lib/og';

export const alt = 'Spectrum WCAG Contrast Checker';
export const size = OG_SIZE;
export const contentType = 'image/png';

export default function OpengraphImage() {
  return ogCard('WCAG contrast, checked.', 'AA and AAA for text, large text and UI components');
}
