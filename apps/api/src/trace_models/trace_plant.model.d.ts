import { Model } from "sequelize-typescript";
import TraceCanLocation from "./trace_can_location.model";
import TraceInventoryDoc from "./trace_inventory_doc.model";
import TraceAuthorOccupations from "./tarce_author_occupation.model";
export default class TracePlant extends Model {
    PlantPK: number;
    PlantName: string;
    PlantAlias: string;
    locations: TraceCanLocation[];
    inventory_docs: TraceInventoryDoc[];
    ocuupatioons: TraceAuthorOccupations[];
}
