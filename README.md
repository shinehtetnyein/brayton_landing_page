# Brayton Church — Website

A modern, animated landing page for Brayton Church, built with React + Vite.

## Features
- **Responsive navbar** with smooth-scroll menu links, a light/dark mode toggle, and an English ⇄ Myanmar language switch (all persisted to `localStorage`)
- **Animated hero banner** with a custom-built, animated stained-glass window illustration (SVG + Framer Motion)
- **Body sections**: pastor's welcome message, Baptist beliefs cards, weekly service times, upcoming events, recent sermons, a full-width scripture verse band, and a contact form
- **Footer** with quick links, service times, contact info, and social links
- Full bilingual copy (English / Myanmar, using the Padauk font for correct script rendering)
- Scroll-triggered reveal animations throughout, with `prefers-reduced-motion` respected

## Getting started

```bash
npm install
npm run dev       # start the dev server at http://localhost:5173
npm run build     # production build to /dist
npm run preview   # preview the production build
```

## Project structure

```
src/
  components/       # Navbar, Hero, Welcome, Beliefs, ServiceTimes,
                     # Events, Sermons, ScriptureBand, ContactForm, Footer,
                     # StainedGlass (signature hero illustration)
  context/           # ThemeContext (light/dark), LanguageContext (en/my)
  i18n/              # translations.js — all site copy in English & Myanmar
  styles/            # index.css (design tokens/base), components.css
  App.jsx
  main.jsx
```

## Customizing

- **Colors, type, spacing**: edit the CSS variables at the top of `src/styles/index.css`
- **Copy / translations**: edit `src/i18n/translations.js` — every string on the site lives here, in both `en` and `my`
- **Church details** (address, phone, service times, events, sermons): also in `translations.js`
