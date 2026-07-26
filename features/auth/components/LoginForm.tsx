'use client'

import { Button, Label, TextInput } from "flowbite-react";
import { useActionState } from "react";
import { loginAction } from "../actions/login.action";

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
            <div>
                <div className="mb-2 block">
                    <Label htmlFor="email">Your email</Label>
                </div>
                <TextInput id="email" type="email" placeholder="name@flowbite.com" required name="email"/>
            </div>
            <div>
                <div className="mb-2 block">
                    <Label htmlFor="password">Your password</Label>
                </div>
                <TextInput id="password" type="password" required name="password"/>
            </div>
            <Button type="submit" color="secondary">Submit</Button>
        </form>
    )
}