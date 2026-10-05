# Small Ideas Club

A minimal Next.js app using TypeScript and the App Router.

## Getting started

Install Node.js 20.9 or later, copy `.env.example` to `.env.local`, and add a Neon Postgres connection string as `DATABASE_URL`. Then run:

```bash
pnpm install
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000). The landing page links to `/ideas`, where visitors can save short public ideas.

## Ideas storage

Ideas are stored in Neon Postgres. The `ideas` table is created automatically the first time the idea board is opened. Set `DATABASE_URL` in local development and in the Vercel project's Preview and Production environments.

Ideas are public and submissions are limited to 240 characters. The board currently displays the 100 most recent saved ideas. Do not submit private information.
