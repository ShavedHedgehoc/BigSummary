import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import Record from "./records.model";
import { InjectModel } from "@nestjs/sequelize";
import { CreateRecordDto } from "./dto/create-record.dto";
import { SeriesService } from "src/series/series.service";
import { ProductsService } from "src/products/products.service";
import { BoilsService } from "src/boils/boils.service";
import { ApparatusesService } from "src/apparatuses/apparatuses.service";
import { CansService } from "src/cans/cans.service";
import { ConveyorsService } from "src/conveyors/conveyors.service";
import { WorkshopsService } from "src/workshops/workshops.service";
import Doc from "src/docs/docs.model";
import Boil from "src/boils/boil.model";
import Product from "src/products/products.model";
import { BulkCreateRecordsDto } from "./dto/bulk-create-records.dto";
import { DocsService } from "src/docs/docs.service";
import { PlantsService } from "src/plants/plants.service";

@Injectable()
export class RecordsService {
  constructor(
    @InjectModel(Record)
    private recordsRepository: typeof Record,
    private seriesService: SeriesService,
    private productsService: ProductsService,
    private boilsService: BoilsService,
    private apparatusesService: ApparatusesService,
    private cansService: CansService,
    private conveyorsService: ConveyorsService,
    private workshopsService: WorkshopsService,
    private docsService: DocsService,
    private plantService: PlantsService
  ) {}

  async getAllRecords() {
    const records = await this.recordsRepository.findAll();
    return records;
  }

  async getCurrentRecordsByBoil(boil: string) {
    const currDate = new Date();
    currDate.setHours(12, 0, 0, 0);
    const records = await this.recordsRepository.findAll({
      where: {},
      include: [
        {
          model: Doc,
          where: { "$doc.date$": currDate },
        },
        {
          model: Boil,
          where: { "$boil.value$": boil },
        },
      ],
    });
    return records;
  }

  async getCurrentRecordsByBoilAndcode(boil: string, code: string) {
    const currDate = new Date();
    currDate.setHours(12, 0, 0, 0);
    const records = await this.recordsRepository.findAll({
      where: {},
      include: [
        {
          model: Doc,
          where: { "$doc.date$": currDate },
        },
        {
          model: Boil,
          where: { "$boil.value$": boil },
        },
        {
          model: Product,
          where: { "$product.code1C$": code },
        },
      ],
    });
    return records;
  }

  async getById(id: number) {
    const record = await this.recordsRepository.findByPk(id);
    return record;
  }

  async createRecord(dto: CreateRecordDto) {
    const serie = await this.seriesService.getOrCreateByValue(dto.serie);
    const product = await this.productsService.getOrCreateByCode(dto.code1C, dto.product, serie.id);
    const boil = await this.boilsService.getOrCreateByValue(dto.boil);
    const apparatus = await this.apparatusesService.getOrCreateByValue(dto.apparatus);
    const can = await this.cansService.getOrCreateByValue(dto.can);
    const conveyor = await this.conveyorsService.getOrCreateByValue(dto.conveyor);
    const workshop = await this.workshopsService.getOrCreateByValue(dto.workshop);
    const record = await this.recordsRepository.create({
      ...dto,
      plan: Number(dto.plan),
      productId: product.id,
      boilId: boil.id,
      apparatusId: apparatus.id,
      canId: can.id,
      conveyorId: conveyor.id,
      workshopId: workshop.id,
    });
    return record;
  }

  async bulkCreateRecords(dto: BulkCreateRecordsDto) {
    const plantId = Number(dto.plantId);
    const plant = await this.plantService.getPlantByPk(plantId);
    if (!plant) {
      throw new HttpException(`Площадка не найдена...`, HttpStatus.NOT_FOUND);
    }
    const docExists = await this.docsService.getDocByPlantAndDate(dto.summaryDate, plant.id);
    if (docExists) {
      throw new HttpException(
        `Документ на эти дату и площадку уже существует. Попробуйте удалить существующий документ и попробовать снова...`,
        HttpStatus.BAD_REQUEST
      );
    }
    const doc = await this.docsService.createDoc({ date: dto.summaryDate, plant: plant.value });
    for (let index = 0; index < dto.rows.length; index++) {
      const createDto: CreateRecordDto = {
        ...dto.rows[index],
        docId: doc.id,
      };
      await this.createRecord(createDto);
    }
  }
}
