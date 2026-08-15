import { Model } from "sequelize-typescript";
import TraceCanRecord from "./trace_can_record.model";
import TraceCanLocation from "./trace_can_location.model";
export default class TraceCan extends Model {
    CanPK: number;
    CanName: string;
    CanVolume: number;
    CanBarcode: string;
    CanOrderValue: string;
    can_records: TraceCanRecord[];
    locations: TraceCanLocation[];
}
