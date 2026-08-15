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
var _a, _b, _c;
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRolesListService = void 0;
const common_1 = require("@nestjs/common");
const roles_service_1 = require("../../../../../../../src/roles/roles.service");
const user_roles_service_1 = require("../../../../../../../src/user-roles/user-roles.service");
const users_service_1 = require("../../../../../../../src/users/users.service");
let UserRolesListService = class UserRolesListService {
    constructor(userRoleService, roleService, userService) {
        this.userRoleService = userRoleService;
        this.roleService = roleService;
        this.userService = userService;
    }
    async changeUserRole(userId, roleValue) {
        const role = await this.roleService.getroleByValue(roleValue);
        const user = await this.userService.getByPk(userId);
        if (!role) {
            throw new common_1.HttpException("Роль не найдена", common_1.HttpStatus.NOT_FOUND);
        }
        if (!user) {
            throw new common_1.HttpException("Пользователь не найден", common_1.HttpStatus.NOT_FOUND);
        }
        const roleRecord = await this.userRoleService.getRowByUserIdAndRoleId(user.id, role.id);
        if (roleRecord) {
            await this.userRoleService.removeRecord(roleRecord.id);
            return;
        }
        const newRow = await this.userRoleService.addRecord(user.id, role.id);
        return newRow;
    }
};
exports.UserRolesListService = UserRolesListService;
exports.UserRolesListService = UserRolesListService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [typeof (_a = typeof user_roles_service_1.UserRolesService !== "undefined" && user_roles_service_1.UserRolesService) === "function" ? _a : Object, typeof (_b = typeof roles_service_1.RolesService !== "undefined" && roles_service_1.RolesService) === "function" ? _b : Object, typeof (_c = typeof users_service_1.UsersService !== "undefined" && users_service_1.UsersService) === "function" ? _c : Object])
], UserRolesListService);
//# sourceMappingURL=user-roles.list.service.js.map