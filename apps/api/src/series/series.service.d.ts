import Serie from "./series.model";
import { CreateSerieDto } from "./dto/create-serie.dto";
export declare class SeriesService {
    private serieRepository;
    constructor(serieRepository: typeof Serie);
    getAllSeries(): Promise<Serie[]>;
    createSerie(dto: CreateSerieDto): Promise<Serie>;
    getOrCreateByValue(value: string): Promise<Serie>;
}
