import TopBar from "@/components/layout/Topbar";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import CategoryCard from "@/components/website/CategoryCard";
import Link from "next/link";

// --- MOCK DATA (No DB Required) ---
const categories = [
    { id: "1", name: "HTML Templates", slug: "html", description: "Bootstrap 5 & Tailwind", icon: "html", color: "orange", count: 120 },
    { id: "2", name: "React Dashboard", slug: "react", description: "React & Next.js", icon: "react", color: "blue", count: 85 },
    { id: "3", name: "Next.js Templates", slug: "nextjs", description: "App Router & SSR", icon: "nextjs", color: "white", count: 45 }, // Using white/default for Next.js
    { id: "4", name: "PHP Scripts", slug: "php", description: "Laravel & CodeIgniter", icon: "php", color: "purple", count: 60 },
    { id: "5", name: "UI Kits", slug: "ui", description: "Figma & Sketch", icon: "ui", color: "pink", count: 230 },
    { id: "6", name: "WordPress", slug: "wordpress", description: "Themes & Plugins", icon: "wordpress", color: "blue", count: 150 },
    { id: "7", name: "Node.js", slug: "node", description: "Backend Solutions", icon: "node", color: "green", count: 40 },
];

export default function AllCategoriesPage() {
    return (
        <main className="min-h-screen bg-background text-foreground font-body flex flex-col transition-colors duration-300">
            <TopBar />
            <Navbar />

            <div className="flex-grow">
                {/* Page Header */}
                <div className="relative pt-32 pb-20 border-b border-border bg-muted/30 dark:bg-[#0f172a]/50">
                    <div className="max-w-7xl mx-auto px-6 text-center relative z-10">
                        <div className="flex items-center justify-center gap-2 text-xs font-medium text-muted-foreground mb-4">
                            <Link href="/" className="hover:text-primary transition-colors">Home</Link>
                            <span>/</span>
                            <span className="text-foreground">Categories</span>
                        </div>
                        <h1 className="font-heading font-bold text-4xl md:text-5xl text-foreground mb-4">
                            Explore Categories
                        </h1>
                        <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                            Browse our premium collection of templates sorted by technology and style.
                        </p>
                    </div>

                    {/* Background Glow */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-primary/5 rounded-full blur-[120px] -z-10" />
                </div>

                {/* Categories Grid */}
                <div className="max-w-7xl mx-auto px-6 py-24">
                    <div className="flex flex-wrap justify-center gap-8">
                        {categories.map((cat) => (
                            <CategoryCard key={cat.id} data={cat} />
                        ))}
                    </div>
                </div>
            </div>

            <Footer />
        </main>
    );
}