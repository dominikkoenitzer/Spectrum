# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

Package manager is **Bun** (`bun.lock`; the version is pinned in `.bun-version`).

- `bun run dev` — start the dev server (Next.js + Turbopack)
- `bun run build` — production build. **Use this to verify changes**: it runs `tsc` and statically prerenders every route, so it catches type errors and SSR/prerender failures that the dev server won't.
- `bun run lint` / `bun run lint:fix` — ESLint (`eslint-config-next` core-web-vitals + typescript)
- `bun run type-check` — `tsc --noEmit`

There is **no test framework** configured (no test runner, no test files). Don't invent test commands.

Note: `bun run lint` currently reports a handful of **pre-existing** errors (a hook-ordering issue in `color-blindness/page.tsx`, `setState`-in-effect, one unescaped entity). These predate recent work and do **not** fail `bun run build`. Don't treat them as regressions from your change unless your diff is what introduced them.

## Stack

Next.js 16 (App Router, Turbopack) · React 19 · TypeScript (strict) · Tailwind CSS v4. Import alias `@/*` → `src/*`. Everything is client-side; there is no backend, database, or API layer.

## Architecture

**Three layers, cleanly separated:**

- `src/lib/` — framework-agnostic color logic. No React. This is where the real work lives: `colorUtils` (format conversion via the `colord` library + plugins), `contrastUtils` (WCAG), `colorBlindness` (CVD simulation matrices), `gradientUtils`, `canvasUtils` (pixel sampling), and `colorData.ts` (the static dataset: named colors, palettes, trending/brand colors, categories). `lib/index.ts` re-exports the public surface. Prefer extending these over inlining color math in components.
- `src/components/` — `ui/` (primitives: Button, Card, Input, Tabs, CopyButton, ColorSwatch, AnimateIn), `color-picker/` (the homepage picker: ImageUploader, ImageCanvas, ColorDisplay, ColorHistory, ClipboardPaste), `layout/` (Header, Footer, LegalDoc).
- `src/app/` — one folder per tool route. The homepage (`page.tsx`) is the image color picker; other routes are `/browse`, `/color-generator`, `/gradient-maker`, `/contrast-checker`, `/color-blindness`, `/color-theory`, plus `/privacy` and `/terms`.

**Page pattern — read this before editing a tool page:** each tool's interactive `page.tsx` is a `'use client'` component, but its SEO metadata lives in a sibling **server** `layout.tsx` (`export const metadata`) in the same folder. To change a page's `<title>`/description/canonical, edit its `layout.tsx`, not the page. The legal pages are the exception — they're server components that set `metadata` inline.

**Client-side data model:** images are processed entirely in the browser via the Canvas API and never uploaded. Picked-color history persists in `localStorage` under `spectrum-color-history`. Keep this privacy property intact — it's a core product promise (and is stated in `/privacy`).

## Design system (important — non-obvious)

The visual identity is defined centrally in `src/app/globals.css` via Tailwind v4's `@theme`, not in a JS config. Concept: **a neutral gallery frame — the chrome is paper + ink, and the only saturated color on screen is the color the user is working with.**

- **Tokens** (CSS vars → Tailwind utilities): `--paper` (greige `#e8e6e2` page bg), `--surface`, `--surface-2`, `--ink`/`--ink-2`/`--ink-3` (text), `--line`/`--line-strong` (hairline borders, translucent ink), `--positive`/`--negative` (functional only). Use the semantic utilities `bg-paper`, `bg-surface`, `text-ink`, `text-ink-2`, `border-line`, etc. — **do not** reach for raw Tailwind grays/`violet`/etc. Light theme only; no dark mode.
- **Fonts**: `font-display` and `font-sans` are both Hanken Grotesk; `font-mono` is JetBrains Mono (for all hex/RGB/color codes and micro-labels). Wired in `layout.tsx`.
- **Reusable design classes** in `globals.css`: `.label-caps` (mono uppercase micro-label / eyebrow), `.brand-mark` (the conic-gradient color-wheel logo), `.grid-texture`, `.card-lift`.
- **Rules to keep consistency**: solid `bg-ink text-paper` buttons (no gradient/violet buttons, no glows, no glass/backdrop-blur chrome, no gradient headlines, no pill-badge eyebrows). Headlines are big, left-aligned, `font-display`. Header active nav = ink underline. Saturated color is allowed only where it *is* content (swatches, palettes, gradient previews, color-theory hue blocks). Spelling is American "color" throughout.

Nav grouping (Header + Footer must stay in sync): **Create** = Picker/Generator/Gradients · **Inspect** = Contrast/Vision · **Learn** = Browse/Theory.

## SEO surfaces (keep in sync when adding/removing a route)

`src/app/sitemap.ts`, `public/robots.txt`, `public/llms.txt` (AI/LLM discovery), and the JSON-LD structured data + tool count in the root `layout.tsx`. The OG/social image is generated at the edge with `next/og` (Satori) in `src/app/opengraph-image.tsx`. The favicon is a **static** `src/app/icon.svg` — the conic color-wheel brand mark reproduced as fine SVG pie slices (see "Satori gotcha"). It's generated by a one-off node script, not hand-edited; regenerate it rather than tweaking paths by hand. `layout.tsx` has no `metadata.icons` so Next's file convention auto-wires `icon.svg`.

**Satori gotcha:** `next/og` does **not** support `conic-gradient` — that's why the favicon is a static SVG (pie slices) rather than an `ImageResponse`, even though it visually matches the conic `.brand-mark`. In any `ImageResponse` (e.g. the OG image), every multi-child element must have `display: flex`.

## Conventions

- In prose/answers, reference code with clickable markdown links (`[file.tsx](src/file.tsx)`), not backticks.
- `<html>`/`<body>` carry `suppressHydrationWarning` to absorb attribute injection from browser extensions (common for a color tool's users) — leave it in place.
