import { Status } from "@/lib/generated/prisma/enums";

export const projectStageLabels: Record<Status, string> = {
  [Status.NEW ]: 'Новий',
  [Status.IN_PROCESS]: 'В роботі',
  [Status.IN_TESTING]: 'На тестуванні',
  [Status.DONE]: 'Виконано',
  [Status.CLOSED]: 'Закрито',
};