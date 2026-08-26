import { UserProjectTask } from "@/types/project"
import { projectStageLabels } from "../../../utils/enum"
import { Card, Timeline, TimelineContent, TimelineItem, Tooltip } from "flowbite-react"
import { CreateCommentModal } from "@/features/project/components/CreateComment"

type ProjectContentProps = {
    project: UserProjectTask
}

type CommentTooltipProps = {
    taskId: number
    comments: UserProjectTask["comments"]
}
const CommentTooltip = ({ taskId, comments }: CommentTooltipProps) => {
    return (
        <div className="">
            <CreateCommentModal taskId={taskId} projectId={null} size="xs" />
            <ul className="comments">
                {comments && comments.map((comment) => (
                    <li key={comment.id} className="mt-2">
                        <h2 className="text-sm font-semibold">{comment.author.email}</h2>    
                        <p>{comment.comment}</p> 
                    </li>
                ))}
            </ul>
        </div>
    )
}

export const ProjectContent = ({ project }: ProjectContentProps) => {
    const { name, description, tasks } = project
    const statesKeys = Object.keys(projectStageLabels)

    return (
        <div className="">
            <h1>{name}</h1>
            <p>{description}</p>
            <Timeline horizontal>
                {statesKeys.map((key) => {
                    const tasksInState = tasks.filter((task) => task.status === key)
                    return (
                        <TimelineItem key={key}>
                            <TimelineContent>
                                <h3 className="font-semibold text-gray-900 dark:text-white">
                                    {projectStageLabels[key as keyof typeof projectStageLabels]}
                                </h3>
                                <p className="text-sm text-gray-500 dark:text-gray-400">
                                    {tasksInState.length} tasks
                                </p>
                                <ul className="mt-3 space-y-1 text-sm font-medium text-gray-500 dark:text-gray-400">
                                    {tasksInState.map((task) => (
                                        <Card key={task.id} className="max-w-sm">
                                            <h5 className="text-lg font-bold text-gray-900 dark:text-white flex gap-2 items-center">{task.title}
                                                <Tooltip content={<CommentTooltip taskId={task.id} comments={task.comments} />}>
                                                    <div className="relative">
                                                        <svg xmlns="http://www.w3.org/2000/svg" fill={task.comments && task.comments.length > 0 ? "#5fc4fa" : "#e5e5e5"} viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-4">
                                                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 20.25c4.97 0 9-3.694 9-8.25s-4.03-8.25-9-8.25S3 7.444 3 12c0 2.104.859 4.023 2.273 5.48.432.447.74 1.04.586 1.641a4.483 4.483 0 0 1-.923 1.785A5.969 5.969 0 0 0 6 21c1.282 0 2.47-.402 3.445-1.087.81.22 1.668.337 2.555.337Z" />
                                                        </svg>

                                                        <span className="absolute bottom-0 right-[5px] text-[8px]">{task.comments && task.comments.length}</span>
                                                    </div>

                                                </Tooltip>
                                            </h5>

                                            <p className="text-gray-700 dark:text-gray-300">{task.description}</p>

                                        </Card>
                                    ))}
                                </ul>
                            </TimelineContent>
                        </TimelineItem>
                    )
                })}
            </Timeline>
            <CreateCommentModal taskId={null} projectId={project.id} />
            {project?.comments && project.comments.map((comment) => (
                <div key={comment.id} className="mt-4">
                    <h2 className="text-lg font-semibold text-gray-900 dark:text-white">{comment.author.email}</h2>
                    <p className="text-gray-700 dark:text-gray-300">{comment.comment}</p>
                </div>
            ))}
        </div >
    )
}