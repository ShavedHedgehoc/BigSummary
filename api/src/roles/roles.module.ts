import { Module } from "@nestjs/common";
import { RolesService } from "./roles.service";
import { RolesController } from "./roles.controller";
import { SequelizeModule } from "@nestjs/sequelize";
import Role from "./roles.model";
import User from "src/users/users.model";
import UserRoles from "./user-roles.model";
import { SeederModule } from "nestjs-sequelize-seeder";
import { SeedRole } from "src/seeds/role.seed";
import { SeedUserRole } from "src/seeds/userRoles.seed";

@Module({
  providers: [RolesService],
  controllers: [RolesController],
  imports: [SequelizeModule.forFeature([Role, User, UserRoles]), SeederModule.forFeature([SeedRole, SeedUserRole])],
  exports: [RolesService],
})
export class RolesModule {}
