"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SeedUser = void 0;
const nestjs_sequelize_seeder_1 = require("nestjs-sequelize-seeder");
const bcryptjs_1 = require("bcryptjs");
let SeedUser = class SeedUser {
    run() {
        const data = [
            {
                name: "admin",
                email: "admin@site.ru",
                password: "1",
            },
        ];
        return data;
    }
    everyone(data) {
        if (data.password) {
            const salt = (0, bcryptjs_1.genSaltSync)(10);
            data.password = (0, bcryptjs_1.hashSync)(data.password, salt);
            data.salt = salt;
        }
        data.created_at = new Date().toISOString();
        data.updated_at = new Date().toISOString();
        return data;
    }
};
exports.SeedUser = SeedUser;
exports.SeedUser = SeedUser = __decorate([
    (0, nestjs_sequelize_seeder_1.Seeder)({
        model: "User",
        unique: ["email"],
    })
], SeedUser);
//# sourceMappingURL=user.seed.js.map