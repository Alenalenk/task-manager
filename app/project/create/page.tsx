import ProjectCreateForm from "@/features/project/components/CreateProject";

export default async function ProjectCreate({ params }: {
    params: Promise<{ id: string }>
}) {
    const { id } = await params;

    return (
        <div className="">
            <ProjectCreateForm/>
        </div>
    )
}