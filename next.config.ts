import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    /* config options here */

    // 1. Output 'standalone' creates a simplified build for cPanel/Docker/Vercel
    output: 'standalone',

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
                hostname: "**.ufs.sh", // NEW UploadThing domain structure (Fixes your 500 error)
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
            }
        ],
    },

    // 4. Increase timeout for heavy server actions (like large uploads) if needed
    // experimental: {
    //    serverActions: {
    //        bodySizeLimit: '10mb',
    //    },
    // },
};

export default nextConfig;