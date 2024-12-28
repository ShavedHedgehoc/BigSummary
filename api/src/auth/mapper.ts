import Role from "src/roles/roles.model";
import User from "src/users/users.model";

export interface IUserData {
  id: number;
  name: string;
  email: string;
  roles: string[];
}

export const toRegisteredUserData = (user: User): IUserData => {
  return {
    id: user.id,
    name: user.name,
    email: user.email,
    roles: user.roles.map((x) => x.description),
  };
};
