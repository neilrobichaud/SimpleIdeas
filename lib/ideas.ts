import { neon } from "@neondatabase/serverless";

export type Idea = {
  id: string;
  text: string;
};

type IdeaRow = Idea;

let schemaReady: Promise<void> | undefined;

function getSql() {
  const connectionString = process.env.DATABASE_URL;
  if (!connectionString) {
    throw new Error("DATABASE_URL is not configured.");
  }

  return neon(connectionString);
}

async function ensureIdeasTable() {
  if (!schemaReady) {
    schemaReady = getSql()`
      CREATE TABLE IF NOT EXISTS ideas (
        id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
        text VARCHAR(240) NOT NULL,
        created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
      )
    `
      .then(() => undefined)
      .catch((error: unknown) => {
        schemaReady = undefined;
        throw error;
      });
  }

  await schemaReady;
}

export async function listIdeas(): Promise<Idea[]> {
  await ensureIdeasTable();
  const rows = await getSql()`
    SELECT id::text AS id, text
    FROM ideas
    ORDER BY created_at DESC
    LIMIT 100
  `;

  return rows as IdeaRow[];
}

export async function saveIdea(text: string): Promise<Idea> {
  await ensureIdeasTable();
  const [idea] = await getSql()`
    INSERT INTO ideas (text)
    VALUES (${text})
    RETURNING id::text AS id, text
  `;

  if (!idea) {
    throw new Error("The idea could not be saved.");
  }

  return idea as Idea;
}
