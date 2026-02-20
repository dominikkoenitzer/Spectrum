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

export const metadata: Metadata = {
  metadataBase: new URL('https://spectrum.example.com'),
  title: {
    default: "Spectrum - Advanced Color Tools & Picker",
    template: "%s | Spectrum"
  },
  description: "Extract colors from images, check contrast ratios, simulate color blindness, and create beautiful gradients. Privacy-focused - all processing happens in your browser.",
  keywords: ["color picker", "hex color", "rgb", "hsl", "contrast checker", "color blindness simulator", "gradient maker", "color palette", "wcag contrast", "accessibility"],
  authors: [{ name: "Spectrum" }],
  creator: "Spectrum",
  icons: {
    icon: [],
    apple: [],
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "/",
    title: "Spectrum - Advanced Color Tools & Picker",
    description: "Extract colors from images, check contrast, simulate color blindness, and create beautiful gradients. All processing happens in your browser.",
    siteName: "Spectrum",
  },
  twitter: {
    card: "summary_large_image",
    title: "Spectrum - Advanced Color Tools & Picker",
    description: "Extract colors from images, check contrast, simulate color blindness, and create beautiful gradients.",
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
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="overflow-x-hidden">
      <body
        className={`${inter.variable} font-sans antialiased min-h-screen flex flex-col overflow-x-hidden`}
      >
        {/* Gradient background stripes */}
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
