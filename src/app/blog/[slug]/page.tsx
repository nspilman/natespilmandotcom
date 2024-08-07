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
    <div id="home" className="panel special min-h-screen p-8 md:p-20">
      <div id="post-main">
        <div id="blog-title">
          <Link
            style={{
              textDecoration: "none",
            }}
            href="/blog"
          >
            <h1 className="font-thin text-lg">{`Nate's Blog`}</h1>
          </Link>
          <hr />
        </div>
        <div className="post">
          <header>
            <h2 id="post-title">{title}</h2>
            <p>{description}</p>
            <time className="published" dateTime={date}>
              {formatDateString(date)}
            </time>
          </header>
          <MarkdownContent content={html} />
        </div>
        <ul
          style={{
            display: `flex`,
            flexWrap: `wrap`,
            justifyContent: `space-between`,
            listStyle: `none`,
            padding: "2em",
          }}
        >
          {previous && (
            <li>
              <Link href={previous.fields.slug}>
                {" "}
                {previous.frontmatter.title}{" "}
              </Link>{" "}
            </li>
          )}
          {next && (
            <li>
              <Link href={next.fields.slug}> {next.frontmatter.title} </Link>
            </li>
          )}
        </ul>
      </div>
    </div>
  );
}
