"use client";

import { AlignLeft } from "lucide-react";
import { useEffect, useState } from "react";

export default function TableOfContents({ headings }: { headings: { id: string; text: string }[] }) {
    const [activeId, setActiveId] = useState("");

    // Scroll to element smoothly
    const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
        e.preventDefault();
        const element = document.getElementById(id);
        if (element) {
            // Offset for fixed header (approx 100px)
            const y = element.getBoundingClientRect().top + window.scrollY - 100;
            window.scrollTo({ top: y, behavior: 'smooth' });
            setActiveId(id);
        }
    };

    // Spy on scroll to highlight active heading
    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setActiveId(entry.target.id);
                    }
                });
            },
            { rootMargin: "-100px 0px -60% 0px" }
        );

        headings.forEach(({ id }) => {
            const el = document.getElementById(id);
            if (el) observer.observe(el);
        });

        return () => observer.disconnect();
    }, [headings]);

    if (headings.length === 0) return null;

    return (
        <div className="sticky top-32">
            <div className="flex items-center gap-2 mb-4 text-xs font-bold text-muted-foreground uppercase tracking-wider">
                <AlignLeft size={14} /> On this page
            </div>
            <ul className="space-y-3 text-sm border-l border-border pl-4">
                {headings.map((heading) => (
                    <li key={heading.id}>
                        <a
                            href={`#${heading.id}`}
                            onClick={(e) => handleClick(e, heading.id)}
                            className={`block line-clamp-1 transition-all duration-200 ${
                                activeId === heading.id
                                    ? "text-primary font-bold translate-x-1"
                                    : "text-muted-foreground hover:text-foreground"
                            }`}
                        >
                            {heading.text}
                        </a>
                    </li>
                ))}
            </ul>
        </div>
    );
}