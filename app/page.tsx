import ProjectList from "@/entities/project/components/ProjectList";
import { getUserProjects } from "@/entities/project/server/project-query";
import { Button } from "flowbite-react";
import Link from "next/link";


export default async function Home() {
  const projects = await getUserProjects();

  if (!Array.isArray(projects)) return null
  
  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex flex-1 w-full max-w-3xl flex-col items-center justify-between py-32 px-16 bg-white dark:bg-black sm:items-start">
        <div className="container">
          <div className="d-flex flex-col">
            <Button color="primary"> <Link href='/project/create'>Створити проєкт</Link></Button>
            <ProjectList data={projects} />
          </div>
        </div>
      </main>
    </div>
  );
}
