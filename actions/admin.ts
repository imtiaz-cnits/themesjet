"use server";

import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

// --- 1. Delete User ---
export async function deleteUser(userId: string) {
    const session = await auth();

    // Security: Must be Admin
    if (!session || session.user.role !== "ADMIN") {
        return { error: "Unauthorized" };
    }

    // Safety: Admin cannot delete themselves
    if (userId === session.user.id) {
        return { error: "You cannot delete your own account." };
    }

    try {
        await prisma.user.delete({
            where: { id: userId },
        });
        revalidatePath("/admin/users");
        return { success: "User deleted successfully." };
    } catch (error) {
        return { error: "Failed to delete user." };
    }
}

// --- 2. Update User Role ---
export async function updateUserRole(userId: string, newRole: "USER" | "ADMIN") {
    const session = await auth();

    if (!session || session.user.role !== "ADMIN") {
        return { error: "Unauthorized" };
    }

    if (userId === session.user.id) {
        return { error: "You cannot change your own role." };
    }

    try {
        await prisma.user.update({
            where: { id: userId },
            data: { role: newRole },
        });
        revalidatePath("/admin/users");
        return { success: `User role updated to ${newRole}` };
    } catch (error) {
        return { error: "Failed to update role." };
    }
}

// --- 3. Get Dashboard Notifications (Recent Activity) ---
// FIX: Added 'limit' parameter with a default value of 5
export async function getDashboardNotifications(limit = 5) {
    const session = await auth();

    if (!session || session.user.role !== "ADMIN") return [];

    try {
        // A. Fetch recent orders (up to limit)
        const recentOrders = await prisma.order.findMany({
            take: limit,
            orderBy: { createdAt: 'desc' },
            include: { user: { select: { name: true, email: true } } }
        });

        // B. Fetch recent new users (up to limit)
        const recentUsers = await prisma.user.findMany({
            take: limit,
            orderBy: { createdAt: 'desc' },
            where: { role: 'USER' } // Only show new customers, not admins
        });

        // C. Combine and Format
        const notifications = [
            ...recentOrders.map(order => ({
                id: `order-${order.id}`,
                title: "New Order Received",
                desc: `$${Number(order.total).toFixed(2)} from ${order.user.name || order.user.email}`,
                date: order.createdAt,
                type: "order",
                read: false
            })),
            ...recentUsers.map(user => ({
                id: `user-${user.id}`,
                title: "New User Registered",
                desc: `${user.name || user.email} just signed up.`,
                date: user.createdAt,
                type: "user",
                read: false
            }))
        ];

        // Sort by newest first and limit the total result
        return notifications
            .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
            .slice(0, limit);

    } catch (error) {
        console.error("Error fetching notifications:", error);
        return [];
    }
}