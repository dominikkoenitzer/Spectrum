import type { Metadata } from 'next';
import { LegalDoc, LegalSection, LegalList } from '@/components/layout/LegalDoc';
import { pageMetadata } from '@/lib/metadata';

export const metadata: Metadata = pageMetadata({
  title: 'Terms of Service',
  description:
    'The terms for using Spectrum, a free suite of color tools provided as is, with no account required.',
  path: '/terms',
});

export default function TermsPage() {
  return (
    <LegalDoc
      title="Terms of Service"
      updated="May 29, 2026"
      intro="Spectrum is a free set of color tools offered for everyone to use. By using the site you agree to these terms."
    >
      <LegalSection title="Using Spectrum">
        <p>
          Spectrum is provided free of charge, with no account required. You may use it for personal
          and commercial work alike: pick colors, build palettes and gradients, check contrast, and
          use the values you generate however you like.
        </p>
      </LegalSection>

      <LegalSection title="Acceptable use">
        <LegalList>
          <li>Don&apos;t attempt to disrupt, overload, or reverse-engineer the service.</li>
          <li>Don&apos;t use Spectrum to break the law or infringe others&apos; rights.</li>
          <li>Don&apos;t misrepresent Spectrum as your own product or remove its attribution where it applies.</li>
        </LegalList>
      </LegalSection>

      <LegalSection title="Color data & output">
        <p>
          Color values, names, conversions, and palettes are factual or generated data and are free
          for you to use without restriction. The <strong>Spectrum</strong> name, brand mark, and site
          design remain the property of their author.
        </p>
      </LegalSection>

      <LegalSection title="No warranty">
        <p>
          Spectrum is provided <strong>&quot;as is&quot;</strong> and <strong>&quot;as available&quot;</strong>,
          without warranties of any kind. Color conversions and contrast results are provided for
          convenience; for accessibility-critical work, always verify against the official WCAG
          specification.
        </p>
      </LegalSection>

      <LegalSection title="Limitation of liability">
        <p>
          To the fullest extent permitted by law, the author of Spectrum is not liable for any
          damages arising from your use of, or inability to use, the service.
        </p>
      </LegalSection>

      <LegalSection title="External links">
        <p>
          Spectrum links to third-party sites such as GitHub and PayPal. We are not responsible for
          the content or practices of those sites.
        </p>
      </LegalSection>

      <LegalSection title="Changes">
        <p>
          These terms may be updated from time to time. The date at the top reflects the latest
          revision, and continued use means you accept the current terms.
        </p>
      </LegalSection>

      <LegalSection title="Contact">
        <p>
          Questions about these terms?{' '}
          <a href="https://github.com/dominikkoenitzer/Spectrum/issues">open an issue on GitHub</a>.
        </p>
      </LegalSection>
    </LegalDoc>
  );
}
