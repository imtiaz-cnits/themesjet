"use server";

import { prisma } from "@/lib/prisma";

// 1. Fetch All Posts (With Pagination)
export async function getPosts(page: number = 1, limit: number = 6) {
    try {
        const skip = (page - 1) * limit;

        const [posts, total] = await Promise.all([
            prisma.post.findMany({
                where: { published: true },
                orderBy: { createdAt: "desc" },
                skip,
                take: limit,
            }),
            prisma.post.count({ where: { published: true } })
        ]);

        return {
            posts,
            totalPages: Math.ceil(total / limit),
            currentPage: page
        };
    } catch (error) {
        console.error("Error fetching posts:", error);
        return { posts: [], totalPages: 0, currentPage: 1 };
    }
}

// 2. Fetch Single Post by Slug
export async function getPostBySlug(slug: string) {
    try {
        const post = await prisma.post.findUnique({
            where: { slug },
        });
        return post;
    } catch (error) {
        console.error("Error fetching post:", error);
        return null;
    }
}

// 3. Fetch Featured Post (Latest one)
export async function getFeaturedPost() {
    try {
        const post = await prisma.post.findFirst({
            where: { published: true },
            orderBy: { createdAt: "desc" },
        });
        return post;
    } catch (error) {
        return null;
    }
}