# White Willow Website

Local website project for **White Willow** by **Kuwa Kuwitch Studio**.

This project is separate from the Unity game project (`Witch Game/`). Do not place website files inside the Unity project and do not import website files into Unity.

## Status

- Local redesign implementation (not deployed or published).
- Public pages: `/` (Home), `/contact` (Contact), `/privacy` (Privacy Policy).
- Privacy Policy is a draft and requires owner/legal review before final publication.
- Some product, release, and platform details remain intentionally limited to verified information.

## Tech stack

- Next.js (App Router)
- React
- TypeScript
- Tailwind CSS
- Motion for React (`motion`)
- GSAP (used by installed React Bits components)
- Lenis (`lenis`) for smooth scrolling

## Project structure

```text
white willow web/
  licenses/                 # Font licenses/notices and stock image attribution
  public/
    images/                 # All website images, flat (lowercase kebab-case names)
  src/
    app/
      contact/page.tsx
      globals.css
      layout.tsx
      not-found.tsx
      page.tsx              # Home
      privacy/page.tsx
    components/
      AnimatedContent.tsx   # React Bits component (installed/adapted)
      FadeContent.tsx       # React Bits component (installed)
      Noise.tsx             # React Bits component (integrated)
      Noise.css             # React Bits component styles
      ScrollReveal.tsx      # React Bits component (installed)
      container.tsx
      site-footer.tsx
      site-header.tsx
      smooth-scroll.tsx     # Lenis smooth scrolling provider
    lib/
      site.ts
      utils.ts
  components.json           # shadcn/registry config including React Bits registry
  opencode.json             # Project-level shadcn MCP configuration
```

## Setup

```bash
npm install
```

## Development

```bash
npm run dev
```

Open `http://localhost:3000`.

## Production build

```bash
npm run build
```

Optional local start after build:

```bash
npm run start
```

## Lint

```bash
npm run lint
```

## Design notes

- Visual direction: medieval storybook and herbalist manuscript aesthetic on a light paper/bone-white background with subtle texture.
- Typography: Charm Regular (section and display headings) and Source Serif 4 (body), loaded via `next/font/google`.
- Palette: warm paper/ivory tones with brown, dark brown, near-black, and black text/interactive accents; CTA backgrounds use brown tones with paper-colored labels for contrast.
- Background texture: fixed React Bits Noise overlay (subtle static grain) layered over the paper background.
- Layout: editorial, manuscript-inspired compositions with open spacing and typography; no card-based UI, no rounded corners, and no section separator lines on the Home page.
- Header: transparent and blended with the page/paper background; top navigation contains only centered Home, Contact, and Privacy Policy links.
- Hero: fills the visible screen (`100svh`) with navigation offset accounted for; key art and bottom fade behavior are preserved with readability overlays for text/controls.
- Scrolling: Lenis smooth scrolling integrated for natural motion, with reduced-motion handling and native scroll fallback.
- Animation: React Bits FadeContent, AnimatedContent, and ScrollReveal are used for visible entrance/scroll reveals, and selected Home story illustrations use a combined AnimatedContent + paper-crumple visual; all motion is reduced/disabled appropriately for `prefers-reduced-motion`.
- Home page includes the White Willow narrative and gameplay concept/features as a single visual story.
- Contact and Privacy Policy pages are image-free.

## React Bits

React Bits registry/MCP setup is configured in this project (`components.json` registry `@react-bits`, and `opencode.json` created by `shadcn mcp init --client opencode`).

Genuine React Bits components installed and used:
- `@react-bits/FadeContent-TS-TW` -> `src/components/FadeContent.tsx`
- `@react-bits/AnimatedContent-TS-TW` -> `src/components/AnimatedContent.tsx`
- `@react-bits/Noise-JS-CSS` -> `src/components/Noise.tsx`, `src/components/Noise.css` (fixed subtle background grain overlay, typed for this project)
- `@react-bits/ScrollReveal-TS-TW` -> `src/components/ScrollReveal.tsx`

Home uses React Bits entrance and scroll animations: `FadeContent` for mount/scroll fades, `AnimatedContent` for positional entrance reveals, and `ScrollReveal` for story/narrative text reveals. Selective story illustration figures use `AnimatedContent` with a built-in paper-crumple/unfold visual. Animations are tuned to be visible while remaining tasteful, and all motion/content visibility respects `prefers-reduced-motion` and JS-failure resilience.

`SpotlightCard` (previously installed) was removed during the editorial refinement because it contributed to card-like UI. The Contact page continues to use genuine React Bits animation components (`FadeContent`, `AnimatedContent`) in a non-card layout. `FadeContent`, `AnimatedContent`, and `ScrollReveal` include small local resilience adjustments for Lenis/GSAP compatibility and progressive visibility.

## Fonts and licenses

- Font license texts and notices: `licenses/README.md`, `licenses/OFL-Charm.txt`, `licenses/OFL-SourceSerif4.txt`.
- Apple Chancery and Hoefler Text are not used or copied into this website.

## Images and attribution

- Game-related images live in `public/images/`: `studio-icon.png`, `main-menu-background.png`, `gameover-witch-burned.jpg`, `guidebook.png`.
- Decorative stock/reference images and their sources/licenses are recorded in `licenses/STOCK-IMAGES.md`.
- No unlicensed images or artwork from other games were added.

## Known limitations

- Privacy Policy is a draft and not legally finalized.
- Game Center, diagnostics/analytics runtime behavior, final age rating, legal entity details, and other release/compliance items may require verification and updates.
- Temporary TestFlight access link (if present) is testing-only, not a public release or App Store download link.

## Boundaries

- No Unity project changes.
- No App Store Connect changes.
- No deployment, publishing, domain/DNS changes, commits, or pushes.
- No unverified legal or marketing claims.
