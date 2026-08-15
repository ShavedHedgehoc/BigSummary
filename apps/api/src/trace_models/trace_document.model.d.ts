import { Model } from "sequelize-typescript";
import TraceWeighting from "./trace_weighting.model";
import TraceAuthor from "./trace_author.model";
import TraceLoad from "./trace_weighting.model";
export default class TraceDocument extends Model {
    DocumentPK: number;
    DocumentClid: string;
    DoctypePK: number;
    AuthorPK: number;
    CreateDate: Date;
    Plant: string;
    author: TraceAuthor;
    weightings: TraceWeighting[];
    loads: TraceLoad[];
}
