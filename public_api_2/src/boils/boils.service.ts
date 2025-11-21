import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import Boil from 'src/models/boil.model';

@Injectable()
export class BoilsService {
  constructor(
    @InjectModel(Boil)
    private boilsService: typeof Boil,
  ) {}
  async getBoilById(id: number) {
    const boil = await this.boilsService.findByPk(id);
    return boil;
  }
}
