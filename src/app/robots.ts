import { MetadataRoute } from 'next';
import { SITE_URL } from '@/lib/site';

/**
 * Everyone is welcome, including AI/LLM crawlers (we want Spectrum to be
 * citable). A single wildcard group covers them all: robots.txt has no
 * extra-allow semantics, and a named per-bot group would fully replace the
 * wildcard group for that bot, silently exempting it from any Disallow added
 * here later.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [{ userAgent: '*', allow: '/' }],
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
