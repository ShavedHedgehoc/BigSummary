import { Body, Controller, Get, Param, Post, UseGuards, UsePipes } from "@nestjs/common";
import { UsersService } from "./users.service";
import { CreateUserDto } from "./dto/create-user.dto";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import User from "./users.model";
import { JwtAuthguard } from "src/auth/jwt-auth.guard";
import { Roles } from "src/auth/roles-auth.decorator";
import { RoleGuard } from "src/auth/role-guard";
import { AddRoleDto } from "./dto/add-role.dto";
import { ValidationPipe } from "src/pipes/validation.pipe";
import { UpdateRolesDto } from "./dto/update-roles.dto";
import { GethUsersDto } from "./dto/get-users-dto";

@ApiTags("Пользователи")
@Controller("users")
export class UsersController {
  constructor(private usersService: UsersService) {}

  @ApiOperation({ summary: "Получить всех пользователей" })
  @ApiResponse({ status: 201, type: [User] })
  // @Roles("ADMIN")
  // @UseGuards(RoleGuard)
  @Post("/list")
  getAllUsers(@Body() dto: GethUsersDto) {
    return this.usersService.getAllUserWithFilter(dto);
  }

  @ApiOperation({ summary: "Создание нового пользователя" })
  @ApiResponse({ status: 201, type: User })
  @UsePipes(ValidationPipe)
  @Post()
  createUser(@Body() userDto: CreateUserDto) {
    return this.usersService.createUser(userDto);
  }

  @ApiOperation({ summary: "Поменять статус бана пользователя по id" })
  @ApiResponse({ status: 201 })
  @Get("change_banned/:id")
  changeUserBannedStatus(@Param("id") id: string) {
    return this.usersService.changeBannedStatus(Number(id));
  }

  @ApiOperation({ summary: "Обновить роли пользователя" })
  @ApiResponse({ status: 201 })
  @Post("/update_roles")
  updateUserRoles(@Body() dto: UpdateRolesDto) {
    return this.usersService.updateUserRoles(dto);
  }

  @ApiOperation({ summary: "получить по id" })
  @ApiResponse({ status: 201 })
  @Get("/get_by_id/:id")
  getById(@Param("id") id: string) {
    return this.usersService.getByPk(Number(id));
  }
}
