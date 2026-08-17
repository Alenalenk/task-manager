'use server'

import { redirect } from 'next/navigation'
import { prisma } from '@/lib/prisma';
import { createSchema } from '../schemas/project.schema';
import { ActionState } from '@/types/types';
import { getUserId } from '@/entities/user/user-query';


export async function createAction(
    prevState: ActionState | null,
    formData: FormData
): Promise<ActionState> {

    const rowData = Object.fromEntries(formData.entries())

    const validated = createSchema.safeParse(rowData)

    if (!validated.success) {
        return {
            success: false,
            message: 'Будь ласка, перевірте правильність введених даних',
        }
    }

    const data = validated.data


    let project

    try {

        if (!data.name) {
            return {
                success: false,
                message: 'Заповніть поле назва',
            }
        }

        const userId = await getUserId();

        if(!userId){
            return {
                success: false,
                message: 'Користувач не знайдений'
            }
        }

        project = await prisma.project.create({
            data: {
                ...data, usersOnProject: {
                    create: {
                        userId,
                        userRole: 'OWNER',
                    },
                }
            }
        })


    } catch (err) {
        console.error('Project create action error:', err)
        return {
            success: false,
            message: 'Щось пішло не так. Спробуйте пізніше',
        }
    }

    redirect(`/project/${project.id}`)
}