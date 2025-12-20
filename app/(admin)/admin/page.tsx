"use client";

import { motion } from "framer-motion";
import { DollarSign, ShoppingCart, TrendingUp, Users, ArrowUpRight, Package } from "lucide-react";
import Link from "next/link";

export default function AdminDashboard() {
    return (
        <div className="space-y-8">

            {/* Header */}
            <div className="flex justify-between items-end">
                <div>
                    <h1 className="text-3xl font-heading font-bold text-foreground">Dashboard</h1>
                    <p className="text-muted-foreground">Welcome back, Themes Jet Admin.</p>
                </div>
                <Link href="/admin/upload" className="bg-primary text-primary-foreground px-6 py-3 rounded-xl font-bold shadow-lg shadow-primary/25 hover:bg-primary/90 transition-all flex items-center gap-2">
                    <Package size={18} /> Upload New Item
                </Link>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                {[
                    { label: "Total Revenue", value: "$14,204.00", change: "+12.5%", icon: DollarSign, color: "text-green-500" },
                    { label: "Total Sales", value: "842", change: "+5.2%", icon: ShoppingCart, color: "text-blue-500" },
                    { label: "Page Views", value: "45.2k", change: "-2.7%", icon: Users, color: "text-purple-500" },
                    { label: "Conversion Rate", value: "3.4%", change: "+1.2%", icon: TrendingUp, color: "text-orange-500" },
                ].map((stat, i) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.1 }}
                        className="bg-card border border-border p-6 rounded-2xl shadow-sm hover:shadow-md transition-shadow"
                    >
                        <div className="flex justify-between items-start mb-4">
                            <div className={`p-3 rounded-xl bg-secondary ${stat.color}`}>
                                <stat.icon size={20} />
                            </div>
                            <span className={`text-xs font-bold px-2 py-1 rounded-full bg-secondary ${stat.change.startsWith('+') ? 'text-green-500' : 'text-red-500'}`}>
                                {stat.change}
                            </span>
                        </div>
                        <h3 className="text-2xl font-bold text-foreground mb-1">{stat.value}</h3>
                        <p className="text-xs text-muted-foreground uppercase font-bold tracking-wider">{stat.label}</p>
                    </motion.div>
                ))}
            </div>

            {/* Charts & Tables Section */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                {/* Sales Feed (Live) */}
                <div className="lg:col-span-2 bg-card border border-border rounded-2xl p-6 shadow-sm">
                    <h3 className="font-heading font-bold text-lg text-foreground mb-6">Recent Sales</h3>
                    <div className="space-y-4">
                        {[
                            { item: "DashLite React", price: "$24.00", buyer: "United States", time: "Just now" },
                            { item: "SaaS Landing Kit", price: "$19.00", buyer: "Germany", time: "25 mins ago" },
                            { item: "Crypto Wallet UI", price: "$15.00", buyer: "Japan", time: "2 hours ago" },
                            { item: "DashLite React", price: "$24.00", buyer: "Canada", time: "5 hours ago" },
                        ].map((sale, i) => (
                            <div key={i} className="flex items-center justify-between p-4 bg-secondary/30 rounded-xl border border-border/50">
                                <div className="flex items-center gap-4">
                                    <div className="w-10 h-10 rounded-lg bg-green-500/10 text-green-500 flex items-center justify-center font-bold">
                                        $
                                    </div>
                                    <div>
                                        <p className="text-sm font-bold text-foreground">{sale.item}</p>
                                        <p className="text-xs text-muted-foreground">{sale.buyer} • {sale.time}</p>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <p className="text-sm font-bold text-green-500">+{sale.price}</p>
                                    <p className="text-[10px] text-muted-foreground uppercase">Earnings</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Top Products */}
                <div className="bg-card border border-border rounded-2xl p-6 shadow-sm">
                    <h3 className="font-heading font-bold text-lg text-foreground mb-6">Top Performers</h3>
                    <div className="space-y-6">
                        {[
                            { name: "DashLite React", sales: 420, revenue: "$10,080" },
                            { name: "FinTech UI Kit", sales: 155, revenue: "$3,410" },
                            { name: "Agency HTML", sales: 85, revenue: "$1,200" },
                        ].map((product, i) => (
                            <div key={i} className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm font-bold text-foreground">{product.name}</p>
                                    <p className="text-xs text-muted-foreground">{product.sales} Sales</p>
                                </div>
                                <span className="text-sm font-bold text-primary">{product.revenue}</span>
                            </div>
                        ))}
                    </div>
                    <button className="w-full mt-8 py-3 rounded-xl border border-border text-sm font-bold text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors">
                        View All Products
                    </button>
                </div>

            </div>
        </div>
    );
}