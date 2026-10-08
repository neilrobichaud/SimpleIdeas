import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = { title: "Daily Rank — Guess what the crowd thinks", description: "A fresh community-ranking prediction puzzle every day." };

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}
