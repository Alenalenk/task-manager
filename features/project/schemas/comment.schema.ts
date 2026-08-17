import { z } from 'zod'

export const commentSchema = z.object({
    comment: z
        .string("Назва є обов'язковим полем")
        .min(1, "Назва не може бути порожньою")
        .trim(),

    taskId: z
        .string()
        .nullable()
        .transform(id => Number(id)),

    projectId: z
        .string()
        .nullable()
        .transform(id => Number(id))
})

// Автоматичне виведення типу TypeScript зі схеми Zod
export type LoginInput = z.infer<typeof commentSchema>