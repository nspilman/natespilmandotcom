import fs from "fs";
import { join } from "path";
import matter from "gray-matter";
import { fetchDocuments, rkeyFromUri, blobUrl, SITE_PUBLICATION_URI } from "@/lib/standard-site";

// A markdown post from /blog. Frontmatter is loose YAML (dates arrive as Date
// objects or strings, tags are often missing), so it's normalized here, once.
export type Post = {
  slug: string;
  markdown: string;
  title: string;
  date: string; // ISO 8601, or "" for undated drafts
  description: string;
  tags: string[];
  published: boolean;
};

export type UnifiedPost = {
  slug: string;
  title: string;
  date: string;
  description: string;
  tags: string[];
  source: "markdown" | "atproto";
  coverImageUrl?: string;
};

const postsDirectory = join(process.cwd(), "blog");

export function getPostSlugs(): string[] {
  return fs
    .readdirSync(postsDirectory)
    .filter((file) => file.endsWith(".md"))
    .map((file) => file.replace(/\.md$/, ""));
}

export function getPostBySlug(slug: string): Post {
  const file = fs.readFileSync(join(postsDirectory, `${slug}.md`), "utf8");
  const { data, content } = matter(file);
  const date = new Date(data.date);
  return {
    slug,
    markdown: content,
    title: data.title ?? "",
    date: isNaN(date.getTime()) ? "" : date.toISOString(),
    description: data.description ?? "",
    tags: (data.tags ?? []).filter(Boolean),
    published: data.published === true || data.published === "true",
  };
}

export function getPosts(limit?: number): Post[] {
  const posts = getPostSlugs()
    .map(getPostBySlug)
    .filter((post) => post.published)
    .sort((a, b) => (a.date > b.date ? -1 : 1));
  return typeof limit === "number" ? posts.slice(0, limit) : posts;
}

export async function getAllUnifiedPosts(): Promise<UnifiedPost[]> {
  const markdownPosts = getPosts().map((post): UnifiedPost => ({
    slug: post.slug,
    title: post.title,
    date: post.date,
    description: post.description,
    tags: post.tags,
    source: "markdown",
  }));

  let atprotoPosts: UnifiedPost[] = [];
  try {
    const documents = await fetchDocuments();
    atprotoPosts = documents
      // Documents in this site's own publication are the markdown posts above.
      .filter((doc) => doc.value.site !== SITE_PUBLICATION_URI)
      .map((doc): UnifiedPost => ({
        slug: rkeyFromUri(doc.uri),
        title: doc.value.title,
        date: doc.value.publishedAt,
        description: doc.value.description || "",
        tags: doc.value.tags || [],
        source: "atproto",
        coverImageUrl: doc.value.coverImage
          ? blobUrl(doc.value.coverImage.ref.$link)
          : undefined,
      }));
  } catch (e) {
    console.error("Failed to fetch AT Protocol documents:", e);
  }

  return [...markdownPosts, ...atprotoPosts].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );
}
