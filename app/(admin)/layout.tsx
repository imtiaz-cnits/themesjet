import AdminSidebar from "@/components/admin/Sidebar";
import AdminTopbar from "@/components/admin/AdminTopbar";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
    const session = await auth();

    if (!session || session.user.role !== "ADMIN") {
        redirect("/login");
    }

    return (
        // 2. Added 'overflow-x-hidden' to root to kill page-wide horizontal scrollbars
        <div className="flex min-h-screen bg-background text-foreground font-body">

            {/* Sidebar */}
            <AdminSidebar />

            {/* Main Content Wrapper */}
            <div className="flex-1 flex flex-col md:pl-64 transition-all duration-300 relative">

                {/* Topbar */}
                <AdminTopbar />

                {/* Main Content Area */}
                {/* 3. FIX: Changed 'overflow-hidden' to 'overflow-x-hidden' so vertical scrolling works */}
                {/* min-h-screen ensures background covers full height even with little content */}
                <main className="flex-1 relative overflow-x-hidden bg-muted/10 min-h-[calc(100vh-5rem)]">

                    {/* Global Background Blobs */}
                    <div className="fixed inset-0 z-0 pointer-events-none">
                        <div className="absolute top-[-10%] left-[-10%] w-[800px] h-[800px] bg-primary rounded-full blur-[120px] mix-blend-multiply dark:mix-blend-screen opacity-5" />
                        <div className="absolute bottom-[-10%] right-[-10%] w-[600px] h-[600px] bg-purple-600 rounded-full blur-[120px] mix-blend-multiply dark:mix-blend-screen opacity-5" />
                    </div>

                    {/* Content Container */}
                    <div className="relative z-10 p-6 md:p-8">
                        {children}
                    </div>
                </main>
            </div>
        </div>
    );
}