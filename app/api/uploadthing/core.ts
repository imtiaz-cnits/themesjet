import { createUploadthing, type FileRouter } from "uploadthing/next";
import { auth } from "@/lib/auth";

const f = createUploadthing();

export const ourFileRouter = {
    // 1. General Image Uploader (Avatars & Product Thumbnails)
    imageUploader: f({ image: { maxFileSize: "4MB", maxFileCount: 1 } })
        .middleware(async () => {
            const session = await auth();
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

    // 3. Project Brief Attachments (Images, PDF, Text) [NEW]
    projectAttachment: f({
        image: { maxFileSize: "8MB", maxFileCount: 1 },
        pdf: { maxFileSize: "8MB", maxFileCount: 1 },
        text: { maxFileSize: "8MB", maxFileCount: 1 }
    })
        .middleware(async () => {
            // Return a guest ID so visitors can upload without logging in
            return { userId: "guest" };
        })
        .onUploadComplete(async ({ file }) => {
            console.log("Project attachment uploaded:", file.url);
        }),

} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;