import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import AdminUsersClient from "@/components/admin/AdminUsersClient";

export default async function AdminUsersPage() {
    const session = await auth();

    // 1. Secure Route
    if (!session || session.user.role !== "ADMIN") {
        redirect("/login");
    }

    // 2. Fetch Users with Account Info
    const users = await prisma.user.findMany({
        orderBy: {
            createdAt: "desc",
        },
        select: {
            id: true,
            name: true,
            email: true,
            image: true,
            role: true,
            createdAt: true,
            _count: {
                select: { orders: true }
            },
            // FIX: Fetch linked accounts to determine signup method
            accounts: {
                select: { provider: true }
            }
        }
    });

    return (
        <div>
            <div className="mb-8">
                <h1 className="text-3xl font-heading font-bold text-foreground mb-2">User Management</h1>
                <p className="text-muted-foreground">Manage user roles, permissions, and accounts.</p>
            </div>

            <AdminUsersClient users={users} />
        </div>
    );
}