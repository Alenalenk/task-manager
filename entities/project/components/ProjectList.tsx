import { UserProject } from "@/types/project"
import Link from "next/link"

type ProjectList = {
    data: UserProject[]
}
export default function ProjectList({ data }: ProjectList) {
    return (
        <div className="">
            <ul>
                {data.map(item => {
                    const { id, name, userRole } = item;
                    return (
                        <li key={id}>
                            <Link href={`/project/${id}`}>{name}</Link>
                            {userRole}
                        </li>
                    )
                })}
            </ul>
        </div>
    )
}