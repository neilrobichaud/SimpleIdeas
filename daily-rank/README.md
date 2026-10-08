# Daily Rank

A small, static-friendly daily ranking game built with Next.js, React, and TypeScript. All 30 rankings are fictional demo data stored locally in `lib/puzzles.ts`; the app does not connect to a survey, database, or external API.

## Run locally

```bash
pnpm install
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000). Use `pnpm build` to create a production build and `pnpm start` to serve it.

## Seed dates

The seeded range is October 6–November 4, 2026. Each puzzle has an explicit date and a unique day number. To extend or refresh the schedule, edit the seed entries and the UTC start date mapping at the bottom of `lib/puzzles.ts`.

## Prototype behavior

- Reorder with drag and drop or the up/down controls.
- A submitted daily answer is locked in the browser and stored under that puzzle's date in `localStorage`.
- Scoring is isolated in `lib/scoring.ts`: exact match = 2, one place away = 1, otherwise 0.
- The results view compares the player's order with the fictional seeded ranking and creates a copyable emoji summary.
- Item thumbnails load keyword-matched photos from LoremFlickr. The service can be rate-limited; an illustrated local fallback keeps each item identifiable if a request fails.
