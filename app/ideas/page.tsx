import Link from "next/link";
import IdeaBoard from "./idea-board";
import { listIdeas, type Idea } from "@/lib/ideas";

export const dynamic = "force-dynamic";

export default async function IdeasPage() {
  let ideas: Idea[] = [];

  try {
    ideas = await listIdeas();
  } catch (error) {
    console.error("Unable to load ideas.", error);
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

      <IdeaBoard initialIdeas={ideas} />
      <footer className="ideas-footer">Small ideas, shared out loud. <span>✳</span></footer>
    </main>
  );
}
