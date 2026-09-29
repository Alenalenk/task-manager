'use server'

import { prisma } from '@/lib/prisma';
import { ActionState, TaskFormData } from '@/types/types';
import { getUserId } from '@/entities/user/user-query';
import { taskChangeSchema } from '../schemas/task-change.schema';


export async function taskChangeAction(
    prevState: ActionState | null,
    formData: TaskFormData
): Promise<ActionState> {
    const rowData = formData;

    const validated = taskChangeSchema.safeParse(rowData)

    if (!validated.success) {
        return {
            success: false,
            message: null,
            error: 'Будь ласка, перевірте правильність введених даних',
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

        task = await prisma.task.update({
            where: { id: data.id },
            data: {
                ...data, authorId: userId
            }
        })

        return {
            success: true,
            message: "Все ок"
        }
    } catch (err) {

        return {
            success: false,
            message: null,
            error: 'Щось пішло не так. Спробуйте пізніше',
        }
    }
}