import { prisma } from "@/lib/prisma";
import { Edit, Eye, Plus, Package, Filter } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import ProductSearch from "@/components/admin/ProductSearch";
import Pagination from "@/components/admin/Pagination";
import DeleteProductButton from "@/components/admin/DeleteProductButton";

// 1. Fetch Products with Search & Pagination Logic
async function getProducts(query: string, page: number) {
    const ITEMS_PER_PAGE = 5; // As requested
    const skip = (page - 1) * ITEMS_PER_PAGE;

    // Filter Logic
    const whereClause = query ? {
        OR: [
            { name: { contains: query } },
            { category: { contains: query } }
        ]
    } : {};

    const [products, totalCount] = await Promise.all([
        prisma.product.findMany({
            where: whereClause,
            orderBy: { createdAt: "desc" },
            take: ITEMS_PER_PAGE,
            skip: skip,
            include: {
                _count: { select: { orderItems: true } }
            }
        }),
        prisma.product.count({ where: whereClause })
    ]);

    const totalPages = Math.ceil(totalCount / ITEMS_PER_PAGE);
    return { products, totalPages };
}

export default async function AdminProductsPage(props: {
    searchParams?: Promise<{
        query?: string;
        page?: string;
    }>;
}) {
    const searchParams = await props.searchParams;
    const query = searchParams?.query || "";
    const currentPage = Number(searchParams?.page) || 1;

    const { products, totalPages } = await getProducts(query, currentPage);

    return (
        <div className="space-y-8">

            {/* Header */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
                <div>
                    <h1 className="text-3xl font-heading font-bold text-foreground">Products</h1>
                    <p className="text-muted-foreground">Manage your digital assets catalog.</p>
                </div>
                <Link href="/admin/upload" className="bg-primary text-primary-foreground px-6 py-3 rounded-xl font-bold shadow-lg shadow-primary/25 hover:bg-primary/90 transition-all flex items-center gap-2 w-full md:w-auto justify-center">
                    <Plus size={18} /> Upload New
                </Link>
            </div>

            {/* Toolbar */}
            <div className="bg-card border border-border p-4 rounded-xl flex flex-col md:flex-row gap-4 justify-between items-center shadow-sm">

                {/* Search Component */}
                <ProductSearch />

                <div className="flex gap-2 w-full md:w-auto">
                    <button className="flex items-center justify-center gap-2 px-4 py-2.5 bg-background border border-border rounded-lg text-sm font-bold text-muted-foreground hover:text-foreground transition-colors w-full md:w-auto">
                        <Filter size={16} /> Filter
                    </button>
                </div>
            </div>

            {/* Products Table */}
            <div className="bg-card border border-border rounded-2xl shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm">
                        <thead className="bg-secondary/50 border-b border-border text-muted-foreground uppercase text-xs font-bold tracking-wider">
                        <tr>
                            <th className="px-6 py-4">Product</th>
                            <th className="px-6 py-4">Price</th>
                            <th className="px-6 py-4">Sales</th>
                            <th className="px-6 py-4">Status</th>
                            <th className="px-6 py-4 text-right">Actions</th>
                        </tr>
                        </thead>
                        <tbody className="divide-y divide-border">
                        {products.length > 0 ? (
                            products.map((product) => (
                                <tr key={product.id} className="group hover:bg-secondary/30 transition-colors">
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-4">
                                            <div className="w-12 h-12 rounded-lg bg-muted border border-border overflow-hidden relative shrink-0">
                                                {product.imageUrl ? (
                                                    <Image
                                                        src={product.imageUrl}
                                                        alt={product.name}
                                                        fill
                                                        className="object-cover"
                                                    />
                                                ) : (
                                                    <div className="w-full h-full flex items-center justify-center text-muted-foreground">
                                                        <Package size={20} />
                                                    </div>
                                                )}
                                            </div>
                                            <div>
                                                <p className="font-bold text-foreground text-sm line-clamp-1">{product.name}</p>
                                                <p className="text-xs text-muted-foreground">{product.category}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 font-bold text-foreground">
                                        ${Number(product.price).toFixed(2)}
                                    </td>
                                    <td className="px-6 py-4 text-muted-foreground">
                                        {product._count.orderItems} Sales
                                    </td>
                                    <td className="px-6 py-4">
                                            <span className="px-2.5 py-1 rounded-full text-xs font-bold border bg-green-500/10 text-green-600 border-green-500/20">
                                                Active
                                            </span>
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <div className="flex items-center justify-end gap-2">
                                            {/* VIEW: Link to public product page */}
                                            <Link
                                                href={`/products/${product.id}`}
                                                className="p-2 hover:bg-secondary rounded-lg text-muted-foreground hover:text-primary transition-colors"
                                                title="View Public Page"
                                                target="_blank"
                                            >
                                                <Eye size={18} />
                                            </Link>

                                            {/* EDIT: Link to upload page with ID param */}
                                            <Link
                                                href={`/admin/upload?edit=${product.id}`}
                                                className="p-2 hover:bg-secondary rounded-lg text-muted-foreground hover:text-blue-500 transition-colors"
                                                title="Edit"
                                            >
                                                <Edit size={18} />
                                            </Link>

                                            {/* DELETE: Client component */}
                                            <DeleteProductButton id={product.id} />
                                        </div>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan={5} className="px-6 py-12 text-center text-muted-foreground">
                                    <div className="flex flex-col items-center gap-3">
                                        <Package size={40} className="opacity-20" />
                                        <p>No products found matching &quot;{query}&quot;</p>
                                        <Link href="/admin/upload" className="text-primary font-bold hover:underline text-sm">
                                            Upload your first item
                                        </Link>
                                    </div>
                                </td>
                            </tr>
                        )}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Pagination Controls */}
            {totalPages > 1 && <Pagination totalPages={totalPages} />}

        </div>
    );
}