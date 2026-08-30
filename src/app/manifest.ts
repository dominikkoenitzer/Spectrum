import { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Spectrum: Free Color Tools',
    short_name: 'Spectrum',
    description:
      'Free color tools that run entirely in your browser. Pick colors from images, check WCAG contrast, simulate color blindness, generate palettes, and build CSS gradients.',
    id: '/',
    scope: '/',
    start_url: '/',
    display: 'standalone',
    background_color: '#e8e6e2',
    theme_color: '#e8e6e2',
    categories: ['design', 'developer tools', 'utilities'],
    icons: [
      {
        src: '/icon.svg',
        sizes: 'any',
        type: 'image/svg+xml',
      },
      {
        src: '/icon-192.png',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        src: '/icon-512.png',
        sizes: '512x512',
        type: 'image/png',
      },
      {
        src: '/icon-maskable-512.png',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'maskable',
      },
    ],
  };
}
