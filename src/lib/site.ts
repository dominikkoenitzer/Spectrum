/**
 * Single source of truth for the production origin.
 * Used by metadata (canonical/OG), sitemap.ts and robots.ts. Keep it the
 * domain the site is actually served from, or search engines will refuse to
 * index (a canonical pointing at a dead domain deindexes every page).
 *
 * Two static files hardcode this origin and must be updated by hand if it
 * ever changes: public/llms.txt and public/.well-known/security.txt.
 */
export const SITE_URL = 'https://spectrum.punds.ch';

export const SITE_NAME = 'Spectrum';

/**
 * The social card drawn by src/app/opengraph-image.tsx, which reads its `alt`
 * and `size` from here. Pages that set their own `openGraph` have to name the
 * image again: Next swaps the parent's whole object out rather than merging
 * it, so the one the file convention attached to the root would be lost.
 */
export const OG_IMAGE = {
  url: '/opengraph-image',
  width: 1200,
  height: 630,
  type: 'image/png',
  alt: 'Spectrum: free color tools for designers and developers',
};
