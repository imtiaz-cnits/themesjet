import type { NextAuthConfig } from "next-auth";

export const authConfig = {
    pages: {
        signIn: "/login", // Redirect here if unauthorized
    },
    callbacks: {
        // 1. Middleware Protection Logic
        authorized({ auth, request: { nextUrl } }) {
            const isLoggedIn = !!auth?.user;
            const isOnAdmin = nextUrl.pathname.startsWith("/admin");
            const isOnUser = nextUrl.pathname.startsWith("/user");
            const isOnAuth = nextUrl.pathname.startsWith("/login") || nextUrl.pathname.startsWith("/register");

            // Role extraction (Safe check)
            // @ts-ignore
            const role = auth?.user?.role?.toUpperCase();

            // A. If on Login/Register pages but already logged in:
            if (isOnAuth && isLoggedIn) {
                if (role === "ADMIN") {
                    return Response.redirect(new URL("/admin", nextUrl));
                }
                return Response.redirect(new URL("/user/dashboard", nextUrl));
            }

            // B. Admin Route Protection
            if (isOnAdmin) {
                if (isLoggedIn && role === "ADMIN") return true;
                return false; // Redirect to login (which then redirects to dashboard if user)
            }

            // C. User Route Protection
            if (isOnUser) {
                if (isLoggedIn) return true;
                return false; // Redirect to login
            }

            // Allow all other routes (Home, Products, etc.)
            return true;
        },

        // 2. Token Logic (Runs on Edge)
        async jwt({ token, user, trigger, session }) {
            // Initial login: Add role to token
            if (user) {
                token.id = user.id;
                token.role = user.role;
            }

            // Handle Update Trigger (Profile changes)
            if (trigger === "update" && session?.user) {
                token.name = session.user.name;
                token.email = session.user.email;
                token.picture = session.user.image;
            }
            return token;
        },

        // 3. Session Logic (Runs on Edge)
        async session({ session, token }) {
            if (session.user && token) {
                session.user.id = token.id as string;
                // @ts-ignore
                session.user.role = token.role as string;
            }
            return session;
        }
    },
    providers: [], // Providers are defined in auth.ts to avoid Edge issues
} satisfies NextAuthConfig;