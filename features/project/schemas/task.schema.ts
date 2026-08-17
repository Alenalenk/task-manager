import { z } from 'zod'

export const taskSchema = z.object({
    title: z
        .string("Назва є обов'язковим полем")
        .min(1, "Назва не може бути порожньою")
        .trim(),

    description: z
        .string(),

    dateStart: z
        .string()
        .nullable()
        .transform(date =>  date ? new Date(date).toISOString() : null),

    dateEnd: z
        .string()
        .nullable()
        .transform(date => date ? new Date(date).toISOString() : null),

    projectId: z
        .string()
        .transform(id => Number(id))
})

// Автоматичне виведення типу TypeScript зі схеми Zod
export type LoginInput = z.infer<typeof taskSchema>