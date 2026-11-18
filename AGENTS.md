<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes. APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev`. Verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change. Committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

## Project notes

- `public/` contains only `public/images`, and every image sits directly inside it (flat, no subfolders) with lowercase kebab-case names. Add new images there.
- Use Next.js `app/` file conventions for fixed-path files (for example `src/app/robots.ts`, `src/app/sitemap.ts`, `src/app/manifest.ts`, `src/app/opengraph-image.png`, `src/app/apple-icon.png`) instead of putting them in `public/`.
