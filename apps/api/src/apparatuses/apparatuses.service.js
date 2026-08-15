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
exports.ApparatusesService = void 0;
const common_1 = require("@nestjs/common");
const sequelize_1 = require("@nestjs/sequelize");
const apparatuses_model_1 = __importDefault(require("./apparatuses.model"));
let ApparatusesService = class ApparatusesService {
    constructor(apparatusRepository) {
        this.apparatusRepository = apparatusRepository;
    }
    async getOrCreateByValue(value) {
        if (value === "-" || !value) {
            return null;
        }
        const [apparatus, _] = await this.apparatusRepository.findOrCreate({
            where: { value: value },
        });
        return apparatus;
    }
    async getByValue(value) {
        const apparatus = await this.apparatusRepository.findOne({
            where: { value: value },
        });
        return apparatus;
    }
};
exports.ApparatusesService = ApparatusesService;
exports.ApparatusesService = ApparatusesService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, sequelize_1.InjectModel)(apparatuses_model_1.default)),
    __metadata("design:paramtypes", [Object])
], ApparatusesService);
//# sourceMappingURL=apparatuses.service.js.map