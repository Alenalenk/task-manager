import ProjectCreateForm from "@/features/project/components/CreateProject";

export default async function ProjectCreate({ params }: {
    params: Promise<{ id: string }>
}) {

    return (
        <div className="py-5">
            <ProjectCreateForm/>
        </div>
    )
}