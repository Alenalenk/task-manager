import { Project, Task } from "@/lib/generated/prisma/client";
import { UserRole } from "@/lib/generated/prisma/enums"

export type UserProject = Project & {
  userRole: UserRole;
};

export type UserProjectTask = UserProject & {
  tasks: Task[]
}