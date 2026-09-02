import { Prisma } from '@repo/db-postgres';

export type UserWithRoles = Prisma.usersGetPayload<{
  include: { user_roles: { include: { roles: true } } };
}>;

export interface IUserData {
  id: number;
  name: string;
  email: string;
  roles: string[];
  // settings: IUserSettings;
}

export const toRegisteredUserData = (user: UserWithRoles): IUserData => {
  return {
    id: user.id,
    name: user.name,
    email: user.email,
    roles: user.user_roles.map((ur) => ur.roles.value ?? ''),
    // settings: user.user_settings,
  };
};
