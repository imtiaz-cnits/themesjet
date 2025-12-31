"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createPost } from "@/actions/insights";
import { UploadButton } from "@/lib/uploadthing";
import { toast } from "sonner";
import { Loader2, Save, Image as ImageIcon, X } from "lucide-react";
import Image from "next/image";
import TiptapEditor from "@/components/admin/TiptapEditor"; // Import Editor

export default function CreatePostForm() {
    const router = useRouter();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [coverImage, setCoverImage] = useState("");

    // Form State
    const [title, setTitle] = useState("");
    const [slug, setSlug] = useState("");
    const [category, setCategory] = useState("Engineering");
    const [readTime, setReadTime] = useState("5 min read");
    const [excerpt, setExcerpt] = useState("");
    const [content, setContent] = useState(""); // Stores HTML from Tiptap

    const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const val = e.target.value;
        setTitle(val);
        setSlug(val.toLowerCase().replace(/ /g, "-").replace(/[^\w-]+/g, ""));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!coverImage) return toast.error("Please upload a cover image");
        // Basic check for empty content
        if (!content || content === "<p></p>") return toast.error("Please write some content");

        setIsSubmitting(true);
        const res = await createPost({
            title, slug, category, readTime, excerpt, content, coverImage
        });

        if (res.error) {
            toast.error(res.error);
            setIsSubmitting(false);
        } else {
            toast.success("Post published!");
            router.push("/admin/insights");
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-8 pb-10">
            {/* ... (Meta Data Inputs same as before) ... */}

            {/* Top Section */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 space-y-6 bg-card border border-border p-4 rounded-2xl shadow-sm">
                    {/* Title */}
                    <div>
                        <label className="block text-xs font-bold uppercase text-muted-foreground mb-2">Article Title</label>
                        <input required type="text" value={title} onChange={handleTitleChange} className="w-full bg-background border border-border rounded-lg px-4 py-3 text-foreground outline-none focus:border-primary transition-all font-bold text-lg" placeholder="e.g. The Future of Next.js" />
                    </div>

                    {/* Slug & Category */}
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-xs font-bold uppercase text-muted-foreground mb-2">Slug</label>
                            <input required type="text" value={slug} onChange={(e) => setSlug(e.target.value)} className="w-full bg-background border border-border rounded-lg px-4 py-3 text-muted-foreground text-sm outline-none focus:border-primary transition-all" />
                        </div>
                        <div>
                            <label className="block text-xs font-bold uppercase text-muted-foreground mb-2">Category</label>
                            <select value={category} onChange={(e) => setCategory(e.target.value)} className="w-full bg-background border border-border rounded-lg px-4 py-3 text-foreground text-sm outline-none focus:border-primary">
                                <option>Engineering</option>
                                <option>Design</option>
                                <option>Business</option>
                                <option>Tutorial</option>
                                <option>Marketing</option>
                            </select>
                        </div>
                    </div>

                    {/* Excerpt */}
                    <div>
                        <label className="block text-xs font-bold uppercase text-muted-foreground mb-2">Excerpt</label>
                        <textarea required value={excerpt} onChange={(e) => setExcerpt(e.target.value)} rows={3} className="w-full bg-background border border-border rounded-lg px-4 py-3 text-foreground text-sm outline-none focus:border-primary transition-all" placeholder="Short summary for cards (SEO)" />
                    </div>
                </div>

                {/* Sidebar (Image & Read Time) - Same as before */}
                <div className="space-y-6">
                    <div className="bg-card border border-border p-4 rounded-2xl shadow-sm">
                        <label className="block text-xs font-bold uppercase text-muted-foreground mb-4">Cover Image</label>
                        {coverImage ? (
                            <div className="relative aspect-video rounded-lg overflow-hidden border border-border group">
                                <Image src={coverImage} alt="Cover" fill className="object-cover" />
                                <button type="button" onClick={() => setCoverImage("")} className="absolute top-2 right-2 p-1.5 bg-black/50 text-white rounded-full hover:bg-red-500 transition-colors"><X size={16} /></button>
                            </div>
                        ) : (
                            <div className="border-2 border-dashed border-border rounded-lg p-8 flex flex-col items-center justify-center text-center">
                                <ImageIcon className="text-muted-foreground mb-2 opacity-50" size={32} />
                                <UploadButton
                                    endpoint="imageUploader"
                                    onClientUploadComplete={(res) => {
                                        // @ts-ignore
                                        setCoverImage(res[0].ufsUrl || res[0].url);
                                        toast.success("Cover uploaded");
                                    }}
                                    onUploadError={(e) => { toast.error(e.message); }}
                                    appearance={{ button: "!bg-primary text-xs px-4" }}
                                    content={{ button: "Upload Cover" }}
                                />
                            </div>
                        )}
                    </div>
                    <div className="bg-card border border-border p-4 rounded-2xl shadow-sm">
                        <label className="block text-xs font-bold uppercase text-muted-foreground mb-2">Read Time</label>
                        <input type="text" value={readTime} onChange={(e) => setReadTime(e.target.value)} className="w-full bg-background border border-border rounded-lg px-4 py-3 text-foreground text-sm outline-none focus:border-primary" placeholder="e.g. 5 min read" />
                    </div>
                </div>
            </div>

            {/* --- REPLACED TEXTAREA WITH TIPTAP EDITOR --- */}
            <div className="space-y-2">
                <label className="block text-xs font-bold uppercase text-muted-foreground ml-1">Article Content</label>
                <TiptapEditor
                    content={content}
                    onChange={(html) => setContent(html)}
                />
            </div>

            {/* Action Bar */}
            <div className="flex justify-end pt-4 border-t border-border">
                <button type="submit" disabled={isSubmitting} className="px-8 py-3 bg-primary cursor-pointer text-primary-foreground font-bold rounded-xl shadow-lg hover:bg-primary/90 transition-all flex items-center gap-2 disabled:opacity-50">
                    {isSubmitting ? <Loader2 size={18} className="animate-spin" /> : <Save size={18} />}
                    {isSubmitting ? "Publishing..." : "Publish Insight"}
                </button>
            </div>
        </form>
    );
}