import Can from "./cans.model";
export declare class CansService {
    private cansRepository;
    constructor(cansRepository: typeof Can);
    getOrCreateByValue(value: string): Promise<Can>;
    getByValue(value: string): Promise<Can>;
}
