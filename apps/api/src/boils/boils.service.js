"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BoilsService = void 0;
const common_1 = require("@nestjs/common");
const sequelize_1 = require("@nestjs/sequelize");
const sequelize_2 = __importStar(require("sequelize"));
const boil_model_1 = __importDefault(require("./boil.model"));
const bases_model_1 = __importDefault(require("../../../../../../../src/bases/bases.model"));
let BoilsService = class BoilsService {
    constructor(boilsRepository) {
        this.boilsRepository = boilsRepository;
    }
    async getAllBoils() {
        const boils = await this.boilsRepository.findAll({
            order: [
                ["year", "ASC"],
                ["letter", "ASC"],
                ["number", "ASC"],
                ["value", "ASC"],
            ],
        });
        return boils;
    }
    async getBoilsIdsByHistoryTypeIds(typeArr) {
        const qry = `
    select boils.id 
    from boils as boils
    join
    (select  max (id) as hid, boil_id as boil_id from
    histories
    group by boil_id    
    ) as maxids
    on boils.id = maxids.boil_id
    join
    histories as histories
    on histories.id = maxids.hid
    join history_types as htypes
    on htypes.id = histories."historyTypeId"
    where htypes.id IN (:ids)
    `;
        if (typeArr.length === 0) {
            return [];
        }
        const result = await this.boilsRepository.sequelize.query(qry, {
            replacements: { ids: typeArr },
            type: sequelize_2.default.QueryTypes.SELECT,
        });
        return [...result.map((i) => i.id)];
    }
    async getBoilsWithFilter(dto) {
        const boilOrder = dto.filter.boilAsc ? "ASC" : "DESC";
        let filter = {};
        if (dto.filter.boil !== "") {
            const boilFilter = { [sequelize_2.Op.iLike]: `%${dto.filter.boil}%` };
            filter = { ...filter, value: boilFilter };
        }
        if (dto.filter.states && dto.filter.states.length > 0) {
            const ids = await this.getBoilsIdsByHistoryTypeIds(dto.filter.states);
            const typeFilter = { [sequelize_2.Op.in]: [...ids] };
            filter = { ...filter, id: typeFilter };
        }
        if (dto.filter.plants.length > 0) {
            const plantFilter = { [sequelize_2.Op.in]: [...dto.filter.plants] };
            filter = { ...filter, plant_id: plantFilter };
        }
        else {
            const plantFilter = { [sequelize_2.Op.ne]: null };
            filter = { ...filter, plant_id: plantFilter };
        }
        let baseCond = {};
        if (dto.filter.baseCode !== "") {
            const baseFilter = { [sequelize_2.Op.like]: `%${dto.filter.baseCode}%` };
            baseCond = { ...baseCond, code: baseFilter };
        }
        if (dto.filter.marking !== "") {
            const markingFilter = { [sequelize_2.Op.iLike]: `%${dto.filter.marking}%` };
            baseCond = { ...baseCond, marking: markingFilter };
        }
        const count = await this.boilsRepository.count({
            where: { ...filter },
            include: [
                {
                    model: bases_model_1.default,
                    attributes: [],
                    required: dto.filter.baseCode !== "" || dto.filter.marking !== "",
                    where: { ...baseCond },
                },
            ],
        });
        const boils = await this.boilsRepository.findAll({
            where: { ...filter },
            include: [
                {
                    model: bases_model_1.default,
                    attributes: [],
                    required: dto.filter.baseCode !== "" || dto.filter.marking !== "",
                    where: { ...baseCond },
                },
            ],
            order: [
                ["year", boilOrder],
                ["letter", boilOrder],
                ["number", boilOrder],
            ],
            limit: dto.limit,
            offset: dto.limit * (dto.page - 1),
        });
        return { boils: boils, count: count };
    }
    async getById(id) {
        const boil = await this.boilsRepository.findByPk(id);
        return boil;
    }
    async getBoilListRow(id) {
        const boil = await this.boilsRepository.findOne({ where: { id: id } });
        return boil;
    }
    async getOrCreateByValue(value) {
        if (value === "-" || !value) {
            return null;
        }
        const [boil, _] = await this.boilsRepository.findOrCreate({
            where: { value: value },
        });
        return boil;
    }
    async getByValue(value) {
        if (value === "-" || !value) {
            return null;
        }
        const boil = await this.boilsRepository.findOne({
            where: { value: value },
        });
        return boil;
    }
};
exports.BoilsService = BoilsService;
exports.BoilsService = BoilsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, sequelize_1.InjectModel)(boil_model_1.default)),
    __metadata("design:paramtypes", [Object])
], BoilsService);
//# sourceMappingURL=boils.service.js.map