// middleware.ts
import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

const isPublicRoute = createRouteMatcher([
    "/",
    "/sso-callback(.*)",
    "/authentication(.*)", // Keep Clerk's default auth routes
    "/sign-in(.*)", // Custom auth routes
    "/api(.*)", // Allow API routes
]);

export default clerkMiddleware(async (auth, req) => {
    if (!isPublicRoute(req)) {
        await auth.protect();
    }
});

export const config = {
    matcher: [
        // Skip static files and Next.js internals
        "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)).*)",
        // Include all routes
        "/",
        // Handle API routes separately
        "/(api|trpc)(.*)",
    ],
};
