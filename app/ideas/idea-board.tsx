"use client";

import { FormEvent, useState } from "react";
import type { Idea } from "@/lib/ideas";

const starterIdeas: Idea[] = [
  { id: "starter-1", text: "A neighbourhood tool library, so you only buy the drill you actually need." },
  { id: "starter-2", text: "A tiny newsletter that tells you one good thing happening near you this weekend." },
  { id: "starter-3", text: "A bench with a little sign: sit here if you feel like talking." },
];

export default function IdeaBoard({ initialIdeas }: { initialIdeas: Idea[] }) {
  const [ideas, setIdeas] = useState(initialIdeas);
  const [draft, setDraft] = useState("");
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);
  const visibleIdeas = [...ideas, ...starterIdeas];

  async function saveIdea(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const text = draft.trim();
    if (!text || saving) return;

    setSaving(true);
    setError("");

    try {
      const response = await fetch("/api/ideas", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text }),
      });
      const result = await response.json();

      if (!response.ok) {
        setError(result.error ?? "Your idea could not be saved. Please try again.");
        return;
      }

      setIdeas((current) => [result.idea as Idea, ...current]);
      setDraft("");
    } catch {
      setError("Your idea could not be saved. Please try again.");
    } finally {
      setSaving(false);
    }
  }

  return (
    <>
      <section className="composer" aria-labelledby="composer-title">
        <div className="composer-heading"><span className="step-number">01</span><label id="composer-title" htmlFor="idea">Your idea, in a sentence or two</label></div>
        <form onSubmit={saveIdea}>
          <textarea id="idea" value={draft} onChange={(event) => setDraft(event.target.value)} maxLength={240} placeholder="I wish there was a way to…" rows={3} />
          <div className="composer-bottom"><span>{draft.length}/240</span><button className="button button-primary" type="submit" disabled={!draft.trim() || saving}>{saving ? "Saving…" : "Add to the board"} <span aria-hidden="true">→</span></button></div>
        </form>
        <p className="local-note" aria-live="polite">{error || "Ideas are saved and visible to everyone. Please don’t include private information."}</p>
      </section>

      <section className="board" aria-labelledby="board-title">
        <div className="board-heading"><div><p className="eyebrow">A few sparks to get started</p><h2 id="board-title">The idea board</h2></div><span className="idea-count">{visibleIdeas.length} ideas</span></div>
        <div className="idea-list">
          {visibleIdeas.map((idea, index) => <article className="idea-card" key={idea.id}><span className="idea-index">{String(index + 1).padStart(2, "0")}</span><p>{idea.text}</p><span className="idea-mark" aria-hidden="true">✳</span></article>)}
        </div>
      </section>
    </>
  );
}
