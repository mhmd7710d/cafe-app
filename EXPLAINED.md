# How this app works, part by part

Good for explaining the project in an interview.

1. **index.html** - the only HTML page. Sets `lang="ar" dir="rtl"` so the whole page flows right-to-left, loads the Cairo Arabic font, links the PWA manifest, and mounts React into `<div id="root">`.
2. **src/main.jsx** - the React code. `createRoot(...).render(<App/>)` starts the app. All content lives here as plain JS data: `areas` (8 places) and `menu` (3 categories). The page is built by looping over that data with `.map()`, so adding a hall or a dish is one new line, not new HTML.
3. **useState** - the menu tabs use `const [tab,setTab]=useState(...)`. Clicking a tab calls `setTab`, React re-renders and shows that category. This is the core React idea: UI = function of state.
4. **src/style.css** - styling. Colors are CSS variables in `:root` (`--olive`, `--bg`, `--gold`), so changing the whole theme means editing 5 lines. Cards use CSS Grid with `repeat(auto-fill,minmax(210px,1fr))` so they fit any screen without media queries.
5. **Sticky nav + anchors** - the top bar is `position:sticky`; links like `#menu` jump to the section with that `id`.
6. **PWA (installable)** - `public/manifest.webmanifest` gives name, colors and icon so the phone offers "Add to Home Screen" and opens it full-screen. `public/sw.js` is a service worker: it fetches from the network and keeps a copy, so pages still open offline.
7. **vite.config.js** - `base:'./'` makes asset paths relative so it works under a GitHub Pages sub-path.
8. **.github/workflows/deploy.yml** - on every push to `main`, GitHub builds the project and publishes `dist/` to GitHub Pages. Push = deploy.
9. **Booking form** - UI only for now; next step is sending the request to WhatsApp or a backend.

## Next steps
Real photos, real menu and prices, cafe name/logo, address and hours, WhatsApp booking button, per-area detail pages.
