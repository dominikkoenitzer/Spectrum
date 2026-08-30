import { ogCard, OG_SIZE } from '@/lib/og';

export const alt = 'Spectrum Color Theory Guide';
export const size = OG_SIZE;
export const contentType = 'image/png';

export default function OpengraphImage() {
  return ogCard('The science of color.', 'Psychology, culture and use of every major hue');
}
