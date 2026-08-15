import { Model } from "sequelize-typescript";
import TraceProduct from "./trace_product.model";
import TraceWeighting from "./trace_weighting.model";
import TraceSeller from "./trace_seller.model";
import TraceManufacturer from "./trace_manufacturer.model";
import TraceManufacturerLot from "./trace_manufacturer_lot.model";
import TraceTrademark from "./trace_trademark.model";
import TraceInventoryRow from "./trace_inventory_row.model";
export default class TraceLot extends Model {
    LotPK: number;
    LotName: string;
    ProductId: number;
    SellerPK: number;
    ManufacturerPK: number;
    ManufacturerLotPK: number;
    TradeMarkPK: number;
    product: TraceProduct;
    seller: TraceSeller;
    manufacturer: TraceManufacturer;
    manufacturer_lot: TraceManufacturerLot;
    trademark: TraceTrademark;
    weightings: TraceWeighting[];
    inventory_rows: TraceInventoryRow[];
}
