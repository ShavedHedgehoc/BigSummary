import { Model } from "sequelize-typescript";
import TraceLoad from "src/trace_models/trace_weighting.model";
import TraceWeighting from "src/trace_models/trace_weighting.model";
import TraceBoil from "./trace_boils.model";
import TraceCanRecord from "./trace_can_record.model";
import TraceBtProduct from "./trace_bt_product.model";
export default class TraceBatch extends Model {
    BatchPK: number;
    BatchName: string;
    BatchDate: Date;
    Plant: string;
    weightings: TraceWeighting[];
    loads: TraceLoad[];
    boils: TraceBoil[];
    can_records: TraceCanRecord[];
    bt_products: TraceBtProduct;
}
