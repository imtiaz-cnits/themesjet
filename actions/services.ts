"use server";

import { prisma } from "@/lib/prisma";
import { sendServiceRequestEmail } from "@/lib/mail";
import { revalidatePath } from "next/cache";

export async function submitServiceRequest(formData: any) {
    try {
        // 1. Create Database Entry
        const newRequest = await prisma.serviceRequest.create({
            data: {
                projectType: formData.projectType,
                budget: formData.budget,
                deadline: formData.deadline,
                visibility: formData.visibility,
                title: formData.title,
                description: formData.description,
                attachmentUrl: formData.attachmentUrl,
                attachmentName: formData.attachmentName,
                name: formData.name,
                email: formData.email,
                phone: formData.phone,
                company: formData.company,
                status: "PENDING",
            },
        });

        // 2. Send Email Notification (Non-blocking)
        sendServiceRequestEmail(formData);

        // 3. Revalidate Admin Page
        revalidatePath("/admin/service-requests");

        return { success: true, message: "Request submitted successfully!" };
    } catch (error) {
        console.error("Submission Error:", error);
        return { success: false, message: "Failed to submit request." };
    }
}