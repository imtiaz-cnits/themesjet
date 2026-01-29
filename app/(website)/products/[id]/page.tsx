import { prisma } from "@/lib/prisma";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import ProductClientView from "@/components/product/ProductClientView";
import ProductReviews from "@/components/reviews/ProductReviews";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import TopBar from "@/components/layout/Topbar";

interface PageProps {
    params: Promise<{ id: string }>;
}

export default async function ProductDetailsPage(props: PageProps) {
    const params = await props.params;

    // 1. Fetch Product with Sales Count AND Reviews
    const product = await prisma.product.findUnique({
        where: { id: params.id },
        include: {
            _count: {
                select: { orderItems: true }
            },
            reviews: {
                select: { rating: true }
            }
        }
    });

    if (!product) {
        notFound();
    }

    // 2. Calculate Average Rating
    const totalReviews = product.reviews.length;
    const totalRating = product.reviews.reduce((acc, r) => acc + r.rating, 0);
    const averageRating = totalReviews > 0 ? totalRating / totalReviews : 0;

    // 3. Fetch Related Products
    const relatedProducts = await prisma.product.findMany({
        where: {
            category: product.category,
            id: { not: product.id }
        },
        take: 4,
        orderBy: { createdAt: "desc" }
    });

    // 4. Format data
    const formattedProduct = {
        ...product,
        price: Number(product.price),
        salesCount: product._count.orderItems,
        averageRating: averageRating,
        totalReviews: totalReviews,
        tags: Array.isArray(product.tags) ? product.tags as string[] : []
    };

    return (
        <main className="min-h-screen bg-background text-foreground font-body transition-colors duration-300">
            <TopBar />
            <Navbar />

            {/* Breadcrumb */}
            <div className="border-b border-border bg-card/30 pt-32 pb-4">
                <div className="max-w-7xl mx-auto px-6 text-xs font-medium text-muted-foreground flex gap-2">
                    <Link href="/" className="hover:text-foreground transition-colors">Home</Link> /
                    <Link href="/products" className="hover:text-foreground transition-colors">Templates</Link> /
                    <span className="text-foreground">{product.category}</span>
                </div>
            </div>

            {/* Client UI (Tabs & Description) */}
            <ProductClientView product={formattedProduct} />

            {/* REVIEWS SECTION CONTAINER (Moved Back Here) */}
            <div className="bg-background border-t border-border">
                <div className="max-w-7xl mx-auto px-6 py-10 md:py-20">
                    <ProductReviews productId={product.id} />
                </div>
            </div>

            {/* Related Products */}
            {relatedProducts.length > 0 && (
                <section className="border-t border-border bg-secondary/30 py-12 md:py-16">
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