import Plant from "./plant.model";
import { CreatePlantDto } from "./dto/create-plant.dto";
export declare class PlantsService {
    private plantRepository;
    constructor(plantRepository: typeof Plant);
    getAllPlants(): Promise<Plant[]>;
    getPlantByPk(id: number): Promise<Plant>;
    getPlantByValue(value: string): Promise<Plant>;
    createPlant(dto: CreatePlantDto): Promise<Plant>;
}
