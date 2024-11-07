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

@ApiTags("Пользователи")
@Controller("users")
export class UsersController {
  constructor(private usersService: UsersService) {}

  @ApiOperation({ summary: "Получить всех пользователей" })
  @ApiResponse({ status: 200 })
  //   @Roles("USER")
  //   @UseGuards(RoleGuard)
  @Get()
  getAll() {
    return this.usersService.getAllUsers();
  }

  @ApiOperation({ summary: "Получить пользователей с параметрами" })
  @ApiResponse({ status: 201, type: [User] })
  @Post("/list")
  getAllUsersWithFilter(@Body() dto: any) {
    return this.usersService.getAllUsersWithFilter();
  }

  @ApiOperation({ summary: "Создание нового пользователя" })
  @ApiResponse({ status: 201, type: User })
  @UsePipes(ValidationPipe)
  @Post()
  create(@Body() userDto: CreateUserDto) {
    return this.usersService.createUser(userDto);
  }

  @ApiOperation({ summary: "Поменять статус бана пользователя по id" })
  @ApiResponse({ status: 201 })
  @Get("change_banned/:id")
  ChangeBannedById(@Param("id") id: string) {
    return this.usersService.changeBannedStatus(Number(id));
  }

  @ApiOperation({ summary: "Обновить роли пользователя" })
  @ApiResponse({ status: 201 })
  @Post("/update_roles")
  UpdateRoles(@Body() dto: UpdateRolesDto) {
    return this.usersService.updateUserRoles(dto);
  }

  @ApiOperation({ summary: "Выдать роль пользователю" })
  @ApiResponse({ status: 200 })
  //   @Roles("USER")
  //   @UseGuards(RoleGuard)
  @Post("/role")
  addRole(@Body() dto: AddRoleDto) {
    return this.usersService.addRole(dto);
  }
}
