"use client";

import { useState } from "react";
import { format } from "date-fns";
import { Search, Trash2, Shield, ShieldAlert, User, Loader2, Mail, Github } from "lucide-react";
import { toast } from "sonner";
import { deleteUser, updateUserRole } from "@/actions/admin";
import Image from "next/image";

// Update Interface to include accounts
interface UserType {
    id: string;
    name: string | null;
    email: string;
    image: string | null;
    role: string;
    createdAt: Date;
    _count: {
        orders: number;
    };
    accounts: { provider: string }[]; // Array of linked accounts
}

export default function AdminUsersClient({ users }: { users: UserType[] }) {
    const [search, setSearch] = useState("");
    const [isLoading, setIsLoading] = useState<string | null>(null);

    const filteredUsers = users.filter((user) =>
        user.name?.toLowerCase().includes(search.toLowerCase()) ||
        user.email.toLowerCase().includes(search.toLowerCase())
    );

    const handleDelete = async (userId: string) => {
        if (!confirm("Are you sure? This action cannot be undone.")) return;
        setIsLoading(userId);
        const result = await deleteUser(userId);
        if (result.error) toast.error(result.error);
        else toast.success(result.success);
        setIsLoading(null);
    };

    const handleRoleChange = async (userId: string, currentRole: string) => {
        const newRole = currentRole === "ADMIN" ? "USER" : "ADMIN";
        setIsLoading(userId);
        const result = await updateUserRole(userId, newRole);
        if (result.error) toast.error(result.error);
        else toast.success(result.success);
        setIsLoading(null);
    };

    // Helper to determine icon
    const getProviderIcon = (accounts: { provider: string }[]) => {
        if (accounts.length === 0) {
            return (
                <div className="flex items-center gap-2 text-muted-foreground" title="Email/Password">
                    <Mail size={16} /> <span className="text-xs">Email</span>
                </div>
            );
        }

        const provider = accounts[0].provider;

        if (provider === "google") {
            return (
                <div className="flex items-center gap-2 text-blue-500 font-medium" title="Google">
                    <svg className="w-4 h-4" viewBox="0 0 24 24"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="currentColor"/><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/></svg>
                    <span className="text-xs text-foreground">Google</span>
                </div>
            );
        }

        if (provider === "github") {
            return (
                <div className="flex items-center gap-2 text-foreground font-medium" title="GitHub">
                    <Github size={16} /> <span className="text-xs">GitHub</span>
                </div>
            );
        }

        return <span className="text-xs">{provider}</span>;
    };

    return (
        <div className="space-y-6">

            <div className="flex flex-col sm:flex-row justify-between gap-4 bg-card border border-border p-4 rounded-xl">
                <div className="relative w-full sm:w-96">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground w-4 h-4" />
                    <input
                        type="text"
                        placeholder="Search users..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="w-full pl-10 pr-4 py-2 bg-background border border-border rounded-lg text-sm outline-none focus:border-primary transition-all"
                    />
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <User size={16} />
                    <span>Total Users: <span className="text-foreground font-bold">{users.length}</span></span>
                </div>
            </div>

            <div className="bg-card border border-border rounded-xl overflow-hidden shadow-sm">
                <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left">
                        <thead className="bg-muted/50 border-b border-border text-muted-foreground uppercase text-xs font-bold">
                        <tr>
                            <th className="px-6 py-4">User</th>
                            <th className="px-6 py-4">Method</th> {/* NEW COLUMN */}
                            <th className="px-6 py-4">Role</th>
                            <th className="px-6 py-4">Orders</th>
                            <th className="px-6 py-4">Joined</th>
                            <th className="px-6 py-4 text-center">Actions</th>
                        </tr>
                        </thead>
                        <tbody className="divide-y divide-border">
                        {filteredUsers.length > 0 ? (
                            filteredUsers.map((user) => (
                                <tr key={user.id} className="hover:bg-muted/30 transition-colors group">
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center overflow-hidden border border-border">
                                                {user.image ? (
                                                    <Image src={user.image} alt={user.name || "User"} width={40} height={40} className="object-cover w-full h-full" />
                                                ) : (
                                                    <span className="font-bold text-muted-foreground">{user.name?.charAt(0) || "U"}</span>
                                                )}
                                            </div>
                                            <div>
                                                <div className="font-bold text-foreground">{user.name || "Guest User"}</div>
                                                <div className="text-xs text-muted-foreground">{user.email}</div>
                                            </div>
                                        </div>
                                    </td>

                                    {/* Method Column */}
                                    <td className="px-6 py-4">
                                        {getProviderIcon(user.accounts)}
                                    </td>

                                    <td className="px-6 py-4">
                                            <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold border ${
                                                user.role === "ADMIN"
                                                    ? "bg-purple-500/10 text-purple-600 border-purple-500/20"
                                                    : "bg-blue-500/10 text-blue-600 border-blue-500/20"
                                            }`}>
                                                {user.role === "ADMIN" ? <ShieldAlert size={12} /> : <User size={12} />}
                                                {user.role}
                                            </span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="font-bold text-foreground">{user._count.orders}</div>
                                        <span className="text-[10px] text-muted-foreground uppercase">Orders</span>
                                    </td>
                                    <td className="px-6 py-4 text-muted-foreground">
                                        {format(new Date(user.createdAt), "MMM dd, yyyy")}
                                    </td>
                                    <td className="px-6 py-4 text-center">
                                        <div className="flex items-center justify-center gap-2">
                                            <button
                                                onClick={() => handleRoleChange(user.id, user.role)}
                                                disabled={!!isLoading}
                                                className="p-2 hover:bg-primary/10 text-muted-foreground hover:text-primary rounded-lg transition-colors"
                                                title={user.role === "ADMIN" ? "Demote to User" : "Promote to Admin"}
                                            >
                                                {isLoading === user.id ? <Loader2 size={16} className="animate-spin" /> : <Shield size={16} />}
                                            </button>
                                            <button
                                                onClick={() => handleDelete(user.id)}
                                                disabled={!!isLoading}
                                                className="p-2 hover:bg-red-500/10 text-muted-foreground hover:text-red-500 rounded-lg transition-colors"
                                                title="Delete User"
                                            >
                                                {isLoading === user.id ? <Loader2 size={16} className="animate-spin" /> : <Trash2 size={16} />}
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan={6} className="px-6 py-12 text-center text-muted-foreground">
                                    No users found.
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