import { NextConfig } from "next";

const nextConfig: NextConfig = {
  async headers() {
    return [
      {
        source: "/:all*(svg|jpg|png|webp|woff2|woff|ttf|css|js)",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
          {
            key: "Access-Control-Allow-Origin",
            value: "*",
          },
        ],
      },
      {
        source: "/_next/image",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
          {
            key: "Content-Disposition",
            value: "inline",
          },
        ],
      },
    ];
  },

  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },

  images: {
    domains: ["stendfast.by"],
    formats: ["image/webp"],
    minimumCacheTTL: 60 * 60 * 24 * 30,
  },

  compress: true,

  productionBrowserSourceMaps: false,
  reactStrictMode: true,
};

export default nextConfig;
