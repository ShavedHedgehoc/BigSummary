import { Module, forwardRef } from "@nestjs/common";
import { UsersController } from "./users.controller";
import { UsersService } from "./users.service";
import { SequelizeModule } from "@nestjs/sequelize";
import User from "./users.model";
import Role from "src/roles/roles.model";
import UserRoles from "src/user-roles/user-roles.model";
import { RolesModule } from "src/roles/roles.module";
import { AuthModule } from "src/auth/auth.module";
// import { SeederModule } from "nestjs-sequelize-seeder";
// import { SeedUser } from "src/seeds/user.seed";
// import { SeedRole } from "src/seeds/role.seed";
// import { SeedUserRole } from "src/seeds/userRoles.seed";
import { UserRolesModule } from "src/user-roles/user-roles.module";
import { TokenModule } from "src/token/token.module";

@Module({
  controllers: [UsersController],
  providers: [UsersService],
  imports: [
    SequelizeModule.forFeature([User, Role, UserRoles]),
    RolesModule,
    TokenModule,
    UserRolesModule,
    forwardRef(() => AuthModule),
    // SeederModule.forFeature([SeedUser]),
  ],
  exports: [UsersService],
})
export class UsersModule {}
