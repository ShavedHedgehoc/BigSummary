import { Model } from "sequelize-typescript";
import Regulation from "src/regulations/regulations.model";
import SemiProduct from "src/semi_products/semi_products.model";
import Serie from "src/series/series.model";
interface ProductCreationsAttrs {
    code1C: string;
    marking: string;
    name: string;
    serieId: number;
}
export default class Product extends Model<Product, ProductCreationsAttrs> {
    id: number;
    code1C: string;
    marking: string;
    name: string;
    serieId: number;
    serie: Serie;
    regulation: Regulation;
    semi_products: SemiProduct[];
}
export {};
