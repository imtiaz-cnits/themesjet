"use client";

import { motion } from "framer-motion";
import { Search, Edit, Trash2, Eye, MoreHorizontal, Filter, Plus } from "lucide-react";
import Link from "next/link";

const products = [
    { id: 1, name: "DashLite React Admin", category: "React Template", price: "$24.00", sales: 420, status: "Active", image: "/images/product-1.jpg" },
    { id: 2, name: "SaaS Landing Kit", category: "HTML Template", price: "$19.00", sales: 155, status: "Active", image: "/images/product-2.jpg" },
    { id: 3, name: "Crypto Wallet UI", category: "Figma UI Kit", price: "$15.00", sales: 85, status: "Draft", image: "/images/product-3.jpg" },
    { id: 4, name: "EduLearn LMS", category: "React Template", price: "$45.00", sales: 32, status: "Active", image: "/images/product-1.jpg" },
    { id: 5, name: "Agency Portfolio", category: "HTML Template", price: "$22.00", sales: 12, status: "Hidden", image: "/images/product-2.jpg" },
];

export default function AdminProductsPage() {
    return (
        <div className="space-y-8">

            {/* Header */}
            <div className="flex flex-col md:flex-row justify-between items-end gap-4">
                <div>
                    <h1 className="text-3xl font-heading font-bold text-foreground">Products</h1>
                    <p className="text-muted-foreground">Manage your digital assets catalog.</p>
                </div>
                <Link href="/admin/upload" className="bg-primary text-primary-foreground px-6 py-3 rounded-xl font-bold shadow-lg shadow-primary/25 hover:bg-primary/90 transition-all flex items-center gap-2">
                    <Plus size={18} /> Upload New
                </Link>
            </div>

            {/* Toolbar */}
            <div className="bg-card border border-border p-4 rounded-xl flex flex-col md:flex-row gap-4 justify-between items-center shadow-sm">
                <div className="relative w-full md:w-96">
                    <input
                        type="text"
                        placeholder="Search products..."
                        className="w-full pl-10 pr-4 py-2.5 bg-background border border-border rounded-lg text-foreground outline-none focus:border-primary transition-all"
                    />
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground w-4 h-4" />
                </div>
                <div className="flex gap-2">
                    <button className="flex items-center gap-2 px-4 py-2.5 bg-background border border-border rounded-lg text-sm font-bold text-muted-foreground hover:text-foreground transition-colors">
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
                        {products.map((product, i) => (
                            <motion.tr
                                key={product.id}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: i * 0.05 }}
                                className="group hover:bg-secondary/30 transition-colors"
                            >
                                <td className="px-6 py-4">
                                    <div className="flex items-center gap-4">
                                        <div className="w-12 h-12 rounded-lg bg-muted border border-border overflow-hidden">
                                            {/* <Image src={product.image} ... /> */}
                                            <div className="w-full h-full bg-cover bg-center" style={{ backgroundImage: `url(${product.image})` }} />
                                        </div>
                                        <div>
                                            <p className="font-bold text-foreground text-sm">{product.name}</p>
                                            <p className="text-xs text-muted-foreground">{product.category}</p>
                                        </div>
                                    </div>
                                </td>
                                <td className="px-6 py-4 font-bold text-foreground">{product.price}</td>
                                <td className="px-6 py-4 text-muted-foreground">{product.sales}</td>
                                <td className="px-6 py-4">
                                        <span className={`px-2.5 py-1 rounded-full text-xs font-bold border ${
                                            product.status === "Active" ? "bg-green-500/10 text-green-600 border-green-500/20" :
                                                product.status === "Draft" ? "bg-yellow-500/10 text-yellow-600 border-yellow-500/20" :
                                                    "bg-gray-500/10 text-gray-500 border-gray-500/20"
                                        }`}>
                                            {product.status}
                                        </span>
                                </td>
                                <td className="px-6 py-4 text-right">
                                    <div className="flex items-center justify-end gap-2">
                                        <button className="p-2 hover:bg-secondary rounded-lg text-muted-foreground hover:text-primary transition-colors"><Eye size={18} /></button>
                                        <button className="p-2 hover:bg-secondary rounded-lg text-muted-foreground hover:text-blue-500 transition-colors"><Edit size={18} /></button>
                                        <button className="p-2 hover:bg-secondary rounded-lg text-muted-foreground hover:text-red-500 transition-colors"><Trash2 size={18} /></button>
                                    </div>
                                </td>
                            </motion.tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            </div>

        </div>
    );
}