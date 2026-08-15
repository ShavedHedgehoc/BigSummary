import { Module, forwardRef } from "@nestjs/common";
import { UserRolesService } from "./user-roles.service";
import { UserRolesController } from "./user-roles.controller";
import { SequelizeModule } from "@nestjs/sequelize";
import UserRoles from "./user-roles.model";

@Module({
  providers: [UserRolesService],
  controllers: [UserRolesController],
  imports: [SequelizeModule.forFeature([UserRoles])],
  exports: [UserRolesService],
})
export class UserRolesModule {}
