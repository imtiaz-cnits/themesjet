import { createUploadthing, type FileRouter } from "uploadthing/next";
import { auth } from "@/lib/auth";

const f = createUploadthing();

export const ourFileRouter = {
    // 1. General Image Uploader (Avatars & Product Thumbnails)
    // FIX: Removed the "ADMIN" role check so regular users can upload avatars
    imageUploader: f({ image: { maxFileSize: "4MB", maxFileCount: 1 } })
        .middleware(async () => {
            const session = await auth();

            // Allow any authenticated user
            if (!session) throw new Error("Unauthorized");

            return { userId: session.user.id };
        })
        .onUploadComplete(async ({ metadata, file }) => {
            console.log("Image uploaded by:", metadata.userId);
            console.log("URL:", file.url);
        }),

    // 2. Product File Uploader (Zip files) - KEEP ADMIN ONLY
    productFile: f({
        blob: { maxFileSize: "64MB", maxFileCount: 1 }
    })
        .middleware(async () => {
            const session = await auth();
            // Strict check for product files
            if (!session || session.user.role !== "ADMIN") throw new Error("Unauthorized");
            return { userId: session.user.id };
        })
        .onUploadComplete(async ({ file }) => {
            console.log("Product file uploaded:", file.url);
        }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;