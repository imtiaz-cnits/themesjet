import { prisma } from "@/lib/prisma";
import { DollarSign, ShoppingCart, Users, Package } from "lucide-react";
import Link from "next/link";
import { formatDistanceToNow } from "date-fns";

// Helper to fetch data
async function getAdminStats() {
    // 1. Total Revenue (Sum of COMPLETED orders)
    const revenueAgg = await prisma.order.aggregate({
        _sum: { total: true },
        where: { status: "COMPLETED" }
    });

    // 2. Total Sales (Count of orders)
    const orderCount = await prisma.order.count({
        where: { status: "COMPLETED" }
    });

    // 3. User Count
    const userCount = await prisma.user.count({
        where: { role: "USER" }
    });

    // 4. Product Count
    const productCount = await prisma.product.count();

    // 5. Recent Sales (Last 5 orders)
    const recentSales = await prisma.order.findMany({
        take: 5,
        orderBy: { createdAt: "desc" },
        where: { status: "COMPLETED" },
        include: {
            user: true,
            items: {
                include: { product: true }
            }
        }
    });

    // 6. Recent Products
    const recentProducts = await prisma.product.findMany({
        take: 3,
        orderBy: { createdAt: "desc" }
    });

    return {
        revenue: revenueAgg._sum.total || 0,
        orders: orderCount,
        users: userCount,
        products: productCount,
        recentSales,
        recentProducts
    };
}

export default async function AdminDashboard() {
    const stats = await getAdminStats();

    return (
        <div className="space-y-8">

            {/* Header - UPDATED RESPONSIVENESS */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
                <div>
                    <h1 className="text-3xl font-heading font-bold text-foreground">Dashboard</h1>
                    <p className="text-muted-foreground">Welcome back, Themes Jet Admin.</p>
                </div>
                <Link href="/admin/upload" className="bg-primary text-primary-foreground px-6 py-3 rounded-xl font-bold shadow-lg shadow-primary/25 hover:bg-primary/90 transition-all flex items-center gap-2 w-full md:w-auto justify-center">
                    <Package size={18} /> Upload New Item
                </Link>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <StatCard
                    label="Total Revenue"
                    value={`$${Number(stats.revenue).toFixed(2)}`}
                    icon={DollarSign}
                    color="text-green-500"
                />
                <StatCard
                    label="Total Sales"
                    value={stats.orders.toString()}
                    icon={ShoppingCart}
                    color="text-blue-500"
                />
                <StatCard
                    label="Customers"
                    value={stats.users.toString()}
                    icon={Users}
                    color="text-purple-500"
                />
                <StatCard
                    label="Products"
                    value={stats.products.toString()}
                    icon={Package}
                    color="text-orange-500"
                />
            </div>

            {/* Charts & Tables Section */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                {/* Sales Feed (Live) */}
                <div className="lg:col-span-2 bg-card border border-border rounded-2xl p-6 shadow-sm">
                    <h3 className="font-heading font-bold text-lg text-foreground mb-6">Recent Sales</h3>
                    <div className="space-y-4">
                        {stats.recentSales.length > 0 ? stats.recentSales.map((sale) => (
                            <div key={sale.id} className="flex items-center justify-between p-4 bg-secondary/30 rounded-xl border border-border/50">
                                <div className="flex items-center gap-4">
                                    <div className="w-10 h-10 rounded-lg bg-green-500/10 text-green-500 flex items-center justify-center font-bold">
                                        $
                                    </div>
                                    <div>
                                        <p className="text-sm font-bold text-foreground">
                                            {sale.items[0]?.product.name}
                                            {sale.items.length > 1 && ` +${sale.items.length - 1} more`}
                                        </p>
                                        <p className="text-xs text-muted-foreground">
                                            {sale.user.email} • {formatDistanceToNow(sale.createdAt)} ago
                                        </p>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <p className="text-sm font-bold text-green-500">+${Number(sale.total).toFixed(2)}</p>
                                    <p className="text-[10px] text-muted-foreground uppercase">Completed</p>
                                </div>
                            </div>
                        )) : (
                            <p className="text-muted-foreground text-sm text-center py-8">No sales yet.</p>
                        )}
                    </div>
                </div>

                {/* Recent Products */}
                <div className="bg-card border border-border rounded-2xl p-6 shadow-sm">
                    <h3 className="font-heading font-bold text-lg text-foreground mb-6">Latest Products</h3>
                    <div className="space-y-6">
                        {stats.recentProducts.map((product) => (
                            <div key={product.id} className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm font-bold text-foreground">{product.name}</p>
                                    <p className="text-xs text-muted-foreground">{product.category}</p>
                                </div>
                                <span className="text-sm font-bold text-primary">${Number(product.price).toFixed(2)}</span>
                            </div>
                        ))}
                    </div>
                    <Link href="/admin/products" className="block w-full text-center mt-8 py-3 rounded-xl border border-border text-sm font-bold text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors">
                        View All Products
                    </Link>
                </div>

            </div>
        </div>
    );
}

function StatCard({ label, value, icon: Icon, color }: any) {
    return (
        <div className="bg-card border border-border p-6 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
            <div className="flex justify-between items-start mb-4">
                <div className={`p-3 rounded-xl bg-secondary ${color}`}>
                    <Icon size={20} />
                </div>
            </div>
            <h3 className="text-2xl font-bold text-foreground mb-1">{value}</h3>
            <p className="text-xs text-muted-foreground uppercase font-bold tracking-wider">{label}</p>
        </div>
    );
}