import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import Doc from "./docs.model";
import { CreateDocDto } from "./dto/create-doc.dto";
import { PlantsService } from "src/plants/plants.service";
import Record from "src/records/records.model";
import Conveyor from "src/conveyors/conveyor.model";

@Injectable()
export class DocsService {
  constructor(
    @InjectModel(Doc)
    private docRepository: typeof Doc,
    private plantService: PlantsService
  ) {}

  async getAllDocs() {
    const docs = await this.docRepository.findAll({ include: { all: true } });
    return docs;
  }

  async getDocByPlantAndDate(date: string, plantId: number) {
    const existsDoc = await this.docRepository.findOne({
      where: {
        plantId: plantId,
        date: new Date(`${date} 12:00:00:000`),
      },
    });
    return existsDoc;
  }

  async getCurrentDoc(plantId: string) {
    const plant = await this.plantService.getPlantByPk(Number(plantId));
    if (plant) {
      const currDate = new Date();
      currDate.setHours(12, 0, 0, 0);
      const doc = await this.docRepository.findOne({
        where: {
          plantId: plant.id,
          date: currDate,
        },
        include: {
          all: true,
          nested: true,
        },
        order: [
          [{ model: Record, as: "records" }, { model: Conveyor, as: "conveyor" }, "value", "ASC"],
          [{ model: Record, as: "records" }, "id", "ASC"],
        ],
      });
      if (doc) {
        return doc;
      }
      throw new HttpException("Сводка на найдена", HttpStatus.NOT_FOUND);
    }
    throw new HttpException("Площадка на найдена", HttpStatus.NOT_FOUND);
  }

  async createDoc(dto: CreateDocDto) {
    const plant = await this.plantService.getPlantByValue(dto.plant);
    if (plant) {
      // fix date format here
      const existsDoc = await this.getDocByPlantAndDate(dto.date, plant.id);
      if (existsDoc) {
        throw new HttpException("Сводка на эту площадку и дату уже существует", HttpStatus.BAD_REQUEST);
      }
      const parsedDate = new Date(`${dto.date} 12:00:00:000`);
      const doc = await this.docRepository.create({ ...dto, date: parsedDate, plantId: plant.id });
      return doc;
    }
    throw new HttpException("Площадка на найдена", HttpStatus.NOT_FOUND);
  }
}
