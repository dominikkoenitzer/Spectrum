import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const BASE_URL = 'https://spectrumcolor.app';

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: "Spectrum — Free Color Tools for Designers & Developers",
    template: "%s | Spectrum"
  },
  description: "Free color tools that run entirely in your browser — pick colors from images, check WCAG contrast, simulate color blindness, generate palettes, build CSS gradients, and learn color theory. No account. No uploads.",
  keywords: [
    "color picker", "pick colors from image", "image color extractor", "hex color picker",
    "rgb color picker", "hsl color", "color format converter",
    "wcag contrast checker", "color accessibility checker", "aa aaa contrast ratio",
    "color blindness simulator", "protanopia", "deuteranopia", "tritanopia",
    "color palette generator", "color harmonies", "complementary colors",
    "css gradient maker", "linear gradient generator",
    "color theory", "color psychology", "color wheel",
    "color lookup", "color name finder", "free design tools",
    "color blind friendly palette", "color tools for designers", "color tools for developers"
  ],
  authors: [{ name: "Spectrum", url: BASE_URL }],
  creator: "Spectrum",
  publisher: "Spectrum",
  category: "Design Tools",
  applicationName: "Spectrum",
  generator: "Next.js",
  referrer: "origin-when-cross-origin",
  icons: {
    icon: [],
    apple: [],
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: BASE_URL,
    title: "Spectrum — Free Color Tools for Designers & Developers",
    description: "Pick colors from images, check WCAG contrast, simulate color blindness, generate palettes, and learn color theory. Free, private, runs in your browser.",
    siteName: "Spectrum",
  },
  twitter: {
    card: "summary_large_image",
    title: "Spectrum — Free Color Tools for Designers & Developers",
    description: "Pick colors from images, check WCAG contrast, simulate color blindness, generate palettes, and learn color theory. Free, no account needed.",
    creator: "@spectrum",
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
  themeColor: '#8b5cf6',
};

const websiteJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'Spectrum',
  url: BASE_URL,
  description: 'Free color tools for designers and developers — color picker, contrast checker, palette generator, and more.',
  potentialAction: {
    '@type': 'SearchAction',
    target: {
      '@type': 'EntryPoint',
      urlTemplate: `${BASE_URL}/color-lookup?q={search_term_string}`,
    },
    'query-input': 'required name=search_term_string',
  },
};

const webAppJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: 'Spectrum',
  url: BASE_URL,
  applicationCategory: 'DesignApplication',
  operatingSystem: 'Any',
  offers: {
    '@type': 'Offer',
    price: '0',
    priceCurrency: 'USD',
  },
  description: 'A free, privacy-first suite of color tools: image color picker, WCAG contrast checker, color blindness simulator, palette generator, CSS gradient builder, color format converter, and colour theory guide. Everything runs in your browser — no files are uploaded.',
  featureList: [
    'Image Color Picker — click any pixel to extract its color',
    'WCAG Contrast Checker — AA and AAA compliance testing',
    'Color Blindness Simulator — 7 vision types including protanopia and deuteranopia',
    'Color Palette Generator — harmonies, shades, tints, and psychology',
    'CSS Gradient Maker — linear and radial gradients with live preview',
    'Color Format Converter — HEX, RGB, HSL, HSV, CMYK, LAB, LCH, XYZ',
    'Color Library — browse 16,700+ named colors',
    'Colour Theory Guide — psychology, culture, and meaning of every major color',
  ],
};

const howToJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'HowTo',
  name: 'How to pick a color from an image',
  description: 'Extract the exact color from any photo — get HEX, RGB, HSL, and more in seconds.',
  tool: { '@type': 'HowToTool', name: 'Spectrum Color Picker' },
  step: [
    {
      '@type': 'HowToStep',
      position: 1,
      name: 'Open the color picker',
      text: 'Go to spectrumcolor.app. The color picker loads instantly — no account or install needed.',
    },
    {
      '@type': 'HowToStep',
      position: 2,
      name: 'Load your image',
      text: 'Drop your image onto the page, paste it from your clipboard (Ctrl+V / Cmd+V), or enter an image URL.',
    },
    {
      '@type': 'HowToStep',
      position: 3,
      name: 'Click any color',
      text: 'Click anywhere on your image to pick that exact color. The picker reads the pixel-level color value.',
    },
    {
      '@type': 'HowToStep',
      position: 4,
      name: 'Copy the color code',
      text: 'Copy the color in any format — HEX, RGB, HSL, CMYK, or 5 more. One click to copy each format.',
    },
  ],
};

const faqJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'Is Spectrum free to use?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes, Spectrum is completely free. There are no paid plans, no trial periods, and no features locked behind a paywall. All 8 tools are free for everyone, forever.',
      },
    },
    {
      '@type': 'Question',
      name: 'Do I need to create an account?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'No account is needed. Open the site and start using any tool immediately. Your color history is saved to your browser locally, not to a server.',
      },
    },
    {
      '@type': 'Question',
      name: 'Are my images uploaded to a server?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'No. Images are processed entirely in your browser using the HTML Canvas API. Your files never leave your device and are never sent to any server.',
      },
    },
    {
      '@type': 'Question',
      name: 'How do I extract colors from an image?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Upload an image (drag & drop, URL, or paste), then click anywhere on it to pick the color at that pixel. The color appears instantly in HEX, RGB, HSL, and more formats.',
      },
    },
    {
      '@type': 'Question',
      name: 'What is WCAG contrast ratio and why does it matter?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'WCAG contrast ratio measures how different two colors look against each other. A ratio of at least 4.5:1 is required for normal text (AA level) to be readable by people with low vision. Spectrum\'s contrast checker tests your color pairs against all WCAG 2.1 levels.',
      },
    },
    {
      '@type': 'Question',
      name: 'What is color blindness and how common is it?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Color blindness (color vision deficiency) is a reduced ability to distinguish certain colors. About 8% of men and 0.5% of women are color blind in some way. The most common types are red-green (protanopia, deuteranopia) and blue-yellow (tritanopia). Spectrum simulates 7 types of color vision.',
      },
    },
    {
      '@type': 'Question',
      name: 'What are complementary colors?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Complementary colors sit directly opposite each other on the color wheel — red and green, blue and orange, yellow and purple. Placed side by side, they create the highest possible contrast and make each color appear more vivid.',
      },
    },
    {
      '@type': 'Question',
      name: 'What color formats does Spectrum support?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Spectrum supports HEX, RGB, RGBA, HSL, HSLA, HSV, HWB, CMYK, LAB, LCH, XYZ, YUV, YCbCr, HSI, and several technical formats like integer, binary, and Base64. You can copy any format with a single click.',
      },
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="overflow-x-hidden">
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
          dangerouslySetInnerHTML={{ __html: JSON.stringify(howToJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
        />
      </head>
      <body
        className={`${inter.variable} font-sans antialiased min-h-screen flex flex-col overflow-x-hidden`}
      >
        {/* Background */}
        <div className="fixed inset-0 -z-10 overflow-hidden">
          <div className="absolute inset-0 bg-gray-950" />
          <div className="gradient-stripes" />
          <div className="absolute inset-0 bg-gradient-to-b from-gray-950/0 via-gray-950/50 to-gray-950" />
        </div>

        <Header />
        <main className="flex-1 relative">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
