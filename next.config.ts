import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: "/blog",
        destination: "https://darkseagreen-turtle-359545.hostingersite.com",
      },
      {
        source: "/blog/:path*",
        destination:
          "https://darkseagreen-turtle-359545.hostingersite.com/:path*",
      },
    ];
  },
};

export default nextConfig;
