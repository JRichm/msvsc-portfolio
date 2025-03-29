import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    output: 'export',
    images: {
      remotePatterns: [
        {
          protocol: 'https',
          hostname: 'raw.githubusercontent.com',
          pathname: '**',
        },
      ],
    },
};

export default nextConfig;
