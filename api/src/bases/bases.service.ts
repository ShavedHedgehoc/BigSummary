import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import Base from "./bases.model";
import { BaseRow, UpdateBaseDto } from "./dto/update-base.dto";

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

  async updateBase(row: BaseRow) {
    const base = await this.basesRepository.findOne({ where: { code: row.code } });
    if (base) {
      base.set({ marking: row.marking });
      await base.save();
    }
  }

  async bulkUpdateBases(dto: UpdateBaseDto) {
    for (let index = 0; index < dto.bases.length; index++) {
      await this.updateBase(dto.bases[index]);
    }
  }
}
