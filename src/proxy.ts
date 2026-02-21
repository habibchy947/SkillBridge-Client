import { NextRequest, NextResponse } from "next/server";
import { userServices } from "./services/user.services";
import { Roles } from "./constant/role";

export const proxy = async (request: NextRequest) => {
    const pathName = request.nextUrl.pathname;
    console.log("Proxying request to:", pathName);
    let isAuthenticated = false;
    let isAdmin = false;
    let isTutor = false;

    const { data } = await userServices.getSession();
    if (data) {
        isAuthenticated = true;
        isAdmin = data.user.role === Roles.ADMIN;
        isTutor = data.user.role === Roles.TUTOR;
    }

    // Unauthenticated users should be redirected to login page
    if (!isAuthenticated) {
        return NextResponse.redirect(new URL("/login", request.url));
    }
    // Admin users should be redirected to admin dashboard if they try to access tutor or student pages
    if(isAdmin && ( pathName.startsWith("/dashboard") || pathName.startsWith("/tutor"))) {
        return NextResponse.redirect(new URL("/admin", request.url));
    }
    // Tutor users should be redirected to tutor dashboard if they try to access admin or student pages
    if(isTutor && ( pathName.startsWith("/dashboard") || pathName.startsWith("/admin"))) {
        return NextResponse.redirect(new URL("/tutor", request.url));
    }
    // Students should be redirected to student dashboard if they try to access admin or tutor pages
    if(!isAdmin && !isTutor && (pathName.startsWith("/admin") || pathName.startsWith("/tutor"))) {
        return NextResponse.redirect(new URL("/dashboard", request.url));
    }

    return NextResponse.next();
};

export const config = {
    matcher: ["/dashboard", "/dashboard/:path*", "/admin", "/admin/:path*", "/tutor", "/tutor/:path*"],
}