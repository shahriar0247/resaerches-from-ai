import Link from "next/link";
import { LogoMark } from "@/components/graphics/LogoMark";

export function Footer() {
  return (
    <footer className="bg-ink text-surface/80 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand */}
          <div className="md:col-span-1">
            <div className="flex items-center gap-3 mb-4">
              <LogoMark size={36} />
              <div>
                <span className="font-bold text-surface block leading-tight">
                  Researches from AI
                </span>
              </div>
            </div>
            <p className="text-sm text-surface/60 leading-relaxed">
              A collection of in-depth research reports, analyses, and
              documentation — generated and curated with AI.
            </p>
          </div>

          {/* Research */}
          <div>
            <h3 className="text-sm font-semibold text-accent-light uppercase tracking-wider mb-4">
              Research
            </h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/articles" className="hover:text-accent-light transition-colors">
                  All Articles
                </Link>
              </li>
              <li>
                <Link href="/articles?category=AI+%26+Business" className="hover:text-accent-light transition-colors">
                  AI &amp; Business
                </Link>
              </li>
              <li>
                <Link href="/articles?category=Psychology" className="hover:text-accent-light transition-colors">
                  Psychology
                </Link>
              </li>
              <li>
                <Link href="/articles?category=Technology" className="hover:text-accent-light transition-colors">
                  Technology
                </Link>
              </li>
            </ul>
          </div>

          {/* About */}
          <div>
            <h3 className="text-sm font-semibold text-accent-light uppercase tracking-wider mb-4">
              About
            </h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/about" className="hover:text-accent-light transition-colors">
                  About This Site
                </Link>
              </li>
              <li>
                <Link href="/about#methodology" className="hover:text-accent-light transition-colors">
                  Methodology
                </Link>
              </li>
              <li>
                <Link href="/about#disclaimer" className="hover:text-accent-light transition-colors">
                  Disclaimer
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="flex items-center justify-center gap-4 mt-10 mb-6">
          <div className="h-px flex-1 bg-surface/10" />
          <div className="w-2 h-2 rounded-full bg-accent/50" />
          <div className="h-px flex-1 bg-surface/10" />
        </div>

        {/* Bottom */}
        <div className="text-center text-xs text-surface/40">
          <p>&copy; {new Date().getFullYear()} Researches from AI. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
