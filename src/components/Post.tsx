import React from "react";
import { formatDateString } from "@/utils";
import { Blog } from "@/app/types";
import Link from "next/link";

const Post = ({ post }: { post: Blog }) => {
  const { fields, frontmatter } = post;
  const { title, date, description, tags } = frontmatter;
  return (
<article 
          key={post.fields.slug}
          className="group rounded-lg w-full bg-gray-800/50 p-6 transition-all hover:bg-gray-800"
        >
          <Link href={`/blog/${post.fields.slug}`} className="block space-y-2">
            <h2 className="text-xl font-medium text-yellow-400 group-hover:text-yellow-300">
              {title}
            </h2>
            
            <time className="block text-sm text-gray-400">
              {formatDateString(post.frontmatter.date)}
            </time>
            
            <p className="text-base text-gray-300">
              {post.frontmatter.description}
            </p>

            {post.frontmatter.tags && (
              <div className="flex flex-wrap gap-2 pt-2">
                {post.frontmatter.tags.map((tag) => (
                  <span 
                    key={tag}
                    className="text-sm text-yellow-400/70"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            )}
          </Link>
        </article>
  );
};

export default Post;
