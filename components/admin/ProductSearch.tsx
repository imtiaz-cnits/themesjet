"use client";

import { Search } from "lucide-react";
import { useSearchParams, usePathname, useRouter } from "next/navigation";
import { useDebouncedCallback } from "use-debounce"; // npm install use-debounce

export default function ProductSearch() {
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const { replace } = useRouter();

    const handleSearch = useDebouncedCallback((term: string) => {
        const params = new URLSearchParams(searchParams);
        params.set('page', '1'); // Reset to page 1 on search

        if (term) {
            params.set('query', term);
        } else {
            params.delete('query');
        }
        replace(`${pathname}?${params.toString()}`);
    }, 300);

    return (
        <div className="relative w-full md:w-96">
            <input
                type="text"
                placeholder="Search products..."
                onChange={(e) => handleSearch(e.target.value)}
                defaultValue={searchParams.get('query')?.toString()}
                className="w-full pl-10 pr-4 py-2.5 bg-background border border-border rounded-lg text-foreground outline-none focus:border-primary transition-all"
            />
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground w-4 h-4" />
        </div>
    );
}