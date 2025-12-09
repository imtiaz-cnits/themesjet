// src/app/layout.tsx
import type { Metadata } from "next";
// 1. Import BOTH fonts from Google
import { Plus_Jakarta_Sans, Onest } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import FloatingControls from "@/components/layout/FloatingControls";

// 2. Configure Primary Font (Headings)
const jakarta = Plus_Jakarta_Sans({
    subsets: ["latin"],
    variable: "--font-primary", // Matches your Tailwind config
    display: "swap",
});

// 3. Configure Secondary Font (Body)
const onest = Onest({
    subsets: ["latin"],
    variable: "--font-secondary",
    display: "swap",
});

export const metadata: Metadata = {
    title: "Themes Jet",
    description: "Premium Templates & Development Agency",
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
        <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
        >
            {children}

            <FloatingControls />
        </ThemeProvider>
        </body>
        </html>
    );
}