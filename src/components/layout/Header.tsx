'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';
import {
  Pipette,
  Search,
  Contrast,
  Eye,
  Palette,
  Menu,
  X,
  Sparkles,
  Grid3X3,
  ChevronRight,
} from 'lucide-react';
import { cn } from '@/lib/utils';

const navigation = [
  { name: 'Picker', href: '/', icon: Pipette, description: 'Extract colors from images' },
  { name: 'Browse', href: '/browse', icon: Grid3X3, description: 'Explore color collections' },
  { name: 'Generator', href: '/color-generator', icon: Sparkles, description: 'Generate color palettes' },
  { name: 'Lookup', href: '/color-lookup', icon: Search, description: 'Convert color formats' },
  { name: 'Contrast', href: '/contrast-checker', icon: Contrast, description: 'Check WCAG compliance' },
  { name: 'Blindness', href: '/color-blindness', icon: Eye, description: 'Simulate color vision' },
  { name: 'Gradients', href: '/gradient-maker', icon: Palette, description: 'Create CSS gradients' },
];

export function Header() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Close menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      // Prevent scroll on both html and body
      document.documentElement.style.overflow = 'hidden';
      document.body.style.overflow = 'hidden';
      // Prevent touch move on mobile
      document.body.style.position = 'fixed';
      document.body.style.width = '100%';
      document.body.style.top = `-${window.scrollY}px`;
    } else {
      // Get the scroll position before restoring
      const scrollY = document.body.style.top;
      document.documentElement.style.overflow = '';
      document.body.style.overflow = '';
      document.body.style.position = '';
      document.body.style.width = '';
      document.body.style.top = '';
      // Restore scroll position
      if (scrollY) {
        window.scrollTo(0, parseInt(scrollY || '0') * -1);
      }
    }
    return () => {
      document.documentElement.style.overflow = '';
      document.body.style.overflow = '';
      document.body.style.position = '';
      document.body.style.width = '';
      document.body.style.top = '';
    };
  }, [mobileMenuOpen]);

  return (
    <>
      <header className="sticky top-0 z-50 w-full border-b border-white/5 bg-gray-950/80 backdrop-blur-xl supports-[backdrop-filter]:bg-gray-950/60">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-14 sm:h-16 items-center justify-between gap-4">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2 group flex-shrink-0">
              <div className="flex h-8 w-8 sm:h-9 sm:w-9 items-center justify-center rounded-xl bg-gradient-to-br from-violet-500 to-fuchsia-600 shadow-lg shadow-violet-500/25 group-hover:shadow-violet-500/40 transition-all">
                <Pipette className="h-4 w-4 sm:h-5 sm:w-5 text-white" />
              </div>
              <span className="text-lg sm:text-xl font-bold text-white">
                Spectrum
              </span>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex lg:items-center lg:gap-0.5">
              {navigation.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={cn(
                      'flex items-center gap-1.5 rounded-lg px-2.5 py-2 text-sm font-medium transition-all',
                      isActive
                        ? 'bg-white/10 text-white'
                        : 'text-gray-400 hover:bg-white/5 hover:text-white'
                    )}
                  >
                    <item.icon className={cn(
                      "h-4 w-4",
                      isActive ? "text-violet-400" : ""
                    )} />
                    {item.name}
                  </Link>
                );
              })}
            </nav>

            {/* Mobile menu button */}
            <button
              className="flex items-center justify-center h-10 w-10 rounded-xl text-white bg-white/5 hover:bg-white/10 lg:hidden transition-colors active:scale-95"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Navigation Overlay */}
      <div
        className={cn(
          "fixed inset-0 z-40 lg:hidden transition-opacity duration-300",
          mobileMenuOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        )}
      >
        {/* Backdrop */}
        <div 
          className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          onClick={() => setMobileMenuOpen(false)}
        />
        
        {/* Menu panel */}
        <div
          className={cn(
            "absolute top-14 sm:top-16 left-0 right-0 bottom-0 bg-gray-950/95 backdrop-blur-xl overflow-y-auto transition-transform duration-300 ease-out",
            mobileMenuOpen ? "translate-y-0" : "-translate-y-4"
          )}
        >
          <div className="p-4 pb-8">
            {/* Current page indicator */}
            <div className="mb-4 px-3 py-2 rounded-lg bg-violet-500/10 border border-violet-500/20">
              <p className="text-xs text-violet-400 font-medium">Currently viewing</p>
              <p className="text-sm text-white font-semibold">
                {navigation.find(n => n.href === pathname)?.name || 'Home'}
              </p>
            </div>

            {/* Navigation grid */}
            <nav className="space-y-2">
              {navigation.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={cn(
                      'flex items-center gap-4 rounded-2xl p-4 transition-all active:scale-[0.98]',
                      isActive
                        ? 'bg-gradient-to-r from-violet-500/20 to-fuchsia-500/20 border border-violet-500/30'
                        : 'bg-white/5 border border-white/5 hover:bg-white/10'
                    )}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <div className={cn(
                      "flex h-12 w-12 items-center justify-center rounded-xl transition-colors",
                      isActive
                        ? "bg-gradient-to-br from-violet-500 to-fuchsia-600"
                        : "bg-white/10"
                    )}>
                      <item.icon className={cn(
                        "h-6 w-6",
                        isActive ? "text-white" : "text-gray-300"
                      )} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className={cn(
                        "text-base font-semibold",
                        isActive ? "text-white" : "text-gray-200"
                      )}>
                        {item.name}
                      </p>
                      <p className="text-sm text-gray-500 truncate">
                        {item.description}
                      </p>
                    </div>
                    <ChevronRight className={cn(
                      "h-5 w-5 flex-shrink-0",
                      isActive ? "text-violet-400" : "text-gray-600"
                    )} />
                  </Link>
                );
              })}
            </nav>

            {/* Footer info */}
            <div className="mt-8 pt-6 border-t border-white/10">
              <p className="text-center text-xs text-gray-500">
                100% private • All processing in browser
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
