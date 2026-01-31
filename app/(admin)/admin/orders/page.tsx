import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import AdminOrdersClient from "@/components/admin/AdminOrdersClient";

export default async function AdminOrdersPage() {
    const session = await auth();

    // 1. Secure Route: Ensure only Admins can access
    if (!session || session.user.role !== "ADMIN") {
        redirect("/login");
    }

    // 2. Fetch All Orders
    const orders = await prisma.order.findMany({
        include: {
            user: {
                select: { name: true, email: true, image: true }
            },
            items: {
                include: {
                    product: { select: { name: true } }
                }
            }
        },
        orderBy: {
            createdAt: "desc"
        }
    });

    // 3. Serialize Data (Convert Decimals/Dates)
    const formattedOrders = orders.map(order => ({
        ...order,
        total: Number(order.total),
        items: order.items.map(item => ({
            ...item,
            price: Number(item.price),
        }))
    }));

    return (
        <div>
            <div className="mb-8">
                <h1 className="text-3xl font-heading font-bold text-foreground mb-2">Order Management</h1>
                <p className="text-muted-foreground">View and manage all customer transactions.</p>
            </div>

            <AdminOrdersClient initialOrders={formattedOrders} />
        </div>
    );
}