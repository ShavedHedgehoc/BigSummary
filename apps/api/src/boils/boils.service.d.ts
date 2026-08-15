import Boil from "./boil.model";
import { GetBoilsDto } from "./dto/get-boils.dto";
export declare class BoilsService {
    private boilsRepository;
    constructor(boilsRepository: typeof Boil);
    getAllBoils(): Promise<Boil[]>;
    getBoilsIdsByHistoryTypeIds(typeArr: number[] | []): Promise<number[] | []>;
    getBoilsWithFilter(dto: GetBoilsDto): Promise<{
        boils: Boil[];
        count: number;
    }>;
    getById(id: number): Promise<Boil>;
    getBoilListRow(id: number): Promise<Boil>;
    getOrCreateByValue(value: string): Promise<Boil>;
    getByValue(value: string): Promise<Boil>;
}
