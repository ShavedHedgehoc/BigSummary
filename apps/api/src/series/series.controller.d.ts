import { SeriesService } from "./series.service";
import Serie from "./series.model";
import { CreateSerieDto } from "./dto/create-serie.dto";
export declare class SeriesController {
    private seriesService;
    constructor(seriesService: SeriesService);
    getAll(): Promise<Serie[]>;
    create(serieDto: CreateSerieDto): Promise<Serie>;
}
