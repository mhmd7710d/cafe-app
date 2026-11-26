# How this app works, part by part

Good for explaining the project in an interview.

1. **index.html** - the only HTML page. `lang="ar" dir="rtl"` makes the page flow right-to-left. Loads two Arabic fonts (Amiri for headings, Cairo for body), links the PWA manifest, mounts React into `<div id="root">`.
2. **src/main.jsx** - the React code. All content is plain JS data: `areas` (8 places), `dishes` (4 menu cards), `feats` (features strip). The page is built with `.map()` over that data, so adding an area is one line, not new HTML. Icons are inline SVG (`Icon` component), so no image downloads.
3. **Section order** - hero, the 8 areas, features strip, story, menu cards, atmosphere panel, booking, footer. Areas come first because they are the core of the place.
4. **src/style.css** - flat design: cream base `#f7f2e9`, deep green `#1f3d2b`, small gold accent. Colors are CSS variables in `:root`. No gradients or glows. The photo overlays are one flat semi-transparent green. Mobile-first, with one `@media (min-width:700px)` block for bigger screens.
5. **Photos** - `public/img/*.jpg`, small stock photos (about 1.3 MB for the whole site), loaded with `loading="lazy"`. Credits are in CREDITS.md. Each area card has a photo slot ready for his own pictures.
6. **Reveal animation** - `Reveal` uses IntersectionObserver to add class `in` when a block enters the screen; CSS fades and slides it up. The hero text slides up on load. `prefers-reduced-motion` turns all motion off.
7. **PWA (installable)** - `public/manifest.webmanifest` + `public/sw.js` (service worker keeps a copy so pages open offline).
8. **vite.config.js** - `base:'./'` keeps asset paths relative so it works under a GitHub Pages sub-path.
9. **.github/workflows/deploy.yml** - every push to `main` builds and publishes `dist/` to GitHub Pages. Push = deploy.
10. **Booking form** - UI only for now; next step is sending the request to WhatsApp or a backend.

## Next steps
His real photos (areas, drinks, food), real menu and prices, final logo, address, phone and hours, WhatsApp booking button.
