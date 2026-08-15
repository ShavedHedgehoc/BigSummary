import { BoilsListService } from "./boils.list.service";
import { GetBoilsDto } from "src/boils/dto/get-boils.dto";
export declare class BoilsListController {
    private boilsListService;
    constructor(boilsListService: BoilsListService);
    getAllWithParams(dto: GetBoilsDto): Promise<{
        rows: any;
        total: any;
    }>;
    getReportWithParams(dto: GetBoilsDto): Promise<{
        rows: any;
        total: any;
    }>;
    getBoilById(boil_id: string): Promise<any>;
}
