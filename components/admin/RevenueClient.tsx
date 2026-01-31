"use client";

import { motion } from "framer-motion";
import { Download, ArrowUpRight } from "lucide-react";

interface RevenueClientProps {
    stats: {
        totalEarnings: number;
        pendingClearance: number;
        availablePayout: number;
    };
    chartData: {
        label: string;
        amount: number;
        height: number;
    }[];
}

export default function RevenueClient({ stats, chartData }: RevenueClientProps) {
    return (
        <div className="space-y-8">

            <div className="flex justify-between items-end">
                <div>
                    <h1 className="text-3xl font-heading font-bold text-foreground mb-2">Revenue</h1>
                    <p className="text-muted-foreground">Track your earnings and payouts.</p>
                </div>
                <button className="px-4 py-2 border border-border rounded-lg text-sm font-bold text-foreground hover:bg-secondary transition-colors flex items-center gap-2">
                    <Download size={16} /> Export Report
                </button>
            </div>

            {/* Financial Overview Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                    {
                        label: "Available for Payout",
                        amount: `$${stats.availablePayout.toFixed(2)}`,
                        sub: "Minimum payout: $50.00"
                    },
                    {
                        label: "Total Earnings",
                        amount: `$${stats.totalEarnings.toFixed(2)}`,
                        sub: "Lifetime earnings"
                    },
                    {
                        label: "Pending Clearance",
                        amount: `$${stats.pendingClearance.toFixed(2)}`,
                        sub: "Clears in ~3 days"
                    },
                ].map((card, i) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.1 }}
                        className="bg-card border border-border p-6 rounded-2xl shadow-sm"
                    >
                        <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-2">{card.label}</p>
                        <h3 className="text-2xl md:text-3xl font-heading font-bold text-foreground mb-1">{card.amount}</h3>
                        <p className="text-xs text-green-500 font-bold">{card.sub}</p>
                    </motion.div>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                {/* Visual Chart - Now Dynamic */}
                <div className="lg:col-span-2 bg-card border border-border rounded-2xl p-6 shadow-sm flex flex-col">
                    <div className="flex justify-between items-center mb-6">
                        <h3 className="font-heading font-bold text-lg text-foreground">Earnings Report</h3>
                        <select className="bg-secondary border border-border rounded-lg text-xs font-bold px-2 py-1 outline-none">
                            <option>Last 12 Months</option>
                        </select>
                    </div>

                    {/* Chart Bars */}
                    <div className="flex-1 flex items-end justify-between gap-2 h-64 px-4 pb-4 border-b border-border/50">
                        {chartData.map((data, i) => (
                            <div key={i} className="w-full bg-primary/5 rounded-t-lg relative group h-40 md:h-full flex flex-col justify-end">
                                {/* Tooltip */}
                                <div className="opacity-0 group-hover:opacity-100 absolute -top-10 left-1/2 -translate-x-1/2 bg-foreground text-background text-xs font-bold py-1 px-2 rounded transition-opacity whitespace-nowrap z-10">
                                    ${data.amount.toFixed(0)}
                                </div>

                                <motion.div
                                    initial={{ height: 0 }}
                                    animate={{ height: `${data.height}%` }}
                                    transition={{ duration: 1, delay: i * 0.05 }}
                                    className="w-full bg-primary/80 rounded-t-lg group-hover:bg-primary transition-colors min-h-[4px]"
                                />
                            </div>
                        ))}
                    </div>
                    <div className="flex justify-between text-xs text-muted-foreground px-4 mt-2">
                        <span>{chartData[0]?.label}</span>
                        <span>{chartData[Math.floor(chartData.length / 2)]?.label}</span>
                        <span>{chartData[chartData.length - 1]?.label}</span>
                    </div>
                </div>

                {/* Recent Payouts (Mocked as there is no Payout Table yet) */}
                <div className="bg-card border border-border rounded-2xl p-6 shadow-sm">
                    <h3 className="font-heading font-bold text-lg text-foreground mb-6">Recent Payouts</h3>
                    <div className="space-y-6">
                        {[
                            { date: "Oct 15, 2024", amount: "$2,450.00", status: "Paid" },
                            { date: "Sep 15, 2024", amount: "$1,890.00", status: "Paid" },
                            { date: "Aug 15, 2024", amount: "$2,100.00", status: "Paid" },
                        ].map((payout, i) => (
                            <div key={i} className="flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 bg-green-500/10 text-green-600 rounded-lg flex items-center justify-center">
                                        <ArrowUpRight size={18} />
                                    </div>
                                    <div>
                                        <p className="text-sm font-bold text-foreground">{payout.amount}</p>
                                        <p className="text-xs text-muted-foreground">{payout.date}</p>
                                    </div>
                                </div>
                                <span className="text-xs font-bold bg-secondary px-2 py-1 rounded text-muted-foreground">
                                    {payout.status}
                                </span>
                            </div>
                        ))}
                    </div>
                    <button className="w-full mt-8 py-3 bg-primary text-primary-foreground font-bold rounded-xl shadow-lg shadow-primary/20 text-sm hover:opacity-90 transition-opacity">
                        Request Withdrawal
                    </button>
                </div>

            </div>
        </div>
    );
}