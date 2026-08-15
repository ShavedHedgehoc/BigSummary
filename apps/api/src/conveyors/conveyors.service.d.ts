import Conveyor from "./conveyor.model";
import { CreateConveyorDto } from "./dto/create-conveyor.dto";
import { UpdateConveyorDto } from "./dto/update-conveyor.dto";
import { GetConveyorsDto } from "./dto/get-conveyors.dto";
export declare class ConveyorsService {
    private conveyorsRepository;
    constructor(conveyorsRepository: typeof Conveyor);
    getAllConveyorsWithParams(dto: GetConveyorsDto): Promise<{
        total: number;
        rows: Conveyor[];
    }>;
    getByBarcode(barcode: string): Promise<Conveyor>;
    getOrCreateByValue(value: string): Promise<Conveyor>;
    createConveyor(dto: CreateConveyorDto): Promise<Conveyor>;
    updateConveyor(dto: UpdateConveyorDto): Promise<Conveyor>;
    deleteConveyor(id: number): Promise<void>;
    getByValue(value: string): Promise<Conveyor>;
}
