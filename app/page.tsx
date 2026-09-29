import ProjectList from "@/entities/project/components/ProjectList";
import { getUserProjects } from "@/entities/project/server/project-query";
import { Button } from "flowbite-react";
import Link from "next/link";


export default async function Home() {
  const projects = await getUserProjects();

  if (!Array.isArray(projects.data)) return null

  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-white font-sans dark:bg-black min-h-screen relative">
      <div className="absolute left-0 right-0 z-0 w-full h-full"><img src="/bg.png" className="w-full h-full object-cover" /></div>
      <main className="flex flex-1 w-full flex-col max-w-6xl justify-between my-8 px-16 py-5 bg-white dark:bg-black sm:items-start">
        <div className="min-w-full z-40">
          <div className="d-flex flex-col">
            <div className="justify-self-end">
              <Button color="primary"> <Link href='/project/create'>Створити проєкт</Link></Button>
            </div>
            <ProjectList data={projects.data} />
          </div>
        </div>

      </main>
    </div>
  );
}
