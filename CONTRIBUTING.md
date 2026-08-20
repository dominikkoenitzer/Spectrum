# Contributing

Thanks for taking an interest in **Spectrum**. This guide covers local setup, the conventions the codebase follows, and how to get a change merged.

## Local setup

Requires [bun](https://bun.sh).

```bash
bun install
bun run dev        # http://localhost:3000
```

## Before you open a pull request

Run the same gate that CI runs — all four must pass:

```bash
bun run lint
bun run type-check
bun run test
bun run build
```

## Code style

- **Next.js 16 App Router with Turbopack.** `params` is a `Promise` and must be awaited in pages and `generateMetadata`.
- **Tailwind v4, configured in CSS.** The gallery palette lives in `src/app/globals.css` as custom properties: `--paper`, `--surface`, `--surface-2` for ground, and a three-step ink scale (`--ink`, `--ink-2`, `--ink-3`) for text. Use the tokens, not literal values.
- **Every text colour clears 4.5:1 on the surface it sits on.** The ink scale is spaced for that, and `--positive` / `--negative` are dark enough to be read as text on their own 5–15% tint rather than picked as fills. A colour tool that fails its own contrast checker is not shippable — run the change past `/contrast-checker` before proposing it.
- **Colour maths goes in `src/lib/`,** pure and unit-tested (`color.test.ts`). Components render; they do not compute.

## Commits and pull requests

- Keep commits focused, with a short imperative subject.
- Describe what you changed and how you verified it.

## Reporting bugs and requesting features

Use the issue forms under **New issue**. For anything security-sensitive, do **not** open a public issue — follow [SECURITY.md](SECURITY.md) instead.
