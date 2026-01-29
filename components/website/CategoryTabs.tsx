"use client";

import { useRouter, useSearchParams } from "next/navigation";

// Restored categories to match your Product Data (Tech Stacks)
const categories = ["All Items", "React", "HTML", "Next.js", "Figma", "Laravel"];

export default function CategoryTabs() {
    const router = useRouter();
    const searchParams = useSearchParams();

    // Get active category from URL or default to "All Items"
    const currentCategory = searchParams.get("category") || "All Items";

    const handleCategoryChange = (category: string) => {
        const params = new URLSearchParams(searchParams.toString());

        if (category === "All Items") {
            params.delete("category");
        } else {
            params.set("category", category);
        }

        // Reset pagination if needed
        // params.delete("page");

        router.push(`/products?${params.toString()}`);
    };

    return (
        <div className="flex gap-2 overflow-auto md:overflow-hidden py-3 sm:py-4 sm:pl-4 pr-0 scrollbar-hide align-middle items-center">
            {categories.map((tab) => {
                const isActive = tab === currentCategory;

                return (
                    <button
                        key={tab}
                        onClick={() => handleCategoryChange(tab)}
                        className={`
                            whitespace-nowrap px-5 py-2.5 rounded-full text-sm font-bold transition-all border
                            ${isActive
                            ? "bg-primary text-primary-foreground border-primary shadow-md shadow-primary/25"
                            : "bg-card border-border text-muted-foreground hover:border-primary/50 hover:text-foreground"
                        }
                        `}
                    >
                        {tab}
                    </button>
                );
            })}
        </div>
    );
}