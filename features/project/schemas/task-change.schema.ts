import { Status } from '@/lib/generated/prisma/browser'
import { z } from 'zod'


export const taskChangeSchema = z.object({
    id: z
        .number()
        .optional(),

    status: z
        .enum(Status)
        .optional(),

    title: z
        .string("Назва є обов'язковим полем")
        .min(1, "Назва не може бути порожньою")
        .trim(),

    description: z
        .string(),

    dateStart: z
        .date()
        .nullable(),

    dateEnd: z
        .date()
        .nullable(),
})

// Автоматичне виведення типу TypeScript зі схеми Zod
export type LoginInput = z.infer<typeof taskChangeSchema>