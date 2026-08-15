import { OnSeederInit, Seeder } from "nestjs-sequelize-seeder";

@Seeder({
  model: "Plant",
  unique: ["value"],
})
export class SeedPlant implements OnSeederInit {
  run() {
    const data = [
      {
        value: "Пискаревка",
      },
      {
        value: "Колпино",
      },
    ];
    return data;
  }
}
