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
exports.ConveyorsService = void 0;
const common_1 = require("@nestjs/common");
const sequelize_1 = require("@nestjs/sequelize");
const conveyor_model_1 = __importDefault(require("./conveyor.model"));
const sequelize_2 = require("sequelize");
let ConveyorsService = class ConveyorsService {
    constructor(conveyorsRepository) {
        this.conveyorsRepository = conveyorsRepository;
    }
    async getAllConveyorsWithParams(dto) {
        const conveyorsOrder = dto.filter.valueAsc ? "ASC" : "DESC";
        let filter = {};
        if (dto.filter.value !== "") {
            const conveyorFilter = { [sequelize_2.Op.iLike]: `%${dto.filter.value}%` };
            filter = { ...filter, value: conveyorFilter };
        }
        if (dto.filter.onlyEmptyBarcode) {
            const barcodeFilter = { [sequelize_2.Op.eq]: null };
            filter = { ...filter, barcode: barcodeFilter };
        }
        const count = await this.conveyorsRepository.count({
            where: { ...filter },
        });
        const conveyors = await this.conveyorsRepository.findAll({
            where: { ...filter },
            order: [["value", conveyorsOrder]],
            limit: dto.limit,
            offset: dto.limit * (dto.page - 1),
        });
        return { total: count, rows: conveyors };
    }
    async getByBarcode(barcode) {
        const conveyor = await this.conveyorsRepository.findOne({
            where: { barcode: barcode },
        });
        return conveyor;
    }
    async getOrCreateByValue(value) {
        const [conveyors, _] = await this.conveyorsRepository.findOrCreate({
            where: { value: value },
        });
        return conveyors;
    }
    async createConveyor(dto) {
        const conveyors = await this.conveyorsRepository.create(dto);
        return conveyors;
    }
    async updateConveyor(dto) {
        const conveyor = await this.conveyorsRepository.findByPk(dto.id);
        if (!conveyor) {
            throw new common_1.HttpException("Конвейер не найден", common_1.HttpStatus.NOT_FOUND);
        }
        try {
            conveyor.set({
                value: dto.value,
                barcode: dto.barcode,
            });
            await conveyor.save();
            return conveyor;
        }
        catch (error) {
            if (error instanceof Error &&
                error.name === "SequelizeUniqueConstraintError") {
                throw new common_1.HttpException("Конвейер с таким наименованием или штрихкодом уже существует", common_1.HttpStatus.BAD_REQUEST);
            }
            else {
                throw new common_1.HttpException("Неизвестная ошибка", common_1.HttpStatus.BAD_REQUEST);
            }
        }
    }
    async deleteConveyor(id) {
        const conveyor = await this.conveyorsRepository.findByPk(id);
        if (!conveyor) {
            throw new common_1.HttpException("Конвейер не найден", common_1.HttpStatus.NOT_FOUND);
        }
        try {
            await conveyor.destroy();
        }
        catch (error) {
            if (error instanceof Error &&
                error.name === "SequelizeForeignKeyConstraintError") {
                throw new common_1.HttpException("Существуют записи, связанные с этим конвейером. Удаление невозможно...", common_1.HttpStatus.BAD_REQUEST);
            }
            else {
                throw new common_1.HttpException("Неизвестная ошибка", common_1.HttpStatus.BAD_REQUEST);
            }
        }
    }
    async getByValue(value) {
        const conveyor = await this.conveyorsRepository.findOne({
            where: { value: value },
        });
        return conveyor;
    }
};
exports.ConveyorsService = ConveyorsService;
exports.ConveyorsService = ConveyorsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, sequelize_1.InjectModel)(conveyor_model_1.default)),
    __metadata("design:paramtypes", [Object])
], ConveyorsService);
//# sourceMappingURL=conveyors.service.js.map