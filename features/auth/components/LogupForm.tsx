'use client'

import { Button, Label, TextInput } from "flowbite-react";
import { logupAction } from "../actions/logup.action";
import { useActionState } from "react";
import Link from "next/link";

const initialState = {
  success: false,
  message: "",
};

export default function LogupForm() {
    const [state, formAction, pending] = useActionState(
        logupAction,
        initialState
    );
    return (
        <form className="flex max-w-md flex-col gap-4" action={formAction}>
            <h2 className="text-xl font-bold">РЕЄСТРАЦІЯ</h2>
            <div>
                <div className="mb-2 block">
                    <Label htmlFor="email">Ваш email</Label>
                </div>
                <TextInput id="email" type="email" placeholder="name@flowbite.com" required name="email"/>
            </div>
            <div>
                <div className="mb-2 block">
                    <Label htmlFor="password1">Ваш пароль</Label>
                </div>
                <TextInput id="password1" type="password" required name="password1"/>
            </div>
            <div>
                <div className="mb-2 block">
                    <Label htmlFor="password2">Повторіть пароль</Label>
                </div>
                <TextInput id="password2" type="password" required name="password2"/>
            </div>
            <p><Link href="/auth/login" className="text-sm text-blue-500 hover:underline">Вже маєте акаунт? Увійти</Link></p>
            <Button type="submit" color="secondary" disabled={pending}>
                Відправити
            </Button>
        </form>
    )
}