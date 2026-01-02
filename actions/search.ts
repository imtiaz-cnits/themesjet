// actions/search.ts
"use server";

import { prisma } from "@/lib/prisma";

export async function searchProducts(query: string) {
    if (!query || query.length < 2) return [];

    try {
        const products = await prisma.product.findMany({
            where: {
                OR: [
                    { name: { contains: query, mode: "insensitive" } },
                    { description: { contains: query, mode: "insensitive" } },
                    { category: { contains: query, mode: "insensitive" } },
                    // Search in tags array if needed (Postgres specific syntax)
                    { tags: { has: query } }
                ],
                // Only show published/valid products
            },
            take: 5, // Limit results for the dropdown
            select: {
                id: true,
                name: true,
                category: true,
                imageUrl: true,
                price: true
            }
        });

        return products;
    } catch (error) {
        console.error("Search Error:", error);
        return [];
    }
}