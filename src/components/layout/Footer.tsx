'use client';

import Link from 'next/link';
import { Github } from 'lucide-react';

const groups: { label: string; items: { name: string; href: string }[] }[] = [
  {
    label: 'Create',
    items: [
      { name: 'Picker', href: '/' },
      { name: 'Generator', href: '/color-generator' },
      { name: 'Gradients', href: '/gradient-maker' },
    ],
  },
  {
    label: 'Inspect',
    items: [
      { name: 'Browse', href: '/browse' },
      { name: 'Lookup', href: '/color-lookup' },
      { name: 'Contrast', href: '/contrast-checker' },
      { name: 'Vision', href: '/color-blindness' },
    ],
  },
  {
    label: 'Learn',
    items: [{ name: 'Theory', href: '/color-theory' }],
  },
];

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-line bg-paper">
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Link href="/" className="flex items-center gap-2.5">
              <span className="brand-mark h-[22px] w-[22px] rounded-[5px]" aria-hidden />
              <span className="font-display text-lg font-semibold tracking-tight text-ink">
                Spectrum
              </span>
            </Link>
            <p className="mt-3 max-w-xs text-sm leading-relaxed text-ink-2">
              A precise set of color tools for designers and developers. No account, no uploads — everything runs in your browser.
            </p>
          </div>

          {/* Tool groups */}
          {groups.map((group) => (
            <div key={group.label}>
              <h3 className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-ink-3">
                {group.label}
              </h3>
              <ul className="space-y-2">
                {group.items.map((item) => (
                  <li key={item.name}>
                    <Link
                      href={item.href}
                      className="text-sm text-ink-2 transition-colors hover:text-ink"
                    >
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="mt-12 flex flex-col items-start justify-between gap-4 border-t border-line pt-6 sm:flex-row sm:items-center">
          <p className="text-xs text-ink-3">© {currentYear} Spectrum · Private by design</p>
          <a
            href="https://github.com/dominikkoenitzer"
            target="_blank"
            rel="noopener noreferrer"
            className="flex h-9 w-9 items-center justify-center rounded-lg border border-line bg-surface text-ink-2 transition-colors hover:bg-surface-2 hover:text-ink"
            aria-label="GitHub"
          >
            <Github className="h-4 w-4" />
          </a>
        </div>
      </div>
    </footer>
  );
}
