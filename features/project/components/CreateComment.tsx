'use client'

import { Button, Modal, ModalBody, ModalFooter, ModalHeader, TextInput } from "flowbite-react"
import { useActionState, useEffect, useState } from "react"
import { commentCreateAction } from "../actions/comment-create.action";
import { useRouter } from "next/navigation";

const initialState = {
    success: false,
    message: "",
};

type CreateCommentProp = {
    taskId: number | null
    projectId: number | null
    size?: "xs" | "sm" | "md" | "lg" | "xl" | "2xl"
    title: string
}

export const CreateCommentModal = ({ taskId, projectId, size, title }: CreateCommentProp) => {
    const [openModal, setOpenModal] = useState(false)

    const [state, formAction, pending] = useActionState(
        commentCreateAction,
        initialState
    );

    const router = useRouter();

    

    useEffect(() => {
        if (state.success) {
            setOpenModal(false);
            router.refresh();
        }
    }, [state.success]);

    return (
        <div className="min-w-max">
            <Button
                color="primary"
                onClick={() => setOpenModal(true)}
                size={size || "xs"}
            > Додати коментар до {title}</Button >
            <Modal show={openModal} onClose={() => setOpenModal(false)}>
                <ModalHeader>Додати коментар</ModalHeader>
                <ModalBody>
                    <div className="space-y-6">
                        <form className="flex max-w-md flex-col gap-4" action={formAction}>
                            {taskId && <input type="hidden" name="taskId" value={taskId} />}
                            {projectId && <input type="hidden" name="projectId" value={projectId} />}
                            <TextInput type="text" required name="comment" />
                            <Button type="submit" color="secondary" size="xs">Зберегти</Button>
                        </form>
                    </div>
                </ModalBody>
                <ModalFooter>
                    <Button color="alternative" onClick={() => setOpenModal(false)}>
                        Закрити
                    </Button>
                </ModalFooter>
            </Modal>
        </div>
    )
}