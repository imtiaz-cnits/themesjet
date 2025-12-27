import type { Metadata } from "next";
// 1. Import BOTH fonts from Google
import { Plus_Jakarta_Sans, Onest } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import FloatingControls from "@/components/layout/FloatingControls";

// 2. Import the Global Providers Wrapper (Auth + Cart)
import { Providers } from "./provider";

import { Toaster } from "sonner";

// 3. Configure Primary Font (Headings)
const jakarta = Plus_Jakarta_Sans({
    subsets: ["latin"],
    variable: "--font-primary",
    display: "swap",
});

// 4. Configure Secondary Font (Body)
const onest = Onest({
    subsets: ["latin"],
    variable: "--font-secondary",
    display: "swap",
});

export const metadata: Metadata = {
    title: "Themes Jet",
    description: "Premium Templates & Development Agency",
    icons: {
        icon: "/favicon.svg",
    },
};

export default function RootLayout({
                                       children,
                                   }: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en" suppressHydrationWarning>
        <body
            className={`
                    ${jakarta.variable} 
                    ${onest.variable} 
                    font-secondary 
                    bg-background 
                    text-foreground 
                    antialiased
                `}
        >
        {/* 5. Wrap App with Global Providers */}
        <Providers>
            <ThemeProvider
                attribute="class"
                defaultTheme="system"
                enableSystem
                disableTransitionOnChange
            >
                {children}
                <FloatingControls />

                <Toaster position="top-center" richColors />

            </ThemeProvider>
        </Providers>
        </body>
        </html>
    );
}