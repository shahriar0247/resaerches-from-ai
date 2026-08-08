export const dynamic = "force-dynamic";

import { getArticles, getCategories, getTags } from "@/lib/db";
import { ArticleCard } from "@/components/articles/ArticleCard";
import { ArticleFilters } from "@/components/articles/ArticleFilters";

export const metadata = {
  title: "Articles",
  description: "Browse all research by topic, tag, or search.",
};

export default async function ArticlesPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const filters = await searchParams;
  const category = filters.category as string | undefined;
  const search = filters.search as string | undefined;
  const tag = filters.tag as string | undefined;

  const [articles, categories, tags] = await Promise.all([
    getArticles({
      category: category || "All",
      search: search,
      tag: tag,
    }),
    getCategories(),
    getTags(),
  ]);

  const allCategories = ["All", ...categories];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 animate-fade-in">
      <div className="text-center mb-10">
        <h1 className="text-4xl font-bold text-ink mb-2">
          All Research
        </h1>
        <p className="text-text-secondary">
          Browse all research by topic, tag, or search.
        </p>
      </div>

      <ArticleFilters
        categories={allCategories}
        tags={tags}
        activeCategory={category || "All"}
        searchQuery={search || ""}
        activeTag={tag || ""}
      />

      {articles.length === 0 ? (
        <div className="text-center py-20">
          <p className="text-text-secondary text-lg">
            No articles found. Try a different filter or search term.
          </p>
        </div>
      ) : (
        <>
          <p className="text-sm text-text-muted text-center mt-8 mb-6">
            {articles.length} {articles.length === 1 ? "article" : "articles"} found
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {articles.map((article, i) => (
              <ArticleCard key={article.id} article={article} index={i} />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
