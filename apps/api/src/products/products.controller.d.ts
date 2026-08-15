import { ProductsService } from "./products.service";
import Product from "./products.model";
import { CreateProductDto } from "./dto/create-product.dto";
export declare class ProductsController {
    private productService;
    constructor(productService: ProductsService);
    getAll(): Promise<Product[]>;
    create(productDto: CreateProductDto): Promise<Product>;
}
