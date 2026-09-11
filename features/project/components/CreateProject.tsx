'use client'

import { Button, Datepicker, Label, Textarea, TextInput } from "flowbite-react";
import { useActionState, useEffect, useState } from "react";
import { createAction } from "../actions/project-create.action";

const initialState = {
    success: false,
    message: "",
};

export default function ProjectCreateForm() {
    const [state, formAction, pending] = useActionState(
        createAction,
        initialState
    );

    const [dateStart, setDateStart] = useState<Date | null>(null);
    const [dateEnd, setDateEnd] = useState<Date | null>(null);

    return (
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
                />
            </div>
            <Button type="submit" color="secondary">Зберегти</Button>
        </form>
    )
}