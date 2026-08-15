import { Model } from "sequelize-typescript";
import TraceBatch from "./trace_batch.model";
import TraceProduct from "./trace_product.model";
export default class TraceBoil extends Model {
    BoilPK: number;
    BatchPK: number;
    ProductId: number;
    Quantity: number;
    batch: TraceBatch;
    product: TraceProduct;
}
