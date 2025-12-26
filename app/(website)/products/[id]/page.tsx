import { prisma } from "@/lib/prisma";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import ProductClientView from "@/components/product/ProductClientView"; // Import the client view
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import TopBar from "@/components/layout/Topbar";

// Define the params type for Next.js 15+
interface PageProps {
    params: Promise<{ id: string }>;
}

export default async function ProductDetailsPage(props: PageProps) {
    const params = await props.params; // Await params in Next.js 15

    // 1. Fetch Product with Sales Count
    const product = await prisma.product.findUnique({
        where: { id: params.id },
        include: {
            _count: {
                select: { orderItems: true } // Mock sales count
            }
        }
    });

    if (!product) {
        notFound();
    }

    // 2. Fetch Related Products (Same category, excluding current)
    const relatedProducts = await prisma.product.findMany({
        where: {
            category: product.category,
            id: { not: product.id }
        },
        take: 4,
        orderBy: { createdAt: "desc" }
    });

    // 3. Format data for the client component
    const formattedProduct = {
        ...product,
        price: Number(product.price), // Convert Decimal to Number
        salesCount: product._count.orderItems,
        // Ensure tags is a string array (Prisma might return JSON)
        tags: Array.isArray(product.tags) ? product.tags as string[] : []
    };

    return (
        <main className="min-h-screen bg-background text-foreground font-body transition-colors duration-300">
            <TopBar />
            <Navbar />

            {/* --- BREADCRUMB --- */}
            <div className="border-b border-border bg-card/30 pt-32 pb-4">
                <div className="max-w-7xl mx-auto px-6 text-xs font-medium text-muted-foreground flex gap-2">
                    <Link href="/" className="hover:text-foreground transition-colors">Home</Link> /
                    <Link href="/products" className="hover:text-foreground transition-colors">Templates</Link> /
                    <span className="text-foreground">{product.category}</span>
                </div>
            </div>

            {/* --- CLIENT UI (Tabs & Interactions) --- */}
            <ProductClientView product={formattedProduct} />

            {/* --- RELATED PRODUCTS SECTION (Server Side Rendered) --- */}
            {relatedProducts.length > 0 && (
                <section className="border-t border-border bg-secondary/30 py-16">
                    <div className="max-w-7xl mx-auto px-6">
                        <h2 className="text-2xl font-heading font-bold text-foreground mb-8">You might also like</h2>
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                            {relatedProducts.map((item) => (
                                <Link key={item.id} href={`/products/${item.id}`} className="group cursor-pointer">
                                    <div className="h-40 bg-muted rounded-xl mb-3 overflow-hidden border border-border group-hover:border-primary/50 transition-colors relative">
                                        <Image
                                            src={item.imageUrl}
                                            alt={item.name}
                                            fill
                                            className="object-cover group-hover:scale-105 transition-transform duration-500"
                                        />
                                    </div>
                                    <h4 className="text-foreground font-bold text-sm truncate group-hover:text-primary transition-colors">{item.name}</h4>
                                    <p className="text-xs text-muted-foreground mt-1">${Number(item.price).toFixed(2)}</p>
                                </Link>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            <Footer />
        </main>
    );
}