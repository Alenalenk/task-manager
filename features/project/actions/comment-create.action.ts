'use server'

import { prisma } from '@/lib/prisma';
import { ActionState } from '@/types/types';
import { getUserId } from '@/entities/user/user-query';
import { commentSchema } from '../schemas/comment.schema';


export async function commentCreateAction(
    prevState: ActionState | null,
    formData: FormData
): Promise<ActionState> {

    const rowData = Object.fromEntries(formData.entries())

    const validated = commentSchema.safeParse(rowData)

    if (!validated.success) {
        return {
            success: false,
            message: 'Будь ласка, перевірте правильність введених даних',
        }
    }

    const data = validated.data

    let comment

    try {

        if (!data.comment) {
            return {
                success: false,
                message: 'Заповніть поле назва',
            }
        }

        const userId = await getUserId();

        if (!userId) {
            return {
                success: false,
                message: 'Користувач не знайдений'
            }
        }

        comment = await prisma.comment.create({
            data: {
                ...data, authorId: userId
            }
        })

        console.log(comment)

        return {
            success: true,
            message: "Все ок"
        }
    } catch (err) {
        console.error('Comment create action error:', err)
        return {
            success: false,
            message: 'Щось пішло не так. Спробуйте пізніше',
        }
    }
}