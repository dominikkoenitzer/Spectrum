'use client';

import Link from 'next/link';
import { 
  Pipette, 
  Grid3X3, 
  Sparkles, 
  Search, 
  Contrast, 
  Eye, 
  Palette,
  Github,
  Twitter,
  Shield,
  Zap
} from 'lucide-react';

const tools = [
  { name: 'Picker', href: '/', icon: Pipette },
  { name: 'Browse', href: '/browse', icon: Grid3X3 },
  { name: 'Generator', href: '/color-generator', icon: Sparkles },
  { name: 'Lookup', href: '/color-lookup', icon: Search },
  { name: 'Contrast', href: '/contrast-checker', icon: Contrast },
  { name: 'Blindness', href: '/color-blindness', icon: Eye },
  { name: 'Gradients', href: '/gradient-maker', icon: Palette },
];

const features = [
  { icon: Shield, label: '100% Private' },
  { icon: Zap, label: 'Lightning Fast' },
];

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-white/5 bg-gray-950/50 backdrop-blur">
      {/* Main Footer Content */}
      <div className="mx-auto max-w-7xl px-4 py-8 sm:py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 gap-8 sm:grid-cols-4 lg:grid-cols-5">
          {/* Brand Section - Full width on mobile */}
          <div className="col-span-2 sm:col-span-4 lg:col-span-2 mb-4 lg:mb-0">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <span className="text-lg font-bold text-white">Spectrum</span>
            </Link>
            <p className="text-sm text-gray-400 leading-relaxed mb-4 max-w-xs">
              Professional color tools for designers and developers.
            </p>
            
            {/* Feature Badges - Horizontal on mobile */}
            <div className="flex flex-wrap gap-3">
              {features.map((feature) => (
                <div key={feature.label} className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10">
                  <feature.icon className="h-3.5 w-3.5 text-violet-400" />
                  <span className="text-xs text-gray-300 font-medium">{feature.label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Tools - 2 columns on mobile */}
          <div className="col-span-2 sm:col-span-2 lg:col-span-2">
            <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">
              Tools
            </h3>
            <div className="grid grid-cols-2 gap-x-4 gap-y-2">
              {tools.map((tool) => (
                <Link
                  key={tool.name}
                  href={tool.href}
                  className="flex items-center gap-2 py-1.5 text-sm text-gray-400 hover:text-white transition-colors"
                >
                  <tool.icon className="h-3.5 w-3.5" />
                  {tool.name}
                </Link>
              ))}
            </div>
          </div>

          {/* Connect */}
          <div className="col-span-2 sm:col-span-2 lg:col-span-1">
            <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">
              Connect
            </h3>
            <div className="flex gap-2">
              <a 
                href="https://github.com/dominikkoenitzer" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex h-9 w-9 items-center justify-center rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 transition-colors"
                aria-label="GitHub"
              >
                <Github className="h-4 w-4 text-gray-400" />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar removed to eliminate empty gap */}
    </footer>
  );
}
