import { Model } from "sequelize-typescript";
import Role from "../roles/roles.model";
import User from "src/users/users.model";
export default class UserRoles extends Model<UserRoles> {
    id: number;
    roleId: number;
    userId: number;
    role: Role;
    user: User;
}
