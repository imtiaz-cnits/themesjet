import AdminSidebar from "@/components/admin/Sidebar";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
    const session = await auth();

    if (!session || session.user.role !== "ADMIN") {
        redirect("/login");
    }

    return (
        <div className="flex min-h-screen bg-background text-foreground font-body">
            {/* Sidebar Component */}
            <AdminSidebar />

            {/* Main Content Area */}
            {/* FIX 1: Changed 'ml-64' to 'ml-0 md:ml-64' so it takes full width on mobile */}
            <main className="flex-1 ml-0 md:ml-64 relative overflow-hidden transition-all duration-300">

                {/* Global Background Blobs */}
                <div className="fixed inset-0 z-0 pointer-events-none">
                    <div className="absolute top-[-10%] left-[-10%] w-[800px] h-[800px] bg-primary rounded-full blur-[120px] mix-blend-multiply dark:mix-blend-screen opacity-10" />
                    <div className="absolute bottom-[-10%] right-[-10%] w-[600px] h-[600px] bg-purple-600 rounded-full blur-[120px] mix-blend-multiply dark:mix-blend-screen opacity-10" />
                </div>

                {/* Content Container */}
                {/* FIX 2: Added 'pt-20' on mobile to clear space for the Menu button */}
                {/* FIX 3: Reduced padding to 'p-4' on mobile for better fit */}
                <div className="relative z-10 p-4 pt-20 md:p-8 md:pt-8">
                    {children}
                </div>
            </main>
        </div>
    );
}