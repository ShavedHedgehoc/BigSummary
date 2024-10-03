import { HttpException, HttpStatus, Inject, Injectable, forwardRef } from "@nestjs/common";
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
import Apparatus from "src/apparatuses/apparatuses.model";
import Can from "src/cans/cans.model";
import Conveyor from "src/conveyors/conveyor.model";
import Workshop from "src/workshops/workshop.model";
import Plant from "src/plants/plant.model";

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

  async getRecordsByDocId(docId: number) {
    const records = await this.recordsRepository.findAll({
      where: { doc_id: docId },
      include: [
        { model: Product, as: "product" },
        { model: Boil, as: "boil" },
        { model: Apparatus, as: "apparatus" },
        { model: Can, as: "can" },
        { model: Conveyor, as: "conveyor" },
        { model: Workshop, as: "workshop" },
      ],
    });
    return records;
  }

  async getRecordById(id: number) {
    const record = await this.recordsRepository.findOne({
      where: { id: id },
      include: [
        { model: Product, as: "product" },
        { model: Boil, as: "boil" },
        { model: Apparatus, as: "apparatus" },
        { model: Can, as: "can" },
        { model: Conveyor, as: "conveyor" },
        { model: Workshop, as: "workshop" },
      ],
    });
    return record;
  }

  async getRecordsByBoilId(id: number) {
    const record = await this.recordsRepository.findAll({
      where: { boilId: id },
      include: [
        { model: Product, as: "product" },
        { model: Boil, as: "boil" },
        { model: Apparatus, as: "apparatus" },
        { model: Can, as: "can" },
        { model: Conveyor, as: "conveyor" },
        { model: Workshop, as: "workshop" },
      ],
    });
    return record;
  }

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

  async getCurrentRecordByBoilAndCode(boil: string, code: string) {
    const currDate = new Date();
    currDate.setHours(12, 0, 0, 0);
    const record = await this.recordsRepository.findOne({
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
    return record;
  }

  async getById(id: number) {
    const record = await this.recordsRepository.findByPk(id);
    return record;
  }

  async getByIdWitDetailsNew(id: number) {
    const record = await this.recordsRepository.findOne({
      where: { id: id },

      include: [
        { model: Product, as: "product" },
        { model: Boil, as: "boil" },
        { model: Apparatus, as: "apparatus" },
        { model: Can, as: "can" },
        { model: Conveyor, as: "conveyor" },
        { model: Workshop, as: "workshop" },
        { model: Doc, as: "doc", include: [{ model: Plant }] },
      ],
    });
    return record;
  }

  // async getByIdWitDetailsNew(id: number) {
  //   // const record = await this.recordsRepository.findByPk(id);
  //   const record = await this.recordsRepository.findOne({
  //     where: { id: id },
  //     // include: [{ model: Boil }],
  //     include: [
  //       { model: Product, as: "product" },
  //       { model: Boil, as: "boil" },
  //       { model: Apparatus, as: "apparatus" },
  //       { model: Can, as: "can" },
  //       { model: Conveyor, as: "conveyor" },
  //       { model: Workshop, as: "workshop" },
  //       { model: Doc, as: "doc" },
  //     ],
  //   });
  //   if (record) {
  //     const histories = await this.historyService.getAllHistoriesByRecId(id);
  //     record.histories = histories;
  //     return record;
  //     // { ...record, histories: histories };
  //   }
  //   throw new HttpException(`Запись не найдена`, HttpStatus.NOT_FOUND);
  // }

  async getByIdWithDetails(id: string) {
    const record = await this.recordsRepository.findOne({
      where: { id: Number(id) },
      include: { all: true, nested: true },
    });
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
      boilId: boil ? boil.id : null,
      apparatusId: apparatus ? apparatus.id : null,
      canId: can ? can.id : null,
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
        doc_id: doc.id,
      };
      await this.createRecord(createDto);
    }
  }
}
