import { Model } from "sequelize-typescript";
import TraceAuthor from "./trace_author.model";
import TracePlant from "./trace_plant.model";
import TraceCan from "./trace_can.model";
export default class TraceCanLocation extends Model {
    CanLocationPK: number;
    CanPK: number;
    PlantPK: number;
    Transit: boolean;
    AuthorPK: number;
    CreateDate: Date;
    can: TraceCan;
    plant: TracePlant;
    author: TraceAuthor;
}
