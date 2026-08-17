import { getUserId } from "@/entities/user/user-query";
import { getSession, verifyToken } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { UserProject, UserProjectTask } from "@/types/project";
import { ActionState } from "@/types/types";

export async function getUserProjects(): Promise<UserProject[] | ActionState> {

    const id = await getUserId()

    if (!id) {
        return {
            success: false,
            message: "Не вдалося знайти вибраного користувача"
        }
    }

    const relations = await prisma.userOnProject.findMany({
        where: {
            userId: id,
        },
        include: {
            project: true,
        },
        orderBy: {
            project: {
                createdAt: 'desc',
            },
        },
    });

    const projects = relations.map(({ project, userRole }) => ({
        ...project,
        userRole,
    }));

    return projects
}

type ProjectActionState = ActionState & {data?: UserProjectTask}

export async function getProject(id: number): Promise<ProjectActionState> {
    let project;

    try {
        const userId = await getUserId();

        console.log(userId, id)

        const relation = await prisma.userOnProject.findUnique({
            where: {
                projectId_userId: {
                    projectId: id,
                    userId
                }
            },
            select: {
                userRole: true,

                project: {
                    include: {
                        tasks: true,
                    },
                },
            },
        })

        console.log(relation)

        if (!relation) {
            return {
                success: false,
                message: "З проєктом винекли проблеми"
            }
        }

        project = { ...relation?.project, userRole: relation?.userRole }

    } catch (error) {
        return {
            success: false,
            message: "Щось пішло не так"
        }
    }

    return {
        success: true,
        message: "Все ок",
        data: project
    }
}