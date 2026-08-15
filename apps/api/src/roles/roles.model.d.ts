import { Model } from "sequelize-typescript";
import User from "src/users/users.model";
interface RoleCreationsAttrs {
    value: string;
    description: string;
}
export default class Role extends Model<Role, RoleCreationsAttrs> {
    id: number;
    value: string;
    description: string;
    users: User[];
}
export {};
