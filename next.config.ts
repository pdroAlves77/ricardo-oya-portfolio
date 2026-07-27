import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.sanity.io",
        pathname: "/images/**",
      },
    ],

    formats: ["image/avif", "image/webp"],

    minimumCacheTTL: 60 * 60 * 24 * 7,
  },

  poweredByHeader: false,

  reactStrictMode: true,
};

export default nextConfig;