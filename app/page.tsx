import Link from "next/link";

export default function HomePage() {
  return (
    <main className="page-shell landing">
      <header className="site-header">
        <Link className="wordmark" href="/">small ideas<span>club</span></Link>
        <Link className="header-link" href="/ideas">Explore ideas <span aria-hidden="true">↗</span></Link>
      </header>

      <section className="hero">
        <p className="eyebrow"><span className="sparkle">✳</span> A tiny corner of the internet</p>
        <h1>Good things<br />start <em>small.</em></h1>
        <p className="hero-copy">A place to put that little idea you can’t stop thinking about. Share it, find a spark in someone else’s, and see what grows.</p>
        <div className="hero-actions">
          <Link className="button button-primary" href="/ideas">Share an idea <span aria-hidden="true">→</span></Link>
          <Link className="text-link" href="/ideas">See what people are thinking</Link>
        </div>
        <div className="hero-note"><span className="note-line" /> No big pitch needed. Just an idea.</div>
      </section>

      <footer className="landing-footer"><span>Made for the ideas that won’t leave you alone.</span><span>01 — 01</span></footer>
    </main>
  );
}
