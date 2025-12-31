import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import CreatePostForm from "@/components/admin/CreatePostForm";

export default async function CreatePostPage() {
    const session = await auth();
    if (!session || session.user.role !== "ADMIN") redirect("/login");

    return (
        <div className="max-w-4xl mx-auto space-y-8">
            <div>
                <h1 className="text-3xl font-heading font-bold text-foreground">Write New Insight</h1>
                <p className="text-muted-foreground">Share knowledge with your community.</p>
            </div>
            <CreatePostForm />
        </div>
    );
}