import { Model } from "sequelize-typescript";
import TracePlant from "./trace_plant.model";
import TraceInventoryRow from "./trace_inventory_row.model";
export default class TraceInventoryDoc extends Model {
    InventoryDocPK: number;
    InventoryDate: Date;
    PlantPK: number;
    Finished: boolean;
    plant: TracePlant;
    inventory_rows: TraceInventoryRow[];
}
