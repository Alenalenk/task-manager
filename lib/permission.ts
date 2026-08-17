import type { Permission } from '@/types/auth';
import { UserRole } from './generated/prisma/enums';

export const rolePermissions: Record<UserRole, Permission[]> = {
  OWNER: [
    'project:view',
    'project:edit',
    'project:delete',
    'project:manage-users',
    'task:create',
    'task:edit',
    'task:delete',
    'comment:create',
    'comment:delete',
  ],

  ADMIN: [
    'project:view',
    'project:edit',
    'project:manage-users',
    'task:create',
    'task:edit',
    'task:delete',
    'comment:create',
    'comment:delete',
  ],

  TEAMLEAD: [
    'project:view',
    'task:create',
    'task:edit',
    'comment:create',
  ],

  DEVELOPER: [
    'project:view',
    'task:create',
    'task:edit',
    'comment:create',
  ],

  MANAGER: [
    'project:view',
    'task:create',
    'task:edit',
    'comment:create',
  ],

  ANALYST: [
    'project:view',
    'comment:create',
  ],

  VIEWER: [
    'project:view',
  ],
};