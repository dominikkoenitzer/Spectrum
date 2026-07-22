/**
 * Single source of truth for the production origin.
 * Used by metadata (canonical/OG), sitemap.ts, and robots.ts — keep it the
 * domain the site is actually served from, or search engines will refuse to
 * index (a canonical pointing at a dead domain deindexes every page).
 */
export const SITE_URL = 'https://spectrum.punds.ch';

export const SITE_NAME = 'Spectrum';
