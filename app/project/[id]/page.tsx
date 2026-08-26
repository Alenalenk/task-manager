import { ProjectContent } from "@/entities/project/components/ProjectContent";
import { getProject } from "@/entities/project/server/project-query"
import { CreateTaskModal } from "@/features/project/components/CreateTask";

type ProjectPageProps = {
    params: Promise<{
        id: string;
    }>;
};

export default async function ProjectPage({ params }: ProjectPageProps) {
    const { id } = await params

    if (!id) return null;

    const project = await getProject(+id)

    if (!project.data) return null;
    

    return (
        <div className="min-w-full">

            <CreateTaskModal id={+id}/>
            <ProjectContent project={project.data} />
            
        </div>
    )
}