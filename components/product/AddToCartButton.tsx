"use client";

import { useCart } from "@/context/CartContext";
import { ShoppingCart, Check } from "lucide-react";
import { useState, useEffect } from "react";
import { toast } from "sonner"; // 1. Import toast

interface AddToCartProps {
    product: {
        id: string;
        name: string;
        price: number;
        imageUrl: string;
        category: string;
    };
    fullWidth?: boolean;
}

export default function AddToCartButton({ product, fullWidth = false }: AddToCartProps) {
    const { addToCart, items } = useCart();
    const [isAdded, setIsAdded] = useState(false);

    const isInCart = items.some((item) => item.id === product.id);

    useEffect(() => {
        if (isAdded) {
            const timer = setTimeout(() => setIsAdded(false), 2000);
            return () => clearTimeout(timer);
        }
    }, [isAdded]);

    const handleAdd = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();

        addToCart({
            id: product.id,
            name: product.name,
            price: product.price,
            image: product.imageUrl,
            category: product.category,
        });

        setIsAdded(true);

        // 2. Trigger Success Toast
        toast.success(`${product.name} added to cart!`, {
            description: "You can proceed to checkout now.",
            duration: 3000,
            icon: <ShoppingCart size={16} />,
        });
    };

    // Styling logic
    const baseClasses = "py-3.5 font-bold rounded-xl flex justify-center items-center gap-2 transition-all";
    const widthClass = fullWidth ? "w-full" : "px-4";

    if (isInCart) {
        return (
            <button
                disabled
                className={`${baseClasses} ${widthClass} bg-green-500/10 text-green-600 border border-green-500/20 cursor-default`}
            >
                <Check size={18} />
                {fullWidth ? "In Cart" : ""}
            </button>
        );
    }

    return (
        <button
            onClick={handleAdd}
            className={`${baseClasses} ${widthClass} bg-primary text-primary-foreground hover:bg-primary/90 shadow-lg shadow-primary/25 active:scale-95`}
        >
            {isAdded ? <Check size={18} /> : <ShoppingCart size={18} />}
            {fullWidth ? (isAdded ? "Added!" : "Add to Cart") : ""}
        </button>
    );
}