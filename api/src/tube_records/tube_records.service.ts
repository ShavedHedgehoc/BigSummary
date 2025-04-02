import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import TubeRecord from "./tube_records.model";
import { GetActiveRecordsDto } from "./dto/get-active-records.dto";
import TubeConveyor from "src/tube_conveyors/tube_conveyors.model";
import { col } from "sequelize";
import Boil from "src/boils/boil.model";
import TubeProduct from "src/tube_products/tube_products.model";
import { SetActiveRecordDto } from "./dto/set-active-record.dto";
import { BulkCreateTubeRecordDto } from "./dto/bulk-create-tube-records.dto";
import { CreateTubeRecordDto } from "./dto/create-tube-record.dto";

import { BoilsService } from "src/boils/boils.service";
import { TubeProductsService } from "src/tube_products/tube_products.service";
import { TubeConveyorsService } from "src/tube_conveyors/tube_conveyors.service";
import { TubeParametersService } from "src/tube_parameters/tube_parameters.service";
import { parseAssemblies } from "src/helpers/parse-assemblies";
import { CreateTubeAssemblyDto } from "src/tube_assembly/dto/create-tube-assembly.dto";
import { TubeAssemblyService } from "src/tube_assembly/tube_assembly.service";
import TubeAssembly from "src/tube_assembly/tube_assembly.model";

@Injectable()
export class TubeRecordsService {
  constructor(
    @InjectModel(TubeRecord)
    private tubeRecordRepository: typeof TubeRecord,
    private tubeProductsService: TubeProductsService,
    private boilsService: BoilsService,
    private tubeConveyorsService: TubeConveyorsService,
    private tubeParametersService: TubeParametersService,
    private tubeAssemblyService: TubeAssemblyService
  ) {}

  async getPlannedRecordsByConveyorName(dto: GetActiveRecordsDto) {
    const records = await this.tubeRecordRepository.findAll({
      attributes: {
        exclude: ["boil_id", "createdAt", "updatedAt", "tube_conveyor_id", "tube_product_id", "finished"],
        include: [
          [col("boil.value"), "boil_value"],
          [col("tube_product.code_1C"), "product_id"],
          [col("tube_product.name"), "product_name"],
        ],
      },
      where: { finished: false, active: false },
      include: [
        {
          model: TubeConveyor,
          as: "tube_conveyor",
          where: { name: dto.conveyor_name },
          required: true,
          attributes: [],
        },
        { model: Boil, as: "boil", attributes: [] },
        { model: TubeProduct, as: "tube_product", attributes: [] },
      ],
    });
    return records;
  }

  async getActiveRecord(conveyor_name: string) {
    const existsActiveRecord = await this.tubeRecordRepository.findOne({
      attributes: {
        exclude: ["boil_id", "createdAt", "updatedAt", "tube_conveyor_id", "tube_product_id", "finished"],
        include: [
          [col("boil.value"), "boil_value"],
          [col("tube_product.code_1C"), "product_id"],
          [col("tube_product.name"), "product_name"],
        ],
      },
      where: {
        finished: false,
        active: true,
      },
      include: [
        { model: TubeAssembly, as: "tube_assemblies" },
        {
          model: TubeConveyor,
          as: "tube_conveyor",
          where: { name: conveyor_name },
          required: true,
          duplicating: false,
          attributes: [],
        },

        { model: TubeProduct, as: "tube_product", attributes: [], duplicating: false, required: true },

        { model: Boil, as: "boil", attributes: [], duplicating: false, required: true },
      ],
    });
    return existsActiveRecord;
  }

  async setActiveRecordByRecordId(dto: SetActiveRecordDto) {
    const existsActiveRecord = await this.getActiveRecord(dto.conveyor_name);
    if (existsActiveRecord) {
      throw new HttpException(
        `Уже существует выбранная строка для конвейера №${dto.conveyor_name}`,
        HttpStatus.CONFLICT
      );
    }
    const record = await this.tubeRecordRepository.findByPk(dto.record_id);
    if (!record) {
      throw new HttpException(`Запись не найдена`, HttpStatus.NOT_FOUND);
    }
    record.active = true;
    await record.save();
  }

  async createTubeRecord(dto: CreateTubeRecordDto) {
    const tube_product = await this.tubeProductsService.getOrCreateByCode(
      dto.code1C,
      dto.product_marking,
      dto.product_name
    );
    const boil = await this.boilsService.getOrCreateByValue(dto.batch);
    const existsTubeRecord = await this.tubeRecordRepository.findOne({ where: { boil_id: boil.id } });
    if (existsTubeRecord) {
      throw new HttpException(`Строка с партией ${boil.value} уже существует`, HttpStatus.BAD_REQUEST);
    }

    const tube_conveyor = await this.tubeConveyorsService.getOrCreateByName(dto.conveyor);

    const tube_record = await this.tubeRecordRepository.create({
      plan: dto.plan,
      tube_product_id: tube_product.id,
      tube_conveyor_id: tube_conveyor.id,
      boil_id: boil.id,
      start_date: dto.start_date,
    });

    return tube_record;
  }

  async createAssembly(tube_record: TubeRecord, value: string) {
    const res = parseAssemblies(value);
    if (res.length > 0) {
      for (let index = 0; index < res.length; index++) {
        const dto: CreateTubeAssemblyDto = {
          tube_record_id: tube_record.id,
          tube_material_code: res[index].code,
          tube_material_name: res[index].name,
          tube_conveyor_post: res[index].post,
        };
        await this.tubeAssemblyService.createTubeAssembly(dto);
      }
    }
  }

  async bulkCreateTubeRecords(dto: BulkCreateTubeRecordDto) {
    for (let index = 0; index < dto.rows.length; index++) {
      const createDto: CreateTubeRecordDto = {
        ...dto.rows[index],
        start_date: dto.summaryDate,
      };
      const record = await this.createTubeRecord(createDto);
      await this.tubeParametersService.createTubeParameters({ ...dto.rows[index], tube_record_id: record.id });
      await this.createAssembly(record, dto.rows[index].assembly);
    }
  }
}
