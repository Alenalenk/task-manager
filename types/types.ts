import { Task } from "@/lib/generated/prisma/browser";

export type ActionState = {
  success: boolean;
  message: string;
  errors?: {
    [key: string]: string[];
  };
};

export type TaskFormData = Omit<Task, "authorId" | "projectId" | "createdAt" | "updatedAt">