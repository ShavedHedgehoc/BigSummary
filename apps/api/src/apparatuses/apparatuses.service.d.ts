import Apparatus from "./apparatuses.model";
export declare class ApparatusesService {
    private apparatusRepository;
    constructor(apparatusRepository: typeof Apparatus);
    getOrCreateByValue(value: string): Promise<Apparatus>;
    getByValue(value: string): Promise<Apparatus>;
}
