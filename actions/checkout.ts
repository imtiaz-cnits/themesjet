"use server";

import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import Stripe from "stripe";
import { redirect } from "next/navigation";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
    apiVersion: "2025-01-27.acacia",
});

export async function createCheckoutSession(cartItems: any[]) {
    const session = await auth();

    if (!session || !session.user) {
        return { error: "You must be logged in to checkout." };
    }

    if (cartItems.length === 0) {
        return { error: "Your cart is empty." };
    }

    try {
        // 1. Calculate Total
        const totalAmount = cartItems.reduce((acc: number, item: any) => acc + item.price, 0);

        // 2. Create Order in Database (Status: PENDING)
        // We do this BEFORE Stripe so we have a record even if they abandon payment
        const newOrder = await prisma.order.create({
            data: {
                userId: session.user.id,
                total: totalAmount,
                status: "PENDING",
                items: {
                    create: cartItems.map((item: any) => ({
                        productId: item.id,
                        price: item.price // Store snapshot of price at purchase time
                    }))
                }
            }
        });

        // 3. Create Stripe Session
        const stripeSession = await stripe.checkout.sessions.create({
            payment_method_types: ["card"],
            line_items: cartItems.map((item: any) => ({
                price_data: {
                    currency: "usd",
                    product_data: {
                        name: item.name,
                        images: [item.image], // Optional: Show image in Stripe
                    },
                    unit_amount: Math.round(item.price * 100), // Stripe expects cents
                },
                quantity: 1,
            })),
            mode: "payment",
            // Redirect URLs
            success_url: `${process.env.NEXT_PUBLIC_APP_URL}/checkout/success?orderId=${newOrder.id}`,
            cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/cart`,
            // Metadata to link Stripe back to our DB later (via Webhook)
            metadata: {
                orderId: newOrder.id,
                userId: session.user.id
            }
        });

        // 4. Return the URL to the frontend
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