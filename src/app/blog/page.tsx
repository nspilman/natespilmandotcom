import React from "react";
import { getAllUnifiedPosts } from "@/lib/api";
import Post from "@/components/Post";
import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Blog",
};

export default async function BlogPage() {
  const posts = await getAllUnifiedPosts();

  return (
    <div className="p-8 md:p-20">
      <div id="blog-page">
        <div className="flex items-center gap-4 mb-6">
          <Link href="/" className="text-lg transition-colors">
            ← Home
          </Link>
        </div>
        <h1 className="font-thin text-lg">{`Nate's Blog`}</h1>
        <hr />
        <div id="blog-post-wrapper">
          <article id="blog" className="panel special">
            <div className="content">
              <div className="card-blog-container">
                {posts.map((post) => (
                  <Post post={post} key={post.slug} />
                ))}
              </div>
            </div>
          </article>
        </div>
      </div>
    </div>
  );
}
