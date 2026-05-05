# sylvester-arhin-mensah.github.io

Personal academic portfolio for **Sylvester Arhin Mensah** — PhD student in
Applied Mathematics &amp; Statistics at Mississippi State University, working
with Prof. Seongjai Kim on numerical methods, optimization, and image
processing.

Live site: <https://governor6191.github.io>

## Stack

Plain HTML, CSS, and JavaScript — no framework, no build step, no
dependencies. Five pages share a stylesheet (`shared.css`) and a small
chrome injector (`chrome.js`) that renders the nav and footer at page
load.

```
.
├── index.html       # Home
├── research.html    # Research catalog (4 active + 1 archived)
├── teaching.html    # Teaching record + mentoring
├── contact.html     # Email, GitHub, CV
├── shared.css       # Design tokens + chrome
├── chrome.js        # Nav and footer injection
└── cv/
    └── sylvester-arhin-mensah-cv.pdf
```

## Local development

The site is fully static. The simplest preview is to open `index.html`
directly in a browser. For a closer-to-production preview that handles
relative paths cleanly:

```sh
python -m http.server 8000
```

Then visit <http://localhost:8000>.

## Design notes

- **Typography:** Instrument Serif (display), Space Grotesk (body),
  JetBrains Mono (eyebrows, tags, metadata) — all loaded from Google
  Fonts.
- **Palette:** warm cream background, near-black ink, coral and blue as
  primary accents.
- **Accessibility:** focus-visible outlines, `prefers-reduced-motion`
  honored at both CSS and JS layers, AA-safe text-color variants for
  accent colors on cream, ARIA on the mobile nav and the LWR canvas.

## Credits

Site skeleton iterated with the Claude Agent SDK. Content and editorial
decisions are mine.
