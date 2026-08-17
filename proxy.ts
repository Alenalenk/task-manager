// middleware.ts

import { NextRequest, NextResponse } from "next/server";
import { verifyToken } from "@/lib/auth";
import { prisma } from "./lib/prisma";

export async function proxy(request: NextRequest) {

    const token = request.cookies.get("session_user")?.value;

    if (!token) {
        return NextResponse.redirect(
            new URL("/auth/login", request.url)
        );
    }

    try {
        const email = await verifyToken(token);


        await prisma.user.findUnique({
            where: {
                email
            }
        })

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