import { getUserId } from "@/entities/user/user-query";
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

type ProjectActionState = ActionState & { data?: UserProjectTask }

export async function getProject(id: number): Promise<ProjectActionState> {
    let project;

    try {
        const userId = await getUserId();

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
                        tasks: {
                            include: {
                                comments: {
                                    include: {
                                        author: {
                                            select: {
                                                email: true,
                                            },
                                        },
                                    }
                                },
                                author: {
                                    select: {
                                        email: true,
                                    },
                                },
                            },
                        },
                        comments: {
                            where: {
                                taskId: null
                            },
                            include: {
                                author: {
                                    select: {
                                        email: true,
                                    },
                                },
                            }
                        },

                    },
                },
            }
        });

        if (!relation) {
            return {
                success: false,
                message: "З проєктом виникли проблеми"
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