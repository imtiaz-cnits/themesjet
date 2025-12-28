import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import AdminSettingsClient from "@/components/admin/AdminSettingsClient";

export default async function AdminSettingsPage() {
    const session = await auth();

    if (!session || session.user.role !== "ADMIN") {
        redirect("/login");
    }

    return (
        <div>
            <AdminSettingsClient />
        </div>
    );
}