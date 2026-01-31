"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { Loader2, Camera, Save } from "lucide-react";
import { toast } from "sonner";
import Image from "next/image";
import { UploadButton } from "@/lib/uploadthing";
import { updateUserProfile } from "@/actions/user";
import { useRouter } from "next/navigation";

export default function AdminSettingsClient() {
    const { data: session, update } = useSession();
    const router = useRouter();
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [avatarUrl, setAvatarUrl] = useState("");
    const [isSaving, setIsSaving] = useState(false);

    useEffect(() => {
        if (session?.user) {
            setAvatarUrl(session.user.image || "");
            const parts = session.user.name?.split(" ") || [];
            if (parts.length > 0) {
                setFirstName(parts[0]);
                setLastName(parts.slice(1).join(" "));
            }
        }
    }, [session]);

    const handleSave = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSaving(true);

        try {
            const result = await updateUserProfile({ firstName, lastName, image: avatarUrl });

            if (result.error) {
                toast.error(result.error);
                return;
            }

            await update({
                user: {
                    name: `${firstName} ${lastName}`,
                    image: avatarUrl
                }
            });

            toast.success("Admin profile updated!");
            router.refresh();
        } catch (error) {
            toast.error("Something went wrong");
        } finally {
            setIsSaving(false);
        }
    };

    return (
        <div className="w-full">
            <div className="bg-card border border-border rounded-2xl p-8 shadow-sm">
                <h2 className="text-2xl font-heading font-bold text-foreground mb-2">Admin Settings</h2>
                <p className="text-muted-foreground mb-8">Manage your administrative profile and credentials.</p>

                {/* Avatar Section */}
                <div className="flex items-center gap-6 mb-8 pb-8 border-b border-border">
                    <div className="relative w-24 h-24 rounded-full border-2 border-border overflow-hidden bg-secondary">
                        {avatarUrl ? (
                            <Image src={avatarUrl} alt="Admin" fill className="object-cover" />
                        ) : (
                            <div className="w-full h-full flex items-center justify-center text-muted-foreground font-bold text-2xl">
                                {firstName.charAt(0)}
                            </div>
                        )}
                    </div>
                    <div>
                        <h3 className="font-bold text-foreground mb-1">Profile Photo</h3>
                        <p className="text-xs text-muted-foreground mb-3">JPG, PNG or GIF. Max 4MB.</p>

                        {/* Inside AdminSettingsClient.tsx */}
                        <UploadButton
                            endpoint="imageUploader"
                            onClientUploadComplete={async (res) => {
                                // @ts-ignore
                                const newUrl = res[0].ufsUrl || res[0].url;
                                setAvatarUrl(newUrl);
                                toast.success("Image uploaded. Click Save to apply.");
                            }}
                            // FIX: Added braces {} to ensure void return type
                            onUploadError={(error: Error) => {
                                toast.error(`Error: ${error.message}`);
                            }}
                            appearance={{
                                button: "!bg-primary text-xs font-bold px-4 py-2 h-auto w-auto rounded-lg",
                                allowedContent: "hidden"
                            }}
                            content={{ button: "Change Photo" }}
                        />
                    </div>
                </div>

                {/* Form */}
                <form onSubmit={handleSave} className="space-y-6">
                    <div className="grid grid-cols-2 gap-6">
                        <div>
                            <label className="block text-xs font-bold uppercase text-muted-foreground mb-2">First Name</label>
                            <input
                                type="text"
                                value={firstName}
                                onChange={(e) => setFirstName(e.target.value)}
                                className="w-full bg-background border border-border rounded-lg px-4 py-3 text-foreground outline-none focus:border-primary transition-all"
                            />
                        </div>
                        <div>
                            <label className="block text-xs font-bold uppercase text-muted-foreground mb-2">Last Name</label>
                            <input
                                type="text"
                                value={lastName}
                                onChange={(e) => setLastName(e.target.value)}
                                className="w-full bg-background border border-border rounded-lg px-4 py-3 text-foreground outline-none focus:border-primary transition-all"
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-xs font-bold uppercase text-muted-foreground mb-2">Email Address</label>
                        <input
                            type="email"
                            value={session?.user?.email || ""}
                            disabled
                            className="w-full bg-muted border border-border rounded-lg px-4 py-3 text-muted-foreground cursor-not-allowed"
                        />
                        <p className="text-[10px] text-muted-foreground mt-2">Email cannot be changed securely.</p>
                    </div>

                    <div className="flex justify-end pt-4">
                        <button
                            type="submit"
                            disabled={isSaving}
                            className="px-8 py-3 bg-primary text-primary-foreground font-bold rounded-xl shadow-lg shadow-primary/20 hover:bg-primary/90 transition-all flex items-center gap-2 disabled:opacity-50"
                        >
                            {isSaving ? <Loader2 size={18} className="animate-spin" /> : <Save size={18} />}
                            {isSaving ? "Saving Changes..." : "Save Changes"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}