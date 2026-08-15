import { PlantsService } from "./plants.service";
import Plant from "./plant.model";
import { CreatePlantDto } from "./dto/create-plant.dto";
export declare class PlantsController {
    private plantService;
    constructor(plantService: PlantsService);
    getAll(): Promise<Plant[]>;
    getByName(plantName: string): Promise<Plant>;
    create(dto: CreatePlantDto): Promise<Plant>;
}
