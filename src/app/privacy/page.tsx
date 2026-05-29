import type { Metadata } from 'next';
import { LegalDoc, LegalSection, LegalList } from '@/components/layout/LegalDoc';

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description:
    'Spectrum is privacy-first: no accounts, no tracking, no uploads. Images and colors are processed entirely in your browser and never sent to a server.',
  alternates: { canonical: 'https://spectrumcolor.app/privacy' },
};

export default function PrivacyPage() {
  return (
    <LegalDoc
      title="Privacy Policy"
      updated="May 29, 2026"
      intro="Spectrum is built to need as little of your data as possible. Every tool runs entirely in your browser — your images and colors never touch a server."
    >
      <LegalSection title="The short version">
        <p>
          No accounts. No tracking. No uploads. The images you open and the colors you pick are
          processed locally on your device and are never transmitted to us or anyone else.
        </p>
      </LegalSection>

      <LegalSection title="What we don't collect">
        <LegalList>
          <li>No names, emails, or accounts — Spectrum has no sign-up.</li>
          <li>No image uploads — images are read with the browser&apos;s Canvas API and stay on your device.</li>
          <li>No advertising identifiers, fingerprinting, or behavioral profiles.</li>
        </LegalList>
      </LegalSection>

      <LegalSection title="What's stored on your device">
        <p>
          To make the picker useful, your recent <strong>color history</strong> is saved in your
          browser&apos;s <strong>localStorage</strong> (under the key <code>spectrum-color-history</code>).
          This data lives only in your browser, is never sent anywhere, and you can clear it at any
          time from within the tool or by clearing your browser storage.
        </p>
      </LegalSection>

      <LegalSection title="Cookies & analytics">
        <p>
          Spectrum sets no cookies and runs no third-party analytics or tracking scripts. Fonts are
          self-hosted, so loading a page does not call out to a font CDN.
        </p>
      </LegalSection>

      <LegalSection title="Hosting & external links">
        <p>
          Like any website, our hosting provider may process standard, non-identifying request logs
          (such as IP address and user-agent) for security and reliability. Spectrum also links to
          external sites — for example <strong>GitHub</strong> and <strong>PayPal</strong> — which have
          their own privacy policies that govern your use of them.
        </p>
      </LegalSection>

      <LegalSection title="Children's privacy">
        <p>
          Spectrum is a general-audience tool and does not knowingly collect personal information from
          anyone, including children.
        </p>
      </LegalSection>

      <LegalSection title="Changes to this policy">
        <p>
          If this policy changes, we&apos;ll update the date at the top of this page. Continued use of
          Spectrum after a change means you accept the updated policy.
        </p>
      </LegalSection>

      <LegalSection title="Contact">
        <p>
          Questions about privacy? Email{' '}
          <a href="mailto:dominikkoenitzer@users.noreply.github.com">dominikkoenitzer@users.noreply.github.com</a>.
        </p>
      </LegalSection>
    </LegalDoc>
  );
}
