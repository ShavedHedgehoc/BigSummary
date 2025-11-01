import { Body, Controller, Get, Param, Post, Put, UseGuards, UsePipes } from "@nestjs/common";
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
import { UpdateUserDto } from "./dto/update-user-dto";

@ApiTags("Пользователи")
@Controller("users")
export class UsersController {
  constructor(private usersService: UsersService) {}

  @ApiOperation({ summary: "Получить всех пользователей" })
  @ApiResponse({ status: 201, type: [User] })
  // @Roles("ADMIN")
  // @UseGuards(RoleGuard)
  // @UseGuards(JwtAuthguard)
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

  @ApiOperation({ summary: "Обновление данных пользователя" })
  @ApiResponse({ status: 201, type: User })
  @UsePipes(ValidationPipe)
  @Put()
  updateUser(@Body() userDto: UpdateUserDto) {
    return this.usersService.updateUser(userDto);
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

  @ApiOperation({ summary: "GeetByPK" })
  @ApiResponse({ status: 200 })
  @Get("/by_id/:id")
  getByPK(@Param("id") id: string) {
    return this.usersService.getByPk(Number(id));
  }
}
