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
            status: "COMPLETED",
        },
        include: {
            items: {
                include: {
                    product: true,
                },
            },
        },
        orderBy: {
            createdAt: "desc",
        },
    });

    // 3. Fetch User's Reviews
    const reviews = await prisma.review.findMany({
        where: { userId: session.user.id },
        include: {
            product: {
                select: { name: true, imageUrl: true }
            }
        },
        orderBy: { createdAt: "desc" }
    });

    // 4. Calculate Stats
    const totalSpent = orders.reduce((acc, order) => acc + Number(order.total), 0);
    const productsOwned = orders.reduce((acc, order) => acc + order.items.length, 0);

    // 5. Flatten Orders & Check Review Status
    const purchases = orders.flatMap((order) =>
        order.items.map((item) => ({
            id: item.product.id,
            name: item.product.name,
            date: order.createdAt,
            price: Number(item.price),
            image: item.product.imageUrl,
            version: item.product.version || "v1.0",
            fileUrl: item.product.fileUrl,
            category: item.product.category,
            // Check if this product ID exists in the user's reviews
            hasReviewed: reviews.some((r) => r.productId === item.product.id)
        }))
    );

    // 6. Render Client Component
    return (
        <UserDashboardClient
            user={session.user}
            stats={{ totalSpent, productsOwned }}
            purchases={purchases}
            reviews={reviews} // Pass reviews to client
        />
    );
}