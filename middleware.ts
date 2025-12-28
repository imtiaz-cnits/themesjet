import NextAuth from "next-auth";
import { authConfig } from "@/lib/auth.config";

export default NextAuth(authConfig).auth;

export const config = {
    // Exclude static files, images, and api routes from middleware processing
    matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};