# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

Static HTML/CSS portfolio for Clara Beltzung, a first-year BUT Mesures Physiques student at IUT Nord Franche-Comté. No build system — all files are deployed as-is.

## Deploying

```bash
./deploy.sh
```

Syncs files to the VPS at `51.75.17.128` via rsync over SSH (user `nathouworks`). Excludes `.git`, `.gitignore`, `deploy.sh`, `.DS_Store`. Requires SSH access to the server.

## Architecture

**Two-tier entry point:** `index.html` is a public "coming soon" page (robots: noindex). It has a discreet `aperçu →` link that leads to `accueil.html`, the real homepage. Do not add visible navigation to `index.html`.

**Pages:**
- `accueil.html` — hero + "À propos" section (contains placeholder `[À remplir par Clara]` blocks)
- `formation.html` — academic background
- `competences.html` — skills, organized by BUT competency blocks (BC nav sub-menu)
- `saes.html` — SAÉ (Situations d'Apprentissage et d'Évaluation) projects
- `contact.html` — contact form / info
- `mentions-legales.html` — legal notices
- `404.html` — custom error page
- `index.html` — public "coming soon" splash; no nav, no JS assets

**Design system** (defined inline in each page's `tailwind.config`):
| Token | Value |
|-------|-------|
| bg | `#F7F6F2` (warm off-white) |
| ink | `#181818` (near-black) |
| muted | `#6B6B6B` |
| accent | `#1E3A5F` (navy blue) |
| light | `#D6E4F0` |
| tag | `#EEF4FB` |
| border | `#DDD8CE` |
| font-display | Fraunces (serif, headings) |
| font-body | DM Sans |
| font-mono | DM Mono (labels, nav, tags) |

**Navigation** is duplicated verbatim in every page (fixed top bar + mobile burger overlay). When updating nav links, update all pages. The active link gets `style="color:#1E3A5F"` in addition to the `active` class.

**Tailwind** is loaded from CDN (`cdn.tailwindcss.com`) — no local install or build step needed.

**`_shared.html`** is a copy-paste reference (not a server-side include) containing the canonical `<head>` content: Tailwind CDN + config, Google Fonts imports, and shared CSS classes (`nav-link`, `section-label`, `comp-card`, `sae-card`, `fade-up`). Use it when creating a new page.

**JS assets** — both go before `</body>` with `defer` in all real pages (everything except `index.html`):
- `assets/cursor.js` — custom precision crosshair cursor with lerp-smoothed ring animation; hides itself on touch devices
- `assets/transitions.js` — CSS opacity fade-out on internal link clicks, fade-in on `DOMContentLoaded`; currently only wired into `404.html` — should be present in all pages

**Assets** referenced but not yet committed: `assets/cv-clara-beltzung.pdf`, `assets/photo-clara.jpg`.

## Content placeholders

`accueil.html` contains comment-delimited `[À remplir par Clara]` blocks for her personal bio paragraphs. These are intentional — do not remove the comment guides until Clara fills in the content.
