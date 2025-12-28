import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { redirect, notFound } from "next/navigation";
import OrderSuccessClient from "@/components/checkout/OrderSuccessClient";

// Server Component to fetch data
export default async function OrderSuccessPage(props: { searchParams: Promise<{ orderId?: string }> }) {
    const searchParams = await props.searchParams;
    const orderId = searchParams?.orderId;
    const session = await auth();

    if (!orderId) redirect("/");
    if (!session) redirect("/login");

    // 1. Fetch Order & Items
    const order = await prisma.order.findUnique({
        where: { id: orderId },
        include: {
            items: {
                include: {
                    product: true
                }
            }
        }
    });

    // 2. Security Check: Ensure order belongs to logged-in user
    if (!order || order.userId !== session.user.id) {
        return notFound();
    }

    // 3. Mark as Completed (if coming from Stripe success)
    if (order.status === "PENDING") {
        await prisma.order.update({
            where: { id: orderId },
            data: { status: "COMPLETED" }
        });
    }

    // 4. FIX: Serialize Data
    const formattedOrder = {
        ...order,
        total: Number(order.total),
        items: order.items.map((item) => ({
            ...item,
            price: Number(item.price),
            product: {
                ...item.product,
                price: Number(item.product.price),
                // FIX: 'rating' is not in DB, so we default to 5 or 0
                rating: 5,
            }
        }))
    };

    return (
        <OrderSuccessClient order={formattedOrder} userEmail={session.user.email} />
    );
}