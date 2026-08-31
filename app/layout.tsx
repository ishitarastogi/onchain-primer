import type { Metadata } from "next";
import { Fraunces, IBM_Plex_Mono, IBM_Plex_Sans } from "next/font/google";
import "./globals.css";

const fraunces = Fraunces({ subsets: ["latin"], variable: "--font-fraunces", weight: ["500", "600", "700"] });
const plexMono = IBM_Plex_Mono({ subsets: ["latin"], variable: "--font-plex-mono", weight: ["400", "500", "600"] });
const plexSans = IBM_Plex_Sans({ subsets: ["latin"], variable: "--font-plex-sans", weight: ["400", "500", "600"] });

export const metadata: Metadata = {
  title: "Onchain Primer — Private Credit",
  description: "A visual learning resource for onchain private credit.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${fraunces.variable} ${plexMono.variable} ${plexSans.variable}`}>
      <body className="bg-paper text-ink-text font-body">{children}</body>
    </html>
  );
}
