import User from "src/users/users.model";

export interface IUserSettings {
  plant_id: number;
}

export interface IUserData {
  id: number;
  name: string;
  email: string;
  roles: string[];
  settings: IUserSettings;
}

export const toRegisteredUserData = (user: User): IUserData => {
  return {
    id: user.id,
    name: user.name,
    email: user.email,
    roles: user.roles.map((x) => x.description),
    settings: user.user_settings,
  };
};
