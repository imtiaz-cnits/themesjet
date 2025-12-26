"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { auth } from "@/lib/auth";
import { z } from "zod";

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
        return { success: true };
    } catch (error) {
        return { error: "Failed to update product" };
    }
}

// --- CREATE PRODUCT (Keep existing) ---
export async function createProduct(formData: FormData) {
    // ... (Your existing create logic) ...
    // Copy the logic from previous steps here if you overwrote the file,
    // or just append updateProduct to the existing file.

    // Quick Re-paste for safety:
    const session = await auth();
    if (!session || session.user.role !== "ADMIN") return { error: "Unauthorized" };

    const rawData = Object.fromEntries(formData.entries());
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
        return { success: true };
    } catch (e) {
        return { error: "Failed to create" };
    }
}

// --- DELETE PRODUCT (Keep existing) ---
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
        return { success: "Product deleted successfully" };
    } catch (error) {
        return { error: "Failed to delete product" };
    }
}