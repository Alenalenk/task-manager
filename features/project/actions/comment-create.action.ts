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
            error: 'Будь ласка, перевірте правильність введених даних',
            message: '',
        }
    }

    const data = validated.data

    let comment

    try {

        if (!data.comment) {
            return {
                success: false,
                error: 'Заповніть поле назва',
                message: null,
            }
        }

        const userId = await getUserId();

        if (!userId) {
            return {
                success: false,
                error: 'Користувач не знайдений',
                message: null
            }
        }

        comment = await prisma.comment.create({
            data: {
                ...data, authorId: userId
            }
        })


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