import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import Link from "next/link";
import { Plus, Eye, Edit } from "lucide-react"; // Added Edit icon
import Image from "next/image";
import { format } from "date-fns";
import DeletePostButton from "@/components/admin/DeletePostButton";

export default async function AdminInsightsPage() {
    const session = await auth();
    if (!session || session.user.role !== "ADMIN") redirect("/login");

    // 1. Fetch Posts
    const posts = await prisma.post.findMany({
        orderBy: { createdAt: "desc" },
    });

    // 2. Efficiently fetch author images (avoiding N+1 problem)
    // Get unique author names from the posts list
    const uniqueAuthors = Array.from(new Set(posts.map((p) => p.author)));

    // Fetch user profiles for these authors
    const users = await prisma.user.findMany({
        where: { name: { in: uniqueAuthors } },
        select: { name: true, image: true }
    });

    return (
        <div className="space-y-8 w-full max-w-full">
            {/* Header */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4">
                <div>
                    <h1 className="text-3xl font-heading font-bold text-foreground">Insights</h1>
                    <p className="text-muted-foreground">Manage your blog posts and tutorials.</p>
                </div>
                <Link href="/admin/insights/create" className="bg-primary text-primary-foreground px-6 py-3 rounded-xl font-bold shadow-lg hover:bg-primary/90 transition-all flex items-center gap-2">
                    <Plus size={18} /> Write New Post
                </Link>
            </div>

            {/* Table */}
            <div className="bg-card border border-border rounded-2xl shadow-sm overflow-hidden w-full max-w-[calc(100vw-32px)] md:max-w-full mx-auto">
                <div className="overflow-x-auto w-full">
                    <table className="w-full text-left text-sm whitespace-nowrap min-w-[800px]">
                        <thead className="bg-secondary/50 border-b border-border text-muted-foreground uppercase text-xs font-bold tracking-wider">
                        <tr>
                            <th className="px-6 py-4">Article</th>
                            <th className="px-6 py-4">Category</th>
                            <th className="px-6 py-4">Author</th>
                            <th className="px-6 py-4">Date</th>
                            <th className="px-6 py-4 text-right">Actions</th>
                        </tr>
                        </thead>
                        <tbody className="divide-y divide-border">
                        {posts.length > 0 ? (
                            posts.map((post) => {
                                // Logic to resolve avatar URL
                                const authorUser = users.find(u => u.name === post.author);
                                const avatarUrl = authorUser?.image || `https://ui-avatars.com/api/?name=${encodeURIComponent(post.author)}&background=random&color=fff&size=128`;

                                return (
                                    <tr key={post.id} className="hover:bg-secondary/30 transition-colors">
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-4">
                                                <div className="w-12 h-12 rounded-lg bg-muted border border-border overflow-hidden relative shrink-0">
                                                    <Image src={post.coverImage} alt={post.title} fill className="object-cover" />
                                                </div>
                                                <div className="max-w-[300px]">
                                                    <p className="font-bold text-foreground text-sm truncate" title={post.title}>{post.title}</p>
                                                    <p className="text-xs text-muted-foreground truncate">{post.slug}</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className="px-2.5 py-1 rounded-full text-xs font-bold border bg-secondary border-border text-foreground">
                                                {post.category}
                                            </span>
                                        </td>

                                        {/* UPDATED AUTHOR COLUMN */}
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-2">
                                                <div className="relative w-6 h-6 rounded-full overflow-hidden border border-border shrink-0">
                                                    <Image src={avatarUrl} alt={post.author} fill className="object-cover" />
                                                </div>
                                                <span className="text-sm font-medium">{post.author}</span>
                                            </div>
                                        </td>

                                        <td className="px-6 py-4 text-muted-foreground text-xs">
                                            {format(new Date(post.createdAt), "MMM dd, yyyy")}
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <div className="flex items-center justify-end gap-2">
                                                <Link href={`/insights/${post.slug}`} target="_blank" className="p-2 hover:bg-secondary rounded-lg text-muted-foreground hover:text-primary transition-colors">
                                                    <Eye size={18} />
                                                </Link>

                                                {/* EDIT BUTTON */}
                                                <Link href={`/admin/insights/edit/${post.id}`} className="p-2 hover:bg-secondary rounded-lg text-muted-foreground hover:text-blue-500 transition-colors">
                                                    <Edit size={18} />
                                                </Link>

                                                <DeletePostButton id={post.id} />
                                            </div>
                                        </td>
                                    </tr>
                                );
                            })
                        ) : (
                            <tr>
                                <td colSpan={5} className="px-6 py-12 text-center text-muted-foreground">
                                    No posts found. Start writing!
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