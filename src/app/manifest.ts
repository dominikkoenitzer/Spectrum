import { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Spectrum - Advanced Color Tools',
    short_name: 'Spectrum',
    description: 'Extract colors from images, check contrast, simulate color blindness, and create beautiful gradients.',
    start_url: '/',
    display: 'standalone',
    background_color: '#fafaf8',
    theme_color: '#fafaf8',
  };
}
