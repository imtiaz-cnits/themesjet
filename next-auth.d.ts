import NextAuth, { DefaultSession } from "next-auth"
import { JWT } from "next-auth/jwt"

// 1. Extend the "Session" type to include user ID and Role
declare module "next-auth" {
    interface Session {
        user: {
            id: string
            role: "ADMIN" | "USER"
        } & DefaultSession["user"]
    }

    // 2. Extend the "User" type (used in the jwt callback)
    interface User {
        role?: "ADMIN" | "USER"
    }
}

// 3. Extend the JWT type to store the role
declare module "next-auth/jwt" {
    interface JWT {
        id?: string
        role?: "ADMIN" | "USER"
    }
}