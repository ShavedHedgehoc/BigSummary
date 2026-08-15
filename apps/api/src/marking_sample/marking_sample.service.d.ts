import MarkingSample from "./marking_sample.model";
export declare class MarkingSampleService {
    private markingSampleRepository;
    constructor(markingSampleRepository: typeof MarkingSample);
    getOrCreateByValue(value: string): Promise<MarkingSample>;
}
