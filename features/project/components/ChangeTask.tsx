'use client'

import { Button, Datepicker, Label, Modal, ModalBody, ModalFooter, ModalHeader, Select, Textarea, TextInput } from "flowbite-react"
import { startTransition, useActionState, useState } from "react"
import { taskChangeAction } from "../actions/task-change.action";
import { TaskWithComments } from "@/types/project";
import { Status } from "@/lib/generated/prisma/browser";
import { TaskFormData } from "@/types/types";
import { useRouter } from "next/navigation";
import { projectStageLabels } from "@/utils/enum";
import { useGlobalActionError } from "@/app/shares/hooks/useGlobalActionError";
import { Loader } from "@/app/shares/widgets/Loader";

const initialState = {
    success: false,
    error: "",
    message: "",
};

type ChangeTaskProp = {
    task: TaskWithComments
}



export const ChangeTask = ({ task }: ChangeTaskProp) => {
    const [openModal, setOpenModal] = useState(false);
    const router = useRouter();


    const [state, formAction, pending] = useActionState(
        taskChangeAction,
        initialState
    );

    useGlobalActionError(state.error)

    const [formTask, setFormTask] = useState<TaskFormData>(
        {
            id: task.id,
            title: task.title,
            description: task.description,
            status: task.status,
            dateStart: task.dateStart ? new Date(task.dateStart) : null,
            dateEnd: task.dateEnd ? new Date(task.dateEnd) : null,
        }
    );

    const handleChange = (name: string, value: string | null | Date) => {
        setFormTask((prevTask) => ({ ...prevTask, [name]: value }))
    }

    const handleSubmit = () => {
        startTransition(async () => {
            await formAction(formTask);

            router.refresh();

            setOpenModal(false);
        });
    }


    return (
        <div className="">
            <div className="cursor-pointer" title="Редагувати задачу" onClick={() => setOpenModal(true)}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-4">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
                </svg>
            </div>
            <Modal show={openModal} onClose={() => setOpenModal(false)}>
                <ModalHeader>Змінити задачу</ModalHeader>
                <ModalBody>
                    <div className="space-y-6 relative">
                        <form className="flex max-w-md flex-col gap-4">
                            <div>
                                <div className="mb-2 block">
                                    <Label htmlFor="title">Назва задачі</Label>
                                </div>
                                <TextInput
                                    id="title" type="text" required name="title" value={formTask.title}
                                    onChange={(e) => handleChange(e.target.name, e.target.value)} />
                            </div>
                            <div>
                                <div className="mb-2 block">
                                    <Label htmlFor="status">Статус</Label>
                                </div>
                                <Select id="status" name="status" value={formTask.status} onChange={(e) => handleChange(e.target.name, e.target.value)}>
                                    {Object.values(Status).map((status) => (
                                        <option key={status} value={status}>
                                            {projectStageLabels[status]}
                                        </option>
                                    ))}
                                </Select>
                            </div>
                            <div>
                                <div className="mb-2 block">
                                    <Label htmlFor="description">Опис задачі</Label>
                                </div>
                                <Textarea id="description" name="description" value={formTask.description}
                                    onChange={(e) => handleChange(e.target.name, e.target.value)} />
                            </div>
                            <div>
                                <div className="mb-2 block">
                                    <Label htmlFor="dateStart">Дата початку</Label>
                                </div>
                                <Datepicker
                                    id="dateStart"
                                    name="dateStart"
                                    value={formTask.dateStart}
                                    onChange={(date) => handleChange("dateStart", date)}
                                />
                            </div>
                            <div>
                                <div className="mb-2 block">
                                    <Label htmlFor="dateEnd">Дата закінчення</Label>
                                </div>
                                <Datepicker
                                    id="dateEnd"
                                    name="dateEnd"
                                    value={formTask.dateEnd}
                                    onChange={(date) => handleChange("dateEnd", date)}
                                />
                            </div>

                            <Button
                                type="button" color="primary" size="xs"
                                onClick={handleSubmit}>
                                Зберегти
                            </Button>
                        </form>
                        {pending && <div className="absolute top-0 left-0 right-0 bottom-0 w-auto h-auto flex justify-center items-center bg-white/50"><Loader/></div>}
                    </div>
                </ModalBody>
                <ModalFooter>
                    <Button color="alternative" onClick={() => setOpenModal(false)}>
                        Закрити
                    </Button>
                </ModalFooter>
            </Modal>
        </div >
    )
}