"use client";

import { useState } from "react";
import { format } from "date-fns";
import { Search, FileText, CheckCircle, Clock, XCircle, MoreHorizontal, Download, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { pdf } from "@react-pdf/renderer";
import { InvoicePDF } from "@/components/invoice/InvoicePDF";

interface Order {
    id: string;
    createdAt: Date;
    status: string;
    total: number;
    stripeId?: string | null;
    user: {
        name: string | null;
        email: string;
        image: string | null;
    };
    items: {
        id: string;
        price: number;
        product: { name: string };
    }[];
}

export default function AdminOrdersClient({ initialOrders }: { initialOrders: Order[] }) {
    const [search, setSearch] = useState("");
    const [downloadingId, setDownloadingId] = useState<string | null>(null);

    // Filter Logic
    const filteredOrders = initialOrders.filter((order) =>
        order.user.email.toLowerCase().includes(search.toLowerCase()) ||
        order.user.name?.toLowerCase().includes(search.toLowerCase()) ||
        order.id.toLowerCase().includes(search.toLowerCase())
    );

    // Status Badge Helper
    const getStatusBadge = (status: string) => {
        switch (status) {
            case "COMPLETED": return <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold bg-green-500/10 text-green-600 border border-green-500/20"><CheckCircle size={12} /> Paid</span>;
            case "PENDING": return <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold bg-yellow-500/10 text-yellow-600 border border-yellow-500/20"><Clock size={12} /> Pending</span>;
            default: return <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold bg-red-500/10 text-red-600 border border-red-500/20"><XCircle size={12} /> Failed</span>;
        }
    };

    // Download Invoice Handler
    const handleDownloadInvoice = async (order: Order) => {
        setDownloadingId(order.id);
        try {
            const blob = await pdf(<InvoicePDF order={order} userEmail={order.user.email} />).toBlob();
            const url = URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            link.download = `Invoice-${order.id.slice(-8)}.pdf`;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            toast.success("Invoice downloaded");
        } catch (error) {
            toast.error("Failed to generate invoice");
        } finally {
            setDownloadingId(null);
        }
    };

    return (
        <div className="space-y-6">

            {/* Toolbar */}
            <div className="flex flex-col sm:flex-row justify-between gap-4">
                <div className="relative w-full sm:w-96">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground w-4 h-4" />
                    <input
                        type="text"
                        placeholder="Search by name, email or order ID..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="w-full pl-10 pr-4 py-2.5 bg-card border border-border rounded-xl text-sm outline-none focus:border-primary transition-all"
                    />
                </div>
                <div className="flex gap-2">
                    <div className="px-4 py-2 bg-card border border-border rounded-xl text-sm font-bold text-muted-foreground">
                        Total Orders: <span className="text-foreground">{filteredOrders.length}</span>
                    </div>
                    <div className="px-4 py-2 bg-card border border-border rounded-xl text-sm font-bold text-muted-foreground">
                        Revenue: <span className="text-foreground">${filteredOrders.reduce((acc, o) => acc + o.total, 0).toFixed(2)}</span>
                    </div>
                </div>
            </div>

            {/* Table */}
            <div className="bg-card border border-border rounded-2xl shadow-sm overflow-x-auto w-full">
                <div className="overflow-x-auto w-full">
                    <table className="w-full text-sm text-left">
                        <thead className="bg-muted/50 border-b border-border text-muted-foreground uppercase text-xs font-bold">
                        <tr>
                            <th className="px-6 py-4">Order ID</th>
                            <th className="px-6 py-4">Customer</th>
                            <th className="px-6 py-4">Products</th>
                            <th className="px-6 py-4">Date</th>
                            <th className="px-6 py-4">Status</th>
                            <th className="px-6 py-4 text-right">Amount</th>
                            <th className="px-6 py-4 text-center">Actions</th>
                        </tr>
                        </thead>
                        <tbody className="divide-y divide-border">
                        {filteredOrders.length > 0 ? (
                            filteredOrders.map((order) => (
                                <tr key={order.id} className="hover:bg-muted/30 transition-colors">
                                    <td className="px-6 py-4 font-mono text-xs text-muted-foreground">
                                        #{order.id.slice(-8).toUpperCase()}
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-3">
                                            <div className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold text-xs uppercase">
                                                {order.user.name?.charAt(0) || order.user.email.charAt(0)}
                                            </div>
                                            <div>
                                                <div className="font-bold text-foreground truncate max-w-[100px]">{order.user.name || "Guest"}</div>
                                                <div className="text-xs text-muted-foreground truncate max-w-[100px]">{order.user.email}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex flex-col gap-1">
                                            {order.items.map((item, i) => (
                                                <span key={i} className="text-xs font-medium text-foreground truncate max-w-[100px]" title={item.product.name}>
                                                        • {item.product.name}
                                                    </span>
                                            ))}
                                            {order.items.length > 2 && <span className="text-xs text-muted-foreground italic">+ {order.items.length - 2} more</span>}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-muted-foreground">
                                        {format(new Date(order.createdAt), "MMM dd, yyyy")}
                                    </td>
                                    <td className="px-6 py-4">
                                        {getStatusBadge(order.status)}
                                    </td>
                                    <td className="px-6 py-4 text-right font-bold text-foreground">
                                        ${order.total.toFixed(2)}
                                    </td>
                                    <td className="px-6 py-4 text-center">
                                        <button
                                            onClick={() => handleDownloadInvoice(order)}
                                            disabled={downloadingId === order.id}
                                            className="p-2 hover:bg-muted rounded-lg text-muted-foreground cursor-pointer hover:text-primary transition-colors disabled:opacity-50"
                                            title="Download Invoice"
                                        >
                                            {downloadingId === order.id ? (
                                                <Loader2 size={16} className="animate-spin" />
                                            ) : (
                                                <Download size={16} />
                                            )}
                                        </button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan={7} className="px-6 py-12 text-center text-muted-foreground">
                                    No orders found matching your search.
                                </td>
                            </tr>
                        )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}