import { Module } from "@nestjs/common";
import { UserRolesListService } from "./user-roles.list.service";
import { UserRolesListController } from "./user-roles.list.controller";
import { UserRolesModule } from "src/user-roles/user-roles.module";
import { UsersModule } from "src/users/users.module";
import { RolesModule } from "src/roles/roles.module";

@Module({
  providers: [UserRolesListService],
  controllers: [UserRolesListController],
  imports: [UserRolesModule, UsersModule, RolesModule],
})
export class UserRolesListModule {}
