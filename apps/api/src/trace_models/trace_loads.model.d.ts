import { Model } from "sequelize-typescript";
import TraceBatch from "src/trace_models/trace_batch.model";
import TraceDocument from "./trace_document.model";
import TraceContainer from "./trace_container.model";
export default class TraceLoad extends Model {
    LoadsPK: number;
    DocumentPK: number;
    ContainerPK: number;
    BatchPK: number;
    document: TraceDocument;
    container: TraceContainer;
    batch: TraceBatch;
}
