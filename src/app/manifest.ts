import { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Spectrum - Advanced Color Tools',
    short_name: 'Spectrum',
    description: 'Extract colors from images, check contrast, simulate color blindness, and create beautiful gradients.',
    start_url: '/',
    display: 'standalone',
    background_color: '#030712',
    theme_color: '#8b5cf6',
    icons: [
      {
        src: '/icon-192.png',
        sizes: '192x192',
        type: 'image/png',
        purpose: 'any',
      },
      {
        src: '/icon-512.png',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'any',
      },
    ],
  };
}
