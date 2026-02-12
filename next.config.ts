import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return {
      beforeFiles: [
        // Force ALL blog traffic to WordPress
        {
          source: "/blog/:path*",
          destination:
            "https://darkseagreen-turtle-359545.hostingersite.com/:path*",
        },

        // Root /blog
        {
          source: "/blog",
          destination:
            "https://darkseagreen-turtle-359545.hostingersite.com",
        },

        // WordPress core routes (admin + API)
        {
          source: "/wp-admin/:path*",
          destination:
            "https://darkseagreen-turtle-359545.hostingersite.com/wp-admin/:path*",
        },
        {
          source: "/wp-login.php",
          destination:
            "https://darkseagreen-turtle-359545.hostingersite.com/wp-login.php",
        },
        {
          source: "/wp-json/:path*",
          destination:
            "https://darkseagreen-turtle-359545.hostingersite.com/wp-json/:path*",
        },
      ],
    };
  },
};

export default nextConfig;
