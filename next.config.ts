import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    output: 'export',
    images:{
        domains: ['raw.githubusercontent.com']
    }
};

export default nextConfig;
