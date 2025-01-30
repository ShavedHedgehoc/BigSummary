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
import Apparatus from "src/apparatuses/apparatuses.model";
import Can from "src/cans/cans.model";
import Conveyor from "src/conveyors/conveyor.model";
import Workshop from "src/workshops/workshop.model";
import Plant from "src/plants/plant.model";
import { GetCurrentDocDto } from "src/doc.detail/dto/get-current-doc.dto";
import { Op } from "sequelize";
import sequelize from "sequelize";
import { FetchRelatedRecordsDto } from "./dto/fetch-related-records.dto";
import { UpdateRecordDto } from "./dto/update-record.dto";
import { UploadDocDto } from "./dto/upload-doc.dto";

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
      order: [["id", "ASC"]],
    });
    return records;
  }

  async getRecordsIdsByHistoryTypeIds(typeArr: number[] | []): Promise<number[] | []> {
    interface RespItem {
      id: number;
    }
    const qry = `
    select records.id 
    from records as records
   
    join
    (select  max (id) as hid, record_id as record_id from
    histories
    group by record_id    
    ) as maxids
    on records.id = maxids.record_id
    join
    histories as histories
    on histories.id = maxids.hid
    join history_types as htypes
    on htypes.id = histories."historyTypeId"
    where htypes.id IN (:ids)
     order by records.id  ASC
    `;
    if (typeArr.length === 0) {
      return [];
    }
    const result: RespItem[] = await this.recordsRepository.sequelize.query(qry, {
      replacements: { ids: typeArr },
      type: sequelize.QueryTypes.SELECT,
    });
    return [...result.map((i) => i.id)];
  }

  async getRecordsByDocIdWithFilter(docId: number, dto: GetCurrentDocDto) {
    let filter = {};
    if (dto.filter.states.length > 0) {
      const ids = await this.getRecordsIdsByHistoryTypeIds(dto.filter.states);
      const typeFilter = { [Op.in]: [...ids] };
      filter = { ...filter, id: typeFilter };
    }

    let boilCond = {};
    if (dto.filter.boil !== "") {
      const boilFilter = { [Op.iLike]: `%${dto.filter.boil}%` };
      boilCond = { ...boilCond, value: boilFilter };
    }

    let productCond = {};
    if (dto.filter.productCode !== "") {
      const productFilter = { [Op.iLike]: `%${dto.filter.productCode}%` };
      productCond = { ...productCond, code1C: productFilter };
    }
    if (dto.filter.marking !== "") {
      const markingFilter = { [Op.iLike]: `%${dto.filter.marking}%` };
      productCond = { ...productCond, marking: markingFilter };
    }

    let conveyorCond = {};
    if (dto.filter.conveyor !== "") {
      const conveyorFilter = { [Op.iLike]: `%${dto.filter.conveyor}%` };
      conveyorCond = { ...conveyorCond, value: conveyorFilter };
    }

    const records = await this.recordsRepository.findAll({
      where: { doc_id: docId, ...filter },
      include: [
        { model: Product, as: "product", where: { ...productCond } },
        { model: Boil, as: "boil", where: { ...boilCond } },
        { model: Apparatus, as: "apparatus" },
        { model: Can, as: "can" },
        { model: Conveyor, as: "conveyor", where: { ...conveyorCond } },
        { model: Workshop, as: "workshop" },
      ],
      order: [["id", "ASC"]],
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
          as: "boil",
          where: { "$boil.value$": boil },
        },
      ],
    });
    return records;
  }

  async getRelatedRecords(dto: FetchRelatedRecordsDto) {
    const currDate = new Date();
    currDate.setHours(12, 0, 0, 0);
    const records = await this.recordsRepository.findAll({
      where: {},
      include: [
        {
          model: Doc,
          where: { "$doc.date$": currDate, "$doc.plantId$": dto.plant_id },
        },
        {
          model: Boil,
          as: "boil",
          where: { "$boil.value$": dto.boil_value },
        },
        {
          model: Product,
          where: { "$product.code1C$": dto.code },
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
          as: "boil",
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
    // const boil = await this.boilsService.getOrCreateByValue(dto.boil);
    const boil = await this.boilsService.getOrCreateByValue(dto.batch);
    const apparatus = await this.apparatusesService.getOrCreateByValue(dto.apparatus);
    const can = await this.cansService.getOrCreateByValue(dto.can);
    const conveyor = await this.conveyorsService.getOrCreateByValue(dto.conveyor);
    const workshop = await this.workshopsService.getOrCreateByValue(dto.workshop);
    const water_base = await this.boilsService.getOrCreateByValue(dto.boil1);
    const organic_base = await this.boilsService.getOrCreateByValue(dto.boil2);
    const record = await this.recordsRepository.create({
      ...dto,
      plan: Number(dto.plan),
      productId: product.id,
      boilId: boil ? boil.id : null,
      water_base_id: water_base ? water_base.id : null,
      organic_base_id: organic_base ? organic_base.id : null,
      apparatusId: apparatus ? apparatus.id : null,
      canId: can ? can.id : null,
      conveyorId: conveyor.id,
      workshopId: workshop.id,
    });
    return record;
  }

  async checkRecord(dto: CreateRecordDto) {
    const boil = await this.boilsService.getOrCreateByValue(dto.batch);
    const conveyor = await this.conveyorsService.getOrCreateByValue(dto.conveyor);
    const serie = await this.seriesService.getOrCreateByValue(dto.serie);
    const product = await this.productsService.getOrCreateByCode(dto.code1C, dto.product, serie.id);

    const recordExist = await this.recordsRepository.findOne({
      where: {
        doc_id: dto.doc_id,
        boilId: boil ? boil.id : null,
        conveyorId: conveyor ? conveyor.id : null,
        productId: product.id,
      },
    });
    if (recordExist) {
      throw new HttpException(
        `Строка (Конвейер: ${conveyor.value}, Продукт: ${product.marking}, Партия: ${boil.value}) совпадает с существующей строкой в сводке. Обновление отменено...`,
        HttpStatus.BAD_REQUEST
      );
    }
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

  async bulkCreateRecordsWithUpdate(dto: UploadDocDto) {
    const plantId = Number(dto.plantId);
    const plant = await this.plantService.getPlantByPk(plantId);
    if (!plant) {
      throw new HttpException(`Площадка не найдена...`, HttpStatus.NOT_FOUND);
    }
    const docExists = await this.docsService.getDocByPlantAndDate(dto.summaryDate, plant.id);
    if (docExists && !dto.update) {
      throw new HttpException(
        `Документ на эти дату и площадку уже существует. Попробуйте режим обновления или удалить существующий документ и попробовать снова...`,
        HttpStatus.BAD_REQUEST
      );
    }
    if (!docExists && dto.update) {
      throw new HttpException(
        `Документ на эти дату и площадку не существует. обновление не возможно...`,
        HttpStatus.BAD_REQUEST
      );
    }

    if (dto.update) {
      for (let index = 0; index < dto.rows.length; index++) {
        const createDto: CreateRecordDto = {
          ...dto.rows[index],
          doc_id: docExists.id,
        };
        await this.checkRecord(createDto);
      }
      for (let index = 0; index < dto.rows.length; index++) {
        const createDto: CreateRecordDto = {
          ...dto.rows[index],
          doc_id: docExists.id,
        };
        await this.createRecord(createDto);
      }
    } else {
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

  async deleteRecord(id: number) {
    const record = await this.recordsRepository.findByPk(id);
    if (!record) {
      throw new HttpException("Строка сводки для удаления не найдена", HttpStatus.NOT_FOUND);
    }
    try {
      await record.destroy();
    } catch (error) {
      if (error instanceof Error && error.name === "SequelizeForeignKeyConstraintError") {
        throw new HttpException(
          "Существуют записи, связанные с этой строкой. Удаление невозможно...",
          HttpStatus.BAD_REQUEST
        );
      } else {
        throw new HttpException("Неизвестная ошибка", HttpStatus.BAD_REQUEST);
      }
    }
  }

  async updateRecord(dto: UpdateRecordDto) {
    let apparatus_id = null;
    let can_id = null;

    const record = await this.recordsRepository.findByPk(dto.id);
    if (!record) {
      throw new HttpException("Строка сводки для обновления не найдена", HttpStatus.NOT_FOUND);
    }

    if (dto.apparatus !== "-" || (dto.apparatus === "-" && record.apparatusId)) {
      const apparatus = await this.apparatusesService.getByValue(dto.apparatus);
      if (!apparatus) {
        throw new HttpException("Аппарат не найден в списке", HttpStatus.BAD_REQUEST);
      }
      apparatus_id = apparatus.id;
    }

    if (dto.can !== "-" || (dto.can === "-" && record.canId)) {
      const can = await this.cansService.getByValue(dto.can);
      if (!can) {
        throw new HttpException("Емкость не найдена в списке", HttpStatus.BAD_REQUEST);
      }
      can_id = can.id;
    }

    const conveyor = await this.conveyorsService.getByValue(dto.conveyor);
    if (!conveyor) {
      throw new HttpException("Конвейер не найден в списке", HttpStatus.BAD_REQUEST);
    }

    const plan = Number(dto.plan);
    if (!plan) {
      throw new HttpException("Невозможно преобразовать значение плана в число", HttpStatus.BAD_REQUEST);
    }

    record.apparatusId = apparatus_id;
    record.canId = can_id;
    record.conveyorId = conveyor.id;
    record.plan = plan;
    record.note = dto.note;
    await record.save();
  }
}
