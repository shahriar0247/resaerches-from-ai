export const dynamic = "force-dynamic";

import {
  getArticleBySlug,
  getArticles,
  incrementArticleViews,
} from "@/lib/db";
import { notFound } from "next/navigation";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import { Badge } from "@/components/ui/Badge";
import Link from "next/link";
import { Calendar, Eye, ExternalLink, ArrowLeft, Tag } from "lucide-react";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = await getArticleBySlug(slug);
  if (!article) return { title: "Article Not Found" };
  return {
    title: article.title,
    description: article.excerpt,
  };
}

export default async function ArticleDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = await getArticleBySlug(slug);

  if (!article || article.status !== "published") notFound();

  // Increment view count (fire and forget)
  incrementArticleViews(article.id).catch(() => {});

  // Get related articles (same category)
  const relatedArticles = (await getArticles({ category: article.category, limit: 4 }))
    .filter((a) => a.id !== article.id)
    .slice(0, 3);

  return (
    <div className="animate-fade-in">
      {/* Article Header */}
      <header className="bg-surface border-b border-border py-12">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 mb-4">
            <Link
              href="/articles"
              className="text-sm text-text-secondary hover:text-accent inline-flex items-center gap-1"
            >
              <ArrowLeft size={14} />
              All Articles
            </Link>
          </div>
          <div className="flex flex-wrap items-center gap-2 mb-4">
            <Badge variant="accent">{article.category}</Badge>
            {article.featured && <Badge variant="cyan">Featured</Badge>}
            {article.sourceType && (
              <Badge variant="ink">{article.sourceType}</Badge>
            )}
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-ink leading-tight mb-4 text-balance">
            {article.title}
          </h1>
          <p className="text-lg text-text-secondary leading-relaxed mb-6">
            {article.excerpt}
          </p>
          <div className="flex flex-wrap items-center gap-4 text-sm text-text-muted">
            <span className="flex items-center gap-1.5">
              <Calendar size={15} />
              {new Date(article.publishedAt).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </span>
            <span className="flex items-center gap-1.5">
              <Eye size={15} />
              {article.viewCount + 1} views
            </span>
            {article.author && (
              <span className="text-text-secondary">
                By {article.author}
              </span>
            )}
          </div>
          {/* Source link */}
          {article.sourceUrl && (
            <div className="mt-4">
              <a
                href={article.sourceUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-sm text-accent hover:text-accent-dark transition-colors"
              >
                <ExternalLink size={14} />
                View source: {article.source || "Link"}
              </a>
            </div>
          )}
        </div>
      </header>

      {/* Article Content */}
      <article className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="article-content">
          <ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeRaw]}>
            {article.content}
          </ReactMarkdown>
        </div>

        {/* Tags */}
        {article.tags && article.tags.length > 0 && (
          <div className="mt-10 pt-6 border-t border-border-light">
            <h3 className="text-sm font-semibold text-ink mb-3 flex items-center gap-1.5">
              <Tag size={14} />
              Tags
            </h3>
            <div className="flex flex-wrap gap-2">
              {article.tags.map((tag) => (
                <Link
                  key={tag}
                  href={`/articles?tag=${encodeURIComponent(tag)}`}
                  className="inline-flex items-center px-2.5 py-1 rounded-full bg-surface-alt text-text-secondary text-xs border border-border hover:border-accent hover:text-accent transition-colors"
                >
                  #{tag}
                </Link>
              ))}
            </div>
          </div>
        )}
      </article>

      {/* Related Articles */}
      {relatedArticles.length > 0 && (
        <section className="bg-surface-alt border-t border-border py-12">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-bold text-ink mb-6 text-center">
              Related Articles
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedArticles.map((rel, i) => (
                <Link
                  key={rel.id}
                  href={`/articles/${rel.slug}`}
                  className="group block bg-surface rounded-xl p-5 card-shadow card-shadow-hover border border-border"
                >
                  <Badge variant="accent">{rel.category}</Badge>
                  <h3 className="text-lg font-bold text-ink group-hover:text-accent transition-colors mt-2 mb-2 line-clamp-2">
                    {rel.title}
                  </h3>
                  <p className="text-sm text-text-secondary line-clamp-2">
                    {rel.excerpt}
                  </p>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
