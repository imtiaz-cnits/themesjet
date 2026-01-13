import { prisma } from "@/lib/prisma";
import RevenueClient from "@/components/admin/RevenueClient";

export const dynamic = "force-dynamic"; // Ensure real-time data

async function getRevenueStats() {
    // 1. Total Earnings (Sum of all COMPLETED orders)
    const totalEarningsAgg = await prisma.order.aggregate({
        _sum: { total: true },
        where: { status: "COMPLETED" }
    });
    const totalEarnings = Number(totalEarningsAgg._sum.total) || 0;

    // 2. Pending Clearance (Sum of COMPLETED orders from the last 3 days)
    const threeDaysAgo = new Date();
    threeDaysAgo.setDate(threeDaysAgo.getDate() - 3);

    const pendingAgg = await prisma.order.aggregate({
        _sum: { total: true },
        where: {
            status: "COMPLETED",
            createdAt: { gte: threeDaysAgo }
        }
    });
    const pendingClearance = Number(pendingAgg._sum.total) || 0;

    // 3. Available for Payout (Total - Pending)
    const availablePayout = Math.max(0, totalEarnings - pendingClearance);

    // 4. Chart Data (Last 12 Months Mock-up from real data)
    // Note: Doing complex date grouping in Prisma is tricky without raw SQL.
    // For this implementation, we will fetch the last 50 orders and group them in JS
    // to populate the chart dynamically.
    const lastOrders = await prisma.order.findMany({
        where: { status: "COMPLETED" },
        orderBy: { createdAt: "asc" },
        take: 100, // Sample size for the chart
        select: { createdAt: true, total: true }
    });

    // Group by Month (Simple JS grouping)
    const monthlyRevenue = new Map<string, number>();
    lastOrders.forEach(order => {
        const month = order.createdAt.toLocaleString('default', { month: 'short' });
        const current = monthlyRevenue.get(month) || 0;
        monthlyRevenue.set(month, current + Number(order.total));
    });

    // Fill in chart bars (ensure we have data for the UI, or fallback to 0)
    // We create a mock 12-bar array, filling in real data where available
    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const maxVal = Math.max(...Array.from(monthlyRevenue.values()), 100); // Avoid div by zero

    const chartData = monthNames.map(month => {
        const amount = monthlyRevenue.get(month) || 0;
        return {
            label: month,
            amount: amount,
            height: (amount / maxVal) * 100
        };
    });

    return {
        stats: { totalEarnings, pendingClearance, availablePayout },
        chartData
    };
}

export default async function AdminRevenuePage() {
    const data = await getRevenueStats();

    return (
        <RevenueClient
            stats={data.stats}
            chartData={data.chartData}
        />
    );
}