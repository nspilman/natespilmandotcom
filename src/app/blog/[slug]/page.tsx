import { MarkdownContent } from "@/components/RenderMarkdown";
import { DocumentContent } from "@/components/standard-site/DocumentContent";
import { getAllUnifiedPosts, getPostBySlug } from "@/lib/api";
import { fetchDocument, blobUrl, findSiteDocumentUri, SITE_URL } from "@/lib/standard-site";
import { formatDateString } from "@/utils";
import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import React from "react";

interface Props {
  params: {
    slug: string;
  };
}

async function resolvePost(slug: string) {
  let post;
  try {
    post = getPostBySlug(slug);
  } catch {
    const record = await fetchDocument(slug).catch(() => notFound());
    return { source: "atproto" as const, record };
  }
  // Drafts (published: false) render in `next dev` only.
  if (!post.published && process.env.NODE_ENV === "production") {
    notFound();
  }
  return { source: "markdown" as const, post };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const resolved = await resolvePost(params.slug);
  const url = `${SITE_URL}/blog/${params.slug}`;

  if (resolved.source === "markdown") {
    const { title, description, date } = resolved.post;
    return {
      title,
      description,
      openGraph: {
        title,
        description,
        type: "article",
        publishedTime: date,
        url,
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
      url,
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

const navLink = "text-gray-400 hover:text-yellow-400 transition-colors";

// The reading experience both sources share. Each source brings its own
// extras (cover image, tags, cross-post note), body and footer nav.
function PostShell({
  title,
  description,
  date,
  headerTop,
  headerBottom,
  nav,
  children,
}: {
  title: string;
  description?: string;
  date: string;
  headerTop?: React.ReactNode;
  headerBottom?: React.ReactNode;
  nav: React.ReactNode;
  children: React.ReactNode;
}) {
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
            {headerTop}
            <h2 className="text-4xl font-bold tracking-tight text-white">
              {title}
            </h2>
            {description && (
              <p className="text-xl text-gray-300 leading-relaxed">
                {description}
              </p>
            )}
            {date && (
              <time className="mt-8 block text-base text-gray-400" dateTime={date}>
                {formatDateString(date)}
              </time>
            )}
            {headerBottom}
          </header>

          {children}
        </div>

        <nav className="mt-24 border-t border-gray-800 pt-8">{nav}</nav>
      </article>
    </div>
  );
}

export default async function Post({ params }: Props) {
  const resolved = await resolvePost(params.slug);

  if (resolved.source === "markdown") {
    const { post } = resolved;
    const allPosts = await getAllUnifiedPosts();
    const postIndex = allPosts.findIndex((p) => p.slug === post.slug);
    const [previous, next] = [allPosts[postIndex + 1], allPosts[postIndex - 1]];
    const documentUri = post.published
      ? await findSiteDocumentUri(`/blog/${post.slug}`).catch(() => undefined)
      : undefined;

    return (
      <PostShell
        title={post.title}
        description={post.description}
        date={post.date}
        nav={
          <ul className="flex flex-wrap justify-between gap-4">
            {previous && (
              <li>
                <Link href={`/blog/${previous.slug}`} className={navLink}>
                  ← {previous.title}
                </Link>
              </li>
            )}
            {next && (
              <li>
                <Link href={`/blog/${next.slug}`} className={navLink}>
                  {next.title} →
                </Link>
              </li>
            )}
          </ul>
        }
      >
        {/* standard.site document verification, once publish-posts.ts has synced it */}
        {documentUri && <link rel="site.standard.document" href={documentUri} />}
        <div className="mt-12 space-y-8">
          <MarkdownContent content={post.markdown} />
        </div>
      </PostShell>
    );
  }

  // AT Protocol document
  const { record } = resolved;
  const { title, publishedAt, description, tags, coverImage, content } =
    record.value;
  const isPckt = (content as { $type?: string })?.$type === "blog.pckt.content";

  const crossPostLink = (
    <p className="text-sm text-gray-400">
      Cross-posted from {isPckt ? "pckt.blog" : "Leaflet"}
    </p>
  );

  return (
    <PostShell
      title={title}
      description={isPckt ? undefined : description}
      date={publishedAt}
      headerTop={
        coverImage && (
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
        )
      }
      headerBottom={
        <>
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
        </>
      }
      nav={
        <Link href="/blog" className={navLink}>
          ← Back to Blog
        </Link>
      }
    >
      <div className="mt-12 space-y-4">
        <DocumentContent document={record.value} />
      </div>
      {crossPostLink}
    </PostShell>
  );
}
