// middleware.ts

import { NextRequest, NextResponse } from "next/server";
import { verifyToken } from "@/lib/auth";

export async function proxy(request: NextRequest) {

    const token = request.cookies.get("session_user")?.value;

    if (!token) {
        return NextResponse.redirect(
            new URL("/auth/login", request.url)
        );
    }

    try {
        await verifyToken(token);

        return NextResponse.next();
    } catch {
        return NextResponse.redirect(
            new URL("/auth/login", request.url)
        );
    }
}

export const config = {
    matcher: [
        "/",
        "/dashboard/:path*",
        "/tasks/:path*",
        "/profile/:path*",
    ],
};