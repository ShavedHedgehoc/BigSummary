import { Model } from "sequelize-typescript";
import Boil from "src/boils/boil.model";
import Product from "src/products/products.model";
import Record from "src/records/records.model";
interface SemiProductCreationsAttrs {
    record_id: number;
    product_id: number;
    boil_id: number;
}
export default class SemiProduct extends Model<SemiProduct, SemiProductCreationsAttrs> {
    id: number;
    record_id: number;
    product_id: number;
    boil_id: number;
    record: Record;
    product: Product;
    boil: Boil;
}
export {};
