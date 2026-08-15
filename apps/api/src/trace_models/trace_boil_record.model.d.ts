import { Model } from "sequelize-typescript";
import TraceBatch from "./trace_batch.model";
import TraceOperation from "./trace_operation.model";
import TraceAuthor from "./trace_author.model";
export default class TraceBoilRecord extends Model {
    BoilRecordsPK: number;
    BatchId: number;
    OperationId: number;
    AuthorId: number;
    Temperature: number | null;
    CreateDate: Date;
    batch: TraceBatch;
    operation: TraceOperation;
    author: TraceAuthor;
}
