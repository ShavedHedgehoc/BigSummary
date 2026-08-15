"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RolesModule = void 0;
const common_1 = require("@nestjs/common");
const roles_service_1 = require("./roles.service");
const roles_controller_1 = require("./roles.controller");
const sequelize_1 = require("@nestjs/sequelize");
const roles_model_1 = __importDefault(require("./roles.model"));
const users_model_1 = __importDefault(require("../../../../../../../src/users/users.model"));
const user_roles_model_1 = __importDefault(require("../user-roles/user-roles.model"));
let RolesModule = class RolesModule {
};
exports.RolesModule = RolesModule;
exports.RolesModule = RolesModule = __decorate([
    (0, common_1.Module)({
        providers: [roles_service_1.RolesService],
        controllers: [roles_controller_1.RolesController],
        imports: [
            sequelize_1.SequelizeModule.forFeature([roles_model_1.default, users_model_1.default, user_roles_model_1.default]),
        ],
        exports: [roles_service_1.RolesService],
    })
], RolesModule);
//# sourceMappingURL=roles.module.js.map