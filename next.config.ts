import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
        port: '',
        pathname: '/**',
      },
    ],
  },
  async rewrites() {
    return [
      {
        source: "/blog",
        destination:
          "https://darkseagreen-turtle-359545.hostingersite.com/blog",
      },
      {
        source: "/blog/:path*",
        destination:
          "https://darkseagreen-turtle-359545.hostingersite.com/blog/:path*",
      },
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
    ];
  }
};

export default nextConfig;
