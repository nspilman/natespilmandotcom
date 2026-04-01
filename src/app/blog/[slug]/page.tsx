import { MarkdownContent } from "@/components/RenderMarkdown";
import { DocumentContent } from "@/components/standard-site/DocumentContent";
import { getAllUnifiedPosts, getPostBySlug } from "@/lib/api";
import { fetchDocument, blobUrl } from "@/lib/standard-site";
import { formatDateString } from "@/utils";
import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import React from "react";

interface Props {
  params: {
    slug: string;
  };
}

async function resolvePost(slug: string) {
  try {
    const post = getPostBySlug(slug);
    return { source: "markdown" as const, post };
  } catch {
    const record = await fetchDocument(slug);
    return { source: "atproto" as const, record };
  }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const resolved = await resolvePost(params.slug);

  if (resolved.source === "markdown") {
    const { title, description, date } = resolved.post.frontmatter;
    return {
      title,
      description,
      openGraph: {
        title,
        description,
        type: "article",
        publishedTime: date,
        url: `https://natespilman.com/blog/${params.slug}`,
        siteName: "Nate Spilman Dot Com",
      },
      twitter: {
        card: "summary",
        title,
        description,
      },
    };
  }

  const { title, description, publishedAt, coverImage } = resolved.record.value;
  return {
    title: `${title} - Nate Spilman`,
    description: description || title,
    openGraph: {
      title,
      description: description || title,
      type: "article",
      publishedTime: publishedAt,
      url: `https://natespilman.com/blog/${params.slug}`,
      siteName: "Nate Spilman Dot Com",
      ...(coverImage && {
        images: [{ url: blobUrl(coverImage.ref.$link) }],
      }),
    },
    twitter: {
      card: coverImage ? "summary_large_image" : "summary",
      title,
      description: description || title,
    },
  };
}

export default async function Post({ params }: { params: { slug: string } }) {
  const resolved = await resolvePost(params.slug);

  if (resolved.source === "markdown") {
    const { post } = resolved;
    const allPosts = await getAllUnifiedPosts();
    const postIndex = allPosts.findIndex((p) => p.slug === params.slug);
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
                    href={`/blog/${previous.slug}`}
                    className="text-gray-400 hover:text-yellow-400 transition-colors"
                  >
                    ← {previous.title}
                  </Link>
                </li>
              )}
              {next && (
                <li>
                  <Link
                    href={`/blog/${next.slug}`}
                    className="text-gray-400 hover:text-yellow-400 transition-colors"
                  >
                    {next.title} →
                  </Link>
                </li>
              )}
            </ul>
          </nav>
        </article>
      </div>
    );
  }

  // AT Protocol document
  const { record } = resolved;
  const { title, publishedAt, description, tags, coverImage, content } =
    record.value;
  const contentType = (content as { $type?: string })?.$type;
  const isPckt = contentType === "blog.pckt.content";
  const sourceName = isPckt ? "pckt.blog" : "Leaflet";

  const crossPostLink = (
    <p className="text-sm text-gray-400">
      Cross-posted from {sourceName}
    </p>
  );

  return (
    <div className="min-h-screen px-6 py-12 md:px-8 lg:px-12 bg-gray-900/50">
      <article className="mx-auto max-w-6xl">
        <div className="mb-16">
          <Link href="/blog" className="block">
            <h1 className="text-2xl font-light hover:text-yellow-300">
              Nate&apos;s Blog
            </h1>
          </Link>
          <hr className="mt-6 border-gray-700" />
        </div>

        <div className="prose prose-lg prose-invert max-w-none space-y-4">
          <header className="space-y-1">
            {coverImage && (
              <div className="mb-6 mx-auto max-w-2xl overflow-hidden rounded-lg">
                <Image
                  src={blobUrl(coverImage.ref.$link)}
                  alt=""
                  width={672}
                  height={378}
                  priority
                  className="w-full h-auto rounded-lg"
                  sizes="(max-width: 672px) 100vw, 672px"
                />
              </div>
            )}

            <h2 className="text-4xl font-bold tracking-tight text-white">
              {title}
            </h2>

            {!isPckt && description && (
              <p className="text-xl text-gray-300 leading-relaxed">
                {description}
              </p>
            )}

            <time
              className="mt-8 block text-base text-gray-400"
              dateTime={publishedAt}
            >
              {formatDateString(publishedAt)}
            </time>

            {tags && tags.length > 0 && (
              <div className="flex flex-wrap gap-2 pt-2">
                {tags.map((tag) => (
                  <span key={tag} className="text-sm text-yellow-400/70">
                    #{tag}
                  </span>
                ))}
              </div>
            )}

            {crossPostLink}
          </header>

          <div className="mt-12 space-y-4">
            <DocumentContent document={record.value} />
          </div>

          {crossPostLink}
        </div>

        <nav className="mt-24 border-t border-gray-800 pt-8">
          <Link
            href="/blog"
            className="text-gray-400 hover:text-yellow-400 transition-colors"
          >
            ← Back to Blog
          </Link>
        </nav>
      </article>
    </div>
  );
}
