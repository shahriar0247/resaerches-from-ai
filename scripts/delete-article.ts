import "dotenv/config";
import { initializeApp, cert } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";
import { readFileSync } from "fs";

let serviceAccount: Record<string, unknown>;
if (process.env.FIREBASE_SERVICE_ACCOUNT_B64) {
  serviceAccount = JSON.parse(
    Buffer.from(process.env.FIREBASE_SERVICE_ACCOUNT_B64, "base64").toString("utf-8")
  );
} else if (process.env.GOOGLE_APPLICATION_CREDENTIALS) {
  serviceAccount = JSON.parse(readFileSync(process.env.GOOGLE_APPLICATION_CREDENTIALS, "utf-8"));
} else {
  console.error("No Firebase credentials found.");
  process.exit(1);
}

const app = initializeApp({
  credential: cert(serviceAccount as never),
  projectId: serviceAccount.project_id as string,
});
const db = getFirestore(app);

const slugToDelete = process.argv[2];

if (!slugToDelete) {
  console.error("Usage: npx tsx scripts/delete-article.ts <slug>");
  process.exit(1);
}

async function main() {
  const snap = await db
    .collection("research_articles")
    .where("slug", "==", slugToDelete)
    .limit(1)
    .get();

  if (snap.empty) {
    console.log(`No article found with slug: ${slugToDelete}`);
    return;
  }

  const docId = snap.docs[0].id;
  const title = snap.docs[0].get("title");
  await db.collection("research_articles").doc(docId).delete();
  console.log(`DELETED: "${title}" (slug: ${slugToDelete}, doc: ${docId})`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .then(() => process.exit(0));
