'use client'

import { projectAction } from "@/features/auth/actions/project.action";
import { Button, Label, TextInput } from "flowbite-react";
import { useActionState } from "react";

const initialState = {
  success: false,
  message: "",
};

export default function LoginForm() {
    const [state, formAction, pending] = useActionState(
        projectAction,
        initialState
    );
    return (
        <form className="flex max-w-md flex-col gap-4" action={formAction}>
            <div>
                <div className="mb-2 block">
                    <Label htmlFor="name">Назва проєкту</Label>
                </div>
                <TextInput id="name" type="text" placeholder="розробка воркбуку" required name="name"/>
            </div>
            <div>
                <div className="mb-2 block">
                    <Label htmlFor="description">Your password</Label>
                </div>
                <TextInput id="description" type="description" required name="description"/>
            </div>
            <Button type="submit" color="secondary">Submit</Button>
        </form>
    )
}