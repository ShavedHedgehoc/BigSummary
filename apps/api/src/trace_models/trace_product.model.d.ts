import { Model } from "sequelize-typescript";
import TraceWeighting from "src/trace_models/trace_weighting.model";
import TraceBoil from "./trace_boils.model";
import TraceBtProduct from "./trace_bt_product.model";
import TraceInventoryRow from "./trace_inventory_row.model";
export default class TraceProduct extends Model {
    ProductId: number;
    ProductName: string;
    ProductMarking: string;
    ProductBarcode: string;
    weightings: TraceWeighting[];
    boils: TraceBoil[];
    bt_products: TraceBtProduct[];
    inventory_rows: TraceInventoryRow[];
}
