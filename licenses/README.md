# Font licenses and notices

This folder contains license texts and notices for fonts used by the White Willow website.

## Fonts in use

- **Charm** (Regular, section headings and display headings)
  - Source: Google Fonts (`https://fonts.google.com/specimen/Charm`)
  - Upstream: Charm Project Authors (`https://github.com/cadsondemak/charm`)
  - License: SIL Open Font License 1.1
  - License file: `OFL-Charm.txt`

- **Source Serif 4** (body text)
  - Source: Google Fonts (`https://fonts.google.com/specimen/Source+Serif+4`)
  - Upstream: Adobe / Source Serif 4 project
  - License: SIL Open Font License 1.1
  - License file: `OFL-SourceSerif4.txt`

## Implementation notes

- Fonts are loaded via `next/font/google` in `src/app/layout.tsx`, which self-hosts font assets for the Next.js build output.
- Do not copy Apple Chancery or Hoefler Text font files from the Unity project into this website.
- If the site is publicly distributed, verify that distributed build artifacts and any additional usage contexts remain compatible with the SIL OFL 1.1 terms and retain required notices.

## Previous font records

- `OFL-IMFellEnglish.txt` is retained from an earlier implementation stage. IM Fell English was previously used for section/display headings and is not currently used by the website.
- `OFL-CormorantGaramond.txt` is retained from an earlier implementation stage. Cormorant Garamond is not currently used by the redesigned website.
