import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import User from "./users.model";
import { CreateUserDto } from "./dto/create-user.dto";
import { RolesService } from "src/roles/roles.service";
import Role from "src/roles/roles.model";
import { UserRolesService } from "src/user-roles/user-roles.service";
import { UpdateRolesDto } from "./dto/update-roles.dto";
import { TokenService } from "src/token/token.service";
import { GethUsersDto } from "./dto/get-users-dto";
import { Op, col, fn } from "sequelize";
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

  async getAllUserWithFilter(dto: GethUsersDto) {
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
    if (dto.filter.banned.length > 0) {
      const bannedFilter = dto.filter.banned[0] === 1 ? false : true;
      filter = { ...filter, banned: bannedFilter };
    }
    let rolesFilter = {};
    if (dto.filter.roles.length > 0) {
      const rolesCond = { [Op.in]: [...dto.filter.roles] };
      rolesFilter = { ...rolesFilter, id: rolesCond };
    }

    const count = await this.userRepository
      .count({
        where: { ...filter },
        include: [
          {
            model: Role,
            as: "roles_for_filter",
            where: { ...rolesFilter },
            required: dto.filter.roles.length > 0,
            through: {
              attributes: [],
            },
          },
        ],
        group: ["User.id"],
      })
      .then(function (count) {
        return count.length;
      });

    const users = await this.userRepository.findAll({
      where: { ...filter },
      attributes: ["id", "name", "email", "banned"],
      include: [
        {
          model: Role,
          as: "roles_for_filter",
          attributes: [],
          where: { ...rolesFilter },
          required: dto.filter.roles.length > 0,
          through: {
            attributes: [],
          },
        },
        {
          model: Role,
          as: "roles",
        },
      ],
      order: [
        ["name", nameOrder],
        [{ model: Role, as: "roles" }, "description", "ASC"],
      ],
    });
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
    const user = await this.userRepository.findByPk(id, {
      include: { model: Role, as: "roles", through: { attributes: [] } },
    });
    return user;
  }

  async getUserByEmail(email: string) {
    const user = await this.userRepository.findOne({
      where: { email: email },
      include: { model: Role, as: "roles" },
    });
    return user;
  }

  // async addRole(dto: AddRoleDto) {
  //   const user = await this.userRepository.findByPk(dto.userId);
  //   const role = await this.roleService.getroleByValue(dto.value);
  //   if (role && user) {
  //     await user.$add("role", role.id);
  //     return dto;
  //   }
  //   throw new HttpException("Пользователь или роль не найдена", HttpStatus.NOT_FOUND);
  // }
}
