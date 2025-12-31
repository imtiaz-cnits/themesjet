"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { auth } from "@/lib/auth";
import { z } from "zod";

// --- VALIDATION SCHEMA ---
const ProductSchema = z.object({
    name: z.string().min(3, "Name must be at least 3 characters"),
    description: z.string().min(10, "Description must be longer"),
    price: z.coerce.number().min(0.01, "Price must be greater than 0"),
    category: z.string().min(1, "Category is required"),
    framework: z.string().optional(),
    imageUrl: z.string().url("Thumbnail is required"),
    fileUrl: z.string().url("Product file is required"),
    tags: z.string().optional(),
});

// ==========================================
//  PUBLIC ACTIONS (For Website Frontend)
// ==========================================

// --- GET POPULAR PRODUCTS ---
export async function getPopularProducts() {
    try {
        // 1. Try to get top 3 products by sales count
        const products = await prisma.product.findMany({
            take: 3,
            orderBy: {
                orderItems: {
                    _count: 'desc'
                }
            },
            include: {
                _count: {
                    select: { orderItems: true }
                }
            }
        });

        // 2. Fallback: If no sales data exists yet, just get the 3 latest products
        if (products.length === 0) {
            return await prisma.product.findMany({
                take: 3,
                orderBy: { createdAt: 'desc' },
                include: {
                    _count: { select: { orderItems: true } }
                }
            });
        }

        return products;
    } catch (error) {
        console.error("Failed to fetch popular products:", error);
        return [];
    }
}

// --- GET LATEST PRODUCTS (Fresh from Lab) ---
export async function getLatestProducts() {
    try {
        const products = await prisma.product.findMany({
            take: 3,
            orderBy: {
                createdAt: 'desc' // Sort by newest
            },
            include: {
                _count: {
                    select: { orderItems: true } // Include sales count
                }
            }
        });
        return products;
    } catch (error) {
        console.error("Failed to fetch latest products:", error);
        return [];
    }
}


// ==========================================
//  ADMIN ACTIONS (Protected)
// ==========================================

// --- CREATE PRODUCT ---
export async function createProduct(formData: FormData) {
    const session = await auth();
    if (!session || session.user.role !== "ADMIN") return { error: "Unauthorized" };

    const rawData = {
        name: formData.get("name"),
        description: formData.get("description"),
        price: formData.get("price"),
        category: formData.get("category"),
        framework: formData.get("framework"),
        imageUrl: formData.get("imageUrl"),
        fileUrl: formData.get("fileUrl"),
        tags: formData.get("tags"),
    };

    const validated = ProductSchema.safeParse(rawData);

    if (!validated.success) return { error: validated.error.issues[0].message };
    const data = validated.data;

    try {
        await prisma.product.create({
            data: {
                ...data,
                tags: data.tags ? data.tags.split(",").map(t => t.trim()) : [],
            }
        });
        revalidatePath("/admin/products");
        revalidatePath("/"); // Revalidate home page to show new product in popular section
        return { success: true };
    } catch (e) {
        return { error: "Failed to create" };
    }
}

// --- UPDATE PRODUCT ---
export async function updateProduct(id: string, formData: FormData) {
    const session = await auth();
    if (!session || session.user.role !== "ADMIN") {
        return { error: "Unauthorized" };
    }

    const rawData = {
        name: formData.get("name"),
        description: formData.get("description"),
        price: formData.get("price"),
        category: formData.get("category"),
        framework: formData.get("framework"),
        imageUrl: formData.get("imageUrl"),
        fileUrl: formData.get("fileUrl"),
        tags: formData.get("tags"),
    };

    const validated = ProductSchema.safeParse(rawData);

    if (!validated.success) {
        return { error: validated.error.issues[0].message };
    }

    const { name, description, price, category, framework, imageUrl, fileUrl, tags } = validated.data;

    try {
        await prisma.product.update({
            where: { id },
            data: {
                name,
                description,
                price,
                category,
                framework,
                imageUrl,
                fileUrl,
                tags: tags ? tags.split(",").map(t => t.trim()) : [],
            },
        });

        revalidatePath("/admin/products");
        revalidatePath(`/products/${id}`);
        revalidatePath("/"); // Revalidate home page
        return { success: true };
    } catch (error) {
        return { error: "Failed to update product" };
    }
}

// --- DELETE PRODUCT ---
export async function deleteProduct(id: string) {
    const session = await auth();
    if (!session || session.user.role !== "ADMIN") {
        return { error: "Unauthorized" };
    }

    try {
        await prisma.product.delete({
            where: { id },
        });
        revalidatePath("/admin/products");
        revalidatePath("/"); // Revalidate home page
        return { success: "Product deleted successfully" };
    } catch (error) {
        return { error: "Failed to delete product" };
    }
}