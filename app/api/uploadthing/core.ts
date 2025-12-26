import { createUploadthing, type FileRouter } from "uploadthing/next";
import { auth } from "@/lib/auth"; // Ensure this points to your auth helper

const f = createUploadthing();

export const ourFileRouter = {
    // 1. Thumbnail Uploader
    imageUploader: f({ image: { maxFileSize: "4MB", maxFileCount: 1 } })
        .middleware(async () => {
            const session = await auth();
            // Secure it: Only Admins can upload
            if (!session || session.user.role !== "ADMIN") throw new Error("Unauthorized");
            return { userId: session.user.id };
        })
        .onUploadComplete(async ({ metadata, file }) => {
            console.log("Image uploaded by:", metadata.userId);
            console.log("URL:", file.url);
        }),

    // 2. Product File Uploader (Zip files)
    productFile: f({
        blob: { maxFileSize: "64MB", maxFileCount: 1 }
    })
        .middleware(async () => {
            const session = await auth();
            if (!session || session.user.role !== "ADMIN") throw new Error("Unauthorized");
            return { userId: session.user.id };
        })
        .onUploadComplete(async ({ file }) => {
            console.log("Product file uploaded:", file.url);
        }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;