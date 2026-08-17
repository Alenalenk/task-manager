import ProjectList from "@/entities/project/components/ProjectList";
import { getUserProjects } from "@/entities/project/server/project-query";

export default async function ProjectsPage(){
    const projects = await getUserProjects();

    if (!Array.isArray(projects)) return null

    return (
        <ProjectList data={projects}/>
    )
}