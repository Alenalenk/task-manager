"use server";

import { prisma } from "@/lib/prisma";

const bcrypt = require('bcrypt');

export type ActionState = {
  success: boolean;
  message: string | null;
  error?: string;
};


export async function logupAction(
  prevState: ActionState,
  formData: FormData
): Promise<ActionState> {


  const email = formData.get("email") as string;
  const password1 = formData.get("password1");
  const password2 = formData.get("password2");



  if (!email) {
    return {
      success: false,
      error: "Email обов'язковий",
      message: null,
    };
  }

  if (password1 !== password2) {
    return {
      success: false,
      message: "Паролі не співпадають"
    };
  }

  const saltRounds = 10;


  const hashPassword = await bcrypt.hash(password1, saltRounds)

  try {
    const user = await prisma.user.create({
      data: {
        email,
        password: hashPassword
      }
    })



    return {
      success: true,
      message: "Акаутнт успішно створено! Перейдіть на сторінку входу для авторизації."
    };
  } catch (error) {
    return {
      success: false,
      message: "Щось пішло не так"
    };
  }
}