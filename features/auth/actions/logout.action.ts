'use server'

import { deleteSession } from '@/lib/auth';
import { redirect } from 'next/navigation'


export type ActionState = {
  success: boolean;
  message: string;
  errors?: {
    [key: string]: string[];
  };
};


export async function logoutAction(
  prevState: ActionState | null,
  formData: FormData
): Promise<ActionState> {

  try {

    deleteSession();

    return {
      success: true,
      message: 'Ви успішно вийшли з системи',
    }

  } catch (err) {
    console.error('Login action error:', err)
    return {
      success: false,
      message: 'Щось пішло не так. Спробуйте пізніше',
    }
  }

  redirect('/login')
}