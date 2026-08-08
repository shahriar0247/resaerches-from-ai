import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Researches from AI",
    template: "%s — Researches from AI",
  },
  description:
    "A collection of in-depth research reports, analyses, and documentation — generated and curated with AI.",
  keywords: [
    "AI research",
    "research reports",
    "analysis",
    "documentation",
    "deep research",
  ],
  openGraph: {
    title: "Researches from AI",
    description:
      "A collection of in-depth research reports, analyses, and documentation — generated and curated with AI.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${inter.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-bg text-text">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
