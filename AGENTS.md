# DevTools Project Agent Guide

Local guide for this repository (GitHub: why19970628/devtools). Read this and `README.md` before working in the project.

## Project overview

- A front-end-only developer toolbox: Vue 3 + Vite + vue-router, **132 tools across 12 categories**.
- Design goal: UI & behavior are aligned with [devtools.cn](https://www.devtools.cn) — tool pages fill the whole content area (no `max-width` centering), input/output panels grow to fill the remaining window height, inputs are pre-filled with sample data, `Ctrl+K` global search, time-based light/dark theme, and local favorites.
- 100% client-side: no backend, no uploads, no environment variables, no secrets.

## Environment

- Node.js >= 18 (see `engines` in `package.json`).
- Router uses `createWebHistory`. Static hosting such as GitHub Pages requires switching to `createWebHashHistory` (or an SPA-fallback `404.html`) before enabling a Pages deploy.

## Common commands

- `npm run dev` — dev server (default http://localhost:5173)
- `npm run build` — production build into `dist/`
- `npm run preview` — preview the production build
- No test framework. Verification = a passing `npm run build` plus headless-Chrome checks (below).
- Build note: the pre-existing CSS-minify warnings `Unexpected ".1xx"…".5xx"` come from HttpStatus-related scoped selectors; they are not introduced by your changes and can be ignored.

## Adding a new tool

1. Create `src/views/<Name>.vue`:
   - Root element: `class="tool-page"`.
   - Reuse the shared styles in `src/assets/main.css` (`.page-header`, `.action-bar`, `.io-panel`, `.io-box`, `.io-textarea`, `.btn`, …).
   - Do **not** center with `max-width` — tool pages must fill the content area.
   - Always pre-fill the input with a small sample so users can try the tool immediately (see existing views, e.g. `JsonFormat.vue`, `Base64.vue`).
2. Register it in `src/utils/tools.js` (`tools` array): `{ id, name, category, path, desc, icon }`.
3. Add a lazy route in `src/router/index.js` pointing at the new view.

## Code conventions

- Composition API + `<script setup>`, no TypeScript, no new dependencies; prefer native browser APIs and existing `src/utils` helpers.
- Theme: `src/composables/useTheme.js`, plus the boot script in `index.html` (localStorage keys `devtools_theme`, `devtools_theme_manual`).
- Favorites: `src/utils/favorites.js` (localStorage). Shared category state: `src/utils/nav.js`.
- Layout is composed in `src/App.vue` (header bar, sidebar, horizontal nav shown only on Home, footer, search/menu/settings modals).
- Prefer one fix/change in shared CSS or a shared component over per-page edits.

## Verification

- Run `npm run build` after every change.
- For render/layout/size checks use headless Chrome (`--dump-dom`, or a local `--remote-debugging-port` + CDP for measurements). Scratch scripts live under `/var/folders/gv/533ns5f53j15dfzpt_50nn5c0000gn/T/opencode/dtc/`.
- Reference implementations: `src/views/JsonFormat.vue` (sample data + `onMounted` auto-format + full-height `io-panel`), `src/views/Base64.vue`.

## Docs & assets

- Project docs: `README.md` (English, default), `README_zh-CN.md`, `LICENSE`, `CONTRIBUTING.md`, `SECURITY.md`.
- The READMEs reference `logo.svg` and image files under `screenshots/` — regenerate the screenshots when the UI changes visibly.
- Shared workspace-level docs live in `code/docs/` (see the workspace-root `AGENTS.md`).
- Never record secrets, tokens, or credentials in docs.

## Git & release

- Default branch: `main`. CI is `.github/workflows/ci.yml` (`npm ci && npm run build` on push/PR).
- Commit messages: short conventional prefixes in the current repo style (`feat:`, `fix:`, `docs:`, `design:`).
- Do not push without an explicit user request.