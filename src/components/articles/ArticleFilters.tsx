"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState, useCallback } from "react";
import { Search, X } from "lucide-react";

interface ArticleFiltersProps {
  categories: string[];
  tags: string[];
  activeCategory: string;
  searchQuery: string;
  activeTag: string;
}

export function ArticleFilters({
  categories,
  tags,
  activeCategory,
  searchQuery,
  activeTag,
}: ArticleFiltersProps) {
  const router = useRouter();
  const params = useSearchParams();
  const [search, setSearch] = useState(searchQuery);

  const updateFilter = useCallback(
    (key: string, value: string) => {
      const current = new URLSearchParams(Array.from(params.entries()));
      if (value && value !== "All") {
        current.set(key, value);
      } else {
        current.delete(key);
      }
      router.push(`/articles?${current.toString()}`);
    },
    [params, router]
  );

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const current = new URLSearchParams(Array.from(params.entries()));
    if (search) {
      current.set("search", search);
    } else {
      current.delete("search");
    }
    router.push(`/articles?${current.toString()}`);
  };

  const clearAll = () => {
    setSearch("");
    router.push("/articles");
  };

  const hasFilters = activeCategory !== "All" || searchQuery || activeTag;

  return (
    <div className="space-y-4">
      {/* Search */}
      <form onSubmit={handleSearch} className="flex gap-2 max-w-md mx-auto">
        <div className="relative flex-1">
          <Search
            size={18}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted"
          />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search research..."
            className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-border bg-surface text-text placeholder:text-text-muted/50 focus-ring text-sm"
          />
        </div>
        <button
          type="submit"
          className="px-5 py-2.5 rounded-lg bg-accent text-white text-sm font-medium hover:bg-accent-dark transition-colors focus-ring"
        >
          Search
        </button>
      </form>

      {/* Category filters */}
      <div className="flex flex-wrap items-center justify-center gap-2">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => updateFilter("category", cat)}
            className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
              activeCategory === cat
                ? "bg-accent text-white"
                : "bg-surface text-text-secondary border border-border hover:border-accent hover:text-accent"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Tag filters */}
      {tags.length > 0 && (
        <div className="flex flex-wrap items-center justify-center gap-2">
          <span className="text-xs text-text-muted font-medium">Tags:</span>
          {tags.slice(0, 15).map((tag) => (
            <button
              key={tag}
              onClick={() => updateFilter("tag", tag)}
              className={`px-2.5 py-1 rounded-full text-xs font-medium transition-colors ${
                activeTag === tag
                  ? "bg-cyan text-white"
                  : "bg-surface-alt text-text-secondary border border-border hover:border-cyan hover:text-cyan"
              }`}
            >
              #{tag}
            </button>
          ))}
        </div>
      )}

      {/* Clear filters */}
      {hasFilters && (
        <div className="flex justify-center">
          <button
            onClick={clearAll}
            className="inline-flex items-center gap-1.5 text-sm text-text-muted hover:text-accent transition-colors"
          >
            <X size={14} />
            Clear all filters
          </button>
        </div>
      )}
    </div>
  );
}
