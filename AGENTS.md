# Portfolio Igor Branco - Agent Guide

## Project Type
Static HTML/CSS/JS portfolio site. No build tools, no package.json, no bundler.

## Structure
```
portifolio/          ← site root (deployed to Netlify)
  index.html         ← single-page app, all sections here
  404.html           ← custom Netlify 404 page
  assets/
    css/style.css    ← all styles (single file)
    js/script.js     ← scroll handlers, modal, animations, back-to-top
    js/msg.js        ← Netlify Forms submission logic
    img/             ← pixel art and images
    cv/cv.pdf        ← user's CV for download
```

## Deployment
- **Netlify** auto-deploys from GitHub pushes (no CLI needed locally)
- Repo: `igordesouzabranco/portfolio-igor-branco`
- Netlify Forms configured via `data-netlify="true"` in `index.html`
- Contact form uses `fetch()` in `msg.js` (not a page-reload form)

## Content Language
All user-facing text is **Portuguese (pt-BR)**. Never write English in HTML/CSS/JS content.

## Key Conventions

### Animations
- All CSS animations are toggleable via a footer button (localStorage persistence)
- `prefers-reduced-motion` media query also disables animations
- Color animation on hero name is **cyclic** (green→blue→purple→red→yellow→green), 2.5s linear — NOT ping-pong

### Project Cards & Modals
- Each card has a `data-project` attribute linking to `projectData` object in `script.js`
- Modal open/close: click card or button → modal appears; click overlay/press ESC → modal closes
- When adding/modifying projects, update **both** `index.html` (card HTML) and `script.js` (`projectData` object)

### Experience Timeline
- Timeline items use class `.timeline-item` with `.timeline-content` inside
- Styles are in `style.css` under `.timeline` section

### Performance Rules
- Only font loaded: **Fira Code** (Google Fonts, preloaded)
- All JS uses `defer`
- Single scroll listener with `requestAnimationFrame` (do not add more scroll listeners)
- Do not add unused font imports

### GitHub CLI
- Located at: `C:\Program Files\GitHub CLI\gh.exe`
- Authenticated as `igordesouzabranco`
- Use `& "C:\Program Files\GitHub CLI\gh.exe" repo list` for repo queries

## Content Source
- User's real projects are pinned in the portfolio (repos: calcIMC, Origo API, DjangoCad)
- CV data in `assets/cv/cv.pdf` is the source of truth for experience/skills
- User provided pixel art image `igorpixel.png`
