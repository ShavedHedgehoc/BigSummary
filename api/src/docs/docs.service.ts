import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { CreateDocDto } from "./dto/create-doc.dto";
import { PlantsService } from "src/plants/plants.service";
import Doc from "./docs.model";
import Plant from "src/plants/plant.model";

@Injectable()
export class DocsService {
  constructor(
    @InjectModel(Doc)
    private docRepository: typeof Doc,
    private plantService: PlantsService
  ) {}

  async getCurrentDocByPlantId(plantId: number) {
    var offset = 3;
    const date = new Date(new Date().getTime() + offset * 3600 * 1000).setHours(12, 0, 0, 0);

    const doc = await this.docRepository.findOne({
      where: { plantId: plantId, date: date },
      include: { model: Plant },
    });

    return doc;
  }

  async getDocByPlantAndDate(date: string, plantId: number) {
    const existsDoc = await this.docRepository.findOne({
      where: { plantId: plantId, date: new Date(`${date} 12:00:00:000`) },
    });
    return existsDoc;
  }

  async getDocById(id: number) {
    const doc = await this.docRepository.findOne({ where: { id: id }, include: { model: Plant } });
    if (!doc) {
      throw new HttpException("Сводка на найдена", HttpStatus.NOT_FOUND);
    }
    return doc;
  }

  async getAllDocs() {
    const docs = await this.docRepository.findAll({
      attributes: ["id", "date"],
      include: [{ model: Plant, as: "plants" }],
    });
    return docs;
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

  async deleteDoc(id: number) {
    const doc = await this.docRepository.findByPk(id);
    if (!doc) {
      throw new HttpException("Документ для удаления не найден", HttpStatus.NOT_FOUND);
    }
    try {
      await doc.destroy();
    } catch (error) {
      if (error instanceof Error && error.name === "SequelizeForeignKeyConstraintError") {
        throw new HttpException(
          "Существуют записи, связанные с этой сводкой. Удаление невозможно...",
          HttpStatus.BAD_REQUEST
        );
      } else {
        throw new HttpException("Неизвестная ошибка", HttpStatus.BAD_REQUEST);
      }
    }
  }
}
