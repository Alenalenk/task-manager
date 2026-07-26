import { z } from 'zod'

export const loginSchema = z.object({
  email: z
    .string("Email є обов'язковим полем" )
    .min(1, "Email не може бути порожнім")
    .email("Введіть коректну адресу електронної пошти")
    .trim()
    .toLowerCase(),

  password: z
    .string("Пароль є обов'язковим полем" )
    .min(1, "Пароль не може бути порожнім")
    /* .min(6, "Пароль має містити щонайменше 6 символів") */,

})

// Автоматичне виведення типу TypeScript зі схеми Zod
export type LoginInput = z.infer<typeof loginSchema>