import { MarkdownContent } from "@/components/RenderMarkdown";
import { getAllPosts, getPostBySlug } from "@/lib/api";
import { formatDateString } from "@/utils";
import { Metadata } from "next";
import Link from "next/link";
import React from "react";

interface Props {
  params: {
    slug: string;
  };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  return {
    title: getPostBySlug(params.slug).frontmatter.title,
  };
}

export default async function Post({ params }: { params: { slug: string } }) {
  const post = getPostBySlug(params.slug);
  const allPosts = getAllPosts();
  const postIndex = allPosts.findIndex(
    (post) => post.fields.slug === params.slug
  );

  const [previous, next] = [allPosts[postIndex + 1], allPosts[postIndex - 1]];

  const {
    frontmatter: { title, date, description },
    html,
  } = post;

  return (
    <div className="min-h-screen px-6 py-12 md:px-8 lg:px-12 bg-gray-900/50">
      <article className="mx-auto max-w-6xl">
        <div className="mb-16">
          <Link href="/blog" className="block">
            <h1 className="text-2xl font-light  hover:text-yellow-300">
              Nate&apos;s Blog
            </h1>
          </Link>
          <hr className="mt-6 border-gray-700" />
        </div>

        <div className="prose prose-lg prose-invert max-w-none space-y-4">
          <header className="space-y-1">
            <h2 className="text-4xl font-bold tracking-tight text-white">
              {title}
            </h2>
            <p className="text-xl text-gray-300 leading-relaxed">
              {description}
            </p>
            <time 
              className="mt-8 block text-base text-gray-400" 
              dateTime={date}
            >
              {formatDateString(date)}
            </time>
          </header>

          <div className="mt-12 space-y-8">
            <MarkdownContent content={html} />
          </div>
        </div>

        <nav className="mt-24 border-t border-gray-800 pt-8">
          <ul className="flex flex-wrap justify-between gap-4">
            {previous && (
              <li>
                <Link 
                  href={previous.fields.slug}
                  className="text-gray-400 hover:text-yellow-400 transition-colors"
                >
                  ← {previous.frontmatter.title}
                </Link>
              </li>
            )}
            {next && (
              <li>
                <Link 
                  href={next.fields.slug}
                  className="text-gray-400 hover:text-yellow-400 transition-colors"
                >
                  {next.frontmatter.title} →
                </Link>
              </li>
            )}
          </ul>
        </nav>
      </article>
    </div>
  );
}