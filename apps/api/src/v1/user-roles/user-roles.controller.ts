import { Controller, Get, Param } from "@nestjs/common";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { UserRolesService } from "./user-roles.service";

@ApiTags("Роли пользователей")
@Controller("user-roles")
export class UserRolesController {
  constructor(private userRoleService: UserRolesService) {}
  @ApiOperation({ summary: "Получение роли по значению" })
  @ApiResponse({ status: 200 })
  @Get("/:id")
  getListByUserId(@Param("id") id: string) {
    return this.userRoleService.getRolesListByUserId(Number(id));
  }
}
