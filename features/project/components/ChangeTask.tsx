'use client'

import { Button, Modal, ModalBody, ModalFooter, ModalHeader, TextInput } from "flowbite-react"
import { useActionState, useState } from "react"
import { commentCreateAction } from "../actions/comment-create.action";

const initialState = {
    success: false,
    message: "",
};

type CreateCommentProp = {
    taskId: number | null
    projectId: number | null
}

export const CreateCommentModal = ({ taskId, projectId }: CreateCommentProp) => {
    const [openModal, setOpenModal] = useState(false)

    const [state, formAction, pending] = useActionState(
        commentCreateAction,
        initialState
    );

    return (
        <div className="">
            <Button color="primary" onClick={() => setOpenModal(true)}> Додати коментар</Button >
            <Modal show={openModal} onClose={() => setOpenModal(false)}>
                <ModalHeader>Додати коментар</ModalHeader>
                <ModalBody>
                    <div className="space-y-6">
                        <form className="flex max-w-md flex-col gap-4" action={formAction}>
                            {taskId && <input type="hidden" name="taskId" value={taskId} />}
                            {projectId && <input type="hidden" name="projectId" value={projectId} />}
                            <TextInput type="text" required name="comment" />
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