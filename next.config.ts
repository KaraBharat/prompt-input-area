import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    unoptimized: true,
    remotePatterns: [{ hostname: "www.bharatkara.com" }],
  },
};

export default nextConfig;
