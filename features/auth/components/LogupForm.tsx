'use client'

import { Button, Label, TextInput } from "flowbite-react";
import { logupAction } from "../actions/logup.action";
import { useActionState } from "react";

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
            <div>
                <div className="mb-2 block">
                    <Label htmlFor="email">Your email</Label>
                </div>
                <TextInput id="email" type="email" placeholder="name@flowbite.com" required name="email"/>
            </div>
            <div>
                <div className="mb-2 block">
                    <Label htmlFor="password1">Your password</Label>
                </div>
                <TextInput id="password1" type="password" required name="password1"/>
            </div>
            <div>
                <div className="mb-2 block">
                    <Label htmlFor="password2">Repeat your password</Label>
                </div>
                <TextInput id="password2" type="password" required name="password2"/>
            </div>
            <Button type="submit" color="secondary">Submit</Button>
        </form>
    )
}