import { Model } from "sequelize-typescript";
import TraceInventoryDoc from "./trace_inventory_doc.model";
import TraceProduct from "./trace_product.model";
import TraceLot from "./trace_lot.model";
import TraceAuthor from "./trace_author.model";
export default class TraceInventoryRow extends Model {
    InventoryRowPK: number;
    InventoryDocPK: number;
    ProductId: number;
    LotPK: number;
    ExpDate: Date;
    Quantity: number;
    AuthorPK: number;
    CreateDate: Date;
    inventory_doc: TraceInventoryDoc;
    product: TraceProduct;
    lot: TraceLot;
    author: TraceAuthor;
}
