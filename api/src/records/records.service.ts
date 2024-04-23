import { Injectable } from "@nestjs/common";
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
    private workshopsService: WorkshopsService
  ) {}

  async getAllRecords() {
    const records = await this.recordsRepository.findAll();
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
      productId: product.id,
      boilId: boil.id,
      apparatusId: apparatus.id,
      canId: can.id,
      conveyorId: conveyor.id,
      workshopId: workshop.id,
    });
    return record;
  }
}
