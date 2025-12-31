"use server";

import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { revalidatePath } from "next/cache";

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

// 4. Create New-Post (ADMIN)
export async function createPost(data: {
    title: string;
    slug: string;
    excerpt: string;
    content: string;
    coverImage: string;
    category: string;
    readTime: string;
}) {
    const session = await auth();
    // @ts-ignore
    if (!session || session.user.role !== "ADMIN") return { error: "Unauthorized" };

    try {
        // Check slug uniqueness
        const existing = await prisma.post.findUnique({ where: { slug: data.slug } });
        if (existing) return { error: "Slug already exists. Choose a unique one." };

        await prisma.post.create({
            data: {
                ...data,
                author: session.user.name || "Admin",
                published: true
            }
        });

        revalidatePath("/insights");
        revalidatePath("/admin/insights");
        return { success: "Post published successfully!" };
    } catch (error) {
        console.error("Create Post Error:", error);
        return { error: "Failed to create post." };
    }
}

// 5. Delete Post (ADMIN)
export async function deletePost(id: string) {
    const session = await auth();
    // @ts-ignore
    if (!session || session.user.role !== "ADMIN") return { error: "Unauthorized" };

    try {
        await prisma.post.delete({ where: { id } });
        revalidatePath("/insights");
        revalidatePath("/admin/insights");
        return { success: "Post deleted." };
    } catch (error) {
        return { error: "Failed to delete post." };
    }
}

// 6. Update Post (ADMIN)
export async function updatePost(id: string, data: {
    title: string;
    slug: string;
    excerpt: string;
    content: string;
    coverImage: string;
    category: string;
    readTime: string;
}) {
    const session = await auth();
    // @ts-ignore
    if (!session || session.user.role !== "ADMIN") return { error: "Unauthorized" };

    try {
        // Check uniqueness only if slug changed
        const existing = await prisma.post.findFirst({
            where: {
                slug: data.slug,
                NOT: { id: id } // Exclude current post from check
            }
        });

        if (existing) return { error: "Slug already in use by another post." };

        await prisma.post.update({
            where: { id },
            data: {
                ...data,
                // We keep the original author and publish date
            }
        });

        revalidatePath("/insights");
        revalidatePath("/admin/insights");
        revalidatePath(`/insights/${data.slug}`);

        return { success: "Post updated successfully!" };
    } catch (error) {
        console.error("Update Post Error:", error);
        return { error: "Failed to update post." };
    }
}

// 7. Get Related Posts
export async function getRelatedPosts(currentSlug: string, limit: number = 4) {
    try {
        const posts = await prisma.post.findMany({
            where: {
                published: true,
                slug: { not: currentSlug } // Exclude current post
            },
            take: limit,
            orderBy: { createdAt: "desc" }
        });
        return posts;
    } catch (error) {
        return [];
    }
}