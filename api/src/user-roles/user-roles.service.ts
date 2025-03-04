import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import UserRoles from "./user-roles.model";
import Role from "src/roles/roles.model";

@Injectable()
export class UserRolesService {
  constructor(@InjectModel(UserRoles) private userRoleRepository: typeof UserRoles) {}

  async getRolesListByUserId(id: number) {
    const userRoles = await this.userRoleRepository.findAll({
      where: { userId: id },
      attributes: [],
      // include: { model: Role, attributes: ["value"] },
      include: { model: Role, attributes: ["id", "value", "description"] },
    });
    const result = userRoles.map((item) => {
      return { id: item.role.id, value: item.role.value, description: item.role.description };
    });

    return result;
    // return userRoles;
  }

  async getRolesIdsByUserId(id: number) {
    const userRoles = await this.userRoleRepository.findAll({
      where: { userId: id },
      attributes: [],
      include: { model: Role, attributes: ["id"] },
    });
    const result = userRoles.map((item) => item.role.id);

    return result;
  }

  async getRolesValuesByUserId(id: number) {
    const userRoles = await this.userRoleRepository.findAll({
      where: { userId: id },
      attributes: [],
      include: { model: Role, attributes: ["value"] },
    });
    const result = userRoles.map((item) => item.role.value);

    return result;
  }

  async getRowByUserIdAndRoleId(userId: number, roleId: number) {
    const row = await this.userRoleRepository.findOne({ where: { userId: userId, roleId: roleId } });
    return row;
  }

  async removeRecord(id: number) {
    await this.userRoleRepository.destroy({ where: { id: id } });
  }

  async addRecord(userId: number, roleId: number) {
    const newRow = await this.userRoleRepository.create({ userId: userId, roleId: roleId });
    return newRow;
  }
}
