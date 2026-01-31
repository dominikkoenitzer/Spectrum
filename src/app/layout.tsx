import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Spectrum - Color Picker & Tools",
  description: "Extract colors from images, check contrast, simulate color blindness, and create beautiful gradients. All processing happens in your browser.",
  keywords: ["color picker", "hex color", "rgb", "hsl", "contrast checker", "color blindness", "gradient maker"],
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
