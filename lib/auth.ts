import NextAuth from "next-auth";
import { authConfig } from "./auth.config";
import { PrismaAdapter } from "@auth/prisma-adapter"; // 1. Import Adapter
import { prisma } from "@/lib/prisma";                // 2. Import Prisma
import Credentials from "next-auth/providers/credentials";
import Google from "next-auth/providers/google";      // 3. Import Google
import GitHub from "next-auth/providers/github";      // 4. Import GitHub
import { z } from "zod";
import bcrypt from "bcryptjs";

// Validation Schema
const LoginSchema = z.object({
    email: z.string().email(),
    password: z.string().min(6),
});

export const { auth, signIn, signOut, handlers } = NextAuth({
    ...authConfig,
    adapter: PrismaAdapter(prisma), // 5. Connect Database Adapter
    session: { strategy: "jwt" },   // 6. Force JWT session (required for DB adapter + Credentials)
    providers: [
        // --- Social Providers ---
        Google({
            clientId: process.env.AUTH_GOOGLE_ID,
            clientSecret: process.env.AUTH_GOOGLE_SECRET,
            allowDangerousEmailAccountLinking: true, // Allow logging in with same email from different providers
        }),
        GitHub({
            clientId: process.env.AUTH_GITHUB_ID,
            clientSecret: process.env.AUTH_GITHUB_SECRET,
            allowDangerousEmailAccountLinking: true,
        }),

        // --- Email/Password Provider ---
        Credentials({
            async authorize(credentials) {
                const validatedFields = LoginSchema.safeParse(credentials);

                if (validatedFields.success) {
                    const { email, password } = validatedFields.data;

                    // Fetch user from DB
                    const user = await prisma.user.findUnique({ where: { email } });
                    if (!user || !user.password) return null;

                    // Verify Password
                    const passwordsMatch = await bcrypt.compare(password, user.password);
                    if (passwordsMatch) return user;
                }

                return null;
            },
        }),
    ],
});