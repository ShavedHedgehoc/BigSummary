import TracePlant from "src/trace_models/trace_plant.model";
export declare class TracePlantsService {
    private tracePlantRepository;
    constructor(tracePlantRepository: typeof TracePlant);
    getPlants(): Promise<any>;
}
