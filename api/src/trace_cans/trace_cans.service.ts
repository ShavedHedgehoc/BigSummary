import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { TraceCanRecordsService } from "src/trace_can_records/trace_can_records.service";
import TraceCan from "src/trace_models/trace_can.model";
import { GetCansListDto } from "./dto/get-cans-list.dto";
import { Op, col, fn } from "sequelize";
import { TraceCanLocationsService } from "src/trace_can_locations/trace_can_locations.service";
import { GetCansDto } from "./dto/get-cans.dto";
import sequelize from "sequelize";

@Injectable()
export class TraceCansService {
  constructor(
    @InjectModel(TraceCan, "trace_connection")
    private traceCansRepository: typeof TraceCan,
    private traceCanRecordsService: TraceCanRecordsService,
    private traceCanLocationsService: TraceCanLocationsService
  ) {}

  async getVolumes() {
    const volumes = await this.traceCansRepository.findAll({
      attributes: [[fn("DISTINCT", col("CanVolume")), "volume"]],
    });
    return volumes;
  }

  async getCans() {
    const cans = await this.traceCansRepository.findAll({});
    const cansResult = await Promise.all(
      await cans.map(async (item) => {
        const state = await this.traceCanRecordsService.getLastStateById(item.CanPK);
        const location = await this.traceCanLocationsService.getLastLocationByCanId(item.CanPK);
        return {
          id: item.CanPK,
          name: item.CanName,
          volume: item.CanVolume,
          baseContain: state ? (await state.$get("batch"))?.BatchName : null,
          baseContainMarking: state
            ? (await (await (await state.$get("batch"))?.$get("bt_products"))?.$get("trace_product"))?.ProductMarking
            : null,
          stateValue: state ? (await state.$get("state")).CanStateName : "-",
          state: state ? (await state.$get("state")).CanStateDescription : "-",
          stateTime: state ? state.CreateDate : null,
          author: state ? (await state.$get("author")).AuthorName : null,
          isUpdated: state ? new Date().getTime() - new Date(state.CreateDate).getTime() < 1000 * 60 * 2 : false,
          transit: location ? location.Transit : null,
          plant: location && location.PlantPK ? (await location.$get("plant")).PlantAlias : null,
        };
      })
    );
    return cansResult;
  }

  async getCansIdsByStateTypeIds(typeArr: number[] | []): Promise<number[] | []> {
    interface RespItem {
      CanPK: number;
    }
    const qry = `
    select Cans.CanPK 
    from Cans as cans
    join
    (select  max (CanRecordPK) as crpk, CanPK as CanPK from
    CanRecords
    group by CanPK    
    ) as maxPKs
    on Cans.CanPK = maxPKs.CanPK
    join
    CanRecords as CanRecords
    on CanRecords.CanRecordPK = maxPKs.crpk
    join CanStates as cstates
    on cstates.CanStatePK = CanRecords.CanStatePK
    where cstates.CanStatePK IN (:ids)
    `;
    if (typeArr.length === 0) {
      return [];
    }
    const result: RespItem[] = await this.traceCansRepository.sequelize.query(qry, {
      replacements: { ids: typeArr },
      type: sequelize.QueryTypes.SELECT,
    });
    return [...result.map((i) => i.CanPK)];
  }

  async getCansIdsByPlantIds(typeArr: number[] | []): Promise<number[] | []> {
    interface RespItem {
      CanPK: number;
    }
    const qry = `
    select Cans.CanPK 
    from Cans as cans
    join
    (select  max (CanLocationPK) as crpk, CanPK as CanPK from
    CanLocations
    group by CanPK    
    ) as maxPKs
    on Cans.CanPK = maxPKs.CanPK
    join
    CanLocations as CanLocations
    on CanLocations.CanLocationPK = maxPKs.crpk    
    where CanLocations.PlantPK IN (:ids)
    `;
    if (typeArr.length === 0) {
      return [];
    }
    const result: RespItem[] = await this.traceCansRepository.sequelize.query(qry, {
      replacements: { ids: typeArr },
      type: sequelize.QueryTypes.SELECT,
    });
    return [...result.map((i) => i.CanPK)];
  }

