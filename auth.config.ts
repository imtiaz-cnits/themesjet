import type { NextAuthConfig } from "next-auth";

export const authConfig = {
    pages: {
        signIn: "/login",
    },
    callbacks: {
        // 1. Middleware Logic
        authorized({ auth, request: { nextUrl } }) {
            const isLoggedIn = !!auth?.user;
            const isOnAdmin = nextUrl.pathname.startsWith("/admin");
            const isOnUser = nextUrl.pathname.startsWith("/user");

            // Protect Admin Routes
            if (isOnAdmin) {
                // Use optional chaining (?.) to safely access nested properties
                if (isLoggedIn && auth?.user?.role === "ADMIN") return true;
                return false;
            }

            // Protect User Dashboard
            if (isOnUser) {
                if (isLoggedIn) return true;
                return false;
            }

            return true;
        },

        // 2. Add Role to the JWT (Token)
        jwt({ token, user }) {
            if (user) {
                token.role = user.role; // TypeScript now allows this
                token.id = user.id;
            }
            return token;
        },

        // 3. Add Role to the Session (Client Access)
        session({ session, token }) {
            if (session.user && token.id) {
                session.user.id = token.id as string;
                session.user.role = token.role as "ADMIN" | "USER";
            }
            return session;
        },
    },
    providers: [],
} satisfies NextAuthConfig;