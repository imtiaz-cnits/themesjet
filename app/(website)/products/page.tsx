import { prisma } from "@/lib/prisma";
import ProductsBrowser from "@/components/website/ProductsBrowser";
import CategoryTabs from "@/components/website/CategoryTabs";
import TopBar from "@/components/layout/Topbar";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Link from "next/link";

interface PageProps {
    searchParams?: Promise<{
        category?: string;
        framework?: string;
        maxPrice?: string;
        sort?: string;
        page?: string;
    }>;
}

export default async function ProductsPage(props: PageProps) {
    const searchParams = await props.searchParams;
    const category = searchParams?.category;
    const framework = searchParams?.framework;
    const maxPrice = Number(searchParams?.maxPrice) || undefined;
    const sort = searchParams?.sort || "newest";

    // Pagination
    const currentPage = Number(searchParams?.page) || 1;
    const ITEMS_PER_PAGE = 9;
    const skip = (currentPage - 1) * ITEMS_PER_PAGE;

    // Build Query
    const where: any = {};
    if (category) where.category = category;
    if (framework) where.framework = { contains: framework };
    if (maxPrice) where.price = { lte: maxPrice };

    let orderBy: any = { createdAt: "desc" };
    if (sort === "price_asc") orderBy = { price: "asc" };
    if (sort === "price_desc") orderBy = { price: "desc" };

    // Fetch Data
    const products = await prisma.product.findMany({
        where,
        orderBy,
        take: ITEMS_PER_PAGE,
        skip: skip,
        include: {
            _count: { select: { orderItems: true } }
        }
    });

    const totalCount = await prisma.product.count({ where });
    const totalPages = Math.ceil(totalCount / ITEMS_PER_PAGE);

    // Transform Data
    const formattedProducts = products.map(p => ({
        ...p,
        price: Number(p.price),
        updatedAt: p.updatedAt,
        badge: new Date(p.createdAt) > new Date(Date.now() - 7 * 24 * 60 * 60 * 1000) ? "New" : undefined,
        badgeColor: "bg-green-500",
        rating: 5,
        reviews: Math.floor(Math.random() * 50) + 1
    }));

    return (
        <main className="min-h-screen bg-background text-foreground font-body transition-colors duration-300 flex flex-col">
            <TopBar />
            <Navbar />

            <div className="flex-grow">
                {/* --- PAGE HEADER --- */}
                <div className="relative pt-32 pb-12 border-b border-border bg-card/30 backdrop-blur-md">
                    <div className="absolute inset-0 overflow-hidden pointer-events-none -z-10">
                        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[120px] mix-blend-multiply dark:mix-blend-screen" />
                    </div>

                    <div className="max-w-7xl mx-auto px-6">
                        {/* Breadcrumb */}
                        <div className="flex items-center gap-2 text-xs font-medium text-muted-foreground mb-6">
                            <Link href="/" className="hover:text-primary transition-colors">Home</Link>
                            <span>/</span>
                            <span className="text-foreground">Products</span>
                        </div>

                        {/* FIX: Changed 'items-end' to 'items-start md:items-end'
                           This ensures Title is Left Aligned on Mobile, but Tabs align to Bottom on Desktop.
                        */}
                        <div className="flex flex-col md:flex-row justify-between gap-4 md:gap-6 items-start md:items-end">
                            <div>
                                <h1 className="font-heading font-bold text-3xl md:text-4xl text-foreground mb-2">
                                    All Products
                                </h1>
                                <p className="text-muted-foreground text-sm">
                                    Found <span className="text-foreground font-bold">{totalCount}</span> premium assets
                                </p>
                            </div>

                            {/* Wrapper ensures tabs take full width on mobile for scrolling */}
                            <div className="w-full md:w-auto">
                                <CategoryTabs />
                            </div>
                        </div>
                    </div>
                </div>

                {/* --- BROWSER COMPONENT --- */}
                <ProductsBrowser
                    initialProducts={formattedProducts}
                    totalCount={totalCount}
                    totalPages={totalPages}
                    currentPage={currentPage}
                />
            </div>

            <Footer />
        </main>
    );
}