import { jwtVerify, SignJWT } from "jose";
import { cookies } from "next/headers";

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

    if (!(typeof payload.email === 'string')) {
        throw new Error("Токен відсутній")
    }

    return payload.email

}

export const getSession = async (): Promise<string | null> => {
    const cookieStore = await cookies();

    const token = cookieStore.get("session_user")?.value;

    if (!token) return null

    const { payload } = await jwtVerify(token, secret)

    return typeof payload.email === 'string' ? payload.email : null

}

export const deleteSession = async () => {
    const cookieStore = await cookies();
    
    cookieStore.delete("session_user");
}
