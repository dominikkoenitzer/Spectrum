'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';
import {
  Pipette,
  Contrast,
  Eye,
  Palette,
  Menu,
  X,
  Sparkles,
  Grid3X3,
  BookOpen,
  ArrowUpRight,
} from 'lucide-react';
import { cn } from '@/lib/utils';

type NavItem = {
  name: string;
  href: string;
  icon: typeof Pipette;
  description: string;
};

const groups: { label: string; items: NavItem[] }[] = [
  {
    label: 'Create',
    items: [
      { name: 'Picker', href: '/', icon: Pipette, description: 'Extract colors from any image' },
      { name: 'Generator', href: '/color-generator', icon: Sparkles, description: 'Build palettes from one color' },
      { name: 'Gradients', href: '/gradient-maker', icon: Palette, description: 'Design CSS gradients visually' },
    ],
  },
  {
    label: 'Inspect',
    items: [
      { name: 'Contrast', href: '/contrast-checker', icon: Contrast, description: 'Check WCAG readability' },
      { name: 'Vision', href: '/color-blindness', icon: Eye, description: 'Simulate color blindness' },
    ],
  },
  {
    label: 'Learn',
    items: [
      { name: 'Browse', href: '/browse', icon: Grid3X3, description: 'Explore 16,700+ named colors' },
      { name: 'Theory', href: '/color-theory', icon: BookOpen, description: 'Color psychology & meaning' },
    ],
  },
];

const allItems = groups.flatMap((g) => g.items);

export function Header() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [prevPathname, setPrevPathname] = useState(pathname);

  // Close the menu on navigation, adjusted during render instead of in an
  // effect so the closed state paints in the same pass as the new route.
  if (prevPathname !== pathname) {
    setPrevPathname(pathname);
    setMobileMenuOpen(false);
  }

  useEffect(() => {
    if (mobileMenuOpen) {
      document.documentElement.style.overflow = 'hidden';
      document.body.style.overflow = 'hidden';
      document.body.style.position = 'fixed';
      document.body.style.width = '100%';
      document.body.style.top = `-${window.scrollY}px`;
    } else {
      const scrollY = document.body.style.top;
      document.documentElement.style.overflow = '';
      document.body.style.overflow = '';
      document.body.style.position = '';
      document.body.style.width = '';
      document.body.style.top = '';
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
      <header className="sticky top-0 z-50 w-full border-b border-line bg-paper/85 backdrop-blur-sm">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between gap-4">
            {/* Wordmark */}
            <Link href="/" className="flex items-center gap-2.5 flex-shrink-0">
              <span className="brand-mark h-[22px] w-[22px] rounded-[5px]" aria-hidden />
              <span className="font-display text-lg font-semibold tracking-tight text-ink">
                Spectrum
              </span>
            </Link>

            {/* Desktop Navigation — flat, grouped by hairline dividers */}
            <nav className="hidden lg:flex lg:items-center lg:gap-1.5">
              {groups.map((group, gi) => (
                <div key={group.label} className="flex items-center gap-1.5">
                  {gi > 0 && <span aria-hidden className="mx-2 h-3.5 w-px bg-line-strong" />}
                  {group.items.map((item) => {
                    const isActive = pathname === item.href;
                    return (
                      <Link
                        key={item.name}
                        href={item.href}
                        className={cn(
                          'relative px-2 py-1.5 text-sm transition-colors',
                          isActive ? 'font-semibold text-ink' : 'font-medium text-ink-2 hover:text-ink',
                        )}
                      >
                        {item.name}
                        {isActive && <span className="absolute inset-x-2 -bottom-0.5 h-0.5 rounded-full bg-ink" />}
                      </Link>
                    );
                  })}
                </div>
              ))}
            </nav>

            {/* GitHub */}
            <a
              href="https://github.com/dominikkoenitzer"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden lg:inline-flex items-center gap-1 text-sm font-medium text-ink-2 transition-colors hover:text-ink"
            >
              GitHub
              <ArrowUpRight className="h-3.5 w-3.5" />
            </a>

            {/* Mobile menu button */}
            <button
              className="flex h-9 w-9 items-center justify-center rounded-lg border border-line bg-surface text-ink transition-colors hover:bg-surface-2 lg:hidden active:scale-95"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle menu"
              aria-expanded={mobileMenuOpen}
              aria-controls="mobile-menu"
            >
              {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Navigation Overlay */}
      <div
        id="mobile-menu"
        className={cn(
          'fixed inset-0 z-40 lg:hidden transition-opacity duration-200',
          mobileMenuOpen ? 'opacity-100' : 'pointer-events-none opacity-0',
        )}
      >
        <div
          className="absolute inset-0 bg-ink/20 backdrop-blur-sm"
          onClick={() => setMobileMenuOpen(false)}
        />

        <div
          className={cn(
            'absolute left-0 right-0 top-16 bottom-0 overflow-y-auto bg-paper transition-transform duration-200 ease-out',
            mobileMenuOpen ? 'translate-y-0' : '-translate-y-2',
          )}
        >
          <div className="mx-auto max-w-6xl px-4 py-6 pb-10">
            {groups.map((group) => (
              <div key={group.label} className="mb-7">
                <p className="label-caps mb-3 text-ink-3">{group.label}</p>
                <nav className="grid gap-2">
                  {group.items.map((item) => {
                    const isActive = pathname === item.href;
                    return (
                      <Link
                        key={item.name}
                        href={item.href}
                        className={cn(
                          'flex items-center gap-3.5 rounded-xl border p-3.5 transition-colors active:scale-[0.99]',
                          isActive ? 'border-ink bg-surface' : 'border-line bg-surface hover:bg-surface-2',
                        )}
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        <span className="grid h-10 w-10 flex-shrink-0 place-items-center rounded-lg border border-line bg-paper">
                          <item.icon className="h-5 w-5 text-ink" strokeWidth={1.75} />
                        </span>
                        <span className="min-w-0">
                          <span className="block text-base font-medium text-ink">{item.name}</span>
                          <span className="block text-sm text-ink-2">{item.description}</span>
                        </span>
                      </Link>
                    );
                  })}
                </nav>
              </div>
            ))}

            <a
              href="https://github.com/dominikkoenitzer"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-1.5 rounded-xl border border-line bg-surface py-3.5 text-sm font-medium text-ink"
            >
              GitHub
              <ArrowUpRight className="h-4 w-4" />
            </a>

            <p className="mt-6 border-t border-line pt-5 text-center text-xs text-ink-3">
              {allItems.length} tools · everything runs in your browser
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
