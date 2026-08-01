# Edie — Agency Landing

A concept landing page for a web studio: services, portfolio grid and team, on one page, with no dependencies and no build step.

[![Live demo](https://img.shields.io/badge/demo-edie.wib.digital-2ea44f)](https://edie.wib.digital)
[![Hire me on Fiverr](https://img.shields.io/badge/Hire%20me%20on-Fiverr-1DBF73?style=for-the-badge&logo=fiverr&logoColor=white)](https://www.fiverr.com/pablonietop)
![Dependencies](https://img.shields.io/badge/dependencies-0-brightgreen)
![Build step](https://img.shields.io/badge/build%20step-none-lightgrey)
![First load](https://img.shields.io/badge/first%20load-39%20KB-blue)

## Description

An agency page has to answer two questions before it earns a second look: what
the studio makes, and whether it has made anything before. This page answers
them in that order and stops there.

Services are three blocks — UI/UX design, front end, back end — under the claim
that good design means good business. Below them the portfolio grid runs four
pieces of work: a smart home dashboard, a booking system, an onboarding
application and a product homepage. Each is a category, a name and an image,
not a case study, which keeps the grid scannable.

The page is deliberately small. Everything above the fold — markup, three
stylesheets, the script and the hero image — comes to 39 KB. The whole page,
every byte including all thirteen images, is 168 KB. There is no
JavaScript framework, no CSS framework and nothing to install.

## Tech stack

| Layer | Technology | Role in project |
|---|---|---|
| Markup | HTML5 | `index.html` and `404.html`, hand-written, no templating |
| Styling | CSS3 | Custom properties, Grid and Flexbox across three files |
| Scripting | Vanilla JavaScript | One classic script, `assets/js/main.js`, ~70 lines |
| Fonts | Google Fonts | Heebo for the wordmark, Poppins for everything else |

## Design system

All design decisions live as custom properties in `assets/css/base.css`: an
eight-step spacing scale, a seven-step type scale, four radii and one
transition duration. The palette is derived from the colours the page already
used.

Two values were added for contrast. The brand blue `#2d9cdb` measures 2.79:1
against white and the brand red `#eb5757` measures 3.48:1 — both below the
4.5:1 WCAG AA threshold for text. `--color-accent-strong` (`#1a6e9e`, 5.56:1)
and `--color-red-strong` (`#c0392b`, 5.44:1) are the only values used on text.
The originals stay in use for fills and decorative icons, where the text
threshold does not apply.

## Accessibility

- Every text node on the page meets 4.5:1 against its inherited background.
- Every interactive target is at least 44×44px, except inline links inside prose.
- Focus is never removed, only restyled, through a single `:focus-visible` rule.
- The mobile menu tracks `aria-expanded`, swaps its `aria-label` between
  `Open menu` and `Close menu`, locks background scroll, closes on Escape
  returning focus to the toggle, and closes when a link is followed.
- A skip link precedes the header.
- One `h1` per page, with no gaps in the heading hierarchy.

## Project structure

```
.
├── index.html                    # The whole site: hero, story, services, work, team
├── 404.html                      # Error page, noindex, links back to index
├── robots.txt
├── sitemap.xml
├── assets/
│   ├── css/
│   │   ├── base.css              # Tokens, reset, typography, focus, skip link
│   │   ├── layout.css            # Containers, header, sections, footer, breakpoints
│   │   └── components.css        # Buttons, service cards, work items, menu, social
│   ├── js/
│   │   └── main.js               # Mobile menu. The only behaviour on the site.
│   └── img/
│       ├── logo/                 # favicon-32.png, apple-touch-icon.png
│       ├── content/              # Hero, four work images, three team portraits
│       └── icons/                # Three service glyphs, two social marks
└── docs/
    ├── auditoria.md              # State of the project before the reorganisation
    └── cambios.md                # Change log, grouped by phase
```

## Running it locally

The page has no build step and no dependencies. Opening the file works:

```bash
git clone https://github.com/pabloWIB/Edie-Agency-Landing.git
cd Edie-Agency-Landing
```

Then open `index.html` in a browser. The script is a classic script rather than
an ES module precisely so this works — ES modules are blocked by CORS over the
`file://` protocol.

To serve it over HTTP instead, any static server will do:

```bash
python -m http.server 4173
```

Then visit `http://127.0.0.1:4173/`.

## Deployment

Deployed on Vercel at [edie.wib.digital](https://edie.wib.digital). Static:
upload the repository root as-is, with no build command and no output
directory. No hosting configuration file is needed — `404.html` at the root is
picked up automatically.

Absolute URLs are hardcoded in four places, all pointing at
`https://edie.wib.digital`: the canonical link, `og:url`, `og:image` and the
sitemap. Change those if the site moves to another domain.

## Known limitations

- **No contact route.** Both newsletter forms were removed because neither was
  connected to anything: they discarded the address and reloaded the page.
  Adding one back means wiring a real endpoint, or replacing the CTA with a
  real `mailto:` address.
- **The hero image is heavily compressed.** `hero-team-workshop.jpg` is 9 KB
  for 1332×354px, and JPEG blocking is visible at full width. It needs a
  higher-quality source, not a re-encode of this one.
- **The team portraits are unattributed.** Three stock photographs stand in for
  a team whose members are not named anywhere.

## Author

**Pablo Nieto Pérez** — [wib.digital](https://wib.digital)
GitHub: [@pabloWIB](https://github.com/pabloWIB)

## Hire me

I build **custom internal tools, CRMs and dashboards** for small teams, and
**conversion-focused websites** for businesses.

- [Custom internal tool, CRM or dashboard](https://www.fiverr.com/pablonietop/build-a-custom-internal-app-for-your-business) — from $45
- [Conversion-focused website](https://www.fiverr.com/pablonietop/convert-your-landing-page-design-to-code) — from $80
- [All my services on Fiverr](https://www.fiverr.com/pablonietop)
- [wib.digital](https://wib.digital)
