import { CreateBoilDto } from "./dto/create-boil.dto";
import Boil from "./boil.model";
import { BoilsService } from "./boils.service";
export declare class BoilsController {
    private boilsService;
    constructor(boilsService: BoilsService);
    getAll(): Promise<Boil[]>;
    create(dto: CreateBoilDto): Promise<Boil>;
}
