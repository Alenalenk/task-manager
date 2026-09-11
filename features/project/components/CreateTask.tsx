'use client'

import { Button, Datepicker, Label, Modal, ModalBody, ModalFooter, ModalHeader, Textarea, TextInput } from "flowbite-react"
import { useActionState, useEffect, useState } from "react"
import { taskCreateAction } from "../actions/task-create.action";
import { useRouter } from "next/navigation";

const initialState = {
    success: false,
    message: "",
};

type CreateTaskProp = {
    id: number
}

export const CreateTaskModal = ({ id }: CreateTaskProp) => {
    const [openModal, setOpenModal] = useState(false)

    const [state, formAction, pending] = useActionState(
        taskCreateAction,
        initialState
    );

    const [dateStart, setDateStart] = useState<Date | null>(null);
    const [dateEnd, setDateEnd] = useState<Date | null>(null);

    const router = useRouter()

    useEffect(() => {
        if (state.success) {
            setOpenModal(false);
            router.refresh();
        }
    }, [state.success]);

    return (
        <div>
            <div className="flex justify-end"><Button color="primary" onClick={() => setOpenModal(true)} size="xs"> Додати завдання</Button ></div>
            <Modal show={openModal} onClose={() => setOpenModal(false)}>
                <ModalHeader>Створити нове завдання</ModalHeader>
                <ModalBody>
                    <div className="space-y-6">
                        <form className="flex max-w-md flex-col gap-4" action={formAction}>
                            <div>
                                <div className="mb-2 block">
                                    <Label htmlFor="title">Назва задачі</Label>
                                </div>
                                <TextInput id="title" type="text" required name="title" />
                            </div>
                            <div>
                                <div className="mb-2 block">
                                    <Label htmlFor="description">Опис задачі</Label>
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
                            <div>
                                <TextInput type="text" hidden name="projectId" defaultValue={id} />
                            </div>
                            <Button type="submit" color="secondary" size="xs">Зберегти</Button>
                        </form>
                    </div>
                </ModalBody>
                <ModalFooter>
                    <Button color="alternative" onClick={() => setOpenModal(false)} size="xs">
                        Закрити
                    </Button>
                </ModalFooter>
            </Modal>
        </div>
    )
}