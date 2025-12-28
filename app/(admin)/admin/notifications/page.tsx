import { auth } from "@/lib/auth";
import { getDashboardNotifications } from "@/actions/admin";
import { redirect } from "next/navigation";
import { formatDistanceToNow } from "date-fns";
import { ShoppingBag, UserPlus, Bell } from "lucide-react";

export default async function NotificationsPage() {
    const session = await auth();

    if (!session || session.user.role !== "ADMIN") {
        redirect("/login");
    }

    // Fetch more history (e.g., 50 items)
    const notifications = await getDashboardNotifications(50);

    return (
        <div className="max-w-4xl mx-auto">
            <div className="mb-8 flex items-center gap-3">
                <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center text-primary">
                    <Bell size={20} />
                </div>
                <div>
                    <h1 className="text-3xl font-heading font-bold text-foreground">Notifications</h1>
                    <p className="text-muted-foreground">View all system activity and updates.</p>
                </div>
            </div>

            <div className="bg-card border border-border rounded-2xl overflow-hidden shadow-sm">
                <div className="divide-y divide-border">
                    {notifications.length > 0 ? (
                        notifications.map((notif: any) => (
                            <div key={notif.id} className="p-6 flex items-start gap-4 hover:bg-muted/30 transition-colors">
                                <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 border border-border ${
                                    notif.type === 'order' ? 'bg-green-500/10 text-green-500' : 'bg-blue-500/10 text-blue-500'
                                }`}>
                                    {notif.type === 'order' ? <ShoppingBag size={18} /> : <UserPlus size={18} />}
                                </div>
                                <div className="flex-1">
                                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-1">
                                        <h4 className="font-bold text-foreground">{notif.title}</h4>
                                        <span className="text-xs text-muted-foreground font-medium">
                                            {formatDistanceToNow(new Date(notif.date), { addSuffix: true })}
                                        </span>
                                    </div>
                                    <p className="text-sm text-muted-foreground">{notif.desc}</p>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="p-12 text-center text-muted-foreground">
                            No activity found.
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}