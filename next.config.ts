import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  experimental: {
    serverActions: {
      bodySizeLimit: '100mb',
    },
    // Increase body size limit for file uploads in App Router
    middlewareClientMaxBodySize: '100mb',
  },
};

export default nextConfig;
