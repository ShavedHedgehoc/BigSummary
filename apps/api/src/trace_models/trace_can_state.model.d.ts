import { Model } from "sequelize-typescript";
import TraceCanRecord from "./trace_can_record.model";
export default class TraceCanState extends Model {
    CanStatePK: number;
    CanStateName: string;
    CanStateDescription: string;
    isBaseState: boolean;
    can_records: TraceCanRecord[];
}
