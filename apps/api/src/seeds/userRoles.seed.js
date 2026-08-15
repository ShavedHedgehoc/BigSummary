"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SeedUserRole = void 0;
const nestjs_sequelize_seeder_1 = require("nestjs-sequelize-seeder");
let SeedUserRole = class SeedUserRole {
    run() {
        const data = [
            {
                roleId: 1,
                userId: 1,
            },
            {
                roleId: 2,
                userId: 1,
            },
            {
                roleId: 3,
                userId: 1,
            },
            {
                roleId: 4,
                userId: 1,
            },
            {
                roleId: 5,
                userId: 1,
            },
            {
                roleId: 6,
                userId: 1,
            },
            {
                roleId: 7,
                userid: 1,
            },
        ];
        return data;
    }
};
exports.SeedUserRole = SeedUserRole;
exports.SeedUserRole = SeedUserRole = __decorate([
    (0, nestjs_sequelize_seeder_1.Seeder)({
        model: "UserRoles",
        containsForeignKeys: true,
        foreignDelay: 10000,
    })
], SeedUserRole);
//# sourceMappingURL=userRoles.seed.js.map