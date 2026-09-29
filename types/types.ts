import { Task } from "@/lib/generated/prisma/browser";

export type ActionState<T> = {
  success: boolean;
  message: string | null;
  data?: T;
  error?:  string | null;
};

export type TaskFormData = Omit<Task, "authorId" | "projectId" | "createdAt" | "updatedAt">