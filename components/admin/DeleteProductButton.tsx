"use client";

import { deleteProduct } from "@/actions/product";
import { Trash2, Loader2 } from "lucide-react";
import { useState, useTransition } from "react";

export default function DeleteProductButton({ id }: { id: string }) {
    const [isPending, startTransition] = useTransition();

    const handleDelete = async () => {
        if (!confirm("Are you sure you want to delete this product?")) return;

        startTransition(async () => {
            await deleteProduct(id);
        });
    };

    return (
        <button
            onClick={handleDelete}
            disabled={isPending}
            className="p-2 hover:bg-secondary rounded-lg text-muted-foreground hover:text-red-500 transition-colors disabled:opacity-50"
            title="Delete"
        >
            {isPending ? <Loader2 size={18} className="animate-spin" /> : <Trash2 size={18} />}
        </button>
    );
}