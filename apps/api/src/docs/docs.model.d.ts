import { Model } from "sequelize-typescript";
import Plant from "src/plants/plant.model";
import Record from "src/records/records.model";
interface DocsCreationsAttrs {
    plantId: number;
    date: Date;
}
export default class Doc extends Model<Doc, DocsCreationsAttrs> {
    id: number;
    plantId: number;
    date: Date;
    plants: Plant;
    records: Record[];
}
export {};
