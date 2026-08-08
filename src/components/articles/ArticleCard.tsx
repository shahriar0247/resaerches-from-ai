import Link from "next/link";
import { Eye, Calendar, Tag } from "lucide-react";
import { Badge } from "@/components/ui/Badge";

interface ArticleCardData {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  category: string;
  publishedAt: Date;
  featured?: boolean;
  tags?: string[];
  viewCount?: number;
  source?: string | null;
  sourceType?: string | null;
  coverGradient?: string | null;
}

const GRADIENTS = [
  "from-indigo-500 to-purple-500",
  "from-cyan-500 to-blue-500",
  "from-violet-500 to-fuchsia-500",
  "from-emerald-500 to-teal-500",
  "from-orange-500 to-pink-500",
  "from-blue-500 to-indigo-500",
];

const SOURCE_ICONS: Record<string, string> = {
  video: "Video",
  paper: "Paper",
  survey: "Survey",
  report: "Report",
  original: "Original",
};

export function ArticleCard({ article, index = 0 }: { article: ArticleCardData; index?: number }) {
  const gradient = article.coverGradient || GRADIENTS[index % GRADIENTS.length];

  return (
    <Link
      href={`/articles/${article.slug}`}
      className="group block bg-surface rounded-xl overflow-hidden card-shadow card-shadow-hover border border-border focus-ring"
    >
      {/* Gradient header strip */}
      <div className={`h-2 bg-gradient-to-r ${gradient}`} />

      <div className="p-6">
        {/* Category + source badges */}
        <div className="flex items-center gap-2 mb-3">
          <Badge variant="accent">{article.category}</Badge>
          {article.featured && <Badge variant="cyan">Featured</Badge>}
          {article.sourceType && SOURCE_ICONS[article.sourceType] && (
            <span className="text-xs text-text-muted">
              {SOURCE_ICONS[article.sourceType]}
            </span>
          )}
        </div>

        {/* Title */}
        <h3 className="text-lg font-bold text-ink group-hover:text-accent transition-colors mb-2 line-clamp-2">
          {article.title}
        </h3>

        {/* Excerpt */}
        <p className="text-text-secondary text-sm leading-relaxed line-clamp-3 mb-4">
          {article.excerpt}
        </p>

        {/* Tags */}
        {article.tags && article.tags.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mb-4">
            {article.tags.slice(0, 3).map((tag) => (
              <span
                key={tag}
                className="text-xs text-text-muted bg-surface-alt px-2 py-0.5 rounded"
              >
                #{tag}
              </span>
            ))}
            {article.tags.length > 3 && (
              <span className="text-xs text-text-muted">
                +{article.tags.length - 3}
              </span>
            )}
          </div>
        )}

        {/* Footer */}
        <div className="flex items-center justify-between text-xs text-text-muted pt-3 border-t border-border-light">
          <div className="flex items-center gap-1">
            <Calendar size={13} />
            <span>
              {new Date(article.publishedAt).toLocaleDateString("en-US", {
                year: "numeric",
                month: "short",
                day: "numeric",
              })}
            </span>
          </div>
          {article.viewCount !== undefined && (
            <div className="flex items-center gap-3">
              <span className="flex items-center gap-1">
                <Eye size={13} />
                {article.viewCount}
              </span>
            </div>
          )}
        </div>
      </div>
    </Link>
  );
}
