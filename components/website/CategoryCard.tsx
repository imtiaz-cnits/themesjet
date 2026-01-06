"use client";

import Link from "next/link";
import { ArrowRight, Box, Layout, Code, Database, Palette, Layers, Globe } from "lucide-react";
import {
    SiHtml5, SiReact, SiPhp, SiFigma, SiWordpress, SiNodedotjs, SiNextdotjs,
    SiTailwindcss, SiBootstrap, SiVuedotjs, SiAngular, SiSvelte
} from "react-icons/si";

// 1. Robust Icon Mapping
const iconMap: Record<string, any> = {
    // Brand Icons
    "html": SiHtml5, "html5": SiHtml5,
    "react": SiReact, "reactjs": SiReact,
    "nextjs": SiNextdotjs, "next": SiNextdotjs,
    "php": SiPhp, "laravel": SiPhp,
    "figma": SiFigma, "ui": SiFigma,
    "wordpress": SiWordpress,
    "node": SiNodedotjs, "nodejs": SiNodedotjs,
    "tailwind": SiTailwindcss,
    "bootstrap": SiBootstrap,
    "vue": SiVuedotjs,
    "angular": SiAngular,
    "svelte": SiSvelte,
    // Generic Fallbacks (Lucide)
    "code": Code,
    "layout": Layout,
    "database": Database,
    "design": Palette,
    "web": Globe,
    "default": Box
};

// 2. Theme Colors
const getCardTheme = (color: string) => {
    switch (color) {
        case "orange": return { hex: "#f97316", gradient: "rgba(234, 88, 12, 0.5)", tint: "rgba(249, 115, 22, 0.15)" };
        case "blue": return { hex: "#3b82f6", gradient: "rgba(59, 130, 246, 0.5)", tint: "rgba(59, 130, 246, 0.15)" };
        case "purple": return { hex: "#a855f7", gradient: "rgba(168, 85, 247, 0.5)", tint: "rgba(168, 85, 247, 0.15)" };
        case "pink": return { hex: "#ec4899", gradient: "rgba(236, 72, 153, 0.5)", tint: "rgba(236, 72, 153, 0.15)" };
        case "green": return { hex: "#22c55e", gradient: "rgba(34, 197, 94, 0.5)", tint: "rgba(34, 197, 94, 0.15)" };
        case "cyan": return { hex: "#06b6d4", gradient: "rgba(8, 145, 178, 0.5)", tint: "rgba(8, 145, 178, 0.15)" };
        default: return { hex: "#3b82f6", gradient: "rgba(59, 130, 246, 0.5)", tint: "rgba(59, 130, 246, 0.15)" };
    }
};

interface CategoryCardProps {
    data: {
        name: string;
        slug: string;
        description: string;
        icon: string;
        color: string;
        count?: number;
    };
}

export default function CategoryCard({ data }: CategoryCardProps) {
    // Safe Icon Lookup (lowercase for consistency)
    const iconKey = (data.icon || "default").toLowerCase();
    const Icon = iconMap[iconKey] || iconMap.default;
    const theme = getCardTheme(data.color);

    return (
        <Link
            href={`/categories/${data.slug}`}
            className="group relative block w-[300px] h-[300px] flex-shrink-0 bg-[#111827] rounded-xl overflow-hidden border border-white/5 transition-all duration-300 hover:border-white/10 hover:shadow-2xl hover:-translate-y-1"
        >
            {/* 1. Gradient Background (Behind Content) */}
            <div
                className="absolute inset-0 z-0 transition-opacity duration-500 opacity-40 group-hover:opacity-60"
                style={{
                    background: `radial-gradient(circle at 100% 0%, ${theme.gradient} 0%, rgba(17, 24, 39, 0) 70%)`
                }}
            />

            {/* 2. Icon Box (Top Left) */}
            {/* Added 'text-white' explicitly to ensure icon visibility */}
            <div
                className="absolute top-[25px] left-[25px] w-[40px] h-[40px] rounded-lg flex items-center justify-center z-20 backdrop-blur-sm border border-white/10 transition-transform duration-300 group-hover:scale-110"
                style={{ backgroundColor: theme.tint }}
            >
                <Icon className="w-[20px] h-[20px] text-white fill-current" />
            </div>

            {/* 3. Watermark Vector (Bottom Right) */}
            {/* Increased opacity to 0.15 and added 'text-[color]' to force fill */}
            <div
                className="absolute top-[115px] left-[114px] w-[196px] h-[196px] z-10 transition-opacity duration-500 pointer-events-none"
                style={{ color: theme.hex, opacity: 0.15 }}
            >
                <Icon className="w-full h-full fill-current" />
            </div>

            {/* 4. Title */}
            <div className="absolute top-[217px] left-[25px] right-[25px] z-20 pr-4">
                <h3 className="font-heading font-bold text-[18px] leading-[28px] text-white group-hover:text-primary transition-colors truncate">
                    {data.name}
                </h3>
            </div>

            {/* 5. Description */}
            <div className="absolute top-[249px] left-[25px] right-[25px] z-20 pr-4">
                <p className="font-body text-[12px] leading-[16px] text-gray-400 uppercase tracking-wide truncate">
                    {data.description || "Premium Assets"}
                </p>
            </div>

            {/* 6. Hover Arrow */}
            <div className="absolute top-[25px] right-[25px] text-white/50 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 z-20">
                <ArrowRight size={18} />
            </div>
        </Link>
    );
}