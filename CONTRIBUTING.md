# Contributing to DevTools

Thanks for helping! This is a front-end-only Vue 3 + Vite project — contributions are welcome in every form: bugs, features, docs, and new tools.

## Development setup

```bash
npm install
npm run dev      # start dev server at http://localhost:5173
npm run build    # type-safe production build
```

## Adding a new tool

Tools are just lazy-loaded routes. Two steps:

1. Create `src/views/<Name>.vue`
   - Root element: `class="tool-page"`.
   - Reuse the shared styles in `src/assets/main.css` (`.page-header`, `.action-bar`, `.io-panel`, `.io-textarea`, `.btn`, ...).
   - Pre-fill the input with a small sample so users can try it immediately.
   - Use `ref('')` for state; no external UI library required.
2. Register it in `src/utils/tools.js`
   - Add a `tools` entry: `{ id, name, category, path, desc, icon }`.
   - Add the route in `src/router/index.js` pointing at the new view.

## Code style

- Follow the existing patterns in sibling views (composition API, `<script setup>`).
- No TypeScript required; keep it plain Vue + JS per the rest of the codebase.
- Keep pages dependency-free unless a native browser API or an existing dependency covers it.

## Commit & PR

- Open a PR with a clear title and a short description of what/why.
- Make sure `npm run build` passes.
- One tool per PR whenever possible.

## Issue reporting

- Search existing issues first.
- Include: what tool, the input that caused it, expected vs actual result.