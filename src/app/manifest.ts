import { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Spectrum — Free Color Tools',
    short_name: 'Spectrum',
    description:
      'Free color tools that run entirely in your browser — pick colors from images, check WCAG contrast, simulate color blindness, generate palettes, and build CSS gradients.',
    start_url: '/',
    display: 'standalone',
    background_color: '#e8e6e2',
    theme_color: '#e8e6e2',
    icons: [
      {
        src: '/icon.svg',
        sizes: 'any',
        type: 'image/svg+xml',
      },
    ],
  };
}
