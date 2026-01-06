import TopBar from "@/components/layout/Topbar";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ProductsBrowser from "@/components/website/ProductsBrowser";
import Link from "next/link";
import { notFound } from "next/navigation";

// --- MOCK CATEGORY DATA ---
const categoryMap: Record<string, string> = {
    "html": "HTML Templates",
    "react": "React Dashboard",
    "nextjs": "Next.js Templates",
    "php": "PHP Scripts",
    "ui": "UI Kits",
    "wordpress": "WordPress",
    "node": "Node.js"
};

// --- MOCK PRODUCT DATA (To Simulate Database) ---
// In a real app, this would come from prisma.product.findMany({ where: { category: slug } })
const MOCK_PRODUCTS = [
    { id: "1", name: "SaaS Starter Kit", category: "React Dashboard", price: 49, imageUrl: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=1000", updatedAt: new Date(), rating: 5, reviews: 12, badge: "Best Seller", badgeColor: "bg-amber-500" },
    { id: "2", name: "Crypto Admin", category: "React Dashboard", price: 39, imageUrl: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=1000", updatedAt: new Date(), rating: 4, reviews: 8 },
    { id: "3", name: "Agency Portfolio", category: "HTML Templates", price: 29, imageUrl: "https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?auto=format&fit=crop&q=80&w=1000", updatedAt: new Date(), rating: 5, reviews: 20 },
    { id: "4", name: "E-commerce UI Kit", category: "UI Kits", price: 19, imageUrl: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?auto=format&fit=crop&q=80&w=1000", updatedAt: new Date(), rating: 5, reviews: 45, badge: "New", badgeColor: "bg-green-500" },
    { id: "5", name: "Next.js Blog", category: "Next.js Templates", price: 59, imageUrl: "https://images.unsplash.com/photo-1499951360447-b19be8fe80f5?auto=format&fit=crop&q=80&w=1000", updatedAt: new Date(), rating: 5, reviews: 10 },
];

interface PageProps {
    params: Promise<{ slug: string }>;
    searchParams?: Promise<{
        page?: string;
    }>;
}

export default async function SingleCategoryPage(props: PageProps) {
    const params = await props.params;
    const searchParams = await props.searchParams;

    const slug = params.slug;
    const categoryName = categoryMap[slug];

    if (!categoryName) return notFound();

    // Filter Mock Products by Category Name
    const categoryProducts = MOCK_PRODUCTS.filter(p => p.category === categoryName);

    // Pagination Logic (Mock)
    const currentPage = Number(searchParams?.page) || 1;
    const ITEMS_PER_PAGE = 9;
    const totalCount = categoryProducts.length;
    const totalPages = Math.ceil(totalCount / ITEMS_PER_PAGE);

    return (
        <main className="min-h-screen bg-background text-foreground font-body flex flex-col transition-colors duration-300">
            <TopBar />
            <Navbar />

            <div className="flex-grow">
                {/* Header */}
                <div className="pt-32 pb-12 border-b border-border bg-muted/20 dark:bg-[#0f172a]/30">
                    <div className="max-w-7xl mx-auto px-6">
                        <div className="flex items-center gap-2 text-xs font-medium text-muted-foreground mb-4">
                            <Link href="/" className="hover:text-primary transition-colors">Home</Link>
                            <span>/</span>
                            <Link href="/categories" className="hover:text-primary transition-colors">Categories</Link>
                            <span>/</span>
                            <span className="text-foreground capitalize">{slug}</span>
                        </div>
                        <h1 className="font-heading font-bold text-4xl text-foreground mb-2">
                            {categoryName}
                        </h1>
                        <p className="text-muted-foreground">
                            Browse our collection of <span className="text-foreground font-bold">{totalCount}</span> resources.
                        </p>
                    </div>
                </div>

                {/* Browser Component */}
                <ProductsBrowser
                    initialProducts={categoryProducts}
                    totalCount={totalCount}
                    totalPages={totalPages}
                    currentPage={currentPage}
                />
            </div>

            <Footer />
        </main>
    );
}