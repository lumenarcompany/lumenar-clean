import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* Static export: GitHub Pages serves out/ at lumenar.company. */
  output: 'export',
  trailingSlash: true,
  images: { unoptimized: true },
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
