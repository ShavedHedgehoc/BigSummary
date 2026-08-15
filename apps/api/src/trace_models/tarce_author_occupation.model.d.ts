import { Model } from "sequelize-typescript";
import TraceAuthor from "./trace_author.model";
import TracePlant from "./trace_plant.model";
export default class TraceAuthorOccupation extends Model {
    AuthorOccupationsPK: number;
    AuthorPK: number;
    PlantPK: number;
    author: TraceAuthor;
    plant: TracePlant;
}
