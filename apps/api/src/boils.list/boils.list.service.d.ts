import { BasesService } from "src/bases/bases.service";
import Boil from "src/boils/boil.model";
import { BoilsService } from "src/boils/boils.service";
import { GetBoilsDto } from "src/boils/dto/get-boils.dto";
import { HistoriesService } from "src/histories/histories.service";
import { RecordsService } from "src/records/records.service";
import { PlantsService } from "src/plants/plants.service";
export declare class BoilsListService {
    private boilsService;
    private recordsService;
    private historiesService;
    private basesService;
    private plantService;
    constructor(boilsService: BoilsService, recordsService: RecordsService, historiesService: HistoriesService, basesService: BasesService, plantService: PlantsService);
    getBoilListRowData(item: Boil): Promise<any>;
    getBoilReportRowData(item: Boil): Promise<any>;
    getBoilsList(): Promise<any>;
    getBoilsListWithFilter(dto: GetBoilsDto): Promise<{
        rows: any;
        total: any;
    }>;
    getBoilsReportWithFilter(dto: GetBoilsDto): Promise<{
        rows: any;
        total: any;
    }>;
    getBoilsListRow(boilId: number): Promise<any>;
}
