import { Icons } from "@/components/Icons";
import Post from "@/components/Post";
import Link from "next/link";
import { getAllUnifiedPosts } from "@/lib/api";

export default async function Home() {
  const allPosts = await getAllUnifiedPosts();
  const recentPosts = allPosts.slice(0, 4);

  return (
    <div>
      <section className="hero">
        <div className="hero-container">
          <div className="mb-4 text-white">
            <h1 className="font-thin text-4xl">{`Hi, I'm Nate Spilman`}</h1>
            <p className="font-thin text-xl">
              I&apos;m a software developer, musician and creative organizer.
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
              <Post post={post} key={post.slug} />
            ))}
            <div className="flex justify-center pt-6">
              <Link
                href="/blog"
                className="transition-colors text-lg font-medium"
              >
                View All Posts ({allPosts.length - recentPosts.length} more) →
              </Link>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
