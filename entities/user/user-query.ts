import { getSession } from "@/lib/auth";
import { prisma } from "@/lib/prisma"

export const getUserId = async (): Promise<number> => {

    const email = await getSession();

    if (!email) {
        throw new Error("Користувач відсутній")
    }

    const user = await prisma.user.findUnique({
        where: { email }
    })

    if (!user) {
        throw new Error("Користувач відсутній")
    }

    return user?.id  
}