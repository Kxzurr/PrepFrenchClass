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
      {
        protocol: 'https',
        hostname: 'lavenderblush-camel-117734.hostingersite.com',
        port: '',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;
