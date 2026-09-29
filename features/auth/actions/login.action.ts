'use server'
const bcrypt = require('bcrypt');
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { loginSchema } from '../schemas/login.schema'
import { prisma } from '@/lib/prisma';
import { createToken } from '@/lib/auth';


export type ActionState = {
  success: boolean;
  message: string | null;
  error?: string;
};


export async function loginAction(
  prevState: ActionState | null,
  formData: FormData
): Promise<ActionState> {

  const rawData = Object.fromEntries(formData.entries())

  const validated = loginSchema.safeParse(rawData)

  if (!validated.success) {
    return {
      success: false,
      error: 'Будь ласка, перевірте правильність введених даних',
      message: null
    }
  }

  const { email, password } = validated.data

  try {

    const user = await prisma.user.findUnique({
      where: { email },
    })

    if (!user || !user.password) {
      return {
        success: false,
        error: 'Невірний email або пароль',
        message: null
      }
    }

    const isPasswordValid = await bcrypt.compare(password, user.password)

    if (!isPasswordValid) {
      return {
        success: false,
        error: 'Невірний email або пароль',
        message: null
      }
    }


    const emailToken = await createToken(user.email)

    const cookieStore = await cookies()


    cookieStore.set('session_user', String(emailToken), {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 7, // Сесія на 7 днів
      path: '/',
    })

  } catch (err) {
    console.error('Login action error:', err)
    return {
      success: false,
      error: 'Щось пішло не так. Спробуйте пізніше',
      message: null,
    }
  }

  redirect('/')
}