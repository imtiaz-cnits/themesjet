import AdminSidebar from "@/components/admin/Sidebar";
import AdminTopbar from "@/components/admin/AdminTopbar";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
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
      <div className="flex-1 flex flex-col lg:pl-64 transition-all duration-300 relative">
        {/* Topbar */}
        <AdminTopbar />

        {/* Main Content Area */}
        <main className="flex-1 relative overflow-x-hidden bg-muted/10 min-h-[calc(100vh-5rem)]">
          {/* Global Background Blobs */}
          <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
            {/* Top Left Blob */}
            <div
              className="absolute top-[-10%] left-[-10%] 
                  w-64 h-64 md:w-96 md:h-96 lg:w-[800px] lg:h-[800px] 
                  bg-primary rounded-full 
                  blur-[60px] md:blur-[90px] lg:blur-[120px] 
                  mix-blend-multiply dark:mix-blend-screen opacity-10 md:opacity-5"
            />

            {/* Bottom Right Blob */}
            <div
              className="absolute bottom-[-10%] right-[-10%] 
                  w-52 h-52 md:w-72 md:h-72 lg:w-[600px] lg:h-[600px] 
                  bg-purple-600 rounded-full 
                  blur-[60px] md:blur-[90px] lg:blur-[120px] 
                  mix-blend-multiply dark:mix-blend-screen opacity-10 md:opacity-5"
            />
          </div>

          {/* Content Container */}
          <div className="relative z-10 py-6 w-[calc(100%-3rem)] mx-auto md:w-full md:p-6">
              {children}
          </div>
        </main>
      </div>
    </div>
  );
}
