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
import { group } from "console";

@Injectable()
export class DocsService {
  constructor(
    @InjectModel(Doc)
    private docRepository: typeof Doc,
    private plantService: PlantsService
  ) {}

  async getAllDocs() {
    const docs = await this.docRepository.findAll({
      attributes: ["id", [Sequelize.fn("COUNT", Sequelize.col("records")), "hists"]],

      include: [
        {
          model: Record,
          attributes: {
            exclude: [
              "id",
              "docId",
              "productId",
              "boilId",
              "apparatusId",
              "canId",
              "conveyorId",
              "plan",
              "bbf",
              "note",
              "workshopId",
              "createdAt",
              "updatedAt",
              "records",
            ],
            include: [[Sequelize.fn("COUNT", Sequelize.col('"records->histories"."id"')), "hists"]],
          },

          // required: true,
          include: [
            {
              model: History,
              required: true,
              attributes: [],
            },
          ],
          // attributes: {
          // include: [[Sequelize.fn("COUNT", Sequelize.col("history.id")), "histsum"]],
          // },
        },
      ],
      group: ["Doc.id", "records.id", "records->histories.id"],
      // attributes: ["*"],
      //       attributes: ["id"],
      //       include: [
      //         {
      //           model: Record,
      //           as: "records",
      //           attributes: ["sum"],
      //           include: [
      //             {
      //               model: History,
      //               as: "histories",
      //               attributes: [
      //                 [
      //                   Sequelize.literal(`(SELECT COUNT (*) as hist
      // FROM "histories"
      // WHERE "histories"."recordId" = "records"."id")`),
      //                   "sum",
      //                 ],
      //               ],
      //             },
      //           ],
      //         },
      //       ],
      //       include: {
      //         attributes: [
      //           [
      //             Sequelize.literal(`(

      // Select   * from "docs"
      // join(
      // 	Select "docId", sum("hist") from
      // (Select "docId" , (SELECT COUNT (*) as hist
      // FROM "histories"
      // WHERE "histories"."recordId" = "records"."id")
      // From "records")
      // group by "docId"
      //             )

      //                 )`),
      //             "count",
      //           ],
      //         ],
      //       },

      // include: { all: true },
      // attributes: ["id", "date", [Sequelize.fn("count", "records.id"), "rows"]],
      //       include: [
      //         // {
      //         //   model: Plant,
      //         //   as: "plants",
      //         //   attributes: ["id", "value"],
      //         // },
      //         {
      //           model: Record,
      //           as: "records",
      //           attributes: [
      //             [
      //               Sequelize.literal(`(
      // 	SELECT COUNT (*) as hist
      // FROM "histories"
      // WHERE "histories"."recordId" = "records"."id"

      //           )`),
      //               "count",
      //             ],
      //           ],
      // attributes: [[Sequelize.literal("select * from History where History.recordId = records.id"), "ff"]],
      // include: [
      //   {
      //     model: History,
      //     as: "histories",
      //     //               attributes: [
      //     //                 [
      //     //                   Sequelize.literal(`(
      //     // 	SELECT COUNT (*) as hist
      //     // FROM "histories"
      //     // WHERE "histories"."recordId" = "records"."id"

      //     //           )`),
      //     //                   "count",
      //     //                 ],
      //     //               ],
      //   },
      // ],
      //   },
      // ],
      // group: ["Doc.id", "Doc.date", "plants.id", "plants.value"],
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
}
