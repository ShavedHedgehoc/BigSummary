import { OnSeederInit, Seeder } from "nestjs-sequelize-seeder";

@Seeder({
  model: "HistoryType",
  unique: ["value", "description"],
})
export class SeedHistoryType implements OnSeederInit {
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
}
