# AGENTS.md

## Project

React 19 + Vite 7 music showcase site (single package, no monorepo). JavaScript/JSX only — no TypeScript (`jsconfig.json` not `tsconfig.json`). Tailwind CSS v4 via `@tailwindcss/vite` plugin.

## Commands

```bash
npm run dev        # local dev server (localhost only)
npm run start      # dev server exposed on local network (--host)
npm run build      # production build — base URL is hardcoded (see below)
npm run lint       # eslint . (flat config, covers *.js and *.jsx)
npm run preview    # preview production build locally
```

No test runner, no typecheck command, no formatter configured.

## Build quirk: hardcoded base URL

`npm run build` runs `vite build --base=http://indulagorogaludni.go.ro`. If building for a different host, override inline:

```bash
npx vite build --base=/
```

## Environment variables

Copy `.env.sample` to `.env.local` before running dev. All vars must be `VITE_`-prefixed to be exposed to the client:

```
VITE_PUBLIC_URL
VITE_FILES_URL
VITE_COVERS_PATH
VITE_API_URL
VITE_PLAYLIST_JSON
```

Dev overrides live in `.env.dev`; local overrides in `.env.local`.

## PHP backend (audio streaming)

```bash
docker compose up   # starts php:8.2-apache on port 8080
```

Mounts `./server` to `/var/www/html`. The `stream.php` / `streamer.php` files serve audio. Docker is only needed when developing features that hit the streaming endpoints.

## SVG imports

All `*.svg` files are wired through `vite-plugin-svgr` and imported as React components (default export). Do not import SVGs as raw URLs unless you bypass the plugin.

## Path alias

`@` resolves to `/src`. Use `@/components/Foo` etc.

## Deploy

Manual deploy via `deploy.sh`:
1. `git pull origin main`
2. `npm ci`
3. `npm run build`
4. `sudo cp server/stream.php /var/www/html/`
5. `sudo rsync -a dist/ /var/www/html/`

`ftp-deploy` is installed as a devDependency but has no npm script wired to it.

## Source layout

```
src/
  App.jsx, main.jsx
  components/   # reusable UI
  sections/     # full-page scroll sections
  context/      # React context providers
  hooks/        # custom hooks
  utils/        # helpers
  styles/       # global CSS
server/         # PHP streaming backend + .htaccess
public/         # static assets served at root
```

## No CI, no tests

There are no GitHub Actions workflows and no test framework installed.
