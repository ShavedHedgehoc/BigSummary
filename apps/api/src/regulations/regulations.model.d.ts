import { Model } from "sequelize-typescript";
import MarkingSample from "src/marking_sample/marking_sample.model";
import Product from "src/products/products.model";
interface RegulationCreationsAttrs {
    product_id: number;
    water_base_min_weight: number;
    water_base_max_weight: number;
    per_box: number;
    box_per_row: number;
    row_on_pallet: number;
    gasket: string;
    seal: boolean;
    technician_note: string;
    packaging_note: string;
    marking_sample_id: number;
}
export default class Regulation extends Model<Regulation, RegulationCreationsAttrs> {
    id: number;
    product_id: number;
    water_base_min_weight: number;
    water_base_max_weight: number;
    per_box: number;
    box_per_row: number;
    row_on_pallet: number;
    gasket: string;
    seal: boolean;
    technician_note: string;
    packaging_note: string;
    marking_sample_id: number;
    product: Product;
    marking_sample: MarkingSample;
}
export {};
