"use server";

import { prisma } from "@/lib/prisma";

const bcrypt = require('bcrypt');

export type ActionState = {
  success: boolean;
  message: string;
  errors?: {
    [key: string]: string[];
  };
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
      message: "Email обов'язковий"
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

  console.log(hashPassword)

  try {
    const user = await prisma.user.create({
      data: {
        email,
        password: hashPassword
      }
    })



    return {
      success: true,
      message: "Успішно"
    };
  } catch (error) {
    console.log(error)
    return {
      success: false,
      message: "Щось пішло не так"
    };
  }
}