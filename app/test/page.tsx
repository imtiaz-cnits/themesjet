"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export default function TestPage() {
    const { theme, setTheme } = useTheme();
    const [mounted, setMounted] = useState(false);

    // Prevent hydration mismatch by only rendering after mount
    useEffect(() => setMounted(true), []);

    if (!mounted) return null;

    return (
        <main className="min-h-screen p-10 space-y-12 bg-background text-foreground transition-colors duration-300">

            {/* 1. HEADER & THEME TOGGLE */}
            <div className="flex justify-between items-center border-b border-border pb-6">
                <div>
                    <h1 className="text-3xl font-heading font-bold text-primary">Design System Test</h1>
                    <p className="text-muted-foreground font-body">Checking fonts, colors, and variables.</p>
                </div>

                <button
                    onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                    className="px-6 py-2 bg-primary text-primary-foreground font-bold rounded-lg shadow-lg hover:opacity-90 transition-all font-body"
                >
                    Current: {theme?.toUpperCase()} (Switch)
                </button>
            </div>

            {/* 2. TYPOGRAPHY TEST */}
            <section className="space-y-4">
                <h2 className="text-sm font-bold text-muted-foreground uppercase tracking-wider font-heading">1. Typography Check</h2>
                <div className="grid md:grid-cols-2 gap-8">

                    {/* Headings (Plus Jakarta Sans) */}
                    <div className="space-y-4 p-6 border border-border rounded-xl bg-card">
                        <div className="flex items-center gap-2 mb-4">
                            <span className="bg-blue-100 text-blue-700 text-xs px-2 py-1 rounded font-bold">font-heading</span>
                            <span className="text-xs text-muted-foreground">Should be Plus Jakarta Sans</span>
                        </div>
                        <h1 className="text-4xl font-heading font-extrabold">Heading Level 1</h1>
                        <h2 className="text-3xl font-heading font-bold">Heading Level 2</h2>
                        <h3 className="text-2xl font-heading font-semibold">Heading Level 3</h3>
                    </div>

                    {/* Body (Onest) */}
                    <div className="space-y-4 p-6 border border-border rounded-xl bg-card">
                        <div className="flex items-center gap-2 mb-4">
                            <span className="bg-green-100 text-green-700 text-xs px-2 py-1 rounded font-bold">font-body</span>
                            <span className="text-xs text-muted-foreground">Should be Onest</span>
                        </div>
                        <p className="font-body text-lg">
                            This is large body text. It should look modern and clean.
                            The quick brown fox jumps over the lazy dog.
                        </p>
                        <p className="font-body text-base text-muted-foreground">
                            This is standard muted text. Great for descriptions.
                            1234567890 (Check the numbers style).
                        </p>
                    </div>
                </div>
            </section>

            {/* 3. COLOR PALETTE TEST */}
            <section className="space-y-4">
                <h2 className="text-sm font-bold text-muted-foreground uppercase tracking-wider font-heading">2. Color Variables</h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 font-body">

                    {/* Primary */}
                    <div className="p-4 rounded-xl bg-primary text-primary-foreground flex flex-col items-center justify-center h-32 shadow-lg">
                        <span className="font-bold">Primary</span>
                        <span className="text-xs opacity-80">Neon Blue</span>
                    </div>

                    {/* Card Surface */}
                    <div className="p-4 rounded-xl bg-card text-card-foreground border border-border flex flex-col items-center justify-center h-32">
                        <span className="font-bold">Card</span>
                        <span className="text-xs opacity-80">Surface</span>
                    </div>

                    {/* Secondary */}
                    <div className="p-4 rounded-xl bg-secondary text-secondary-foreground flex flex-col items-center justify-center h-32">
                        <span className="font-bold">Secondary</span>
                        <span className="text-xs opacity-80">Muted UI</span>
                    </div>

                    {/* Destructive */}
                    <div className="p-4 rounded-xl bg-destructive text-destructive-foreground flex flex-col items-center justify-center h-32">
                        <span className="font-bold">Destructive</span>
                        <span className="text-xs opacity-80">Errors</span>
                    </div>
                </div>
            </section>

            {/* 4. COMPONENT TEST */}
            <section className="space-y-4">
                <h2 className="text-sm font-bold text-muted-foreground uppercase tracking-wider font-heading">3. UI Components</h2>
                <div className="p-8 rounded-2xl border border-border bg-card flex flex-wrap gap-4 items-center">

                    <button className="px-5 py-2.5 bg-primary text-primary-foreground rounded-lg font-bold hover:opacity-90 transition-opacity font-heading">
                        Primary Action
                    </button>

                    <button className="px-5 py-2.5 border border-input bg-background hover:bg-secondary text-foreground rounded-lg font-medium transition-colors font-body">
                        Outline Button
                    </button>

                    <input
                        type="text"
                        placeholder="Type here..."
                        className="px-4 py-2.5 rounded-lg bg-background border border-input focus:outline-none focus:ring-2 focus:ring-ring font-body w-64"
                    />
                </div>
            </section>
        </main>
    );
}