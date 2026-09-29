'use server'

import { prisma } from '@/lib/prisma';
import { ActionState } from '@/types/types';
import { getUserId } from '@/entities/user/user-query';
import { taskSchema } from '../schemas/task.schema';


export async function taskCreateAction(
    prevState: ActionState | null,
    formData: FormData
): Promise<ActionState> {

    const rowData = Object.fromEntries(formData.entries())

    const validated = taskSchema.safeParse(rowData)

    if (!validated.success) {
        return {
            success: false,
            error: 'Будь ласка, перевірте правильність введених даних',
            message: null
        }
    }

    const data = validated.data

    let task

    try {

        if (!data.title) {
            return {
                success: false,
                error: 'Заповніть поле назва',
                message: null
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

        task = await prisma.task.create({
            data: {
                ...data, authorId: userId
            }
        })

        return {
            success: true,
            message: "Все ок"
        }
    } catch (err) {
        console.error('Project create action error:', err)
        return {
            success: false,
            error: 'Щось пішло не так. Спробуйте пізніше',
            message: null,
        }
    }
}