import RecordCounter from "./record_counters.model";
export declare class RecordCountersService {
    private recordCounterRepository;
    constructor(recordCounterRepository: typeof RecordCounter);
    getTaskSum(id: number): Promise<number>;
}
