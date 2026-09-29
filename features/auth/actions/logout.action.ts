'use server'

import { deleteSession } from '@/lib/auth';


export type ActionState = {
  success: boolean;
  message: string | null;
  error?: string;
};


export async function logoutAction(
  prevState: ActionState | null,
  formData: FormData
): Promise<ActionState> {

  try {

    await deleteSession();
    return {
      success: true,
      message: 'Успішно!',
    }

  } catch (err) {
    console.error('Login action error:', err)
    return {
      success: false,
      error: 'Щось пішло не так. Спробуйте пізніше',
      message: null,
    }
  }

  
}