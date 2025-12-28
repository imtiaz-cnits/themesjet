import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import UserDashboardClient from "@/components/user/UserDashboardClient";

export default async function DashboardPage() {
    const session = await auth();

    // 1. Protect Route
    if (!session) {
        redirect("/login");
    }

    // 2. Fetch User's Orders
    const orders = await prisma.order.findMany({
        where: {
            userId: session.user.id,
            status: "COMPLETED", // Only fetch paid orders
        },
        include: {
            items: {
                include: {
                    product: true, // Get product details for each item
                },
            },
        },
        orderBy: {
            createdAt: "desc",
        },
    });

    // 3. Calculate Stats
    const totalSpent = orders.reduce((acc, order) => acc + Number(order.total), 0);
    const productsOwned = orders.reduce((acc, order) => acc + order.items.length, 0);

    // 4. Flatten Orders into a list of Purchased Products
    const purchases = orders.flatMap((order) =>
        order.items.map((item) => ({
            id: item.product.id,
            name: item.product.name,
            date: order.createdAt,
            price: Number(item.price), // Price at time of purchase
            image: item.product.imageUrl,
            version: item.product.version || "v1.0",
            fileUrl: item.product.fileUrl,
            category: item.product.category,
        }))
    );

    // 5. Render Client Component
    return (
        <UserDashboardClient
            user={session.user}
            stats={{ totalSpent, productsOwned }}
            purchases={purchases}
        />
    );
}