"use client";

import { usePathname, useSearchParams, useRouter } from "next/navigation";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function Pagination({ totalPages }: { totalPages: number }) {
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const { replace } = useRouter();

    const currentPage = Number(searchParams.get('page')) || 1;

    const createPageURL = (pageNumber: number | string) => {
        const params = new URLSearchParams(searchParams);
        params.set('page', pageNumber.toString());
        return `${pathname}?${params.toString()}`;
    };

    return (
        <div className="flex items-center justify-center gap-4 mt-8">
            <button
                disabled={currentPage <= 1}
                onClick={() => replace(createPageURL(currentPage - 1))}
                className="p-2 border border-border rounded-lg disabled:opacity-50 hover:bg-secondary transition-colors"
            >
                <ChevronLeft size={16} />
            </button>
            <span className="text-sm font-bold text-muted-foreground">
                Page {currentPage} of {totalPages}
            </span>
            <button
                disabled={currentPage >= totalPages}
                onClick={() => replace(createPageURL(currentPage + 1))}
                className="p-2 border border-border rounded-lg disabled:opacity-50 hover:bg-secondary transition-colors"
            >
                <ChevronRight size={16} />
            </button>
        </div>
    );
}