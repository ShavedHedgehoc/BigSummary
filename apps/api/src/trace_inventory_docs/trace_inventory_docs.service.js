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
Object.defineProperty(exports, "__esModule", { value: true });
exports.TraceInventoryDocsService = void 0;
const common_1 = require("@nestjs/common");
const trace_inventory_doc_model_1 = __importDefault(require("../../../../../../../src/trace_models/trace_inventory_doc.model"));
const sequelize_1 = require("sequelize");
const trace_plant_model_1 = __importDefault(require("../../../../../../../src/trace_models/trace_plant.model"));
const sequelize_2 = require("@nestjs/sequelize");
const trace_inventory_row_model_1 = __importDefault(require("../../../../../../../src/trace_models/trace_inventory_row.model"));
let TraceInventoryDocsService = class TraceInventoryDocsService {
    constructor(InventoryDocsRepository) {
        this.InventoryDocsRepository = InventoryDocsRepository;
    }
    async getInventoryById(id) {
        const inventory = await this.InventoryDocsRepository.findOne({
            attributes: {
                exclude: ["PlantPK", "InventoryDocPK", "InventoryDate", "Finished"],
                include: [
                    [(0, sequelize_1.col)("TraceInventoryDoc.InventoryDocPK"), "id"],
                    [(0, sequelize_1.col)("TraceInventoryDoc.InventoryDate"), "date"],
                    [(0, sequelize_1.col)("TraceInventoryDoc.Finished"), "finished"],
                    [(0, sequelize_1.col)("plant.PlantName"), "plant_name"],
                ],
            },
            where: { InventoryDocPK: id },
            include: { model: trace_plant_model_1.default, as: "plant", attributes: [] },
        });
        if (!inventory) {
            throw new common_1.HttpException("Переучет не найден", common_1.HttpStatus.NOT_FOUND);
        }
        return inventory;
    }
    async getInventoryDocs(dto) {
        let filter = {};
        const dateFilter = {
            [sequelize_1.Op.between]: [
                new Date(dto.filter.startDate),
                new Date(dto.filter.endDate),
            ],
        };
        filter = {
            ...filter,
            InventoryDate: dateFilter,
        };
        if (dto.filter.plants.length > 0) {
            const plantFilter = { [sequelize_1.Op.in]: [...dto.filter.plants] };
            filter = { ...filter, plantPK: plantFilter };
        }
        const count = await this.InventoryDocsRepository.count({
            where: { ...filter },
        });
        const inventories = await this.InventoryDocsRepository.findAll({
            attributes: {
                exclude: ["PlantPK", "InventoryDocPK", "InventoryDate", "Finished"],
                include: [
                    [(0, sequelize_1.col)("TraceInventoryDoc.InventoryDocPK"), "id"],
                    [(0, sequelize_1.col)("TraceInventoryDoc.InventoryDate"), "date"],
                    [(0, sequelize_1.col)("TraceInventoryDoc.Finished"), "finished"],
                    [(0, sequelize_1.col)("plant.PlantName"), "plant_name"],
                    [(0, sequelize_1.fn)("COUNT", (0, sequelize_1.col)("inventory_rows.InventoryRowPK")), "records"],
                ],
            },
            include: [
                { model: trace_plant_model_1.default, as: "plant", attributes: [] },
                { model: trace_inventory_row_model_1.default, as: "inventory_rows", attributes: [] },
            ],
            group: [
                "TraceInventoryDoc.InventoryDocPK",
                "TraceInventoryDoc.InventoryDate",
                "TraceInventoryDoc.Finished",
                "plant.PlantName",
            ],
            subQuery: false,
            where: { ...filter },
            order: [["InventoryDate", "ASC"]],
            limit: dto.limit,
            offset: dto.limit * (dto.page - 1),
        });
        return { total: count, rows: inventories };
    }
};
exports.TraceInventoryDocsService = TraceInventoryDocsService;
exports.TraceInventoryDocsService = TraceInventoryDocsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, sequelize_2.InjectModel)(trace_inventory_doc_model_1.default, "trace_connection")),
    __metadata("design:paramtypes", [Object])
], TraceInventoryDocsService);
//# sourceMappingURL=trace_inventory_docs.service.js.map