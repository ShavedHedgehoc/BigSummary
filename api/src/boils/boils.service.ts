import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import Boil from "./boil.model";
import { Op, fn, col, literal, where } from "sequelize";
import { GetBoilsDto } from "./dto/get-boils.dto";
import Base from "src/bases/bases.model";
import History from "src/histories/histories.model";
import Product from "src/products/products.model";
import HistoryType from "src/history_types/history_types.model";
import { group } from "console";
import sequelize from "sequelize";

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
  async getBoilsIdsByHistoryTypeIds(typeArr: number[] | []): Promise<number[] | []> {
    interface RespItem {
      id: number;
    }
    const qry = `
    select boils.id 
    from boils as boils
    join
    (select  max (id) as hid, boil_id as boil_id from
    histories
    group by boil_id    
    ) as maxids
    on boils.id = maxids.boil_id
    join
    histories as histories
    on histories.id = maxids.hid
    join history_types as htypes
    on htypes.id = histories."historyTypeId"
    where htypes.id IN (:ids)
    `;
    if (typeArr.length === 0) {
      return [];
    }
    const result: RespItem[] = await this.boilsRepository.sequelize.query(qry, {
      replacements: { ids: typeArr },
      type: sequelize.QueryTypes.SELECT,
    });
    return [...result.map((i) => i.id)];
  }

  async getBoilsWithFilter(dto: GetBoilsDto) {
    const boilOrder = dto.filter.boilAsc ? "ASC" : "DESC";
    let filter = {};
    if (dto.filter.boil !== "") {
      const boilFilter = { [Op.like]: `%${dto.filter.boil}%` };
      filter = { ...filter, value: boilFilter };
    }

    if (dto.filter.states.length > 0) {
      const ids = await this.getBoilsIdsByHistoryTypeIds(dto.filter.states);
      const typeFilter = { [Op.in]: [...ids] };
      filter = { ...filter, id: typeFilter };
    }

    let baseCond = {};
    if (dto.filter.baseCode !== "") {
      const baseFilter = { [Op.like]: `%${dto.filter.baseCode}%` };
      baseCond = { ...baseCond, code: baseFilter };
    }
    if (dto.filter.marking !== "") {
      const markingFilter = { [Op.like]: `%${dto.filter.marking}%` };
      baseCond = { ...baseCond, marking: markingFilter };
    }

    const count = await this.boilsRepository.count({
      where: { ...filter },
      include: [
        {
          model: Base,
          attributes: [],
          required: dto.filter.baseCode !== "" || dto.filter.marking !== "",
          where: { ...baseCond },
        },
      ],
    });
    const boils = await this.boilsRepository.findAll({
      where: { ...filter },
      include: [
        {
          model: Base,
          attributes: [],
          required: dto.filter.baseCode !== "" || dto.filter.marking !== "",
          where: { ...baseCond },
        },
      ],

      order: [
        ["year", boilOrder],
        ["letter", boilOrder],
        ["number", boilOrder],
      ],
      limit: dto.limit,
      offset: dto.limit * (dto.page - 1),
    });

    return { boils: boils, count: count };
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
