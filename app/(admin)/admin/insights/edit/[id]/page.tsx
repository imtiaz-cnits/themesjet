import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { redirect, notFound } from "next/navigation";
import EditPostForm from "@/components/admin/EditPostForm";

export default async function EditPostPage(props: { params: Promise<{ id: string }> }) {
    const params = await props.params;
    const session = await auth();
    if (!session || session.user.role !== "ADMIN") redirect("/login");

    const post = await prisma.post.findUnique({
        where: { id: params.id },
    });

    if (!post) notFound();

    return (
        <div className="max-w-4xl mx-auto space-y-8">
            <div>
                <h1 className="text-3xl font-heading font-bold text-foreground mb-2">Edit Insight</h1>
                <p className="text-muted-foreground">Update your content and settings.</p>
            </div>
            <EditPostForm post={post} />
        </div>
    );
}