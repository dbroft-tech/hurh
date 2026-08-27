# AGENTS.md

Static website for Triumphant Ministry church. No build tools, no package manager.

## Quick Start

- Preview: open `index.html` in a browser (or use a local server like `npx serve`)
- No lint, test, or build commands

## Structure

- `index.html` - homepage
- `about.html`, `ministries.html`, `give.html`, `contact.html` - inner pages
- `assets/css/styles.css` - single stylesheet with CSS variables for theming
- `assets/js/script.js` - navbar, mobile menu, scroll effects, contact form handling
- `assets/images/` - image assets

## Conventions

- CSS variables defined in `:root` (colors, fonts, shadows, spacing)
- Responsive breakpoints: 1024px, 768px, 480px
- Google Fonts: Playfair Display (headings), Inter (body)
- Contact form is client-side only (simulated submission with `setTimeout`)
