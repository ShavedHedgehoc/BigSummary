import { Model } from "sequelize-typescript";
import TraceProduct from "./trace_product.model";
import TraceBatch from "./trace_batch.model";
export default class TraceBtProduct extends Model {
    BtProductPK: number;
    ProductId: number;
    BatchPK: number;
    trace_product: TraceProduct;
    trace_batch: TraceBatch;
}
