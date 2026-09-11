import { Comment, Project, Task } from "@/lib/generated/prisma/client";
import { UserRole } from "@/lib/generated/prisma/enums"

export type UserProject = Project & {
  userRole: UserRole;
};

export type CommentWithAuthor = Comment & {
  author: {
    email: string;
  };
};

export type TaskWithComments = Task & {
  comments: CommentWithAuthor[];
  author: {
    email: string;
  };
};

export type UserProjectTask = UserProject & {
  comments: CommentWithAuthor[]
} & {
  tasks: TaskWithComments[]
}