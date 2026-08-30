import type { Metadata } from 'next';
import { OG_IMAGE, SITE_NAME, SITE_URL } from './site';

type PageMetadata = {
  /** Page title without the site suffix. The root layout appends it. */
  title: string;
  description: string;
  /** Route path, starting with a slash. */
  path: string;
};

/**
 * Builds the metadata for a single page.
 *
 * Next replaces the whole `openGraph` and `twitter` object when a child
 * segment defines one, rather than merging field by field. A page that set
 * only a title and url there silently lost the image, type, locale and site
 * name it looked like it was inheriting, and kept the root's Twitter title.
 * Routing every page through this helper keeps each card complete and unique.
 */
export function pageMetadata({ title, description, path }: PageMetadata): Metadata {
  const titleWithSite = `${title} | ${SITE_NAME}`;

  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      type: 'website',
      locale: 'en_US',
      siteName: SITE_NAME,
      url: `${SITE_URL}${path}`,
      title: titleWithSite,
      description,
      images: [OG_IMAGE],
    },
    twitter: {
      card: 'summary_large_image',
      title: titleWithSite,
      description,
      images: [OG_IMAGE],
    },
  };
}
