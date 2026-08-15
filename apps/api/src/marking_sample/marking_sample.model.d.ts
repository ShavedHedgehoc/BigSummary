import { Model } from "sequelize-typescript";
import Regulation from "src/regulations/regulations.model";
interface MarkingSampleCreationsAttrs {
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
export default class MarkingSample extends Model<MarkingSample, MarkingSampleCreationsAttrs> {
    id: number;
    value: string;
    regulations: Regulation[];
}
export {};
