import { Model } from "sequelize-typescript";
import TraceDocument from "./trace_document.model";
import TraceBoilRecord from "./trace_boil_record.model";
import TraceCanRecord from "./trace_can_record.model";
import TraceCanLocation from "./trace_can_location.model";
import TraceInventoryRow from "./trace_inventory_row.model";
import TraceAuthorOccupations from "./tarce_author_occupation.model";
export default class TraceAuthor extends Model {
    AuthorPK: number;
    AuthorName: string;
    AuthorBarcode: string;
    documents: TraceDocument[];
    boil_records: TraceBoilRecord[];
    can_records: TraceCanRecord[];
    locations: TraceCanLocation[];
    inventory_rows: TraceInventoryRow[];
    occupation: TraceAuthorOccupations;
}
