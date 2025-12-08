import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Onest } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";

const jakarta = Plus_Jakarta_Sans({
    subsets: ["latin"],
    weight: ["400", "500", "600", "700", "800"],
    variable: "--font-primary",
    display: "swap",
});

const onest = Onest({
    subsets: ["latin"],
    weight: ["300", "400", "500", "600"],
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
          antialiased 
          bg-background 
          text-foreground
          font-body  
        `}
        >
        <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
        >
            {children}
        </ThemeProvider>
        </body>
        </html>
    );
}