'use client'

import { Button, Datepicker, Label, Modal, ModalBody, ModalFooter, ModalHeader, Textarea, TextInput } from "flowbite-react"
import { useActionState, useState } from "react"
import { taskCreateAction } from "../actions/task-create.action";

const initialState = {
    success: false,
    message: "",
};

type CreateTaskProp = {
    id: number
}

export const CreateTaskModal = ({id}: CreateTaskProp) => {
    const [openModal, setOpenModal] = useState(false)

    const [state, formAction, pending] = useActionState(
        taskCreateAction,
        initialState
    );

    const [dateStart, setDateStart] = useState<Date | null>(null);
    const [dateEnd, setDateEnd] = useState<Date | null>(null);
    return (
        <div className="">
            < Button color="primary" onClick={() => setOpenModal(true)}> Додати завдання</Button >
            <Modal show={openModal} onClose={() => setOpenModal(false)}>
                <ModalHeader>Terms of Service</ModalHeader>
                <ModalBody>
                    <div className="space-y-6">
                        <form className="flex max-w-md flex-col gap-4" action={formAction}>
                            <div>
                                <div className="mb-2 block">
                                    <Label htmlFor="title">Назва проєкту</Label>
                                </div>
                                <TextInput id="title" type="text" required name="title" />
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
                            <div>
                                <TextInput type="text" hidden name="projectId" defaultValue={id}/>
                            </div>
                            <Button type="submit" color="secondary">Submit</Button>
                        </form>
                    </div>
                </ModalBody>
                <ModalFooter>
                    <Button color="alternative" onClick={() => setOpenModal(false)}>
                        Decline
                    </Button>
                </ModalFooter>
            </Modal>
        </div>
    )
}