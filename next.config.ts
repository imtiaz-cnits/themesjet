import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    /* config options here */
    // 1. Output 'standalone' creates a simplified build for cPanel/Docker
    output: 'standalone',

    // 2. Strict mode is good for dev, keep it
    reactStrictMode: true,

    // 3. If you use external images (like from your Uploadthing or demo sites)
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'images.unsplash.com', // Example for placeholder images
            },
            {
                protocol: 'https',
                hostname: 'utfs.io', // If you use Uploadthing later
            }
        ],
    },
};

export default nextConfig;