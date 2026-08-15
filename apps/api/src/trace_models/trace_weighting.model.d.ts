import { Model } from "sequelize-typescript";
import TraceBatch from "src/trace_models/trace_batch.model";
import TraceDocument from "./trace_document.model";
import TraceContainer from "./trace_container.model";
import TraceProduct from "./trace_product.model";
import TraceLot from "./trace_lot.model";
export default class TraceWeighting extends Model {
    WeightingsPK: number;
    DocumentPK: number;
    ContainerPK: number;
    ProductId: number;
    BatchPK: number;
    LotPK: number;
    Quantity: number;
    document: TraceDocument;
    container: TraceContainer;
    product: TraceProduct;
    batch: TraceBatch;
    lot: TraceLot;
}
