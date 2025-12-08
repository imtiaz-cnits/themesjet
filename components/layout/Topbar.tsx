"use client";

import Link from "next/link";
import { Twitter, Instagram, Github } from "lucide-react";

export default function TopBar() {
    return (
        <div className="w-full bg-[#05080F] border-b border-white/5 py-3 px-6 hidden md:flex justify-between items-center text-xs font-medium tracking-wide text-muted-foreground z-50 relative font-body">
            <div className="flex items-center gap-3">
                <span className="text-blue-200">🚀 Grand Opening Offer:</span>
                <span className="text-white font-semibold">0% Commission for First 100 Sellers!</span>
                <Link href="#" className="underline hover:text-primary transition-colors ml-2">Join Now</Link>
            </div>

            <div className="flex items-center gap-6">
                <Link href="#" className="hover:text-primary transition-colors">Support</Link>
                <Link href="#" className="hover:text-primary transition-colors">Docs</Link>
                <div className="w-px h-3 bg-white/10"></div>
                <div className="flex gap-4">
                    <Link href="#" className="hover:text-white transition-colors"><Twitter size={14} /></Link>
                    <Link href="#" className="hover:text-white transition-colors"><Instagram size={14} /></Link>
                    <Link href="#" className="hover:text-white transition-colors"><Github size={14} /></Link>
                </div>
            </div>
        </div>
    );
}