import { Model } from "sequelize-typescript";
import TraceBoilRecord from "./trace_boil_record.model";
export default class TraceOperation extends Model {
    OperationPK: number;
    OperationCode: string;
    OperationName: string;
    boil_records: TraceBoilRecord[];
}
