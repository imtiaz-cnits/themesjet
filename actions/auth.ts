"use server";

import * as z from "zod";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";
import { signIn, signOut } from "@/lib/auth";
import { AuthError } from "next-auth";

// --- Validation Schemas ---
const RegisterSchema = z.object({
    name: z.string().min(1, "Name is required"),
    email: z.string().email("Invalid email address"),
    password: z.string().min(6, "Password must be at least 6 characters"),
});

const LoginSchema = z.object({
    email: z.string().email("Invalid email address"),
    password: z.string().min(1, "Password is required"),
});

// --- 1. Register Action ---
export const register = async (values: z.infer<typeof RegisterSchema>) => {
    const validatedFields = RegisterSchema.safeParse(values);

    if (!validatedFields.success) {
        return { error: "Invalid fields!" };
    }

    const { email, password, name } = validatedFields.data;

    try {
        // Check if user exists
        const existingUser = await prisma.user.findUnique({
            where: { email },
        });

        if (existingUser) {
            return { error: "Email already in use!" };
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create user
        await prisma.user.create({
            data: {
                name,
                email,
                password: hashedPassword,
                role: "USER",
            },
        });

        return { success: "Account created successfully!" };
    } catch (error) {
        console.error("Registration Error:", error);
        return { error: "Something went wrong during registration." };
    }
};

// --- 2. Login Action (Credentials) ---
export const login = async (values: z.infer<typeof LoginSchema>) => {
    const validatedFields = LoginSchema.safeParse(values);

    if (!validatedFields.success) {
        return { error: "Invalid fields!" };
    }

    const { email, password } = validatedFields.data;

    const existingUser = await prisma.user.findUnique({
        where: { email }
    });

    if (!existingUser || !existingUser.email || !existingUser.password) {
        return { error: "Email does not exist!" };
    }

    const dashboardUrl = existingUser.role === "ADMIN" ? "/admin" : "/user/dashboard";

    try {
        await signIn("credentials", {
            email,
            password,
            redirect: false,
        });

        return { success: true, redirectUrl: dashboardUrl };

    } catch (error) {
        if (error instanceof AuthError) {
            switch (error.type) {
                case "CredentialsSignin":
                    return { error: "Invalid credentials!" };
                default:
                    return { error: "Something went wrong!" };
            }
        }
        throw error;
    }
};

// --- 3. Social Login Action ---
export const socialLogin = async (provider: "google" | "github") => {
    await signIn(provider, { redirectTo: "/user/dashboard" });
};

// --- 4. Logout Action ---
export const logout = async () => {
    await signOut({ redirectTo: "/" });
};