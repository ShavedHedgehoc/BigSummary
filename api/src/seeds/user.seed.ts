import { OnSeederInit, Seeder } from "nestjs-sequelize-seeder";
import * as bcrypt from "bcryptjs";
import { genSaltSync, hashSync } from "bcryptjs";

@Seeder({
  model: "User",
  unique: ["email"],
})
export class SeedUser implements OnSeederInit {
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
      const salt = genSaltSync(10);
      data.password = hashSync(data.password, salt);
      data.salt = salt;
    }
    return data;
  }
}
