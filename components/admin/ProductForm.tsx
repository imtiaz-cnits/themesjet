"use client";

import { useState, useTransition } from "react";
import { UploadDropzone } from "@/lib/uploadthing";
import { createProduct, updateProduct } from "@/actions/product";
import { X, Plus, Info, Loader2, Save, Image as ImageIcon, FileArchive } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";

// Define the shape of data we expect for editing
interface ProductData {
    id?: string;
    name: string;
    description: string;
    price: number; // Prisma Decimal comes as string or object sometimes, usually mapped to number in frontend
    category: string;
    framework?: string | null;
    imageUrl: string;
    fileUrl: string;
    tags?: any; // JSON array from DB
}

export default function ProductForm({ initialData }: { initialData?: ProductData | null }) {
    const router = useRouter();
    const [isPending, startTransition] = useTransition();
    const isEditMode = !!initialData;

    // --- STATE (Initialize with data if editing) ---
    // If tags come from DB as JSON array ["React", "Admin"], use them directly
    const initialTags = Array.isArray(initialData?.tags) ? initialData.tags : [];

    const [tags, setTags] = useState<string[]>(initialTags);
    const [tagInput, setTagInput] = useState("");
    const [imageUrl, setImageUrl] = useState(initialData?.imageUrl || "");
    const [fileUrl, setFileUrl] = useState(initialData?.fileUrl || "");
    const [error, setError] = useState("");

    // Helper to add tags
    const handleAddTag = (e: React.MouseEvent | React.KeyboardEvent) => {
        if ((e.type === 'click' || (e as React.KeyboardEvent).key === 'Enter') && tagInput.trim()) {
            e.preventDefault();
            if (!tags.includes(tagInput.trim())) {
                setTags([...tags, tagInput.trim()]);
                setTagInput("");
            }
        }
    };

    const removeTag = (tagToRemove: string) => {
        setTags(tags.filter(tag => tag !== tagToRemove));
    };

    const handleSubmit = (formData: FormData) => {
        setError("");

        if (!imageUrl) {
            setError("Please upload a thumbnail image.");
            return;
        }
        if (!fileUrl) {
            setError("Please upload the product .zip file.");
            return;
        }

        startTransition(async () => {
            let result;

            if (isEditMode && initialData?.id) {
                // UPDATE MODE
                result = await updateProduct(initialData.id, formData);
            } else {
                // CREATE MODE
                result = await createProduct(formData);
            }

            if (result?.error) {
                setError(result.error);
            } else {
                router.push("/admin/products");
                router.refresh(); // Refresh to show updated data
            }
        });
    };

    return (
        <form action={handleSubmit} className="max-w-6xl mx-auto pb-20">
            {/* Hidden Inputs for State */}
            <input type="hidden" name="imageUrl" value={imageUrl} />
            <input type="hidden" name="fileUrl" value={fileUrl} />
            <input type="hidden" name="tags" value={tags.join(",")} />

            {/* Header */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
                <div>
                    <h1 className="text-3xl font-heading font-bold text-foreground">
                        {isEditMode ? "Edit Product" : "Upload New Product"}
                    </h1>
                    <p className="text-muted-foreground">
                        {isEditMode ? "Update details for this item." : "Add a new item to the marketplace."}
                    </p>
                </div>
                <div className="flex gap-3 w-full md:w-auto">
                    <button type="button" onClick={() => router.back()} className="flex-1 md:flex-none px-6 py-3 rounded-xl border border-border text-sm font-bold text-foreground hover:bg-secondary transition-colors">
                        Cancel
                    </button>
                    <button
                        type="submit"
                        disabled={isPending}
                        className="flex-1 md:flex-none px-6 py-3 rounded-xl bg-primary text-primary-foreground text-sm font-bold hover:bg-primary/90 shadow-lg shadow-primary/25 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
                    >
                        {isPending ? <Loader2 size={18} className="animate-spin" /> : <Save size={18} />}
                        {isEditMode ? "Save Changes" : "Publish Item"}
                    </button>
                </div>
            </div>

            {error && (
                <div className="bg-destructive/10 border border-destructive/20 text-destructive p-4 rounded-xl mb-8 font-bold text-sm flex items-center gap-2">
                    <Info size={18} /> {error}
                </div>
            )}

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* LEFT: FORM FIELDS */}
                <div className="lg:col-span-2 space-y-8">
                    <section className="bg-card border border-border rounded-2xl p-6 shadow-sm">
                        <div className="space-y-6">
                            <div>
                                <label className="label-text">Product Name</label>
                                <input name="name" defaultValue={initialData?.name} required type="text" className="input-field w-full border border-border bg-background rounded-lg px-4 py-3" placeholder="Product Name" />
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="label-text">Category</label>
                                    <select name="category" defaultValue={initialData?.category} className="input-field w-full border border-border bg-background rounded-lg px-4 py-3 cursor-pointer">
                                        <option value="React">React Template</option>
                                        <option value="HTML">HTML Template</option>
                                        <option value="Next.js">Next.js Template</option>
                                        <option value="Figma">UI Kit (Figma)</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="label-text">Framework Version</label>
                                    <input name="framework" defaultValue={initialData?.framework || ""} type="text" className="input-field w-full border border-border bg-background rounded-lg px-4 py-3" placeholder="e.g. v1.0" />
                                </div>
                            </div>

                            <div>
                                <label className="label-text">Description</label>
                                <textarea name="description" defaultValue={initialData?.description} required className="input-field w-full h-40 border border-border bg-background rounded-lg px-4 py-3 resize-none" placeholder="Description..."></textarea>
                            </div>

                            <div>
                                <label className="label-text">Tags</label>
                                <div className="flex gap-2 mb-3">
                                    <input type="text" value={tagInput} onChange={(e) => setTagInput(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && handleAddTag(e)} className="flex-1 border border-border bg-background rounded-lg px-4 py-2 text-sm outline-none focus:border-primary" placeholder="Add tag..." />
                                    <button onClick={handleAddTag} type="button" className="bg-secondary px-4 py-2 rounded-lg font-bold text-sm">Add</button>
                                </div>
                                <div className="flex flex-wrap gap-2">
                                    {tags.map(tag => (
                                        <span key={tag} className="bg-primary/10 text-primary text-xs font-bold px-3 py-1.5 rounded-md flex items-center gap-2">
                                            {tag} <button type="button" onClick={() => removeTag(tag)}><X size={14} /></button>
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Media Section */}
                    <section className="bg-card border border-border rounded-2xl p-6 shadow-sm">
                        <div className="space-y-6">
                            <div>
                                <label className="label-text mb-2 block">Thumbnail</label>
                                {imageUrl ? (
                                    <div className="relative w-full h-64 rounded-xl overflow-hidden border border-border bg-muted">
                                        <Image src={imageUrl} alt="Preview" fill className="object-cover" />
                                        <button type="button" onClick={() => setImageUrl("")} className="absolute top-2 right-2 bg-red-500 text-white p-2 rounded-lg"><X size={16}/></button>
                                    </div>
                                ) : (
                                    <UploadDropzone endpoint="imageUploader" onClientUploadComplete={(res) => setImageUrl(res[0].url)} onUploadError={(e) => alert(e.message)} />
                                )}
                            </div>
                            <div>
                                <label className="label-text mb-2 block">Product File</label>
                                {fileUrl ? (
                                    <div className="flex items-center gap-4 bg-green-500/10 border border-green-500/20 p-4 rounded-xl">
                                        <FileArchive className="text-green-600" />
                                        <span className="text-sm font-bold text-green-600 truncate flex-1">{fileUrl.split('/').pop()}</span>
                                        <button type="button" onClick={() => setFileUrl("")}><X size={18} className="text-muted-foreground hover:text-red-500" /></button>
                                    </div>
                                ) : (
                                    <UploadDropzone endpoint="productFile" onClientUploadComplete={(res) => setFileUrl(res[0].url)} onUploadError={(e) => alert(e.message)} />
                                )}
                            </div>
                        </div>
                    </section>

                    {/* Pricing */}
                    <section className="bg-card border border-border rounded-2xl p-6 shadow-sm">
                        <div className="flex flex-col md:flex-row items-center gap-4">
                            <div className="flex-1 w-full">
                                <label className="label-text">Price ($)</label>
                                <input name="price" defaultValue={initialData ? Number(initialData.price) : ""} required type="number" step="0.01" className="input-field w-full border border-border bg-background rounded-lg px-4 py-3 font-bold text-lg" />
                            </div>
                        </div>
                    </section>
                </div>

                {/* Preview Sidebar */}
                <div className="space-y-6">
                    <div className="bg-card border border-border rounded-2xl p-6 shadow-sm sticky top-8">
                        <h3 className="font-bold text-foreground text-sm mb-4">Preview</h3>
                        <div className="rounded-xl overflow-hidden border border-border bg-muted aspect-video relative">
                            {imageUrl ? <Image src={imageUrl} alt="Preview" fill className="object-cover" /> : <div className="w-full h-full flex items-center justify-center"><ImageIcon className="text-muted-foreground opacity-50" /></div>}
                        </div>
                    </div>
                </div>
            </div>
        </form>
    );
}