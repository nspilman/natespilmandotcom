const withMDX = require("@next/mdx")();

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Configure `pageExtensions` to include MDX files
  pageExtensions: ["js", "jsx", "mdx", "ts", "tsx"],
  experimental: {
    appDir: true,
  },
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "ihkgojiseqpwinwdowvm.supabase.co" },
      { protocol: "https", hostname: "oyster.us-east.host.bsky.network" },
    ],
  },
  // Optionally, add any other Next.js config below
};

module.exports = withMDX(nextConfig);
