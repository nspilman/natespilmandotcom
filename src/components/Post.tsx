import React from "react";
import { formatDateString } from "@/utils";
import { Blog } from "@/app/types";
import Link from "next/link";

const Post = ({ post }: { post: Blog }) => {
  const { fields, frontmatter } = post;
  const { title, date, description, tags } = frontmatter;
  return (
    <div className="card-blog">
      <Link href={`blog/${fields.slug}`} style={{ textDecoration: "none" }}>
        <h3>{title}</h3>
        <p style={{ color: "white" }}>{formatDateString(date)}</p>
        <p style={{ color: "white" }}>{description}</p>
        <p className="tags">
          {tags?.map((tag) => (
            <span className="tag" key={tag}>
              #{tag}{" "}
            </span>
          ))}
        </p>
      </Link>
    </div>
  );
};

export default Post;
