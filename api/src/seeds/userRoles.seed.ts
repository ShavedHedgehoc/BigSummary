import { OnSeederInit, Seeder } from "nestjs-sequelize-seeder";

@Seeder({
  model: "UserRoles",
  containsForeignKeys: true,
})
export class SeedUserRole implements OnSeederInit {
  run() {
    const data = [
      {
        userId: 1,
        roleId: 1,
      },
      {
        userId: 1,
        roleId: 2,
      },
      {
        userId: 1,
        roleId: 3,
      },
      {
        userId: 1,
        roleId: 4,
      },
      {
        userId: 1,
        roleId: 5,
      },
      {
        userId: 1,
        roleId: 6,
      },
      {
        userId: 1,
        roleId: 7,
      },
    ];
    return data;
  }
}
