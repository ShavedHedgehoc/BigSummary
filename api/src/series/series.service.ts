import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import Serie from "./series.model";
import { CreateSerieDto } from "./dto/create-serie.dto";

@Injectable()
export class SeriesService {
  constructor(@InjectModel(Serie) private serieRepository: typeof Serie) {}

  async getAllSeries() {
    const series = await this.serieRepository.findAll();
    return series;
  }

  async createSerie(dto: CreateSerieDto) {
    const serie = await this.serieRepository.create(dto);
    return serie;
  }

  async getOrCreateByValue(value: string) {
    if (value === "-" || !value) {
      return null;
    }
    const [serie, _] = await this.serieRepository.findOrCreate({ where: { value: value } });
    return serie;
  }
}
