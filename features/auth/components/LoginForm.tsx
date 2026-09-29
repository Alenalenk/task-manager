'use client'

import { Button, Label, TextInput } from "flowbite-react";
import { useActionState } from "react";
import { loginAction } from "../actions/login.action";
import Link from "next/link";
import { useGlobalActionError } from "@/app/shares/hooks/useGlobalActionError";
import { Loader } from "@/app/shares/widgets/Loader";

const initialState = {
    success: false,
    message: "",
};

export default function LoginForm() {
    const [state, formAction, pending] = useActionState(
        loginAction,
        initialState
    );

    useGlobalActionError(state.error)


    return (
        <div className="relative">
            <form className="flex max-w-md flex-col gap-4" action={formAction}>
                <h2 className="text-xl font-bold">ВХІД</h2>
                <div>
                    <div className="mb-2 block">
                        <Label htmlFor="email">Ваш email</Label>
                    </div>
                    <TextInput id="email" type="email" placeholder="name@flowbite.com" required name="email" />
                </div>
                <div>
                    <div className="mb-2 block">
                        <Label htmlFor="password">Ваш пароль</Label>
                    </div>
                    <TextInput id="password" type="password" required name="password" />
                </div>
                <p><Link href="/auth/logup" className="text-sm text-blue-500 hover:underline">Створити акаунт</Link></p>
                <Button type="submit" color="primary" disabled={pending}>
                    Відправити
                </Button>
            </form>
            {pending && <div className="absolute top-0 left-0 right-0 bottom-0 w-auto h-auto flex justify-center items-center bg-white/50"><Loader /></div>}
        </div>
    )
}