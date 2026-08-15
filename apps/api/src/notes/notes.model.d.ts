import { Model } from "sequelize-typescript";
import History from "src/histories/histories.model";
interface NotesCreationsAttrs {
    value: string;
}
export default class Note extends Model<History, NotesCreationsAttrs> {
    id: number;
    value: string;
    history: History;
}
export {};
