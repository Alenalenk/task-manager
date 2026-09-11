'use client'

import { Button, Label, TextInput } from "flowbite-react";
import { useActionState } from "react";
import { loginAction } from "../actions/login.action";
import Link from "next/link";

const initialState = {
  success: false,
  message: "",
};

export default function LoginForm() {
    const [state, formAction, pending] = useActionState(
        loginAction,
        initialState
    );
    return (
        <form className="flex max-w-md flex-col gap-4" action={formAction}>
            <h2 className="text-xl font-bold">ВХІД</h2>
            <div>
                <div className="mb-2 block">
                    <Label htmlFor="email">Ваш email</Label>
                </div>
                <TextInput id="email" type="email" placeholder="name@flowbite.com" required name="email"/>
            </div>
            <div>
                <div className="mb-2 block">
                    <Label htmlFor="password">Ваш пароль</Label>
                </div>
                <TextInput id="password" type="password" required name="password"/>
            </div>
            <p><Link href="/auth/logup" className="text-sm text-blue-500 hover:underline">Створити акаунт</Link></p>
            <Button type="submit" color="secondary" disabled={pending}>
                Відправити
            </Button>
        </form>
    )
}