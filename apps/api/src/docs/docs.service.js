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
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.DocsService = void 0;
const common_1 = require("@nestjs/common");
const sequelize_1 = require("@nestjs/sequelize");
const plants_service_1 = require("../../../../../../../src/plants/plants.service");
const docs_model_1 = __importDefault(require("./docs.model"));
const plant_model_1 = __importDefault(require("../../../../../../../src/plants/plant.model"));
const sequelize_2 = require("sequelize");
const records_model_1 = __importDefault(require("../../../../../../../src/records/records.model"));
const histories_model_1 = __importDefault(require("../../../../../../../src/histories/histories.model"));
let DocsService = class DocsService {
    constructor(docRepository, plantService) {
        this.docRepository = docRepository;
        this.plantService = plantService;
    }
    async getCurrentDocByPlantId(plantId) {
        var offset = 3;
        const date = new Date(new Date().getTime() + offset * 3600 * 1000).setHours(12, 0, 0, 0);
        const doc = await this.docRepository.findOne({
            where: { plantId: plantId, date: date },
            include: { model: plant_model_1.default },
        });
        return doc;
    }
    async getTomorrowDocByPlantId(plantId) {
        var offset = 3 + 24;
        const date = new Date(new Date().getTime() + offset * 3600 * 1000).setHours(12, 0, 0, 0);
        const doc = await this.docRepository.findOne({
            where: { plantId: plantId, date: date },
            include: { model: plant_model_1.default },
        });
        return doc;
    }
    async getAllDocsWithFilter(dto) {
        let filter = {};
        let dateFilter = {};
        if (dto.filter.startDate && dto.filter.endDate) {
            dateFilter = {
                [sequelize_2.Op.between]: [
                    new Date(dto.filter.startDate).setHours(0),
                    new Date(dto.filter.endDate).setHours(23),
                ],
            };
            filter = {
                ...filter,
                date: dateFilter,
            };
        }
        else if (dto.filter.startDate && !dto.filter.endDate) {
            dateFilter = {
                [sequelize_2.Op.gte]: new Date(dto.filter.startDate).setHours(0),
            };
            filter = {
                ...filter,
                date: dateFilter,
            };
        }
        else if (!dto.filter.startDate && dto.filter.endDate) {
            dateFilter = {
                [sequelize_2.Op.lte]: new Date(dto.filter.endDate).setHours(23),
            };
            filter = {
                ...filter,
                date: dateFilter,
            };
        }
        if (dto.filter.plants.length > 0) {
            const plantFilter = { [sequelize_2.Op.in]: [...dto.filter.plants] };
            filter = { ...filter, plantId: plantFilter };
        }
        const count = await this.docRepository.count({
            where: { ...filter },
        });
        const docs = await this.docRepository.findAll({
            attributes: {
                exclude: ["createdAt", "updatedAt", "plants"],
                include: [
                    [(0, sequelize_2.col)("plants.value"), "plant"],
                    [(0, sequelize_2.fn)("COUNT", (0, sequelize_2.fn)("DISTINCT", (0, sequelize_2.col)("records.id"))), "recordsCount"],
                    [(0, sequelize_2.fn)("COUNT", (0, sequelize_2.col)("records.histories.id")), "historiesCount"],
                ],
            },
            include: [
                { model: plant_model_1.default, as: "plants", attributes: [] },
                {
                    model: records_model_1.default,
                    attributes: [],
                    include: [{ model: histories_model_1.default, as: "histories", attributes: [] }],
                },
            ],
            group: ["Doc.id", "plants.value"],
            subQuery: false,
            where: { ...filter },
            order: [["date", "ASC"]],
            limit: dto.limit,
            offset: dto.limit * (dto.page - 1),
        });
        return { total: count, rows: docs };
    }
    async getDocByPlantAndDate(date, plantId) {
        const existsDoc = await this.docRepository.findOne({
            where: { plantId: plantId, date: new Date(`${date} 12:00:00:000`) },
        });
        return existsDoc;
    }
    async getDocById(id) {
        const doc = await this.docRepository.findOne({
            where: { id: id },
            include: { model: plant_model_1.default },
        });
        if (!doc) {
            throw new common_1.HttpException("Сводка на найдена", common_1.HttpStatus.NOT_FOUND);
        }
        return doc;
    }
    async getAllDocs() {
        const docs = await this.docRepository.findAll({
            attributes: {
                exclude: ["plantId", "createdAt", "updatedAt"],
                include: [
                    [(0, sequelize_2.col)("plants.value"), "plant"],
                    [(0, sequelize_2.fn)("COUNT", (0, sequelize_2.fn)("DISTINCT", (0, sequelize_2.col)("records.id"))), "recordsCount"],
                    [(0, sequelize_2.fn)("COUNT", (0, sequelize_2.col)("records.histories.id")), "historiesCount"],
                ],
            },
            include: [
                { model: plant_model_1.default, as: "plants", attributes: [] },
                {
                    model: records_model_1.default,
                    attributes: [],
                    include: [{ model: histories_model_1.default, as: "histories", attributes: [] }],
                },
            ],
            group: ["Doc.id", "plants.value"],
            order: [["date", "ASC"]],
        });
        return docs;
    }
    async createDoc(dto) {
        const plant = await this.plantService.getPlantByValue(dto.plant);
        if (plant) {
            const existsDoc = await this.getDocByPlantAndDate(dto.date, plant.id);
            if (existsDoc) {
                throw new common_1.HttpException("Сводка на эту площадку и дату уже существует", common_1.HttpStatus.BAD_REQUEST);
            }
            const parsedDate = new Date(`${dto.date} 12:00:00:000`);
            const doc = await this.docRepository.create({
                ...dto,
                date: parsedDate,
                plantId: plant.id,
            });
            return doc;
        }
        throw new common_1.HttpException("Площадка на найдена", common_1.HttpStatus.NOT_FOUND);
    }
    async deleteDoc(id) {
        const doc = await this.docRepository.findByPk(id);
        if (!doc) {
            throw new common_1.HttpException("Документ для удаления не найден", common_1.HttpStatus.NOT_FOUND);
        }
        try {
            await doc.destroy();
        }
        catch (error) {
            if (error instanceof Error &&
                error.name === "SequelizeForeignKeyConstraintError") {
                throw new common_1.HttpException("Существуют записи, связанные с этой сводкой. Удаление невозможно...", common_1.HttpStatus.BAD_REQUEST);
            }
            else {
                throw new common_1.HttpException("Неизвестная ошибка", common_1.HttpStatus.BAD_REQUEST);
            }
        }
    }
};
exports.DocsService = DocsService;
exports.DocsService = DocsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, sequelize_1.InjectModel)(docs_model_1.default)),
    __metadata("design:paramtypes", [Object, typeof (_a = typeof plants_service_1.PlantsService !== "undefined" && plants_service_1.PlantsService) === "function" ? _a : Object])
], DocsService);
//# sourceMappingURL=docs.service.js.map