import { Model } from "sequelize-typescript";
import User from "src/users/users.model";
interface TokenCreationsAttrs {
    userId: number;
    token: string;
}
export default class Token extends Model<Token, TokenCreationsAttrs> {
    id: number;
    userId: number;
    token: string;
    user: User;
}
export {};
