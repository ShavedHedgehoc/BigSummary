import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import Boil from "./boil.model";
import { Op, fn, col } from "sequelize";
import { GetBoilsDto } from "./dto/get-boils.dto";
import Base from "src/bases/bases.model";
import History from "src/histories/histories.model";
import Product from "src/products/products.model";

@Injectable()
export class BoilsService {
  constructor(
    @InjectModel(Boil)
    private boilsRepository: typeof Boil
  ) {}

  async getAllBoils() {
    const boils = await this.boilsRepository.findAll({
      // attributes: ["id", "value"],
      // where: { base_id: { [Op.ne]: null } },
      // where: { year: { [Op.ne]: null } },
      order: [
        ["year", "ASC"],
        ["letter", "ASC"],
        ["number", "ASC"],
        ["value", "ASC"],
      ],
      // order: [["month_letter", "ASC"]],
    });
    return boils;
  }

  async getBoilsWithFilter(dto: GetBoilsDto) {
    console.log(dto);
    const boilFilter = { [Op.like]: `%${dto.filter.boil}%` };
    const baseFilter = { [Op.like]: `%${dto.filter.baseCode}%` };
    const markingFilter = { [Op.like]: `%${dto.filter.marking}%` };

    let baseCond = {};
    if (dto.filter.baseCode !== "") {
      baseCond = { ...baseCond, code: baseFilter };
    }
    if (dto.filter.marking !== "") {
      baseCond = { ...baseCond, marking: markingFilter };
    }

    const count = await this.boilsRepository.findAll({
      where: { value: boilFilter },
      include: [
        { model: History, attributes: [], required: dto.filter.haveRecord },
        {
          model: Base,
          attributes: [],
          required: dto.filter.baseCode !== "" || dto.filter.marking !== "",
          where: { ...baseCond },
        },
      ],
    });
    const boils = await this.boilsRepository.findAll({
      where: { value: boilFilter },
      include: [
        { model: History, attributes: [], required: dto.filter.haveRecord },
        {
          model: Base,
          attributes: [],
          required: dto.filter.baseCode !== "" || dto.filter.marking !== "",
          where: { ...baseCond },
        },
      ],

      order: [
        ["year", "ASC"],
        ["letter", "ASC"],
        ["number", "ASC"],
        ["value", "ASC"],
      ],
      limit: dto.limit,
      offset: dto.limit * (dto.page - 1),
    });

    return { boils: boils, count: count.length };
  }

  async getById(id: number) {
    const boil = await this.boilsRepository.findByPk(id);
    return boil;
  }

  async getBoilListRow(id: number) {
    const boil = await this.boilsRepository.findOne({ where: { id: id } });
    return boil;
  }

  async getOrCreateByValue(value: string) {
    if (value === "-" || !value) {
      return null;
    }
    const [boil, _] = await this.boilsRepository.findOrCreate({ where: { value: value } });
    return boil;
  }

  async getByValue(value: string) {
    if (value === "-" || !value) {
      return null;
    }
    const boil = await this.boilsRepository.findOne({ where: { value: value } });
    return boil;
  }
}
