import Regulation from "./regulations.model";
import { ProductsService } from "src/products/products.service";
import { MarkingSampleService } from "src/marking_sample/marking_sample.service";
import { BulkUpdateRegulationsDto } from "./dto/bulk-update-regulation.dto";
import { SeriesService } from "src/series/series.service";
export declare class RegulationsService {
    private regulationRepository;
    private productService;
    private markingSampleService;
    private seriesService;
    constructor(regulationRepository: typeof Regulation, productService: ProductsService, markingSampleService: MarkingSampleService, seriesService: SeriesService);
    bulkUpdateRegulations(dto: BulkUpdateRegulationsDto[]): Promise<void>;
    getByProductCode(code: string): Promise<Regulation>;
}
