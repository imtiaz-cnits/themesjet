import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    /* config options here */

    // 1. Output 'standalone' creates a simplified build for cPanel/Docker/Vercel
    // output: 'standalone',

    // 2. Strict mode is good for dev, keep it
    reactStrictMode: true,

    // 3. Allowed Image Domains
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "utfs.io", // Old UploadThing domain (keep for compatibility)
                pathname: "/**"
            },
            {
                protocol: "https",
                hostname: "**.ufs.sh", // NEW UploadThing domain structure
                pathname: "/**"
            },
            {
                protocol: "https",
                hostname: "lh3.googleusercontent.com", // Allow Google User Avatars
                pathname: "/**"
            },
            {
                protocol: "https",
                hostname: "avatars.githubusercontent.com", // Allow GitHub User Avatars
                pathname: "/**"
            },
            {
                protocol: "https",
                hostname: "images.unsplash.com", // Unsplash (Mock Data Images)
                pathname: "/**"
            },
            {
                protocol: "https",
                hostname: "ui-avatars.com",
                pathname: "/**"
            }
        ],
    },

    // 4. URL Rewrites (Fixes 404 on Vercel for /templates links)
    async rewrites() {
        return [
            {
                // When a user visits https://themesjet.com/templates/...
                source: '/templates/:path*',

                // Next.js will fetch the content from your cPanel server
                // REPLACE 'https://YOUR_CPANEL_IP_OR_DOMAIN' with your actual cPanel URL
                destination: 'https://160.191.80.34/templates/:path*',
            },
        ];
    },
};

export default nextConfig;