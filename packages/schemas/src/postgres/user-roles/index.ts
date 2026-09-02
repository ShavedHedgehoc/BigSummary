export const PG_USER_ROLES = {
  ADMIN: 'Администратор',
  USER: 'Пользователь',
  MANAGER: 'Менеджер',
} as const;

export type TPGUserRole = (typeof PG_USER_ROLES)[keyof typeof PG_USER_ROLES];
