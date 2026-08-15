"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SeedHistoryType = void 0;
const nestjs_sequelize_seeder_1 = require("nestjs-sequelize-seeder");
let SeedHistoryType = class SeedHistoryType {
    run() {
        const data = [
            {
                value: "base_check",
                description: "Основа на пробе",
            },
            {
                value: "base_fail",
                description: "Брак основы",
            },
            {
                value: "plug_pass",
                description: "Допуск на подключение",
            },
            {
                value: "product_check",
                description: "Продукт на пробе",
            },
            {
                value: "product_fail",
                description: "Брак продукта",
            },
            {
                value: "product_pass",
                description: "Допуск на фасовку",
            },
            {
                value: "product_in_progress",
                description: "Фасуется",
            },
            {
                value: "product_finished",
                description: "Фасовка закончена",
            },
            {
                value: "cancelled",
                description: "Строка отменена",
            },
        ];
        return data;
    }
};
exports.SeedHistoryType = SeedHistoryType;
exports.SeedHistoryType = SeedHistoryType = __decorate([
    (0, nestjs_sequelize_seeder_1.Seeder)({
        model: "HistoryType",
        unique: ["value", "description"],
    })
], SeedHistoryType);
//# sourceMappingURL=historyTypes.seed.js.map