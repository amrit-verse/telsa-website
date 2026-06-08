/* eslint-disable @typescript-eslint/no-explicit-any */
import { auth } from "@/lib/auth";
import { NextResponse } from "next/server";

export default auth((req: any) => {
  const isLoggedIn = !!req.auth;
  const isDashboardRoute = req.nextUrl.pathname.startsWith("/dashboard");
  
  if (isDashboardRoute) {
    if (!isLoggedIn) {
      // Redirect to login if unauthenticated
      return NextResponse.redirect(new URL("/login", req.nextUrl));
    }
    
    const userRole = req.auth?.user?.role;
    // Strict RBAC: Only ADMIN and SUPER_ADMIN can access /dashboard
    if (userRole !== "ADMIN" && userRole !== "SUPER_ADMIN") {
      return NextResponse.redirect(new URL("/unauthorized", req.nextUrl));
    }
  }
  
  return NextResponse.next();
});

// Run middleware on all routes except static assets and API routes
export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
