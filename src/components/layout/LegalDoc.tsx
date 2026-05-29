import type { ReactNode } from 'react';

export function LegalDoc({
  title,
  updated,
  intro,
  children,
}: {
  title: string;
  updated: string;
  intro: string;
  children: ReactNode;
}) {
  return (
    <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
      <p className="label-caps mb-3 text-ink-3">Legal</p>
      <h1 className="font-display text-4xl font-extrabold leading-[0.98] tracking-[-0.03em] text-ink sm:text-5xl">
        {title}
      </h1>
      <p className="mt-4 font-mono text-xs text-ink-3">Last updated {updated}</p>
      <p className="mt-6 text-lg leading-relaxed text-ink-2">{intro}</p>
      <div className="mt-10 space-y-9">{children}</div>
    </div>
  );
}

export function LegalSection({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section>
      <h2 className="mb-2.5 font-display text-xl font-bold tracking-tight text-ink">{title}</h2>
      <div className="space-y-3 text-[15px] leading-relaxed text-ink-2 [&_a]:font-medium [&_a]:text-ink [&_a]:underline [&_a]:underline-offset-2 [&_strong]:font-semibold [&_strong]:text-ink">
        {children}
      </div>
    </section>
  );
}

export function LegalList({ children }: { children: ReactNode }) {
  return (
    <ul className="ml-1 space-y-2 [&>li]:relative [&>li]:pl-5 [&>li]:before:absolute [&>li]:before:left-0 [&>li]:before:text-ink-3 [&>li]:before:content-['—']">
      {children}
    </ul>
  );
}
