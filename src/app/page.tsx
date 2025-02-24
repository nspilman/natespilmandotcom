import { Icons } from "@/components/Icons";
import { Blog } from "./types";
import Post from "@/components/Post";
import Link from "next/link";
import { getPosts, getPostsCount } from "@/lib/api";

export default function Home() {
  const recentPosts: Blog[] = getPosts(4);

  return (
    <div>
      {/* <SEO title="Home" /> */}
      <section className="hero">
        <div className="hero-container">
          <div className="mb-4 text-white">
            <h1 className="font-thin text-4xl">{`Hi, I'm Nate Spilman`}</h1>
            <p className="font-thin text-xl">
              I’m a software developer, musician and creative organizer.
            </p>
          </div>
          <div className="nate"></div>
          <Icons />
        </div>
      </section>

      <main className="main">
        <div className="content-container">
          <div className="card-header">
            <h2>{`Nate's Blog`}</h2>
            <hr />
          </div>
          <div className="card-blog-container space-y-4">
            {recentPosts.map((post) => (
              <Post post={post} key={post.fields.slug} />
            ))}
            <div className="flex justify-center pt-6">
              <Link 
                href="/blog"
                className="transition-colors text-lg font-medium"
              >
                View All Posts ({getPostsCount() - recentPosts.length} more) →
              </Link>
            </div>
          </div>
          {/* <div className="card-header">
            <h2>{`Nate's Music`}</h2>
            <hr />
          </div>
          <div className="card-music">
            <h3>{song.frontmatter.title}</h3>
            <p>{song.frontmatter.description}</p>
            <div>
              <div dangerouslySetInnerHTML={{ __html: song.html }} />
            </div>
          </div> */}
          {/* <div className="button-container">
            <Link href="/music">
              <button>Listen</button>
            </Link>
          </div> */}
        </div>
      </main>
    </div>
  );
}
