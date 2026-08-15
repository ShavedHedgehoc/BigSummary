import { Model } from "sequelize-typescript";
import Base from "src/bases/bases.model";
import History from "src/histories/histories.model";
import Plant from "src/plants/plant.model";
import Record from "src/records/records.model";
import SemiProduct from "src/semi_products/semi_products.model";
interface BoilsCreationsAttrs {
    value: string;
}
export default class Boil extends Model<Boil, BoilsCreationsAttrs> {
    id: number;
    value: string;
    base_id: number;
    plant_id: number;
    letter: string;
    number: number;
    year: number;
    base: Base;
    plant: Plant;
    records: Record[];
    water_base_records: Record[];
    organic_base_records: Record[];
    histories: History[];
    semi_products: SemiProduct[];
    static addMonthLetter(instance: Boil): void;
}
export {};
