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
  BookOpen,
  ArrowRight,
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
  { name: 'Theory', href: '/color-theory', icon: BookOpen, description: 'Learn colour theory' },
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
      <header className="sticky top-0 z-50 w-full border-b border-white/[0.06] bg-gray-950/75 backdrop-blur-2xl">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-14 sm:h-16 items-center justify-between gap-4">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2.5 flex-shrink-0 group">
              <div className="relative">
                <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-violet-500 to-fuchsia-600 flex items-center justify-center shadow-lg shadow-violet-500/25 transition-shadow group-hover:shadow-violet-500/40">
                  <Palette className="h-3.5 w-3.5 text-white" />
                </div>
              </div>
              <span className="text-base sm:text-lg font-bold text-white tracking-tight">
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
                      'relative flex items-center gap-1.5 rounded-lg px-2.5 py-2 text-sm font-medium transition-colors duration-150',
                      isActive
                        ? 'text-white'
                        : 'text-gray-500 hover:text-gray-200'
                    )}
                  >
                    {isActive && (
                      <span className="absolute inset-0 rounded-lg bg-white/[0.08] animate-scale-in" />
                    )}
                    <item.icon className={cn(
                      'relative h-3.5 w-3.5 transition-colors duration-150',
                      isActive ? 'text-violet-400' : 'text-gray-600 group-hover:text-gray-400',
                    )} />
                    <span className="relative">{item.name}</span>
                  </Link>
                );
              })}
            </nav>

            {/* Mobile menu button */}
            <button
              className="flex items-center justify-center h-9 w-9 rounded-xl text-gray-400 hover:text-white bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.07] lg:hidden transition-all duration-150 active:scale-95"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle menu"
            >
              <span className={cn('transition-all duration-200', mobileMenuOpen ? 'rotate-90' : 'rotate-0')}>
                {mobileMenuOpen ? <X className="h-4.5 w-4.5" /> : <Menu className="h-4.5 w-4.5" />}
              </span>
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
