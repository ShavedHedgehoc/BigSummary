import { OnSeederInit, Seeder } from "nestjs-sequelize-seeder";

@Seeder({
  model: "Role",
  unique: ["value"],
})
export class SeedRole implements OnSeederInit {
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
}
