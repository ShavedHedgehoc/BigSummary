import Role from "src/roles/roles.model";
import User from "src/users/users.model";

export const toRegisteredUserData = (user: User) => {
  return {
    id: user.id,
    name: user.name,
    email: user.email,
    roles: user.roles.map((x) => x.description),
  };
};
