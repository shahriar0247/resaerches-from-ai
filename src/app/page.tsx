import Link from "next/link";
import {
  getArticles,
  getArticlesCount,
  getCategories,
  getHeroSlides,
} from "@/lib/db";
import { ArticleCard } from "@/components/articles/ArticleCard";
import { HeroSlideshow } from "@/components/home/HeroSlideshow";
import { BookOpen, Sparkles, TrendingUp, ArrowRight } from "lucide-react";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const [featuredArticles, recentArticles, articlesCount, categories, slides] =
    await Promise.all([
      getArticles({ featured: true, limit: 3 }),
      getArticles({ limit: 6 }),
      getArticlesCount("published"),
      getCategories(),
      getHeroSlides(6),
    ]);

  const featuredWithIndex = featuredArticles.map((a, i) => ({ article: a, index: i }));
  const recentWithIndex = recentArticles.map((a, i) => ({ article: a, index: i }));

  return (
    <div className="animate-fade-in">
      {/* Hero Section */}
      <section className="relative bg-ink text-surface overflow-hidden">
        <div className="absolute inset-0 grid-pattern opacity-30" />
        <div className="absolute top-0 right-0 w-96 h-96 bg-accent/10 rounded-full blur-3xl -translate-y-1/3 translate-x-1/3" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-cyan/10 rounded-full blur-3xl translate-y-1/3 -translate-x-1/3" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24 lg:py-28">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Headline */}
            <div className="text-center lg:text-left">
              <p className="text-accent-light font-semibold tracking-widest text-xs md:text-sm uppercase mb-4">
                Researches from AI
              </p>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-[1.1] text-balance mb-6">
                Deep Research,{" "}
                <span className="gradient-text">AI-Generated</span> &amp; Curated
              </h1>
              <p className="text-lg md:text-xl text-surface/70 leading-relaxed mb-8 text-balance max-w-2xl mx-auto lg:mx-0">
                A growing collection of in-depth research reports, video
                analyses, and documentation — generated and organized with AI
                tools.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
                <Link
                  href="/articles"
                  className="px-7 py-3.5 rounded-lg bg-accent text-white font-medium hover:bg-accent-light transition-colors focus-ring"
                >
                  Browse Research
                </Link>
                <Link
                  href="/about"
                  className="px-7 py-3.5 rounded-lg border-2 border-surface/20 text-surface font-medium hover:bg-surface/10 transition-colors focus-ring"
                >
                  About This Site
                </Link>
              </div>
            </div>

            {/* Slideshow */}
            {slides.length > 0 && (
              <div className="w-full max-w-xl mx-auto lg:max-w-none">
                <HeroSlideshow slides={slides} />
              </div>
            )}
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4 mt-16 lg:mt-20 max-w-2xl mx-auto">
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-accent-light">
                {articlesCount}
              </div>
              <div className="text-sm text-surface/50 mt-1">Articles</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-accent-light">
                {categories.length}
              </div>
              <div className="text-sm text-surface/50 mt-1">Categories</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-accent-light">
                AI
              </div>
              <div className="text-sm text-surface/50 mt-1">Powered</div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Articles */}
      {featuredWithIndex.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-2 text-accent mb-2">
              <Sparkles size={20} />
              <span className="font-semibold text-sm uppercase tracking-wider">Featured</span>
            </div>
            <h2 className="text-3xl font-bold text-ink mb-2">
              Featured Research
            </h2>
            <p className="text-text-secondary">
              Hand-picked in-depth analyses and reports.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredWithIndex.map(({ article, index }) => (
              <ArticleCard key={article.id} article={article} index={index} />
            ))}
          </div>
        </section>
      )}

      {/* Latest Articles */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl font-bold text-ink">
              Latest Articles
            </h2>
            <p className="text-text-secondary text-sm mt-1">
              Browse our most recent research
            </p>
          </div>
          <Link
            href="/articles"
            className="text-sm text-accent hover:text-accent-dark font-medium inline-flex items-center gap-1"
          >
            View all <ArrowRight size={16} />
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {recentWithIndex.map(({ article, index }) => (
            <ArticleCard key={article.id} article={article} index={index} />
          ))}
        </div>
      </section>

      {/* Categories Section */}
      {categories.length > 0 && (
        <section className="bg-surface-alt border-y border-border py-16 mt-8">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="inline-flex items-center gap-2 text-accent mb-2">
              <TrendingUp size={20} />
              <span className="font-semibold text-sm uppercase tracking-wider">Topics</span>
            </div>
            <h2 className="text-3xl font-bold text-ink mb-4">
              Explore by Category
            </h2>
            <p className="text-text-secondary text-lg leading-relaxed mb-8">
              Research organized by topic — from AI and business to psychology
              and technology.
            </p>
            <div className="flex flex-wrap justify-center gap-3 mt-8">
              {categories.map((cat) => (
                <Link
                  key={cat}
                  href={`/articles?category=${encodeURIComponent(cat)}`}
                  className="px-5 py-2.5 rounded-lg bg-surface text-ink font-medium border border-border hover:border-accent hover:text-accent transition-colors card-shadow-hover"
                >
                  {cat}
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
        <div className="bg-ink rounded-2xl p-10 md:p-14 relative overflow-hidden">
          <div className="absolute inset-0 grid-pattern opacity-20" />
          <div className="absolute top-0 right-0 w-64 h-64 bg-accent/10 rounded-full blur-3xl" />
          <div className="relative">
            <BookOpen className="text-accent-light mx-auto mb-4" size={32} />
            <h2 className="text-3xl font-bold text-surface mb-4">
              Explore the Full Library
            </h2>
            <p className="text-surface/70 mb-6 max-w-xl mx-auto">
              Browse all research articles, filter by category or tag, and
              search across the entire collection.
            </p>
            <Link
              href="/articles"
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-lg bg-accent text-white font-medium hover:bg-accent-light transition-colors focus-ring"
            >
              Browse All Research <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
