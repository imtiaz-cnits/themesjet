"use server";

import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import Stripe from "stripe";

// FIX: Cast apiVersion to 'any' to bypass strict TypeScript mismatch
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
    apiVersion: "2025-01-27.acacia" as any,
});

export async function createCheckoutSession(cartItems: any[]) {
    const session = await auth();

    if (!session || !session.user || !session.user.id) {
        return { error: "You must be logged in to checkout." };
    }

    if (cartItems.length === 0) {
        return { error: "Your cart is empty." };
    }

    try {
        const totalAmount = cartItems.reduce((acc: number, item: any) => acc + item.price, 0);

        const newOrder = await prisma.order.create({
            data: {
                user: {
                    connect: { id: session.user.id }
                },
                total: totalAmount,
                status: "PENDING",
                // FIX: Now using 'items' because we renamed it in schema.prisma
                items: {
                    create: cartItems.map((item: any) => ({
                        productId: item.id,
                        price: item.price
                    }))
                }
            }
        });

        const stripeSession = await stripe.checkout.sessions.create({
            payment_method_types: ["card"],
            line_items: cartItems.map((item: any) => ({
                price_data: {
                    currency: "usd",
                    product_data: {
                        name: item.name,
                        images: [item.image],
                    },
                    unit_amount: Math.round(item.price * 100),
                },
                quantity: 1,
            })),
            mode: "payment",
            success_url: `${process.env.NEXT_PUBLIC_APP_URL}/checkout/success?orderId=${newOrder.id}`,
            cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/cart`,
            metadata: {
                orderId: newOrder.id,
                userId: session.user.id
            }
        });

        if (stripeSession.url) {
            return { url: stripeSession.url };
        } else {
            return { error: "Failed to create Stripe session." };
        }

    } catch (error) {
        console.error("Checkout Error:", error);
        return { error: "Something went wrong during checkout." };
    }
}