import { TracePlantsService } from "./trace_plants.service";
export declare class TracePlantsController {
    private tracePlantsService;
    constructor(tracePlantsService: TracePlantsService);
    getAllPlants(): Promise<any>;
}
