import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      // Blog root
      {
        source: "/blog",
        destination:
          "https://darkseagreen-turtle-359545.hostingersite.com",
      },

      // Blog content
      {
        source: "/blog/:path*",
        destination:
          "https://darkseagreen-turtle-359545.hostingersite.com/:path*",
      },

      // WordPress admin (needed for login redirect)
      {
        source: "/wp-admin/:path*",
        destination:
          "https://darkseagreen-turtle-359545.hostingersite.com/wp-admin/:path*",
      },

      // WordPress login
      {
        source: "/wp-login.php",
        destination:
          "https://darkseagreen-turtle-359545.hostingersite.com/wp-login.php",
      },

      // WordPress AJAX + API (prevents future breakage)
      {
        source: "/wp-json/:path*",
        destination:
          "https://darkseagreen-turtle-359545.hostingersite.com/wp-json/:path*",
      },

      {
        source: "/wp-admin/admin-ajax.php",
        destination:
          "https://darkseagreen-turtle-359545.hostingersite.com/wp-admin/admin-ajax.php",
      },
    ];
  },
};

export default nextConfig;
