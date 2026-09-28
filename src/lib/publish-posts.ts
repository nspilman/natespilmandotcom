// Sync published markdown posts in /blog to standard.site records on my PDS.
//
//   bun src/lib/publish-posts.ts          dry run: print the plan, write nothing
//   bun src/lib/publish-posts.ts --yes    apply it
//   bun src/lib/publish-posts.ts --preview <slug>
//                                         print one post's record (drafts too)
//
// Posts with `published: false` are never written, and if one was synced
// earlier its record is deleted, so unpublishing a post unpublishes it here too.
import { AtpAgent } from "@atproto/api";
import { remark } from "remark";
import remarkGfm from "remark-gfm";
import "dotenv/config";
import { getPostBySlug, getPostSlugs } from "./api";
import { DID, SITE_PUBLICATION_URI, SITE_URL } from "./standard-site";

const PDS = "https://oyster.us-east.host.bsky.network";
const DOCS = "site.standard.document";
const PUB_RKEY = SITE_PUBLICATION_URI.split("/").pop()!;
const RKEY = /^[A-Za-z0-9._:~-]{1,512}$/;

const publication = {
  $type: "site.standard.publication",
  url: SITE_URL,
  name: "Nate Spilman",
  description: "Software, urban biking, music.",
};

// Separator used when joining a node's children into plain text.
const joiners: Record<string, string> = {
  root: "\n\n",
  blockquote: "\n\n",
  list: "\n",
  listItem: " ",
  table: "\n",
  tableRow: " | ",
};

// standard.site wants textContent without markdown. Widget tags like
// <big-o-growth> keep only their inner fallback text.
function plain(node: any): string {
  if (node.type === "html") return node.value.replace(/<[^>]+>/g, "").trim();
  if (node.type === "image") return node.alt ?? "";
  if ("value" in node) return node.value;
  return (node.children ?? [])
    .map(plain)
    .filter(Boolean)
    .join(joiners[node.type] ?? "");
}

function toRecord(slug: string) {
  const { frontmatter, html: markdown } = getPostBySlug(slug);
  const { title, description, date, tags } = frontmatter;
  return {
    $type: DOCS,
    site: SITE_PUBLICATION_URI,
    path: `/blog/${slug}`,
    title,
    ...(description && { description }),
    publishedAt: new Date(date).toISOString(),
    ...(tags?.filter(Boolean).length && { tags: tags.filter(Boolean) }),
    content: { $type: "com.natespilman.blog.content", markdown },
    textContent: plain(remark().use(remarkGfm).parse(markdown)),
  };
}

async function listOurDocs() {
  const docs = new Map<string, any>();
  let cursor = "";
  do {
    const url = `${PDS}/xrpc/com.atproto.repo.listRecords?repo=${DID}&collection=${DOCS}&limit=100${cursor && `&cursor=${cursor}`}`;
    const data = await (await fetch(url)).json();
    for (const r of data.records) {
      if (r.value.site === SITE_PUBLICATION_URI) docs.set(r.uri.split("/").pop(), r.value);
    }
    cursor = data.records.length ? data.cursor ?? "" : "";
  } while (cursor);
  return docs;
}

// Compare everything except updatedAt, so re-running doesn't rewrite unchanged
// posts. Keys are sorted because the PDS returns them in its own order.
const canon = (v: any): any =>
  Array.isArray(v) ? v.map(canon)
  : v && typeof v === "object" ? Object.fromEntries(Object.keys(v).sort().map((k) => [k, canon(v[k])]))
  : v;
const same = (a: any, b: any) =>
  JSON.stringify(canon({ ...a, updatedAt: undefined })) ===
  JSON.stringify(canon({ ...b, updatedAt: undefined }));

async function main() {
  const preview = process.argv.indexOf("--preview");
  if (preview !== -1) {
    const record = toRecord(process.argv[preview + 1]);
    console.log(JSON.stringify({ ...record, content: "(markdown omitted)" }, null, 2));
    console.log(`\n--- textContent ---\n${record.textContent}`);
    return;
  }

  const apply = process.argv.includes("--yes");
  const existing = await listOurDocs();

  const writes: { rkey: string; record: any; kind: "create" | "update" }[] = [];
  const published = new Set<string>();
  for (const file of getPostSlugs()) {
    const slug = file.replace(/\.md$/, "");
    const { frontmatter } = getPostBySlug(slug);
    if (!frontmatter.published) continue;
    if (!RKEY.test(slug) || !frontmatter.title) {
      console.warn(`skip ${JSON.stringify(slug)}: ${frontmatter.title ? "slug isn't a valid record key" : "no title"}`);
      continue;
    }
    published.add(slug);
    const record = toRecord(slug);
    const prev = existing.get(slug);
    if (!prev) writes.push({ rkey: slug, record, kind: "create" });
    else if (!same(record, prev)) {
      writes.push({ rkey: slug, record: { ...record, updatedAt: new Date().toISOString() }, kind: "update" });
    }
  }
  const deletes = Array.from(existing.keys()).filter((rkey) => !published.has(rkey));

  for (const w of writes) console.log(`${w.kind.padEnd(6)} ${w.rkey}`);
  for (const rkey of deletes) console.log(`delete ${rkey}`);
  console.log(`\n${writes.length} to write, ${deletes.length} to delete, ${published.size - writes.length} unchanged`);

  if (!apply) {
    console.log("dry run. re-run with --yes to apply");
    return;
  }

  const agent = new AtpAgent({ service: "https://bsky.social" });
  await agent.login({
    identifier: process.env.ATPROTO_HANDLE!,
    password: process.env.ATPROTO_APP_PASSWORD!,
  });
  const repo = agent.session!.did;

  await agent.com.atproto.repo.putRecord({
    repo, collection: "site.standard.publication", rkey: PUB_RKEY, record: publication,
  });
  for (const w of writes) {
    await agent.com.atproto.repo.putRecord({ repo, collection: DOCS, rkey: w.rkey, record: w.record });
  }
  for (const rkey of deletes) {
    await agent.com.atproto.repo.deleteRecord({ repo, collection: DOCS, rkey });
  }
  console.log("done");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
