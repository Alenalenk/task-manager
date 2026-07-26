import { jwtVerify, SignJWT } from "jose";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const secret = new TextEncoder().encode(
    process.env.JWT_SECRET
);

export const createToken = async (email: string) => {
    return await new SignJWT({ email })
        .setProtectedHeader({
            alg: "HS256",
        })
        .setExpirationTime("7d")
        .sign(secret);

}

export const verifyToken = async (token: string) => {
    const { payload } = await jwtVerify(
        token,
        secret)

    return payload.email

}

export const getSession = async () => {
    const cookieStore = await cookies();

    const token = cookieStore.get("session_user")?.value;

    if (!token) return null

    const { payload } = await jwtVerify(token, secret)

    return payload.email

}

export const deleteSession = async () => {
    const cookieStore = await cookies();

    cookieStore.delete("session_user");

    redirect("/auth/login");
}