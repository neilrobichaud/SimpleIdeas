export function scoreRanking(player: string[], correct: string[]) {
  const results = player.map((item) => {
    const distance = Math.abs(player.indexOf(item) - correct.indexOf(item));
    return { item, distance, points: distance === 0 ? 2 : distance === 1 ? 1 : 0 };
  });
  return { score: results.reduce((sum, item) => sum + item.points, 0), results };
}

export function shareText(day: number, category: string, score: number, results: { points: number }[]) {
  const tiles = results.map(({ points }) => points === 2 ? "🟩" : points === 1 ? "🟨" : "🟥").join(" ");
  return `Daily Rank #${day}\n${category}\n${score}/10\n\n${tiles}`;
}
