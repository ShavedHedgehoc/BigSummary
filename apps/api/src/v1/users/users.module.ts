import { Module, forwardRef } from "@nestjs/common";
import { UsersController } from "./users.controller";
import { UsersService } from "./users.service";
import { SequelizeModule } from "@nestjs/sequelize";
import User from "./users.model";
import Role from "src/v1/roles/roles.model";
import UserRoles from "src/v1/user-roles/user-roles.model";
import { RolesModule } from "src/v1/roles/roles.module";
import { AuthModule } from "src/v1/auth/auth.module";
// import { SeederModule } from "nestjs-sequelize-seeder";
// import { SeedUser } from "src/seeds/user.seed";
// import { SeedRole } from "src/seeds/role.seed";
// import { SeedUserRole } from "src/seeds/userRoles.seed";
import { UserRolesModule } from "src/v1/user-roles/user-roles.module";
import { TokenModule } from "src/v1/token/token.module";
import { UserSettingsModule } from "src/v1/user-settings/user-settings.module";

@Module({
  controllers: [UsersController],
  providers: [UsersService],
  imports: [
    SequelizeModule.forFeature([User, Role, UserRoles]),
    RolesModule,
    TokenModule,
    UserRolesModule,
    UserSettingsModule,
    forwardRef(() => AuthModule),
    // SeederModule.forFeature([SeedUser]),
  ],
  exports: [UsersService],
})
export class UsersModule { }
