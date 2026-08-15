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
exports.HistoryTypesService = void 0;
const common_1 = require("@nestjs/common");
const sequelize_1 = require("@nestjs/sequelize");
const history_types_model_1 = __importDefault(require("./history_types.model"));
let HistoryTypesService = class HistoryTypesService {
    constructor(historyTypesRepository) {
        this.historyTypesRepository = historyTypesRepository;
    }
    async getAllHistoryTypes() {
        const historyTypes = await this.historyTypesRepository.findAll();
        return historyTypes;
    }
    async getAllBaseHistoryTypes() {
        const historyTypes = await this.historyTypesRepository.findAll({
            where: { for_boil: true },
        });
        return historyTypes;
    }
    async getAllProductHistoryTypes() {
        const historyTypes = await this.historyTypesRepository.findAll({
            where: { for_boil: false },
        });
        return historyTypes;
    }
    async getByValue(value) {
        const historyType = await this.historyTypesRepository.findOne({
            where: { value: value },
        });
        return historyType;
    }
    async getById(id) {
        const historyType = await this.historyTypesRepository.findByPk(id);
        return historyType;
    }
    async createHistoryType(dto) {
        const historyType = await this.historyTypesRepository.create(dto);
        return historyType;
    }
};
exports.HistoryTypesService = HistoryTypesService;
exports.HistoryTypesService = HistoryTypesService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, sequelize_1.InjectModel)(history_types_model_1.default)),
    __metadata("design:paramtypes", [Object])
], HistoryTypesService);
//# sourceMappingURL=history_types.service.js.map