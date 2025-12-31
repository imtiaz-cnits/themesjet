"use client";
import { useState } from "react";
import { Trash2, Loader2 } from "lucide-react";
import { deletePost } from "@/actions/insights";
import { toast } from "sonner";

export default function DeletePostButton({ id }: { id: string }) {
    const [loading, setLoading] = useState(false);

    const handleDelete = async () => {
        if (!confirm("Delete this post permanently?")) return;
        setLoading(true);
        const res = await deletePost(id);
        if (res.error) toast.error(res.error);
        else toast.success("Post deleted");
        setLoading(false);
    };

    return (
        <button onClick={handleDelete} disabled={loading} className="p-2 hover:bg-red-500/10 cursor-pointer text-muted-foreground hover:text-red-500 rounded-lg transition-colors">
            {loading ? <Loader2 size={18} className="animate-spin" /> : <Trash2 size={18} />}
        </button>
    );
}