  async getCansIdsInTransit(condition: boolean): Promise<number[] | []> {
    interface RespItem {
      CanPK: number;
    }
    const qry = `
   select Cans.CanPK 
    from Cans as cans
    join
    (select  max (CanLocationPK) as crpk, CanPK as CanPK from
    CanLocations
    group by CanPK    
    ) as maxPKs
    on Cans.CanPK = maxPKs.CanPK
    join
    CanLocations as CanLocations
    on CanLocations.CanLocationPK = maxPKs.crpk    
    where CanLocations.Transit =(:cnd)
    `;
    const result: RespItem[] = await this.traceCansRepository.sequelize.query(qry, {
      replacements: { cnd: condition ? 1 : 0 },
      type: sequelize.QueryTypes.SELECT,
    });
    return [...result.map((i) => i.CanPK)];
  }

  async getCansWithParams(dto: GetCansDto) {
    let filter = {};
    if (dto.filter.can !== "") {
      const nameFilter = { [Op.like]: `%${dto.filter.can}%` };
      filter = { ...filter, CanName: nameFilter };
    }
    if (dto.filter.volumes.length > 0) {
      const volumeFilter = { [Op.in]: [...dto.filter.volumes] };
      filter = { ...filter, CanVolume: volumeFilter };
    }
    let stateFilter = {};
    if (dto.filter.states.length > 0) {
      const ids = await this.getCansIdsByStateTypeIds(dto.filter.states);
      stateFilter = { CanPK: { [Op.in]: [...ids] } };
    }
    let plantFilter = {};
    if (dto.filter.plants.length > 0) {
      const idsp = await this.getCansIdsByPlantIds(dto.filter.plants);
      plantFilter = { CanPK: { [Op.in]: [...idsp] } };
    }
    let transitFilter = {};
    const idst = await this.getCansIdsInTransit(dto.filter.transit);
    transitFilter = { CanPK: { [Op.in]: [...idst] } };

    const cans = await this.traceCansRepository.findAll({
      where: { [Op.and]: [{ ...filter }, { ...plantFilter }, { ...stateFilter }, { ...transitFilter }] },
    });

    const cansResult = await Promise.all(
      await cans.map(async (item) => {
        const state = await this.traceCanRecordsService.getLastStateById(item.CanPK);
        const location = await this.traceCanLocationsService.getLastLocationByCanId(item.CanPK);
        return {
          id: item.CanPK,
          name: item.CanName,
          volume: item.CanVolume,
          baseContain: state ? (await state.$get("batch"))?.BatchName : null,
          baseContainMarking: state
            ? (await (await (await state.$get("batch"))?.$get("bt_products"))?.$get("trace_product"))?.ProductMarking
            : null,
          stateValue: state ? (await state.$get("state")).CanStateName : "-",
          state: state ? (await state.$get("state")).CanStateDescription : "-",
          stateTime: state ? state.CreateDate : null,
          author: state ? (await state.$get("author")).AuthorName : null,
          isUpdated: state ? new Date().getTime() - new Date(state.CreateDate).getTime() < 1000 * 60 * 2 : false,
          transit: location ? location.Transit : null,
          plant: location && location.PlantPK ? (await location.$get("plant")).PlantAlias : null,
        };
      })
    );
    return cansResult;
  }

  async getCansList(dto: GetCansListDto) {
    const order = dto.filter.valueAsc ? "ASC" : "DESC";
    let filter = {};
    if (dto.filter.value !== "") {
      const nameFilter = { [Op.like]: `%${dto.filter.value}%` };
      filter = { ...filter, CanName: nameFilter };
    }
    if (dto.filter.onlyEmptyBarcode) {
      const barcodeFilter = { [Op.eq]: null };
      filter = { ...filter, CanBarcode: barcodeFilter };
    }
    if (dto.filter.plants.length > 0) {
      const plantFilter = { [Op.in]: [...dto.filter.plants] };
      filter = { ...filter, PlantPK: plantFilter };
    }
    const count = await this.traceCansRepository.count({ where: { ...filter } });

    const cans = await this.traceCansRepository.findAll({
      where: { ...filter },
      order: [["CanName", order]],
      limit: dto.limit,
      offset: dto.limit * (dto.page - 1),
    });
    return { total: count, rows: cans };
  }
}
