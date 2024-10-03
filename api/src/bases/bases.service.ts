import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import Base from "./bases.model";

@Injectable()
export class BasesService {
  constructor(
    @InjectModel(Base)
    private basesRepository: typeof Base
  ) {}

  async getOrCreateByCode(code: string) {
    if (!code) {
      return null;
    }
    const [base, _] = await this.basesRepository.findOrCreate({ where: { code: code } });
    return base;
  }

  async getByid(id: number) {
    const base = await this.basesRepository.findByPk(id);
    return base;
  }
}
