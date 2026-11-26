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

## Animations (what, where, how)
All in `src/main.jsx` (logic/markup) and `src/style.css` (CSS, section comments `ANIM n`). No animation library, so the app stays small (about 70 KB gzipped).

1. **Scroll reveal** - `Reveal` component. IntersectionObserver adds class `in` when the card enters the screen; CSS `.rv` / `.rv.in` fades and slides it up.
2. **Counting numbers** - `Count` component. requestAnimationFrame counts 0 to N in 1.2 s with an ease-out curve when it becomes visible.
3. **Steaming cup** - `Cup` (inline SVG) + `.steam` / `@keyframes steam, bob`. Three steam lines fade up with delays; the cup floats gently.
4. **Rising coffee beans** - `Beans` + `.beans i` / `@keyframes rise`. 10 small beans drift up and spin, each with its own speed and delay.
5. **Hero title words** - `.hero h1 span` / `@keyframes up`. Words appear one after another via `animation-delay`.
6. **Pulsing booking button** - `.pulse` / `@keyframes pulse`. A soft gold ring repeats; buttons shrink slightly on tap.
7. **Scrolling strip** - `.marquee` / `@keyframes slide`. Endless text strip (list is duplicated so the loop is seamless).
8. **Card hover** - `.card:hover`, `@keyframes wig`. Card lifts, icon wiggles.
9. **Menu items** - `.menu li`. Items slide in one by one when you switch tab (`key={tab}` remounts the list so the animation replays).
10. **Nile waves** - `Waves` + `.waves svg` / `@keyframes wave`. Two wave layers slide at different speeds under the hero.

Accessibility: `@media (prefers-reduced-motion: reduce)` turns all motion off for users who ask their phone for that.
