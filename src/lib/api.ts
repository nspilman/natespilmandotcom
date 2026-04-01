import fs from "fs";
import { join } from "path";
import matter from "gray-matter";
import { Blog } from "@/app/types";
import { fetchDocuments, rkeyFromUri, blobUrl } from "@/lib/standard-site";

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

export function getPostSlugs() {
  const allFiles = fs.readdirSync(postsDirectory);
  const slugs = allFiles.filter((slug) => slug.endsWith(".md"));

  return slugs;
}

export function getPostBySlug(slug: string): Blog {
  const realSlug = slug.replace(/\.md$/, "");
  const fullPath = join(postsDirectory, `${realSlug}.md`);
  const fileContents = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(fileContents);
  const { date, description, favorite, published, title, tags } = data;
  return {
    id: realSlug,
    html: content,
    fields: {
      slug: realSlug,
    },
    frontmatter: { date, description, favorite, published, title, tags },
  };
}

export function getPosts(limit?: number): Blog[] {
  const slugs = getPostSlugs();
  try {
    const posts = slugs
      .map((slug) => getPostBySlug(slug))
      .filter((post) => post.frontmatter.published)
      // sort posts by date in descending order
      .sort((post1, post2) =>
        post1.frontmatter.date > post2.frontmatter.date ? -1 : 1
      );
    return typeof limit === 'number' ? posts.slice(0, limit) : posts;
  } catch (e) {
    console.log(e);
    throw new Error("it broke");
  }
}

export const getPostsCount = () => {
  const slugs = getPostSlugs();
  return slugs.length;
}

export async function getAllUnifiedPosts(limit?: number): Promise<UnifiedPost[]> {
  const markdownPosts = getPosts().map((post): UnifiedPost => ({
    slug: post.fields.slug,
    title: post.frontmatter.title,
    date: post.frontmatter.date,
    description: post.frontmatter.description,
    tags: post.frontmatter.tags || [],
    source: "markdown",
  }));

  let atprotoPosts: UnifiedPost[] = [];
  try {
    const documents = await fetchDocuments();
    atprotoPosts = documents.map((doc): UnifiedPost => ({
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

  const all = [...markdownPosts, ...atprotoPosts].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  return typeof limit === "number" ? all.slice(0, limit) : all;
}

export async function getUnifiedPostsCount(): Promise<number> {
  const posts = await getAllUnifiedPosts();
  return posts.length;
}