const withMDX = require("@next/mdx")();

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Configure `pageExtensions` to include MDX files
  pageExtensions: ["js", "jsx", "mdx", "ts", "tsx"],
  experimental: {
    appDir: true,
  },
  images: {
    domains: ["ihkgojiseqpwinwdowvm.supabase.co"],
  },
  // Optionally, add any other Next.js config below
};

module.exports = withMDX(nextConfig);
