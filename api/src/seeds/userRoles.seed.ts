import { OnSeederInit, Seeder } from "nestjs-sequelize-seeder";

@Seeder({
  model: "UserRoles",
  containsForeignKeys: true,
  foreignDelay: 10000,
})
export class SeedUserRole implements OnSeederInit {
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
}
