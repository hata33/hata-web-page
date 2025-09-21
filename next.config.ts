import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // 支持 standalone 构建
  output: 'standalone',
  turbopack: {
    rules: {
      "*.svg": {
        loaders: ["@svgr/webpack"],
        as: "*.js",
      },
    }
  },
};

export default nextConfig;
