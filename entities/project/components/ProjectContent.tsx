import {  UserProjectTask } from "@/types/project"

type ProjectContentProps = {
    project: UserProjectTask
}

export const ProjectContent = ({ project }: ProjectContentProps) => {


    const { name, description, tasks } = project
    return (
        <div className="">
            <h1>{name}</h1>
            <p>{description}</p>
        </div >
    )
}