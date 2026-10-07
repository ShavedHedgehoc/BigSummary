import { Prisma } from '@repo/db-postgres';
import { TApplicationUserSettingsItem } from '@repo/schemas';

export type UserWithRoles = Prisma.usersGetPayload<{
  include: {
    user_roles: { include: { roles: true } };
    user_settings: { include: { plants: true } };
  };
}>;

type SettingsWithPlants = Prisma.user_settingsGetPayload<{
  include: { plants: true };
}>;

export interface IUserData {
  id: number;
  name: string;
  email: string;
  roles: string[];
  settings: TApplicationUserSettingsItem;
}

const toMappedSettings = (settings: SettingsWithPlants): TApplicationUserSettingsItem => {
  if (!settings) {
    return {
      plant: '-',
      plant_id: null,
    };
  }
  return {
    plant: settings.plants?.value ?? '-',
    plant_id: settings.plant_id,
  };
};

export const toRegisteredUserData = (user: UserWithRoles): IUserData => {
  return {
    id: user.id,
    name: user.name,
    email: user.email,
    roles: user.user_roles.map((ur) => ur.roles.value ?? ''),
    settings: toMappedSettings(user.user_settings),
  };
};
