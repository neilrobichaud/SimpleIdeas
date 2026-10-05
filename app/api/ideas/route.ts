import { NextResponse } from "next/server";
import { listIdeas, saveIdea } from "@/lib/ideas";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    return NextResponse.json({ ideas: await listIdeas() }, {
      headers: { "Cache-Control": "no-store" },
    });
  } catch (error) {
    console.error("Unable to load ideas.", error);
    return NextResponse.json({ error: "Ideas are unavailable right now." }, { status: 500 });
  }
}

export async function POST(request: Request) {
  let body: unknown;

  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Please send a valid idea." }, { status: 400 });
  }

  if (!body || typeof body !== "object" || !("text" in body) || typeof body.text !== "string") {
    return NextResponse.json({ error: "Please send a valid idea." }, { status: 400 });
  }

  const text = body.text.trim();
  if (text.length === 0 || text.length > 240) {
    return NextResponse.json({ error: "Ideas must be between 1 and 240 characters." }, { status: 400 });
  }

  try {
    const idea = await saveIdea(text);
    return NextResponse.json({ idea }, { status: 201 });
  } catch (error) {
    console.error("Unable to save idea.", error);
    return NextResponse.json({ error: "Your idea could not be saved. Please try again." }, { status: 500 });
  }
}
