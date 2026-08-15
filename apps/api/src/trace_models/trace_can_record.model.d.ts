import { Model } from "sequelize-typescript";
import TraceCan from "./trace_can.model";
import TraceAuthor from "./trace_author.model";
import TraceBatch from "./trace_batch.model";
import TraceCanState from "./trace_can_state.model";
export default class TraceCanRecord extends Model {
    CanRecordPK: number;
    CanPK: number;
    AuthorPK: number;
    BatchPK: number;
    CanStatePK: number;
    CreateDate: Date;
    can: TraceCan;
    author: TraceAuthor;
    batch: TraceBatch;
    state: TraceCanState;
}
