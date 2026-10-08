import Game from "./game";
import { puzzles } from "../lib/puzzles";

export default function Home() { return <Game puzzles={puzzles} />; }
