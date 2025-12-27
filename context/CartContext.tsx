"use client";

import { createContext, useContext, useEffect, useState, ReactNode } from "react";

// Define the shape of a Cart Item
export interface CartItem {
    id: string;
    name: string;
    price: number;
    image: string;
    category: string;
}

interface CartContextType {
    items: CartItem[];
    addToCart: (product: CartItem) => void;
    removeFromCart: (id: string) => void;
    clearCart: () => void;
    cartCount: number;
    cartTotal: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
    const [items, setItems] = useState<CartItem[]>([]);
    const [isLoaded, setIsLoaded] = useState(false);

    // 1. Load Cart from LocalStorage on mount
    useEffect(() => {
        if (typeof window !== "undefined") {
            const savedCart = localStorage.getItem("themesjet_cart");
            if (savedCart) {
                try {
                    setItems(JSON.parse(savedCart));
                } catch (e) {
                    console.error("Failed to parse cart data", e);
                }
            }
            setIsLoaded(true);
        }
    }, []);

    // 2. Save Cart to LocalStorage whenever it changes
    useEffect(() => {
        if (isLoaded && typeof window !== "undefined") {
            localStorage.setItem("themesjet_cart", JSON.stringify(items));
        }
    }, [items, isLoaded]);

    // Actions
    const addToCart = (product: CartItem) => {
        // Prevent duplicate items (optional for digital products)
        const exists = items.find((i) => i.id === product.id);
        if (exists) return;
        setItems((prev) => [...prev, product]);
    };

    const removeFromCart = (id: string) => {
        setItems((prev) => prev.filter((item) => item.id !== id));
    };

    const clearCart = () => {
        setItems([]);
    };

    // Derived State
    const cartCount = items.length;
    const cartTotal = items.reduce((total, item) => total + item.price, 0);

    return (
        <CartContext.Provider value={{ items, addToCart, removeFromCart, clearCart, cartCount, cartTotal }}>
            {children}
        </CartContext.Provider>
    );
}

export function useCart() {
    const context = useContext(CartContext);
    if (!context) throw new Error("useCart must be used within a CartProvider");
    return context;
}