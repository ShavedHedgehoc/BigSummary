import SemiProduct from "./semi_products.model";
import { CreateSemiProductDto } from "./dto/create-semi-product.dto";
import { ProductsService } from "src/products/products.service";
import { BoilsService } from "src/boils/boils.service";
export declare class SemiProductsService {
    private semiProductsService;
    private productsService;
    private boilsService;
    constructor(semiProductsService: typeof SemiProduct, productsService: ProductsService, boilsService: BoilsService);
    createSemiProduct(dto: CreateSemiProductDto): Promise<SemiProduct>;
    getSemiProductsByRecordId(id: number): Promise<SemiProduct[]>;
}
