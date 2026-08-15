import { ConveyorsService } from "./conveyors.service";
import Conveyor from "./conveyor.model";
import { CreateConveyorDto } from "./dto/create-conveyor.dto";
import { UpdateConveyorDto } from "./dto/update-conveyor.dto";
import { GetConveyorsDto } from "./dto/get-conveyors.dto";
export declare class ConveyorsController {
    private conveyorsService;
    constructor(conveyorsService: ConveyorsService);
    getAllWithParams(dto: GetConveyorsDto): Promise<{
        total: number;
        rows: Conveyor[];
    }>;
    getbyBarcode(barcode: string): Promise<Conveyor>;
    create(dto: CreateConveyorDto): Promise<Conveyor>;
    updateEmploee(dto: UpdateConveyorDto): Promise<Conveyor>;
    deleteConveyorById(id: string): Promise<void>;
}
