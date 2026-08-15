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
exports.UserRolesService = void 0;
const common_1 = require("@nestjs/common");
const sequelize_1 = require("@nestjs/sequelize");
const user_roles_model_1 = __importDefault(require("./user-roles.model"));
const roles_model_1 = __importDefault(require("../../../../../../../src/roles/roles.model"));
let UserRolesService = class UserRolesService {
    constructor(userRoleRepository) {
        this.userRoleRepository = userRoleRepository;
    }
    async getRolesListByUserId(id) {
        const userRoles = await this.userRoleRepository.findAll({
            where: { userId: id },
            attributes: [],
            include: { model: roles_model_1.default, attributes: ["id", "value", "description"] },
        });
        const result = userRoles.map((item) => {
            return {
                id: item.role.id,
                value: item.role.value,
                description: item.role.description,
            };
        });
        return result;
    }
    async getRolesIdsByUserId(id) {
        const userRoles = await this.userRoleRepository.findAll({
            where: { userId: id },
            attributes: [],
            include: { model: roles_model_1.default, attributes: ["id"] },
        });
        const result = userRoles.map((item) => item.role.id);
        return result;
    }
    async getRolesValuesByUserId(id) {
        const userRoles = await this.userRoleRepository.findAll({
            where: { userId: id },
            attributes: [],
            include: { model: roles_model_1.default, attributes: ["value"] },
        });
        const result = userRoles.map((item) => item.role.value);
        return result;
    }
    async getRowByUserIdAndRoleId(userId, roleId) {
        const row = await this.userRoleRepository.findOne({
            where: { userId: userId, roleId: roleId },
        });
        return row;
    }
    async removeRecord(id) {
        await this.userRoleRepository.destroy({ where: { id: id } });
    }
    async addRecord(userId, roleId) {
        const newRow = await this.userRoleRepository.create({
            userId: userId,
            roleId: roleId,
        });
        return newRow;
    }
};
exports.UserRolesService = UserRolesService;
exports.UserRolesService = UserRolesService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, sequelize_1.InjectModel)(user_roles_model_1.default)),
    __metadata("design:paramtypes", [Object])
], UserRolesService);
//# sourceMappingURL=user-roles.service.js.map