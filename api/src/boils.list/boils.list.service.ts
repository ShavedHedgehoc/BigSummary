import { Injectable } from "@nestjs/common";
import { BasesService } from "src/bases/bases.service";
import Boil from "src/boils/boil.model";
import { BoilsService } from "src/boils/boils.service";
import { GetBoilsDto } from "src/boils/dto/get-boils.dto";
import { HistoriesService } from "src/histories/histories.service";
import { RecordsService } from "src/records/records.service";
import { BoilsListResponse, BoilsListRow } from "./dto/boils-list-response.dto";
import { PlantsService } from "src/plants/plants.service";

@Injectable()
export class BoilsListService {
  constructor(
    private boilsService: BoilsService,
    private recordsService: RecordsService,
    private historiesService: HistoriesService,
    private basesService: BasesService,
    private plantService: PlantsService
  ) {}

  async getBoilListRowData(item: Boil) {
    function replacer(key, value) {
      if (key !== "records" && key !== "histories") {
        return value;
      }
      return undefined;
    }
    const records = await this.recordsService.getRecordsByBoilId(item.id);
    const histories = await this.historiesService.getHistoriesByBoilId(item.id);
    const recordsCount = records.length;
    const historiesCount = histories.length;
    const state = historiesCount > 0 ? histories[histories.length - 1].historyType.description : "-";
    const state_id = historiesCount > 0 ? histories[histories.length - 1].historyType.id : null;
    const stateValue = historiesCount > 0 ? histories[histories.length - 1].historyType.value : null;
    const base = await this.basesService.getByid(item.base_id);
    const plant = await this.plantService.getPlantByPk(item.plant_id);
    return {
      ...JSON.parse(JSON.stringify(item, replacer)),
      base_code: base ? base.code : null,
      base_marking: base ? base.marking : null,
      recordsCount: recordsCount,
      historiesCount: historiesCount,
      state: state,
      state_id: state_id,
      stateValue: stateValue,
      plant: plant ? plant.abb : null,
    };
  }

  async getBoilReportRowData(item: Boil) {
    function replacer(key, value) {
      if (key !== "records" && key !== "histories") {
        return value;
      }
      return undefined;
    }
    const records = await this.recordsService.getRecordsByBoilId(item.id);
    const histories = await this.historiesService.getHistoriesByBoilId(item.id);

    const firstBaseCheck = await this.historiesService.getFirstBaseCheck(item.id);
    const lastBaseCheck = await this.historiesService.getLastBaseCheck(item.id);
    const lastPlugPass = await this.historiesService.getLastPlugPass(item.id);

    const recordsCount = records.length;
    const historiesCount = histories.length;
    const state = historiesCount > 0 ? histories[histories.length - 1].historyType.description : "-";
    const state_id = historiesCount > 0 ? histories[histories.length - 1].historyType.id : null;
    const stateValue = historiesCount > 0 ? histories[histories.length - 1].historyType.value : null;
    const base = await this.basesService.getByid(item.base_id);
    const plant = await this.plantService.getPlantByPk(item.plant_id);

    const firstBaseCheckTime = firstBaseCheck ? firstBaseCheck.createdAt : null;
    const lastBaseCheckTime = lastBaseCheck ? lastBaseCheck.createdAt : null;
    const lastPlugPassTime = lastPlugPass ? lastPlugPass.createdAt : null;
    return {
      ...JSON.parse(JSON.stringify(item, replacer)),
      base_code: base ? base.code : null,
      base_marking: base ? base.marking : null,
      recordsCount: recordsCount,
      historiesCount: historiesCount,
      state: state,
      state_id: state_id,
      stateValue: stateValue,
      plant: plant ? plant.abb : null,
      firstBaseCheckTime: firstBaseCheckTime,
      lastBaseCheckTime: lastBaseCheckTime,
      lastPlugPassTime: lastPlugPassTime,
    };
  }

  async getBoilsList() {
    const boils = await this.boilsService.getAllBoils();
    const result = await Promise.all(await boils.map((item) => this.getBoilListRowData(item)));
    return result;
  }

  async getBoilsListWithFilter(dto: GetBoilsDto) {
    console.log(dto);
    const { boils, count } = await this.boilsService.getBoilsWithFilter(dto);
    const result = await Promise.all(await boils.map((item) => this.getBoilListRowData(item)));
    return { rows: result, total: count };
  }

  async getBoilsReportWithFilter(dto: GetBoilsDto) {
    console.log(dto);
    const { boils, count } = await this.boilsService.getBoilsWithFilter(dto);
    const result = await Promise.all(await boils.map((item) => this.getBoilReportRowData(item)));
    return { rows: result, total: count };
  }

  async getBoilsListRow(boilId: number) {
    const boil = await this.boilsService.getBoilListRow(boilId);
    return await this.getBoilListRowData(boil);
  }
}
