"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a, _b;
Object.defineProperty(exports, "__esModule", { value: true });
exports.TraceCansService = void 0;
const common_1 = require("@nestjs/common");
const sequelize_1 = require("@nestjs/sequelize");
const trace_can_records_service_1 = require("../../../../../../../src/trace_can_records/trace_can_records.service");
const trace_can_model_1 = __importDefault(require("../../../../../../../src/trace_models/trace_can.model"));
const sequelize_2 = require("sequelize");
const trace_can_locations_service_1 = require("../../../../../../../src/trace_can_locations/trace_can_locations.service");
const sequelize_3 = __importDefault(require("sequelize"));
let TraceCansService = class TraceCansService {
    constructor(traceCansRepository, traceCanRecordsService, traceCanLocationsService) {
        this.traceCansRepository = traceCansRepository;
        this.traceCanRecordsService = traceCanRecordsService;
        this.traceCanLocationsService = traceCanLocationsService;
    }
    async getVolumes() {
        const volumes = await this.traceCansRepository.findAll({
            attributes: [[(0, sequelize_2.fn)("DISTINCT", (0, sequelize_2.col)("CanVolume")), "volume"]],
        });
        return volumes;
    }
    async getCans() {
        var offset = 3;
        const cans = await this.traceCansRepository.findAll({
            order: [["CanOrderValue", "ASC"]],
        });
        const cansResult = await Promise.all(await cans.map(async (item) => {
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
                stateTime: state
                    ? new Date(state.CreateDate.getTime() - offset * 3600 * 1000)
                    : null,
                author: state ? (await state.$get("author")).AuthorName : null,
                isUpdated: state
                    ? new Date().getTime() -
                        (new Date(state.CreateDate).getTime() - offset * 3600 * 1000) <
                        1000 * 60 * 2
                    : false,
                transit: location ? location.Transit : null,
                plant: location && location.PlantPK
                    ? (await location.$get("plant")).PlantAlias
                    : null,
            };
        }));
        return cansResult;
    }
    async getCansIdsByStateTypeIds(typeArr) {
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
        const result = await this.traceCansRepository.sequelize.query(qry, {
            replacements: { ids: typeArr },
            type: sequelize_3.default.QueryTypes.SELECT,
        });
        return [...result.map((i) => i.CanPK)];
    }
    async getCansIdsByPlantIds(typeArr) {
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
        const result = await this.traceCansRepository.sequelize.query(qry, {
            replacements: { ids: typeArr },
            type: sequelize_3.default.QueryTypes.SELECT,
        });
        return [...result.map((i) => i.CanPK)];
    }
    async getCansIdsInTransit(condition) {
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
        const result = await this.traceCansRepository.sequelize.query(qry, {
            replacements: { cnd: condition ? 1 : 0 },
            type: sequelize_3.default.QueryTypes.SELECT,
        });
        return [...result.map((i) => i.CanPK)];
    }
    async getCansWithParams(dto) {
        let filter = {};
        if (dto.filter.can !== "") {
            const nameFilter = { [sequelize_2.Op.like]: `%${dto.filter.can}%` };
            filter = { ...filter, CanName: nameFilter };
        }
        if (dto.filter.volumes.length > 0) {
            const volumeFilter = { [sequelize_2.Op.in]: [...dto.filter.volumes] };
            filter = { ...filter, CanVolume: volumeFilter };
        }
        let stateFilter = {};
        if (dto.filter.states.length > 0) {
            const ids = await this.getCansIdsByStateTypeIds(dto.filter.states);
            stateFilter = { CanPK: { [sequelize_2.Op.in]: [...ids] } };
        }
        let plantFilter = {};
        if (dto.filter.plants.length > 0) {
            const idsp = await this.getCansIdsByPlantIds(dto.filter.plants);
            plantFilter = { CanPK: { [sequelize_2.Op.in]: [...idsp] } };
        }
        let transitFilter = {};
        const idst = await this.getCansIdsInTransit(dto.filter.transit);
        transitFilter = { CanPK: { [sequelize_2.Op.in]: [...idst] } };
        const cans = await this.traceCansRepository.findAll({
            where: {
                [sequelize_2.Op.and]: [
                    { ...filter },
                    { ...plantFilter },
                    { ...stateFilter },
                    { ...transitFilter },
                ],
            },
            order: [["CanOrderValue", "ASC"]],
        });
        const cansResult = await Promise.all(await cans.map(async (item) => {
            const state = await this.traceCanRecordsService.getLastStateById(item.CanPK);
            const location = await this.traceCanLocationsService.getLastLocationByCanId(item.CanPK);
            var offset = 3;
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
                stateTime: state
                    ? new Date(state.CreateDate.getTime() - offset * 3600 * 1000)
                    : null,
                author: state ? (await state.$get("author")).AuthorName : null,
                isUpdated: state
                    ? new Date().getTime() -
                        (new Date(state.CreateDate).getTime() - offset * 3600 * 1000) <
                        1000 * 60 * 2
                    : false,
                transit: location ? location.Transit : null,
                plant: location && location.PlantPK
                    ? (await location.$get("plant")).PlantAlias
                    : null,
            };
        }));
        return cansResult;
    }
    async getCansList(dto) {
        const order = dto.filter.valueAsc ? "ASC" : "DESC";
        let filter = {};
        if (dto.filter.value !== "") {
            const nameFilter = { [sequelize_2.Op.like]: `%${dto.filter.value}%` };
            filter = { ...filter, CanName: nameFilter };
        }
        if (dto.filter.onlyEmptyBarcode) {
            const barcodeFilter = { [sequelize_2.Op.eq]: null };
            filter = { ...filter, CanBarcode: barcodeFilter };
        }
        if (dto.filter.plants.length > 0) {
            const plantFilter = { [sequelize_2.Op.in]: [...dto.filter.plants] };
            filter = { ...filter, PlantPK: plantFilter };
        }
        const count = await this.traceCansRepository.count({
            where: { ...filter },
        });
        const cans = await this.traceCansRepository.findAll({
            where: { ...filter },
            order: [["CanName", order]],
            limit: dto.limit,
            offset: dto.limit * (dto.page - 1),
        });
        return { total: count, rows: cans };
    }
};
exports.TraceCansService = TraceCansService;
exports.TraceCansService = TraceCansService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, sequelize_1.InjectModel)(trace_can_model_1.default, "trace_connection")),
    __metadata("design:paramtypes", [Object, typeof (_a = typeof trace_can_records_service_1.TraceCanRecordsService !== "undefined" && trace_can_records_service_1.TraceCanRecordsService) === "function" ? _a : Object, typeof (_b = typeof trace_can_locations_service_1.TraceCanLocationsService !== "undefined" && trace_can_locations_service_1.TraceCanLocationsService) === "function" ? _b : Object])
], TraceCansService);
//# sourceMappingURL=trace_cans.service.js.map