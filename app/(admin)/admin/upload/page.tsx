"use client";

import { useState } from "react";
import { Upload as UploadIcon, X, Plus, Info } from "lucide-react";
import Image from "next/image";

export default function UploadPage() {
    const [tags, setTags] = useState(["React", "Dashboard"]);

    // Function to handle tag removal (Mock)
    const removeTag = (tagToRemove: string) => {
        setTags(tags.filter(tag => tag !== tagToRemove));
    };

    return (
        <div className="max-w-6xl mx-auto">

            <div className="flex justify-between items-center mb-8">
                <div>
                    <h1 className="text-3xl font-heading font-bold text-foreground">Upload New Product</h1>
                    <p className="text-muted-foreground">Add a new item to the Themes Jet marketplace.</p>
                </div>
                <div className="flex gap-3">
                    <button className="px-6 py-3 rounded-xl border border-border text-sm font-bold text-foreground hover:bg-secondary transition-colors">
                        Save Draft
                    </button>
                    <button className="px-6 py-3 rounded-xl bg-primary text-primary-foreground text-sm font-bold hover:bg-primary/90 shadow-lg shadow-primary/25 transition-all">
                        Publish Item
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                {/* === LEFT COLUMN: FORM === */}
                <div className="lg:col-span-2 space-y-8">

                    {/* 1. Product Details */}
                    <section className="bg-card border border-border rounded-2xl p-6 shadow-sm">
                        <h2 className="font-bold text-foreground mb-6 flex items-center gap-2">
                            <span className="w-6 h-6 rounded-full bg-primary/10 text-primary flex items-center justify-center text-xs">1</span>
                            Product Details
                        </h2>

                        <div className="space-y-6">
                            <div>
                                <label className="block text-xs font-bold uppercase text-muted-foreground mb-2">Product Name</label>
                                <input type="text" placeholder="e.g. Neon React Admin Dashboard" className="w-full bg-background border border-border rounded-lg px-4 py-3 text-foreground outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all" />
                            </div>

                            <div className="grid grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-xs font-bold uppercase text-muted-foreground mb-2">Category</label>
                                    <select className="w-full bg-background border border-border rounded-lg px-4 py-3 text-foreground outline-none focus:border-primary cursor-pointer">
                                        <option>Select Category...</option>
                                        <option>HTML Template</option>
                                        <option>React Template</option>
                                        <option>UI Kit (Figma)</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-xs font-bold uppercase text-muted-foreground mb-2">Framework Version</label>
                                    <input type="text" placeholder="e.g. Next.js 14" className="w-full bg-background border border-border rounded-lg px-4 py-3 text-foreground outline-none focus:border-primary transition-all" />
                                </div>
                            </div>

                            <div>
                                <label className="block text-xs font-bold uppercase text-muted-foreground mb-2">Description</label>
                                <textarea className="w-full h-40 bg-background border border-border rounded-lg px-4 py-3 text-foreground outline-none focus:border-primary transition-all resize-none" placeholder="Describe product features, requirements, and benefits..."></textarea>
                            </div>

                            <div>
                                <label className="block text-xs font-bold uppercase text-muted-foreground mb-2">Search Tags</label>
                                <div className="flex flex-wrap gap-2 mb-2">
                                    {tags.map(tag => (
                                        <span key={tag} className="bg-secondary text-foreground text-xs font-bold px-2 py-1 rounded-md flex items-center gap-1">
                                            {tag}
                                            <button onClick={() => removeTag(tag)} className="hover:text-red-500"><X size={12} /></button>
                                        </span>
                                    ))}
                                    <button className="bg-primary/10 text-primary text-xs font-bold px-2 py-1 rounded-md flex items-center gap-1 border border-primary/20 hover:bg-primary/20 transition-colors">
                                        <Plus size={12} /> Add Tag
                                    </button>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* 2. Files & Media */}
                    <section className="bg-card border border-border rounded-2xl p-6 shadow-sm">
                        <h2 className="font-bold text-foreground mb-6 flex items-center gap-2">
                            <span className="w-6 h-6 rounded-full bg-primary/10 text-primary flex items-center justify-center text-xs">2</span>
                            Files & Media
                        </h2>

                        <div className="space-y-6">
                            {/* Thumbnail Upload */}
                            <div>
                                <label className="block text-xs font-bold uppercase text-muted-foreground mb-2">Thumbnail (800x600px)</label>
                                <div className="border-2 border-dashed border-border rounded-xl p-8 flex flex-col items-center justify-center text-center cursor-pointer hover:bg-secondary/50 transition-colors group">
                                    <div className="w-12 h-12 bg-secondary rounded-full flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                                        <UploadIcon className="text-muted-foreground" size={20} />
                                    </div>
                                    <p className="text-sm font-medium text-foreground">Drop your thumbnail here</p>
                                    <p className="text-xs text-muted-foreground mt-1">JPG, PNG up to 5MB</p>
                                </div>
                            </div>

                            {/* Main File Upload */}
                            <div>
                                <label className="block text-xs font-bold uppercase text-muted-foreground mb-2">Main File (.ZIP)</label>
                                <div className="flex items-center gap-4 bg-background border border-border p-4 rounded-xl">
                                    <div className="w-10 h-10 bg-blue-500/10 text-blue-500 rounded-lg flex items-center justify-center">
                                        <span className="font-bold text-xs">ZIP</span>
                                    </div>
                                    <div className="flex-1">
                                        <p className="text-sm font-bold text-foreground">Select Zip File</p>
                                        <p className="text-xs text-muted-foreground">Contains source code & documentation</p>
                                    </div>
                                    <button className="px-4 py-2 bg-secondary text-foreground text-xs font-bold rounded-lg border border-border hover:bg-border transition-colors">
                                        Browse
                                    </button>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* 3. Pricing */}
                    <section className="bg-card border border-border rounded-2xl p-6 shadow-sm">
                        <h2 className="font-bold text-foreground mb-6 flex items-center gap-2">
                            <span className="w-6 h-6 rounded-full bg-primary/10 text-primary flex items-center justify-center text-xs">3</span>
                            Pricing
                        </h2>
                        <div className="flex items-center gap-4">
                            <div className="flex-1">
                                <label className="block text-xs font-bold uppercase text-muted-foreground mb-2">Regular License Price ($)</label>
                                <input type="number" defaultValue={24} className="w-full bg-background border border-border rounded-lg px-4 py-3 text-foreground outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all font-bold text-lg" />
                            </div>
                            <div className="flex-1 opacity-50 pointer-events-none grayscale">
                                <label className="block text-xs font-bold uppercase text-muted-foreground mb-2">Author Fee</label>
                                <input type="text" value="0% (Single Vendor)" disabled className="w-full bg-background border border-border rounded-lg px-4 py-3 text-muted-foreground font-bold" />
                            </div>
                        </div>
                    </section>

                </div>

                {/* === RIGHT COLUMN: PREVIEW & TIPS === */}
                <div className="space-y-6">

                    {/* Preview Card */}
                    <div className="bg-card border border-border rounded-2xl p-6 shadow-sm sticky top-8">
                        <h3 className="font-bold text-foreground text-sm mb-4">Item Preview</h3>
                        <div className="rounded-xl overflow-hidden border border-border bg-muted">
                            <div className="aspect-video w-full bg-gray-800 relative flex items-center justify-center text-gray-600">
                                {/* Placeholder for thumbnail preview */}
                                <span className="text-xs">No Image Selected</span>
                            </div>
                            <div className="p-4 bg-card">
                                <div className="flex justify-between items-start mb-2">
                                    <div className="h-4 w-3/4 bg-foreground/10 rounded mb-2"></div>
                                    <div className="h-4 w-10 bg-primary/20 rounded"></div>
                                </div>
                                <div className="h-3 w-1/2 bg-foreground/10 rounded"></div>
                            </div>
                        </div>
                        <div className="mt-6 p-4 bg-blue-500/5 border border-blue-500/10 rounded-xl">
                            <h4 className="text-blue-500 font-bold text-xs mb-2 flex items-center gap-2">
                                <Info size={14} /> Upload Tip
                            </h4>
                            <p className="text-xs text-muted-foreground leading-relaxed">
                                Make sure your thumbnail text is readable at small sizes. Products with clear, high-contrast thumbnails get 40% more clicks.
                            </p>
                        </div>
                    </div>

                </div>

            </div>
        </div>
    );
}