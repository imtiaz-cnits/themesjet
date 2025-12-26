import type { Metadata } from "next";
// 1. Import BOTH fonts from Google
import { Plus_Jakarta_Sans, Onest } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import FloatingControls from "@/components/layout/FloatingControls";

// 2. Auth Imports
import { SessionProvider } from "next-auth/react";
import { auth } from "@/lib/auth"; // Assumes auth.ts is at src/auth.ts

// 3. Configure Primary Font (Headings)
const jakarta = Plus_Jakarta_Sans({
    subsets: ["latin"],
    variable: "--font-primary", // Matches your Tailwind config
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
        // shortcut: "/favicon-16x16.png",
        // apple: "/apple-touch-icon.png",
    },
};

export default async function RootLayout({
                                             children,
                                         }: {
    children: React.ReactNode;
}) {
    // 5. Fetch Session Server-Side (Prevents flickering)
    const session = await auth();

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
        {/* 6. Wrap App with SessionProvider */}
        <SessionProvider session={session}>
            <ThemeProvider
                attribute="class"
                defaultTheme="system"
                enableSystem
                disableTransitionOnChange
            >
                {children}

                <FloatingControls />
            </ThemeProvider>
        </SessionProvider>
        </body>
        </html>
    );
}