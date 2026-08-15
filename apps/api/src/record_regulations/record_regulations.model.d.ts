import { Model } from "sequelize-typescript";
import MarkingSample from "src/marking_sample/marking_sample.model";
import Record from "src/records/records.model";
interface RecordRegulationCreationsAttrs {
    record_id: number;
    org_base_min_weight: number;
    org_base_max_weight: number;
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
    marking_feature: string;
    ink_color: string;
}
export default class RecordRegulation extends Model<RecordRegulation, RecordRegulationCreationsAttrs> {
    id: number;
    record_id: number;
    org_base_min_weight: number;
    org_base_max_weight: number;
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
    inc_color: string;
    marking_feature: string;
    record: Record;
    marking_sample: MarkingSample;
}
export {};
