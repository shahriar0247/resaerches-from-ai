import "dotenv/config";
import { initializeApp, cert } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";
import { readFileSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));

// Load service account
let serviceAccount: Record<string, unknown>;
if (process.env.FIREBASE_SERVICE_ACCOUNT_B64) {
  serviceAccount = JSON.parse(
    Buffer.from(process.env.FIREBASE_SERVICE_ACCOUNT_B64, "base64").toString("utf-8")
  );
} else if (process.env.GOOGLE_APPLICATION_CREDENTIALS) {
  serviceAccount = JSON.parse(readFileSync(process.env.GOOGLE_APPLICATION_CREDENTIALS, "utf-8"));
} else {
  console.error("No Firebase credentials found. Set FIREBASE_SERVICE_ACCOUNT_B64 or GOOGLE_APPLICATION_CREDENTIALS.");
  process.exit(1);
}

const app = initializeApp({
  credential: cert(serviceAccount as never),
  projectId: serviceAccount.project_id as string,
});
const db = getFirestore(app);

// ============ Article Metadata ============

interface ArticleMeta {
  title: string;
  category: string;
  excerpt: string;
  tags: string[];
  source: string;
  sourceType: string;
  sourceUrl?: string;
  author?: string;
  featured: boolean;
  coverGradient?: string;
}

const ARTICLE_META: Record<string, ArticleMeta> = {
  "ai-launch-1m-30days.md": {
    title: "I Generated $1M+ in 30 Days Using Only AI — Detailed Analysis",
    category: "AI & Business",
    excerpt: "A chapter-by-chapter breakdown of Yahya Hisham's 30-day AI-powered marketing launch that generated $651K revenue / $478K cash collected. Covers client acquisition, the Dream 100 AI outreach system, Meta ads, funnel architecture, and the exact money math.",
    tags: ["ai", "marketing", "meta-ads", "launch", "funnel", "agency", "business", "claude", "chatgpt"],
    source: "YouTube — Yahya Hisham (Yellow House Systems)",
    sourceType: "video",
    sourceUrl: "https://www.youtube.com/watch?v=yuXt0FmVNyk",
    author: "Yahya Hisham (analyzed by AI)",
    featured: true,
    coverGradient: "from-orange-500 to-pink-500",
  },
  "male-attractiveness-research.md": {
    title: "What Women Find Attractive in Men: A Multi-Dimensional, Cross-Demographic Research Report",
    category: "Psychology",
    excerpt: "A comprehensive synthesis of peer-reviewed evolutionary psychology studies, dating-app field experiments, large-scale surveys, and social-media trend data on male attractiveness — broken down by physical features, behavior, race, generation, education, and relationship context.",
    tags: ["psychology", "evolutionary-psychology", "dating", "attraction", "dating-apps", "gen-z", "cross-cultural"],
    source: "Deep Research (multi-source synthesis)",
    sourceType: "report",
    author: "AI Deep Research",
    featured: true,
    coverGradient: "from-violet-500 to-fuchsia-500",
  },
  "best-ai-model-for-research-comparison.md": {
    title: "Best AI Model for Research: Comparing Every Frontier Model in Devin",
    category: "AI & Models",
    excerpt: "A benchmark-based comparison of all five frontier models available in Devin (Claude Opus 4.8, GPT-5.5/5.6 Sol, GLM-5.2, Gemini 3.1 Pro, SWE-1.7 Max) for research work — covering knowledge, reasoning, multilingual, citation accuracy, agentic tool use, instruction following, context window, and cost. Includes a full ranking table and honest caveats about what benchmarks can and cannot tell you.",
    tags: ["ai", "llm", "devin", "swe-1.7", "glm-5.2", "claude-opus", "gpt-5", "gemini", "benchmarks", "research", "citation-accuracy", "hallucination", "comparison"],
    source: "Deep Research (web search + benchmark synthesis)",
    sourceType: "report",
    author: "AI Deep Research",
    featured: true,
    coverGradient: "from-cyan-500 to-blue-600",
  },
};

function slugify(text: string): string {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-")
    .replace(/[^\w\-]+/g, "")
    .replace(/\-\-+/g, "-")
    .replace(/^-+/, "")
    .replace(/-+$/, "");
}

async function main() {
  const contentDir = join(__dirname, "..", "content");
  const files = Object.keys(ARTICLE_META);

  console.log(`Found ${files.length} articles to import\n`);

  let created = 0;
  let updated = 0;

  for (const filename of files) {
    const meta = ARTICLE_META[filename];
    const filePath = join(contentDir, filename);

    let content: string;
    try {
      content = readFileSync(filePath, "utf-8");
    } catch {
      console.log(`  SKIP (file not found): ${filename}`);
      continue;
    }

    const slug = slugify(meta.title);

    // Check if article already exists (by slug)
    const existingSnap = await db
      .collection("research_articles")
      .where("slug", "==", slug)
      .limit(1)
      .get();

    const articleData: Record<string, unknown> = {
      title: meta.title,
      slug,
      excerpt: meta.excerpt,
      content,
      category: meta.category,
      source: meta.source,
      sourceType: meta.sourceType,
      featured: meta.featured,
      status: "published",
      publishedAt: new Date(),
      viewCount: 0,
      tags: meta.tags,
    };

    if (meta.sourceUrl) articleData.sourceUrl = meta.sourceUrl;
    if (meta.author) articleData.author = meta.author;
    if (meta.coverGradient) articleData.coverGradient = meta.coverGradient;

    if (!existingSnap.empty) {
      // Update existing
      await db.collection("research_articles").doc(existingSnap.docs[0].id).set(articleData, { merge: true });
      console.log(`  UPDATED: ${meta.title}`);
      updated++;
    } else {
      // Create new
      await db.collection("research_articles").add({
        ...articleData,
        createdAt: new Date(),
        updatedAt: new Date(),
      });
      console.log(`  CREATED: ${meta.title}`);
      created++;
    }
  }

  console.log(`\nImport complete! Created: ${created}, Updated: ${updated}`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .then(() => {
    process.exit(0);
  });
