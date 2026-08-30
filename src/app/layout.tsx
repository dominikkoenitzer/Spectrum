import type { Metadata, Viewport } from "next";
import { Hanken_Grotesk, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { SITE_URL } from "@/lib/site";

const hanken = Hanken_Grotesk({
  variable: "--font-hanken",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  display: "swap",
});

const BASE_URL = SITE_URL;

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: "Spectrum: Free Color Tools for Designers and Developers",
    template: "%s | Spectrum"
  },
  description: "Free color tools in your browser: pick colors from images, check WCAG contrast, simulate color blindness, build palettes and gradients. No uploads.",
  authors: [{ name: "dominikkoenitzer", url: "https://github.com/dominikkoenitzer" }],
  creator: "dominikkoenitzer",
  publisher: "Spectrum",
  category: "Design Tools",
  applicationName: "Spectrum",
  generator: "Next.js",
  referrer: "origin-when-cross-origin",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: BASE_URL,
    title: "Spectrum: Free Color Tools for Designers and Developers",
    description: "Pick colors from images, check WCAG contrast, simulate color blindness, generate palettes, and learn color theory. Free, private, runs in your browser.",
    siteName: "Spectrum",
  },
  twitter: {
    card: "summary_large_image",
    title: "Spectrum: Free Color Tools for Designers and Developers",
    description: "Pick colors from images, check WCAG contrast, simulate color blindness, generate palettes, and learn color theory. Free, no account needed.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  alternates: {
    canonical: BASE_URL,
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  themeColor: '#e8e6e2',
};

const websiteJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  '@id': `${BASE_URL}/#website`,
  name: 'Spectrum',
  url: BASE_URL,
  description: 'Free color tools for designers and developers: color picker, contrast checker, palette generator, and more.',
  publisher: { '@id': `${BASE_URL}/#organization` },
};

const webAppJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  '@id': `${BASE_URL}/#app`,
  name: 'Spectrum',
  url: BASE_URL,
  applicationCategory: 'DesignApplication',
  operatingSystem: 'Any',
  isAccessibleForFree: true,
  isPartOf: { '@id': `${BASE_URL}/#website` },
  offers: {
    '@type': 'Offer',
    price: '0',
    priceCurrency: 'USD',
  },
  description: 'A free, privacy-first suite of color tools: image color picker, WCAG contrast checker, color blindness simulator, palette generator with format conversion, CSS gradient builder, and color theory guide. Everything runs in your browser, and no files are uploaded.',
  featureList: [
    'Image color picker: click any pixel to extract its color',
    'WCAG contrast checker: AA and AAA compliance testing',
    'Color blindness simulator: 8 vision types including protanopia and deuteranopia',
    'Color palette generator: harmonies, shades, tints, format conversion (HEX, RGB, HSL, HSV, CMYK, and more), and psychology',
    'CSS gradient maker: linear, radial, and conic gradients with live preview',
    'Color library: browse hundreds of named colors and curated palettes',
    'Color theory guide: psychology, culture, and meaning of every major color',
  ],
};

const organizationJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  '@id': `${BASE_URL}/#organization`,
  name: 'Spectrum',
  url: BASE_URL,
  logo: `${BASE_URL}/icon.svg`,
  description: 'Free, privacy-first color tools for designers and developers.',
  sameAs: ['https://github.com/dominikkoenitzer'],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="overflow-x-hidden" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
      </head>
      <body
        className={`${hanken.variable} ${jetbrainsMono.variable} font-sans antialiased min-h-screen flex flex-col overflow-x-hidden bg-paper text-ink`}
        suppressHydrationWarning
      >
        <Header />
        <main className="flex-1 relative">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
