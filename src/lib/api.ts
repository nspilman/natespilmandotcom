import fs from "fs";
import { join } from "path";
import matter from "gray-matter";
import { Blog } from "@/app/types";

const postsDirectory = join(process.cwd(), "blog");

export function getPostSlugs() {
  const allFiles = fs.readdirSync(postsDirectory);
  const slugs = allFiles.filter((slug) => slug.endsWith(".md"));
  console.log({ slugs });

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

export function getAllPosts(): Blog[] {
  const slugs = getPostSlugs();
  try {
    const posts = slugs
      .map((slug) => getPostBySlug(slug))
      .filter((post) => post.frontmatter.published)
      // sort posts by date in descending order
      .sort((post1, post2) =>
        post1.frontmatter.date > post2.frontmatter.date ? -1 : 1
      );
    return posts;
  } catch (e) {
    console.log(e);
    throw new Error("it broke");
  }
}
