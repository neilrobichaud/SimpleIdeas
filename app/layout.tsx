import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Small Ideas Club",
  description: "A little place to share ideas worth putting into the world.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
