"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SeedRole = void 0;
const nestjs_sequelize_seeder_1 = require("nestjs-sequelize-seeder");
let SeedRole = class SeedRole {
    run() {
        const data = [
            {
                value: "ADMIN",
                description: "Администратор",
            },
            {
                value: "USER",
                description: "Пользователь",
            },
            {
                value: "LABORATORY",
                description: "Лаборант",
            },
            {
                value: "TECHNOLOGIST",
                description: "Технолог",
            },
            {
                value: "PLANNER",
                description: "Планировщик",
            },
            {
                value: "EMPLOYERS",
                description: "Администратор рабочей станции",
            },
            {
                value: "GODMODE",
                description: "Добавление записей истории",
            },
            {
                value: "FOREMAN",
                description: "Мастер",
            },
            {
                value: "REPORTS",
                description: "Отчеты",
            },
        ];
        return data;
    }
};
exports.SeedRole = SeedRole;
exports.SeedRole = SeedRole = __decorate([
    (0, nestjs_sequelize_seeder_1.Seeder)({
        model: "Role",
        unique: ["value"],
    })
], SeedRole);
//# sourceMappingURL=role.seed.js.map