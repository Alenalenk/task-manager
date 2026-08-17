export type Permission =
  | 'project:view'
  | 'project:edit'
  | 'project:delete'
  | 'project:manage-users'
  | 'task:create'
  | 'task:edit'
  | 'task:delete'
  | 'comment:create'
  | 'comment:delete';