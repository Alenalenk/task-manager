import { z } from 'zod'

export const createSchema = z.object({
    name: z
        .string("Назва є обов'язковим полем")
        .min(1, "Назва не може бути порожньою")
        .trim(),
    description: z
        .string()
        .optional(),

    dateStart: z
        .string()
        .nullable()
        .transform(date =>  date ? new Date(date).toISOString() : null),

    dateEnd: z
        .string()
        .nullable()
        .transform(date => date ? new Date(date).toISOString() : null),
})

// Автоматичне виведення типу TypeScript зі схеми Zod
export type LoginInput = z.infer<typeof createSchema>