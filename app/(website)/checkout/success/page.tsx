import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { redirect, notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { Download, FileText, Check, ArrowRight, Copy, ShieldCheck, Home, FileCode } from "lucide-react";
import OrderSuccessClient from "@/components/checkout/OrderSuccessClient"; // Client wrapper for animations/clipboard

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

    return (
        <OrderSuccessClient order={order} userEmail={session.user.email} />
    );
}