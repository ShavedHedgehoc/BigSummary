import { Model } from "sequelize-typescript";
import TraceWeighting from "./trace_weighting.model";
import TraceLoad from "./trace_weighting.model";
export default class TraceContainer extends Model {
    ContainerPK: number;
    ContainerName: string;
    weightings: TraceWeighting[];
    load: TraceLoad;
}
