import { Model } from "sequelize-typescript";
import Product from "src/products/products.model";
interface SeriesCreationsAttrs {
    value: string;
}
export default class Serie extends Model<Serie, SeriesCreationsAttrs> {
    id: number;
    value: string;
    products: Product[];
}
export {};
