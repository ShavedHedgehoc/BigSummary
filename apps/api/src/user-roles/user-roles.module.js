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
exports.UserRolesModule = void 0;
const common_1 = require("@nestjs/common");
const user_roles_service_1 = require("./user-roles.service");
const user_roles_controller_1 = require("./user-roles.controller");
const sequelize_1 = require("@nestjs/sequelize");
const user_roles_model_1 = __importDefault(require("./user-roles.model"));
let UserRolesModule = class UserRolesModule {
};
exports.UserRolesModule = UserRolesModule;
exports.UserRolesModule = UserRolesModule = __decorate([
    (0, common_1.Module)({
        providers: [user_roles_service_1.UserRolesService],
        controllers: [user_roles_controller_1.UserRolesController],
        imports: [sequelize_1.SequelizeModule.forFeature([user_roles_model_1.default])],
        exports: [user_roles_service_1.UserRolesService],
    })
], UserRolesModule);
//# sourceMappingURL=user-roles.module.js.map