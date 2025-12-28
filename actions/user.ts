"use server";

import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function updateUserProfile(data: { firstName?: string; lastName?: string; image?: string }) {
    const session = await auth();

    if (!session || !session.user) {
        return { error: "Unauthorized" };
    }

    try {
        // Construct the update data dynamically
        const updateData: any = {};

        if (data.image) {
            updateData.image = data.image;
        }

        if (data.firstName || data.lastName) {
            // Fetch current name to handle partial updates if needed
            // For now, we assume both are sent or we reconstruct
            const fullName = `${data.firstName || ""} ${data.lastName || ""}`.trim();
            if (fullName) updateData.name = fullName;
        }

        await prisma.user.update({
            where: { id: session.user.id },
            data: updateData,
        });

        revalidatePath("/user/dashboard"); // Refresh server data
        return { success: true };
    } catch (error) {
        console.error("Profile Update Error:", error);
        return { error: "Failed to update profile" };
    }
}