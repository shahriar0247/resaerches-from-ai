import { Timestamp, FieldValue } from "firebase-admin/firestore";
import { firestore } from "./firebase";

// ============ Types ============

export interface Article {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  category: string;
  source: string;
  sourceType: string; // "video", "paper", "survey", "report", "original"
  sourceUrl?: string | null;
  author?: string | null;
  featured: boolean;
  status: string;
  publishedAt: Date;
  createdAt?: Date;
  updatedAt?: Date;
  viewCount: number;
  tags?: string[];
  coverGradient?: string | null;
}

export interface HeroSlide {
  id: string;
  type: "article" | "featured";
  label: string;
  category: string;
  title: string;
  excerpt: string;
  href: string;
  gradient: string;
}

// ============ Helpers ============

function snapToData<T>(snap: FirebaseFirestore.QueryDocumentSnapshot): T {
  const data = snap.data() as Record<string, unknown>;
  for (const key of Object.keys(data)) {
    if (data[key] instanceof Timestamp) {
      data[key] = (data[key] as Timestamp).toDate();
    }
  }
  return { id: snap.id, ...data } as T;
}

function snapToDataOpt<T>(
  snap: FirebaseFirestore.DocumentSnapshot
): T | null {
  if (!snap.exists) return null;
  const data = snap.data()! as Record<string, unknown>;
  for (const key of Object.keys(data)) {
    if (data[key] instanceof Timestamp) {
      data[key] = (data[key] as Timestamp).toDate();
    }
  }
  return { id: snap.id, ...data } as T;
}

// ============ Articles ============

export const articlesCol = () => firestore().collection("research_articles");

export async function getArticles(opts?: {
  category?: string;
  search?: string;
  tag?: string;
  status?: string;
  limit?: number;
  featured?: boolean;
}): Promise<Article[]> {
  let q: FirebaseFirestore.Query = articlesCol().orderBy("publishedAt", "desc");
  if (opts?.limit) q = q.limit(opts.limit);

  const snap = await q.get();
  let articles = snap.docs.map((d) => snapToData<Article>(d));

  const status = opts?.status ?? "published";
  if (status !== "all") {
    articles = articles.filter((a) => a.status === status);
  }
  if (opts?.category && opts.category !== "All") {
    articles = articles.filter((a) => a.category === opts.category);
  }
  if (opts?.featured) {
    articles = articles.filter((a) => a.featured === true);
  }
  if (opts?.tag) {
    articles = articles.filter((a) => a.tags?.includes(opts.tag!));
  }
  if (opts?.search) {
    const s = opts.search.toLowerCase();
    articles = articles.filter(
      (a) =>
        a.title.toLowerCase().includes(s) ||
        a.excerpt.toLowerCase().includes(s) ||
        a.content.toLowerCase().includes(s)
    );
  }
  return articles;
}

export async function getAllArticles(): Promise<Article[]> {
  const snap = await articlesCol().orderBy("publishedAt", "desc").get();
  return snap.docs.map((d) => snapToData<Article>(d));
}

export async function getArticleBySlug(slug: string): Promise<Article | null> {
  const snap = await articlesCol().where("slug", "==", slug).limit(1).get();
  if (snap.empty) return null;
  return snapToData<Article>(snap.docs[0]);
}

export async function getArticleById(id: string): Promise<Article | null> {
  const snap = await articlesCol().doc(id).get();
  return snapToDataOpt<Article>(snap);
}

export async function createArticle(
  data: Omit<Article, "id" | "createdAt" | "updatedAt">
): Promise<Article> {
  const now = new Date();
  const ref = await articlesCol().add({
    ...data,
    createdAt: now,
    updatedAt: now,
  });
  return { id: ref.id, ...data, createdAt: now, updatedAt: now };
}

export async function updateArticle(
  id: string,
  data: Partial<Article>
): Promise<void> {
  await articlesCol().doc(id).update({ ...data, updatedAt: new Date() });
}

export async function deleteArticle(id: string): Promise<void> {
  await articlesCol().doc(id).delete();
}

export async function incrementArticleViews(id: string): Promise<void> {
  await articlesCol().doc(id).update({
    viewCount: FieldValue.increment(1),
  });
}

// ============ Categories ============

export async function getCategories(): Promise<string[]> {
  const snap = await articlesCol().get();
  const cats = new Set<string>();
  snap.docs.forEach((d) => {
    const data = d.data();
    if (data.status === "published" && data.category) {
      cats.add(data.category as string);
    }
  });
  return Array.from(cats).sort();
}

export async function getTags(): Promise<string[]> {
  const snap = await articlesCol().get();
  const tags = new Set<string>();
  snap.docs.forEach((d) => {
    const data = d.data();
    if (data.status === "published" && Array.isArray(data.tags)) {
      (data.tags as string[]).forEach((t) => tags.add(t));
    }
  });
  return Array.from(tags).sort();
}

// ============ Counts ============

export async function getArticlesCount(status?: string): Promise<number> {
  if (status) {
    const snap = await articlesCol().where("status", "==", status).get();
    return snap.size;
  }
  const snap = await articlesCol().get();
  return snap.size;
}

// ============ Hero Slides ============

const GRADIENTS = [
  "from-indigo-500 to-purple-500",
  "from-cyan-500 to-blue-500",
  "from-violet-500 to-fuchsia-500",
  "from-emerald-500 to-teal-500",
  "from-orange-500 to-pink-500",
  "from-blue-500 to-indigo-500",
];

function stripMarkdownExcerpt(md: string, maxLength = 160): string {
  const cleaned = md
    .replace(/!\[([^\]]*)\]\(([^)]*)\)/g, "$1")
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, "$1")
    .replace(/[*_~`#>|]/g, "")
    .replace(/\s+/g, " ")
    .trim();

  if (cleaned.length <= maxLength) return cleaned;
  const trimmed = cleaned.slice(0, maxLength);
  return trimmed.slice(0, trimmed.lastIndexOf(" ")) + "...";
}

export async function getHeroSlides(limit = 6): Promise<HeroSlide[]> {
  const [featured, recent] = await Promise.all([
    getArticles({ featured: true, limit: 15 }),
    getArticles({ limit: 15 }),
  ]);

  const featuredSlides: HeroSlide[] = featured.map((a, i) => ({
    id: a.id,
    type: "featured" as const,
    label: "Featured",
    category: a.category,
    title: a.title,
    excerpt: a.excerpt,
    href: `/articles/${a.slug}`,
    gradient: a.coverGradient || GRADIENTS[i % GRADIENTS.length],
  }));

  const all = [...featuredSlides];

  if (all.length < limit) {
    const existingIds = new Set(all.map((s) => s.id));
    const recentSlides: HeroSlide[] = recent
      .filter((a) => !existingIds.has(a.id))
      .map((a, i) => ({
        id: a.id,
        type: "article" as const,
        label: "Latest",
        category: a.category,
        title: a.title,
        excerpt: a.excerpt,
        href: `/articles/${a.slug}`,
        gradient: a.coverGradient || GRADIENTS[(i + featuredSlides.length) % GRADIENTS.length],
      }));
    all.push(...recentSlides);
  }

  return all.slice(0, limit);
}
