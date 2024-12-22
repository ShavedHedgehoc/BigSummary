import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import User from "./users.model";
import { CreateUserDto } from "./dto/create-user.dto";
import { RolesService } from "src/roles/roles.service";
import { AddRoleDto } from "./dto/add-role.dto";
import Role from "src/roles/roles.model";
import { UserRolesService } from "src/user-roles/user-roles.service";
import { UpdateRolesDto } from "./dto/update-roles.dto";
import { TokenService } from "src/token/token.service";
import { GethUsersDto } from "./dto/get-users-dto";
import { Op } from "sequelize";
import UserRoles from "src/user-roles/user-roles.model";

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User) private userRepository: typeof User,
    private roleService: RolesService,
    private userRoleService: UserRolesService
  ) {}

  async createUser(dto: CreateUserDto) {
    const user = await this.userRepository.create(dto);
    const role = await this.roleService.getroleByValue("USER");
    await user.$set("roles", [role.id]);
    user.roles = [role];
    return user;
  }

  async getAllUsers() {
    const users = await this.userRepository.findAll({
      attributes: ["id", "name", "email", "banned"],
    });
    const result = await Promise.all(
      await users.map(async (item) => {
        const roles = await this.userRoleService.getRolesListByUserId(item.id);
        return { ...JSON.parse(JSON.stringify(item)), roles: roles };
      })
    );

    return result;
  }

  async getAllUserWithFilter(dto: GethUsersDto) {
    console.log(dto);
    const nameOrder = dto.filter.nameAsc ? "ASC" : "DESC";
    let filter = {};
    if (dto.filter.name !== "") {
      const nameFilter = { [Op.iLike]: `%${dto.filter.name}%` };
      filter = { ...filter, name: nameFilter };
    }
    if (dto.filter.email !== "") {
      const emailFilter = { [Op.iLike]: `%${dto.filter.email}%` };
      filter = { ...filter, email: emailFilter };
    }
    let rolesFilter = {};
    if (dto.filter.roles.length > 0) {
      const rolesCond = { [Op.in]: [...dto.filter.roles] };
      rolesFilter = { ...rolesFilter, id: rolesCond };
    }

    const count = await this.userRepository.count({ where: { ...filter } });

    const users = await this.userRepository.findAll({
      where: { ...filter },
      attributes: ["id", "name", "email", "banned"],
      include: [
        {
          model: Role,
          as: "roles",
          where: { ...rolesFilter },
          required: dto.filter.roles.length > 0,
          through: {
            attributes: [],
          },
        },
      ],

      order: [["name", nameOrder]],
    });
    // const result = await Promise.all(
    //   await users.map(async (item) => {
    //     const roles = await this.userRoleService.getRolesListByUserId(item.id);
    //     return { ...JSON.parse(JSON.stringify(item)), roles: roles };
    //   })
    // );
    // return { rows: result, total: count };
    return { rows: users, total: count };
  }

  async changeBannedStatus(id: number) {
    const user = await this.userRepository.findByPk(id);
    if (!user) {
      throw new HttpException("Пользователь не найден", HttpStatus.NOT_FOUND);
    }
    try {
      user.set({
        banned: !user.banned,
      });
      await user.save();
      return user;
    } catch (error) {
      throw new HttpException("Неизвестная ошибка", HttpStatus.BAD_REQUEST);
    }
  }

  async updateUserRoles(dto: UpdateRolesDto) {
    let idsForAdd = [];
    let idsForRemove = [];
    const user = await this.userRepository.findByPk(dto.id);
    if (!user) {
      throw new HttpException("Пользователь не найден", HttpStatus.NOT_FOUND);
    }
    const roles = await this.userRoleService.getRolesIdsByUserId(dto.id);

    if (roles.length > 0) {
      idsForAdd = dto.roles.filter((item) => !roles.includes(item));
      idsForRemove = roles.filter((item) => !dto.roles.includes(item));
    } else {
      idsForAdd = dto.roles;
      idsForRemove = [];
    }
    idsForAdd.map((item) => {
      user.$add("role", item);
    });
    idsForRemove.map((item) => {
      user.$remove("role", item);
    });
  }

  async addRoleById({ user, role_id }: { user: User; role_id: number }) {
    await user.$add("role", role_id);
  }

  async removeRoleById({ user, role_id }: { user: User; role_id: number }) {
    await user.$remove("role", role_id);
  }

  async getByPk(id: number) {
    const user = await this.userRepository.findByPk(id, { include: { model: Role, as: "roles" } });
    return user;
  }

  async getUserByEmail(email: string) {
    const user = await this.userRepository.findOne({
      where: { email: email },
      include: { model: Role, as: "roles" },
    });
    return user;
  }

  async addRole(dto: AddRoleDto) {
    const user = await this.userRepository.findByPk(dto.userId);
    const role = await this.roleService.getroleByValue(dto.value);
    if (role && user) {
      await user.$add("role", role.id);
      return dto;
    }
    throw new HttpException("Пользователь или роль не найдена", HttpStatus.NOT_FOUND);
  }
}
