import { SITE_URL } from './site';

type PageJsonLdInput = {
  /** The tool's display name; also the breadcrumb leaf. */
  name: string;
  description: string;
  /** Route path, starting with a slash. */
  path: string;
  /** Interactive tools get a WebApplication node; content pages only the breadcrumb. */
  application?: boolean;
};

/**
 * Structured data for a single route: a WebApplication node (each tool is a
 * distinct free web app, which is what surfaces it in AI answers to queries
 * like "free WCAG contrast checker") plus a BreadcrumbList mirroring the real
 * nav hierarchy. Cross-linked by @id to the site-level graph in the root
 * layout.
 */
export function pageJsonLd({ name, description, path, application = true }: PageJsonLdInput) {
  const url = `${SITE_URL}${path}`;
  const breadcrumb = {
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Spectrum', item: SITE_URL },
      { '@type': 'ListItem', position: 2, name, item: url },
    ],
  };
  const app = {
    '@type': 'WebApplication',
    '@id': `${url}#app`,
    name,
    url,
    description,
    applicationCategory: 'DesignApplication',
    operatingSystem: 'Any',
    isAccessibleForFree: true,
    isPartOf: { '@id': `${SITE_URL}/#website` },
  };
  return {
    '@context': 'https://schema.org',
    '@graph': application ? [app, breadcrumb] : [breadcrumb],
  };
}
