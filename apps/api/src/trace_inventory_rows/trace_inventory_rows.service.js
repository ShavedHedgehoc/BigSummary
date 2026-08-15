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
exports.TraceInventoryRowsService = void 0;
const common_1 = require("@nestjs/common");
const sequelize_1 = require("@nestjs/sequelize");
const trace_inventory_row_model_1 = __importDefault(require("../../../../../../../src/trace_models/trace_inventory_row.model"));
const sequelize_2 = require("sequelize");
const trace_lot_model_1 = __importDefault(require("../../../../../../../src/trace_models/trace_lot.model"));
const trace_product_model_1 = __importDefault(require("../../../../../../../src/trace_models/trace_product.model"));
const trace_author_model_1 = __importDefault(require("../../../../../../../src/trace_models/trace_author.model"));
let TraceInventoryRowsService = class TraceInventoryRowsService {
    constructor(inventoryRowsRepository) {
        this.inventoryRowsRepository = inventoryRowsRepository;
    }
    async getInventoryByIdWithFilter(dto) {
        let filter = {};
        if (dto.filter.productCode !== "") {
            const productFilter = { [sequelize_2.Op.like]: `%${dto.filter.productCode}%` };
            filter = { ...filter, ProductId: productFilter };
        }
        if (dto.filter.dayToExpire && dto.filter.toFilter) {
            const currentDate = new Date();
            currentDate.setHours(0, 0, 0, 0);
            currentDate.setDate(currentDate.getDate() + dto.filter.dayToExpire);
            const expireFilter = {
                [sequelize_2.Op.lt]: currentDate,
            };
            filter = { ...filter, ExpDate: expireFilter };
        }
        const inventory_rows = await this.inventoryRowsRepository.findAll({
            attributes: [
                [(0, sequelize_2.col)("inventoryRowPK"), "id"],
                [(0, sequelize_2.col)("TraceInventoryRow.ProductId"), "product_id"],
                [(0, sequelize_2.col)("product.ProductName"), "product_name"],
                [(0, sequelize_2.col)("TraceInventoryRow.LotPK"), "lot_id"],
                [(0, sequelize_2.col)("lot.LotName"), "lot_name"],
                [(0, sequelize_2.col)("TraceInventoryRow.Quantity"), "quantity"],
                [(0, sequelize_2.col)("TraceInventoryRow.ExpDate"), "exp_date"],
                [(0, sequelize_2.col)("author.AuthorName"), "author_name"],
                [
                    (0, sequelize_2.fn)("DATEDIFF", (0, sequelize_2.literal)("day"), (0, sequelize_2.literal)("GETDATE()"), (0, sequelize_2.col)("TraceInventoryRow.ExpDate")),
                    "days_to_exp",
                ],
            ],
            where: { InventoryDocPK: dto.inventoryId, ...filter },
            include: [
                { model: trace_product_model_1.default, as: "product", attributes: [] },
                { model: trace_lot_model_1.default, as: "lot", attributes: [] },
                { model: trace_author_model_1.default, as: "author", attributes: [] },
            ],
        });
        return inventory_rows;
    }
};
exports.TraceInventoryRowsService = TraceInventoryRowsService;
exports.TraceInventoryRowsService = TraceInventoryRowsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, sequelize_1.InjectModel)(trace_inventory_row_model_1.default, "trace_connection")),
    __metadata("design:paramtypes", [Object])
], TraceInventoryRowsService);
//# sourceMappingURL=trace_inventory_rows.service.js.map