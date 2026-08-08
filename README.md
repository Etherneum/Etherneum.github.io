# Roll Anime to Fight — Unofficial Guide

A fan-made Next.js guide site for the Roblox game **Roll Anime to Fight**: unit
cards, two tier lists, and a full traits/mutations/progression tutorial. A
Discord button is pinned in the corner on every page.

## What's inside

- **`/`** — Minimal hero + a spotlight of top units.
- **`/cards`** — Every unit as a searchable, filterable card grid.
- **`/tierlist`** — Tabs between the **Wave Clear** and **Quality** tier lists.
- **`/tutorial`** — Trait/mutation tables, upgrade order, merging & cloning,
  gamepass priority.
- **`/credits`** — Placeholder credits list — edit `data/credits.ts`.
- A floating Discord icon (`components/DiscordButton.tsx`) is rendered in the
  root layout, so it's pinned in the corner on every route.
- `app/template.tsx` gives every route a quick fade/slide-in on navigation.

## Card art

Cards don't ship with real character art (there's no reliable source of
official assets to pull from, and anime character art is copyrighted), so
each card renders a small generated emblem, colored and shaped uniquely per
unit, as a placeholder.

To use real art for a unit:

1. Drop the image in `public/cards/` (e.g. `public/cards/sakuna-heian.png`).
2. In `data/units.ts`, add `image: "/cards/sakuna-heian.png"` to that unit's
   entry.

The card automatically switches to the real image; if the path 404s it falls
back to the generated emblem.

## Editing the data

All guide content lives in plain TypeScript under `data/`, so you can update
it without touching any component:

- `data/units.ts` — the master unit list (name, rarity, optional tag).
- `data/tierlists.ts` — the two tier lists, referencing unit names from
  `units.ts`.
- `data/traits.ts` — trait tiers, drop chances, and buffs.
- `data/mutations.ts` — mutation tiers and their damage/health buffs.
- `data/gamepasses.ts` — the gamepass purchase priority list.
- `data/rarity.ts` — the color/styling for each rarity, used everywhere else.
- `data/credits.ts` — the credits list shown on `/credits`.

> The unit names and rarities in `units.ts` were transcribed by hand from
> community tier-list screenshots, so a few stylized names may need a
> correction pass — search the file for the unit and fix the `rarity` or
> `name` field directly.

To change the Discord invite link, edit `DISCORD_URL` at the top of
`components/DiscordButton.tsx`.

## Run locally

```bash
npm install
npm run dev
```

Then open http://localhost:3000.

## Deploy to GitHub Pages

This repo is set up as a fully static export (`output: "export"` in
`next.config.js`), so it can be hosted directly on GitHub Pages with no
server. Card art lives in `public/cards/` (served as plain static files) and
`public/cards/list.json` is generated at build time by
`scripts/generate-cards-list.js`, replacing what used to be an API route.

**Option A — GitHub Actions (recommended, already set up)**

1. Push this repo to GitHub as `<your-username>.github.io` (or any repo).
2. In the repo settings, go to **Settings → Pages** and set **Source** to
   **GitHub Actions**.
3. Push to `main` — `.github/workflows/deploy.yml` will build the site
   (`npm ci && npm run build`) and publish the `out/` folder automatically.
4. Your site will be live at `https://<your-username>.github.io/` (or
   `https://<your-username>.github.io/<repo-name>/` for a project repo — see
   note below).

**Option B — build locally and push the output**

```bash
npm install
npm run build   # generates the static site in ./out
```

Then push the contents of `out/` to the branch GitHub Pages serves from
(e.g. copy `out/*` to a `gh-pages` branch, or to `main` if that's what Pages
is configured to serve).

**Project repo vs. user/org repo:** since this is meant to deploy as
`Etherneum.github.io` (a user page), it serves from the domain root and no
extra config is needed. If you instead deploy it as a *project* repo
(`github.com/you/some-repo`, served at `/some-repo/`), add
`basePath: "/some-repo"` (and optionally `assetPrefix`) to `next.config.js`
so internal links and assets resolve correctly.

## Tech

Next.js 16 (App Router) + TypeScript + Tailwind CSS, exported as a fully
static site (`next build` with `output: "export"`). No database, no server,
no environment variables required — everything is static data and static
files.
