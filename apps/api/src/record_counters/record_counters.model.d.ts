import { Model } from "sequelize-typescript";
import Record from "src/records/records.model";
interface RecordCounterCreationsAttrs {
    record_id: number;
    task_uid: string;
    counter_value: number;
}
export default class RecordCounter extends Model<RecordCounter, RecordCounterCreationsAttrs> {
    id: number;
    record_id: number;
    task_uid: string;
    counter_value: number;
    record: Record;
}
export {};
