"use client";

import { useEffect, useMemo, useState } from "react";
import type { Puzzle } from "../lib/puzzles";
import { puzzleForDate } from "../lib/puzzles";
import { scoreRanking, shareText } from "../lib/scoring";
import { itemEmoji, itemImageUrl } from "../lib/item-art";

type Saved = { answer: string[]; score: number; completed: true };

function ItemThumbnail({ item, result = false }: { item: string; result?: boolean }) {
  const [failed, setFailed] = useState(false);
  return <span className={`item-thumb${result ? " answer-thumb" : ""}`} aria-hidden="true">
    {!failed && <img src={itemImageUrl(item)} alt="" width={result ? 31 : 37} height={result ? 31 : 37} loading="lazy" onError={() => setFailed(true)} />}
    {failed && <span className="thumb-fallback">{itemEmoji(item)}</span>}
  </span>;
}

export default function Game({ puzzles }: { puzzles: Puzzle[] }) {
  const [today, setToday] = useState<Puzzle | null | undefined>(undefined);
  const [order, setOrder] = useState<string[]>([]);
  const [saved, setSaved] = useState<Saved | null>(null);
  const [dragging, setDragging] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const puzzle = puzzleForDate(new Date());
    setToday(puzzle ?? null);
    if (!puzzle) return;
    const key = `daily-rank:${puzzle.date}`;
    try {
      const value = localStorage.getItem(key);
      if (value) {
        const parsed = JSON.parse(value) as Saved;
        if (parsed.completed && parsed.answer.length === 5) setSaved(parsed);
      }
    } catch { /* Ignore malformed local save and start a fresh attempt. */ }
    setOrder(puzzle.items);
  }, [puzzles]);

  const result = useMemo(() => today && saved ? scoreRanking(saved.answer, today.ranking) : null, [today, saved]);
  const move = (from: number, to: number) => setOrder((current) => {
    if (to < 0 || to >= current.length) return current;
    const next = [...current];
    const [item] = next.splice(from, 1);
    next.splice(to, 0, item);
    return next;
  });
  const submit = () => {
    if (!today || saved) return;
    const scored = scoreRanking(order, today.ranking);
    const record: Saved = { answer: order, score: scored.score, completed: true };
    localStorage.setItem(`daily-rank:${today.date}`, JSON.stringify(record));
    setSaved(record);
  };
  const copy = async () => {
    if (!today || !result) return;
    await navigator.clipboard.writeText(shareText(today.id, today.category, result.score, result.results));
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1800);
  };

  if (today === undefined) return <main className="loading" aria-label="Loading Daily Rank"><span className="mark">DR</span></main>;

  return <main className="shell">
    <header className="topbar"><a className="brand" href="#"><span className="brand-icon">DR</span><span>daily<span className="brand-accent">rank</span></span></a><span className="edition">A LITTLE DAILY BRAIN TEASER</span></header>
    {!today ? <section className="empty-card"><span className="eyebrow">THAT’S A WRAP FOR NOW</span><h1>No puzzle today.</h1><p>Our demo puzzles run from October 6 to November 4, 2026. Come back during the seeded dates for a fresh ranking challenge.</p><div className="empty-foot">30 days · 30 fictional demo rankings</div></section> : <>
      <section className="intro"><div className="day-pill"><span className="live-dot" /> DAILY PUZZLE <b>#{today.id}</b></div><h1>Can you think like<br className="desktop-break" /> <em>the crowd?</em></h1><p>Put these in the order you think people would rank them.</p></section>
      <section className="game-card">
        <div className="card-meta"><span className="category"><span className="category-dot" />{today.category}</span><span className="demo-label">DEMO RANKING</span></div>
        <h2>{today.prompt}</h2>
        <div className="list-heading"><span>YOUR PREDICTION</span><span>DRAG OR USE ARROWS</span></div>
        <ol className={`rank-list ${saved ? "locked" : ""}`} aria-label="Your predicted ranking">
          {order.map((item, index) => <li key={item} draggable={!saved} onDragStart={() => setDragging(item)} onDragEnd={() => setDragging(null)} onDragOver={(event) => event.preventDefault()} onDrop={(event) => { event.preventDefault(); if (dragging) move(order.indexOf(dragging), index); setDragging(null); }} className={`${dragging === item ? "is-dragging" : ""} ${saved ? "result-row" : ""}`}>
            <span className="position">{index + 1}</span><ItemThumbnail item={item} /><span className="item-name">{item}</span>
            {saved && result ? <span className={`delta ${result.results.find((r) => r.item === item)?.distance === 0 ? "perfect" : ""}`}>{result.results.find((r) => r.item === item)?.distance === 0 ? "ON THE NOSE" : `${result.results.find((r) => r.item === item)?.distance} ${result.results.find((r) => r.item === item)?.distance === 1 ? "SPOT" : "SPOTS"} OFF`}</span> : <span className="row-controls"><button aria-label={`Move ${item} up`} onClick={() => move(index, index - 1)} disabled={index === 0}>↑</button><span className="grip" aria-hidden="true">⠿</span><button aria-label={`Move ${item} down`} onClick={() => move(index, index + 1)} disabled={index === 4}>↓</button></span>}
          </li>)}
        </ol>
        {!saved ? <><button className="submit" onClick={submit}>Lock in my ranking <span>→</span></button><p className="once-note"><span>◉</span> One try for today. Trust your gut.</p></> : <div className="results">
          <div className="score-card"><span className="score-label">YOUR SCORE</span><strong>{result?.score}<small> / 10</small></strong><span className="score-caption">{result?.score === 10 ? "Nailed the crowd consensus." : result && result.score >= 7 ? "You read the room pretty well." : "The crowd had other ideas."}</span></div>
          <div className="answer-title"><span>THE DEMO RANKING</span><span>POINTS</span></div>
          <ol className="answer-list">{today.ranking.map((item, index) => { const row = result?.results.find((r) => r.item === item); return <li key={item}><span className="answer-place">{index + 1}</span><ItemThumbnail item={item} result /><span className="answer-name">{item}</span><span className="points">+{row?.points}</span></li>; })}</ol>
          <div className="share-box"><div><span className="share-title">SHARE YOUR RESULT</span><code>{`Daily Rank #${today.id} · ${result?.score}/10`}</code></div><button className="share-button" onClick={copy}>{copied ? "Copied ✓" : "Copy result"}</button></div>
          <p className="fiction-note">These are fictional demo rankings, seeded for this prototype.</p>
        </div>}
      </section>
    </>}
    <footer><span>DAILY RANK <i>·</i> A FRESH GUESS EVERY DAY</span><span>DEMO EDITION</span></footer>
  </main>;
}
