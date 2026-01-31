import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { FileText, Calendar, DollarSign, Mail, User, Phone, Briefcase, Clock } from "lucide-react";
import StatusSelector from "@/components/admin/StatusSelector"; // Import the new component

export const dynamic = "force-dynamic";

export default async function ServiceRequestsPage() {
    const requests = await prisma.serviceRequest.findMany({
        orderBy: { createdAt: "desc" },
    });

    return (
        <div className="space-y-8">

            {/* Header */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
                <div>
                    <h1 className="text-3xl font-heading font-bold text-foreground mb-2">Service Requests</h1>
                    <p className="text-muted-foreground">Manage incoming project leads and inquiries.</p>
                </div>
                <div className="bg-primary/10 text-primary px-6 py-2 rounded-xl font-bold border border-primary/20 shadow-sm flex items-center gap-2">
                    <span className="text-xl">{requests.length}</span>
                    <span className="text-xs uppercase tracking-wider opacity-80">Total Requests</span>
                </div>
            </div>

            {/* Requests Grid */}
            <div className="grid grid-cols-1 gap-6">
                {requests.length === 0 ? (
                    <div className="bg-card border border-border rounded-2xl p-12 text-center shadow-sm">
                        <div className="w-16 h-16 bg-secondary rounded-full flex items-center justify-center mx-auto mb-4 text-muted-foreground">
                            <FileText size={32} />
                        </div>
                        <h3 className="text-lg font-bold text-foreground mb-2">No Requests Found</h3>
                        <p className="text-muted-foreground">You haven't received any service requests yet.</p>
                    </div>
                ) : (
                    requests.map((req) => (
                        <div
                            key={req.id}
                            className="bg-card border border-border rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden group"
                        >
                            {/* INTERACTIVE STATUS BADGE - DESKTOP ONLY */}
                            <div className="hidden lg:block absolute top-6 right-6 z-10">
                                <StatusSelector id={req.id} currentStatus={req.status} />
                            </div>

                            <div className="flex flex-col lg:flex-row gap-8">

                                {/* LEFT COLUMN: Project Info */}
                                <div className="flex-1">
                                    <div className="flex items-start gap-4 mb-4">
                                        <div className="p-3 rounded-xl bg-primary/10 text-primary shrink-0">
                                            <Briefcase size={24} />
                                        </div>
                                        <div>
                                            <h2 className="text-xl font-heading font-bold text-foreground mb-1">
                                                {req.title || "Untitled Project"}
                                            </h2>
                                            <div className="flex flex-wrap gap-x-4 gap-y-2 text-xs font-medium text-muted-foreground uppercase tracking-wide">
                                                <span className="flex items-center gap-1">
                                                    <DollarSign size={14} className="text-green-500" />
                                                    Budget: ${req.budget}
                                                </span>
                                                <span className="flex items-center gap-1">
                                                    <Calendar size={14} className="text-blue-500" />
                                                    {req.deadline}
                                                </span>
                                                <span className="bg-secondary px-2 py-0.5 rounded text-foreground capitalize">
                                                    {req.projectType}
                                                </span>
                                            </div>
                                        </div>
                                    </div>

                                    {/* STATUS BADGE - MOBILE ONLY (Placed here as requested) */}
                                    <div className="lg:hidden mb-4 ">
                                        <StatusSelector id={req.id} currentStatus={req.status} />
                                    </div>

                                    {/* Description Box */}
                                    <div className="bg-secondary/30 rounded-xl border border-border/50 p-5 mb-4">
                                        <p className="text-sm text-foreground/80 whitespace-pre-wrap leading-relaxed">
                                            {req.description}
                                        </p>
                                    </div>

                                    {/* Attachment Link */}
                                    {req.attachmentUrl && (
                                        <Link
                                            href={req.attachmentUrl}
                                            target="_blank"
                                            className="inline-flex items-center gap-2 text-sm font-bold text-primary hover:underline bg-primary/5 px-4 py-2 rounded-lg border border-primary/10 hover:bg-primary/10 transition-colors"
                                        >
                                            <FileText size={16}/>
                                            View Attachment ({req.attachmentName || "Download"})
                                        </Link>
                                    )}
                                </div>

                                {/* RIGHT COLUMN: Client Info */}
                                <div className="w-full lg:w-80 border-t lg:border-t-0 lg:border-l border-border pt-8 lg:pt-0 lg:pl-8 flex flex-col gap-6">
                                    <div>
                                        <h3 className="text-xs font-bold uppercase text-muted-foreground tracking-wider mb-4">
                                            Client Details
                                        </h3>
                                        <div className="space-y-4">

                                            {/* Name & Company */}
                                            <div className="flex items-center gap-3">
                                                <div className="w-10 h-10 bg-secondary rounded-full flex items-center justify-center text-foreground shrink-0 border border-border">
                                                    <User size={18} />
                                                </div>
                                                <div className="overflow-hidden">
                                                    <p className="text-sm font-bold text-foreground truncate">{req.name}</p>
                                                    <p className="text-xs text-muted-foreground truncate">{req.company}</p>
                                                </div>
                                            </div>

                                            {/* Contact Actions */}
                                            <div className="space-y-2">
                                                <a href={`mailto:${req.email}`} className="flex items-center gap-3 p-2 rounded-lg hover:bg-secondary/50 transition-colors group/link">
                                                    <div className="w-8 h-8 rounded-lg bg-blue-500/10 text-blue-500 flex items-center justify-center shrink-0">
                                                        <Mail size={14} />
                                                    </div>
                                                    <span className="text-sm text-foreground/80 group-hover/link:text-blue-500 transition-colors truncate">
                                                        {req.email}
                                                    </span>
                                                </a>

                                                <div className="flex items-center gap-3 p-2">
                                                    <div className="w-8 h-8 rounded-lg bg-purple-500/10 text-purple-500 flex items-center justify-center shrink-0">
                                                        <Phone size={14} />
                                                    </div>
                                                    <span className="text-sm text-foreground/80">
                                                        {req.phone || "N/A"}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Footer / Meta */}
                                    <div className="mt-auto pt-6 border-t border-border flex items-center gap-2 text-xs text-muted-foreground">
                                        <Clock size={12} />
                                        <span>Submitted: {new Date(req.createdAt).toLocaleDateString(undefined, {
                                            year: 'numeric',
                                            month: 'long',
                                            day: 'numeric'
                                        })}</span>
                                    </div>
                                </div>

                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}