"use client";

import { Twitter, Linkedin, Facebook, Link as LinkIcon, Check } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

export default function ShareButtons({ title, slug }: { title: string, slug: string }) {
    const [copied, setCopied] = useState(false);

    // Safe access to window location
    const getUrl = () => typeof window !== "undefined" ? window.location.href : `https://themesjet.com/insights/${slug}`;

    const share = (platform: string) => {
        const url = encodeURIComponent(getUrl());
        const text = encodeURIComponent(title);
        let link = "";

        switch (platform) {
            case "twitter": link = `https://twitter.com/intent/tweet?url=${url}&text=${text}`; break;
            case "linkedin": link = `https://www.linkedin.com/sharing/share-offsite/?url=${url}`; break;
            case "facebook": link = `https://www.facebook.com/sharer/sharer.php?u=${url}`; break;
        }

        window.open(link, "_blank", "width=600,height=400");
    };

    const copyLink = () => {
        navigator.clipboard.writeText(getUrl());
        setCopied(true);
        toast.success("Link copied to clipboard");
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="sticky top-32 flex flex-col gap-4 items-center">
            <p className="text-xs font-bold text-muted-foreground uppercase mb-2">Share</p>

            <button onClick={() => share("twitter")} className="w-10 h-10 rounded-full cursor-pointer border border-border flex items-center justify-center text-muted-foreground hover:border-blue-500 hover:text-blue-500 hover:bg-black/5  transition-all" title="Share on X">
                <Twitter size={18} />
            </button>

            <button onClick={() => share("linkedin")} className="w-10 h-10 rounded-full cursor-pointer border border-border flex items-center justify-center text-muted-foreground hover:border-blue-600 hover:text-blue-600 hover:bg-blue-600/5 transition-all" title="Share on LinkedIn">
                <Linkedin size={18} />
            </button>

            <button onClick={() => share("facebook")} className="w-10 h-10 rounded-full cursor-pointer border border-border flex items-center justify-center text-muted-foreground hover:border-blue-500 hover:text-blue-500 hover:bg-blue-500/5 transition-all" title="Share on Facebook">
                <Facebook size={18} />
            </button>

            <button onClick={copyLink} className="w-10 h-10 rounded-full border border-border flex cursor-pointer items-center justify-center text-muted-foreground hover:border-primary hover:text-primary hover:bg-primary/5 transition-all" title="Copy Link">
                {copied ? <Check size={18} /> : <LinkIcon size={18} />}
            </button>
        </div>
    );
}