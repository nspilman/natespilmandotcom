import React from "react";
import Image from "next/image";
import { formatDateString } from "@/utils";
import { UnifiedPost } from "@/lib/api";
import Link from "next/link";

const Post = ({ post }: { post: UnifiedPost }) => {
  const { slug, title, date, description, tags, coverImageUrl } = post;
  return (
    <article
      key={slug}
      className="group rounded-lg w-full bg-gray-900/50 p-6 transition-all hover:bg-gray-800 mb-2"
    >
      <Link href={`/blog/${slug}`} className="block space-y-2">
        {coverImageUrl && (
          <div className="relative mb-3 overflow-hidden rounded-lg h-48">
            <Image
              src={coverImageUrl}
              alt=""
              fill
              className="object-cover rounded-lg transition-transform group-hover:scale-[1.02]"
              sizes="(max-width: 768px) 100vw, 600px"
            />
          </div>
        )}
        <h2 className="text-xl font-medium">{title}</h2>

        <time className="block text-sm text-gray-400">
          {formatDateString(date)}
        </time>

        <p className="text-base text-gray-300">{description}</p>

        {tags && tags.length > 0 && (
          <div className="flex flex-wrap gap-2 pt-2">
            {tags.map((tag) => (
              <span key={tag} className="text-sm text-yellow-400/70">
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
