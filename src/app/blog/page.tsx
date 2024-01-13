import React from "react";
import { getAllPosts } from "@/lib/api";
import Post from "@/components/Post";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog",
};

const BlogPage = () => {
  const posts = getAllPosts();

  return (
    <div className="p-8 md:p-20">
      <div id="blog-page">
        <h1>{`Nate's Blog`}</h1>
        <hr />
        <div id="blog-post-wrapper">
          <article id="blog" className="panel special">
            <div className="content">
              <div className="card-blog-container">
                {posts.map((post) => (
                  <Post post={post} key={post.id} />
                ))}
              </div>
            </div>
          </article>
        </div>
      </div>
    </div>
  );
};

export default BlogPage;
