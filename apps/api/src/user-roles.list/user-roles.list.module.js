"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRolesListModule = void 0;
const common_1 = require("@nestjs/common");
const user_roles_list_service_1 = require("./user-roles.list.service");
const user_roles_list_controller_1 = require("./user-roles.list.controller");
const user_roles_module_1 = require("../../../../../../../src/user-roles/user-roles.module");
const users_module_1 = require("../../../../../../../src/users/users.module");
const roles_module_1 = require("../../../../../../../src/roles/roles.module");
let UserRolesListModule = class UserRolesListModule {
};
exports.UserRolesListModule = UserRolesListModule;
exports.UserRolesListModule = UserRolesListModule = __decorate([
    (0, common_1.Module)({
        providers: [user_roles_list_service_1.UserRolesListService],
        controllers: [user_roles_list_controller_1.UserRolesListController],
        imports: [user_roles_module_1.UserRolesModule, users_module_1.UsersModule, roles_module_1.RolesModule],
    })
], UserRolesListModule);
//# sourceMappingURL=user-roles.list.module.js.map