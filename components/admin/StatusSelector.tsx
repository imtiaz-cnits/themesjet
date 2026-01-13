"use client";

import { useState } from "react";
import { Loader2, ChevronDown } from "lucide-react";
import { toast } from "sonner";
import { updateServiceRequestStatus } from "@/actions/admin";

// Badge Colors Config
const STATUS_CONFIG: Record<string, string> = {
    PENDING: "bg-yellow-500/10 text-yellow-600 border-yellow-500/20",
    CONTACTED: "bg-blue-500/10 text-blue-600 border-blue-500/20",
    COMPLETED: "bg-green-500/10 text-green-600 border-green-500/20",
    CANCELLED: "bg-red-500/10 text-red-600 border-red-500/20",
};

interface StatusSelectorProps {
    id: string;
    currentStatus: string;
}

export default function StatusSelector({ id, currentStatus }: StatusSelectorProps) {
    const [loading, setLoading] = useState(false);

    // Determine color based on status
    const statusColor = STATUS_CONFIG[currentStatus] || STATUS_CONFIG["PENDING"];

    const handleChange = async (e: React.ChangeEvent<HTMLSelectElement>) => {
        const newStatus = e.target.value;
        if (newStatus === currentStatus) return;

        setLoading(true);
        try {
            const result = await updateServiceRequestStatus(id, newStatus);
            if (result.success) {
                toast.success(`Status updated to ${newStatus}`);
            } else {
                toast.error("Failed to update status");
            }
        } catch (error) {
            toast.error("An error occurred");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className={`relative flex items-center px-3 py-1.5 rounded-full w-1/2 md:w-full border shadow-sm transition-all ${statusColor}`}>
            {loading ? (
                <Loader2 size={12} className="animate-spin mr-2" />
            ) : null}

            {/* Native Select with custom styling */}
            <select
                value={currentStatus}
                onChange={handleChange}
                disabled={loading}
                className={`
                    appearance-none bg-transparent border-none text-xs font-bold uppercase tracking-wider outline-none cursor-pointer pr-6
                    ${loading ? "opacity-50 cursor-wait" : ""}
                `}
            >
                <option value="PENDING">Pending</option>
                <option value="CONTACTED">Contacted</option>
                <option value="COMPLETED">Completed</option>
                <option value="CANCELLED">Cancelled</option>
            </select>

            {/* Custom Chevron Icon (positioned absolutely to overlay the native arrow) */}
            <ChevronDown size={12} className="absolute right-3 pointer-events-none opacity-70" />
        </div>
    );
}