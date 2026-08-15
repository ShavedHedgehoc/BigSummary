import Product from "./products.model";
import { CreateProductDto } from "./dto/create-product.dto";
import { SeriesService } from "src/series/series.service";
export declare class ProductsService {
    private productRepository;
    private serieService;
    constructor(productRepository: typeof Product, serieService: SeriesService);
    createProduct(dto: CreateProductDto): Promise<Product>;
    getAllProducts(): Promise<Product[]>;
    getById(id: number): Promise<Product>;
    getOrCreateByCode(code: string, marking: string, serieId: number): Promise<Product>;
}
