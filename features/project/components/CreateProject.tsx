'use client'

import { Button, Datepicker, Label, Textarea, TextInput } from "flowbite-react";
import { useActionState, useState } from "react";
import { createAction } from "../actions/project-create.action";
import { useRouter } from "next/navigation";
import { useGlobalActionError } from "@/app/shares/hooks/useGlobalActionError";
import { Loader } from "@/app/shares/widgets/Loader";

const initialState = {
    success: false,
    error: "",
    message: "",
};

export default function ProjectCreateForm() {
    const [state, formAction, pending] = useActionState(
        createAction,
        initialState
    );

    useGlobalActionError(state.error)

    const router = useRouter();

    const [dateStart, setDateStart] = useState<Date | null>(null);
    const [dateEnd, setDateEnd] = useState<Date | null>(null);

    return (
        <div className="relative">
            <form className="flex max-w-md flex-col gap-4" action={formAction}>
                <div>
                    <div className="mb-2 block">
                        <Label htmlFor="name">Назва проєкту</Label>
                    </div>
                    <TextInput id="name" type="text" required name="name" />
                </div>
                <div>
                    <div className="mb-2 block">
                        <Label htmlFor="description">Опис проєкту</Label>
                    </div>
                    <Textarea id="description" name="description" />
                </div>
                <div>
                    <div className="mb-2 block">
                        <Label htmlFor="dateStart">Дата початку</Label>
                    </div>
                    <Datepicker
                        id="dateStart"
                        name="dateStart"
                        value={dateStart}
                        onChange={setDateStart}
                        key="projectDateStart"
                    />
                </div>
                <div>
                    <div className="mb-2 block">
                        <Label htmlFor="dateEnd">Дата закінчення</Label>
                    </div>
                    <Datepicker
                        id="dateEnd"
                        name="dateEnd"
                        value={dateEnd}
                        onChange={setDateEnd}
                        key="projectDateEnd"
                    />
                </div>
                <div className="flex gap-2 justify-end">
                    <Button type="button" color="secondary" onClick={() => router.back()}>Назад</Button>
                    <Button type="submit" color="primary">Зберегти</Button>
                </div>
            </form>
            {pending && <div className="absolute top-0 left-0 right-0 bottom-0 w-auto h-auto flex justify-center items-center bg-white/50"><Loader /></div>}
        </div>
    )
}