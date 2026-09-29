'use client'

import { Button, Modal, ModalBody, ModalFooter, ModalHeader, TextInput } from "flowbite-react"
import { useActionState, useEffect, useState } from "react"
import { commentCreateAction } from "../actions/comment-create.action";
import { useRouter } from "next/navigation";
import { useGlobalActionError } from "@/app/shares/hooks/useGlobalActionError";
import { Loader } from "@/app/shares/widgets/Loader";

const initialState = {
    success: false,
    error:"",
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

    useGlobalActionError(state.error)

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
                    <div className="space-y-6 relative">
                        <form className="flex max-w-md flex-col gap-4" action={formAction}>
                            {taskId && <input type="hidden" name="taskId" value={taskId} />}
                            {projectId && <input type="hidden" name="projectId" value={projectId} />}
                            <TextInput type="text" required name="comment" />
                            <Button type="submit" color="primary" size="xs">Зберегти</Button>
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
        </div>
    )
}