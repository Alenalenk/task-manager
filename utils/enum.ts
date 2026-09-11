import { Status, UserRole } from "@/lib/generated/prisma/enums";

export const projectStageLabels: Record<Status, string> = {
  [Status.NEW ]: 'Новий',
  [Status.IN_PROCESS]: 'В роботі',
  [Status.IN_TESTING]: 'На тестуванні',
  [Status.DONE]: 'Виконано',
  [Status.CLOSED]: 'Закрито',
};

export const projectRoleLabels: Record<UserRole, string> = {
  [UserRole.OWNER]: 'Власник',
  [UserRole.ADMIN]: 'Адміністратор',
  [UserRole.TEAMLEAD]: 'Керівник команди',
  [UserRole.DEVELOPER]: 'Розробник',
  [UserRole.MANAGER]: 'Менеджер',
  [UserRole.ANALYST]: 'Аналітик',
  [UserRole.VIEWER]: 'Переглядач'
};
