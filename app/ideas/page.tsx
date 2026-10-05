"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";

type Idea = { id: number; text: string };

const starterIdeas: Idea[] = [
  { id: 1, text: "A neighbourhood tool library, so you only buy the drill you actually need." },
  { id: 2, text: "A tiny newsletter that tells you one good thing happening near you this weekend." },
  { id: 3, text: "A bench with a little sign: sit here if you feel like talking." },
];

export default function IdeasPage() {
  const [ideas, setIdeas] = useState(starterIdeas);
  const [draft, setDraft] = useState("");

  function saveIdea(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const text = draft.trim();
    if (!text) return;
    setIdeas((current) => [{ id: Date.now(), text }, ...current]);
    setDraft("");
  }

  return (
    <main className="page-shell ideas-page">
      <header className="site-header">
        <Link className="wordmark" href="/">small ideas<span>club</span></Link>
        <Link className="header-link" href="/">← Back home</Link>
      </header>

      <section className="ideas-intro">
        <p className="eyebrow"><span className="sparkle">✳</span> The idea board</p>
        <h1>What’s on<br /><em>your mind?</em></h1>
        <p className="hero-copy">No idea is too small. Put yours out there and see what else starts growing.</p>
      </section>

      <section className="composer" aria-labelledby="composer-title">
        <div className="composer-heading"><span className="step-number">01</span><label id="composer-title" htmlFor="idea">Your idea, in a sentence or two</label></div>
        <form onSubmit={saveIdea}>
          <textarea id="idea" value={draft} onChange={(event) => setDraft(event.target.value)} maxLength={240} placeholder="I wish there was a way to…" rows={3} />
          <div className="composer-bottom"><span>{draft.length}/240</span><button className="button button-primary" type="submit" disabled={!draft.trim()}>Add to the board <span aria-hidden="true">→</span></button></div>
        </form>
        <p className="local-note">This preview keeps new ideas in this page session. Connect a database and moderation before making submissions public.</p>
      </section>

      <section className="board" aria-labelledby="board-title">
        <div className="board-heading"><div><p className="eyebrow">A few sparks to get started</p><h2 id="board-title">The idea board</h2></div><span className="idea-count">{ideas.length} ideas</span></div>
        <div className="idea-list">
          {ideas.map((idea, index) => <article className="idea-card" key={idea.id}><span className="idea-index">{String(index + 1).padStart(2, "0")}</span><p>{idea.text}</p><span className="idea-mark" aria-hidden="true">✳</span></article>)}
        </div>
      </section>
      <footer className="ideas-footer">Small ideas, shared out loud. <span>✳</span></footer>
    </main>
  );
}
