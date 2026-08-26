'use server'

import { prisma } from '@/lib/prisma';
import { ActionState } from '@/types/types';
import { getUserId } from '@/entities/user/user-query';
import { taskSchema } from '../schemas/task.schema';


export async function taskChangeAction(
    prevState: ActionState | null,
    formData: FormData
): Promise<ActionState> {
    const rowData = Object.fromEntries(formData.entries())

    const validated = taskSchema.safeParse(rowData)

    if (!validated.success) {
        return {
            success: false,
            message: 'Будь ласка, перевірте правильність введених даних',
        }
    }

    const data = validated.data

    let task

    try {

        if (!data.title) {
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

        task = await prisma.task.update({
            where: { id: data.id },
            data: {
                ...data, authorId: userId
            }
        })

        console.log(task)

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