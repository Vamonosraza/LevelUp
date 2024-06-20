import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

const isProtectedRoute = 
    createRouteMatcher(["/add-jobs", "/jobs(.*)", "/stats"]);

export default clerkMiddleware((auth, req) => {
    if (isProtectedRoute(req)) {
        auth().protect();
    }
    return;
});

export const config = {
    matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};