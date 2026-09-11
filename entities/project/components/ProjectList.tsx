import { UserProject } from "@/types/project"
import { projectRoleLabels } from "@/utils/enum"
import Link from "next/link"
import { Table, TableBody, TableCell, TableHead, TableHeadCell, TableRow } from "flowbite-react";

type ProjectList = {
    data: UserProject[]
}


export default function ProjectList({ data }: ProjectList) {
    return (
        <div className="py-5">
            <h3 className="text-lg font-semibold text-center z-40">ПРОЕКТИ</h3>
            <div className="overflow-x-auto my-3">
                <Table>
                    <TableHead>
                        <TableRow className="">
                            <TableHeadCell>Назва</TableHeadCell>
                            <TableHeadCell>Опис</TableHeadCell>
                            <TableHeadCell>Дата початку</TableHeadCell>
                            <TableHeadCell>Дата кінця</TableHeadCell>
                            <TableHeadCell> Роль в проєкті </TableHeadCell>
                        </TableRow>
                    </TableHead>
                    <TableBody className="divide-y">
                        {data.map(item => {
                            const { id, name, description, dateStart, dateEnd, userRole } = item;

                            return (
                                <TableRow className="bg-white dark:border-gray-700 dark:bg-gray-800" key={id}>
                                    <TableCell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                                        <Link href={`/project/${id}`} className="text-primary">{name}</Link>
                                    </TableCell>
                                    <TableCell>{description}</TableCell>
                                    <TableCell>{dateStart ? new Date(dateStart).toLocaleDateString("uk-UA") : ''}</TableCell>
                                    <TableCell>{dateEnd ? new Date(dateEnd).toLocaleDateString("uk-UA") : ''}</TableCell>
                                    <TableCell>
                                        {projectRoleLabels[userRole]}
                                    </TableCell>
                                </TableRow>
                            )
                        })}
                    </TableBody>
                </Table>

            </div>
            <ul>

            </ul>
        </div>
    )
}