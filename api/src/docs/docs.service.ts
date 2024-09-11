import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import Doc from "./docs.model";
import { CreateDocDto } from "./dto/create-doc.dto";
import { PlantsService } from "src/plants/plants.service";
import Record from "src/records/records.model";
import Conveyor from "src/conveyors/conveyor.model";
import History from "src/histories/histories.model";
import Plant from "src/plants/plant.model";
import { Sequelize } from "sequelize-typescript";

@Injectable()
export class DocsService {
  constructor(
    @InjectModel(Doc)
    private docRepository: typeof Doc,
    private plantService: PlantsService
  ) {}

  async getAllDocs() {
    const docs = await this.docRepository.findAll({
      attributes: [
        "id",
        "plantId",
        "date",
        [
          Sequelize.literal(`
          (SELECT COUNT (*) FROM Records Where doc_id = "Doc"."id")
        `),
          "records_count",
        ],
        [
          Sequelize.literal(`
          (SELECT COUNT (*) FROM Histories JOIN Records ON records.id = Histories.record_id Where doc_id = "Doc"."id")
        `),
          "histories_count",
        ],
      ],
      include: {
        model: Plant,
        attributes: ["value"],
      },
      order: ["date"],
    });
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
          [{ model: Record, as: "records" }, { model: History, as: "histories" }, "id", "ASC"],
        ],
      });
      if (doc) {
        return doc;
      }
      // return [];
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

  async getDocByid(id: string) {
    const doc = await this.docRepository.findOne({
      where: { id: Number(id) },
      include: {
        model: Plant,
      },
    });
    if (doc) {
      return doc;
    }
    throw new HttpException("Документ не найден", HttpStatus.NOT_FOUND);
  }
}
