import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { ApiMessages } from "src/resources/api-messages";
import {
  // mappedCounters,
  mappedExtrusionParams,
  mappedExtrusionTreshold,
  mappedOffsetParams,
  mappedOffsetTresholds,
  // mappedOperations,
  // mappedOperationStatus,
  mappedSealantParams,
  mappedSealantTresholds,
  mappedStatus,
  mappedStatusCounters,
  mappedSummary,
  mappedSummaryReportData,
  mappedVarnishParams,
  mappedVarnishTresholds,
} from "./mapper";
import { CreateSummaryDto } from "./dto/create-summary.dto";
import { parseAssemblies } from "src/helpers/parse-assemblies";
import { ChangeSummaryStateDto } from "./dto/change-summary-state.dto";
import { GetSummariesListDto } from "./dto/get-summaries-list.dto";

@Injectable()
export class SummariesService {
  constructor(private prisma: PrismaService) {}

  private async checkConveyor(conveyorName: string) {
    const conveyor = await this.prisma.conveyor.findUnique({ where: { name: conveyorName } });
    if (!conveyor) {
      throw new HttpException(`${conveyorName} - ${ApiMessages.CONVEYOR_NOT_FOUND}`, HttpStatus.NOT_FOUND);
    }
    return conveyor;
  }

  private async checkProduct({ code, marking, name }: { code: string; marking: string; name: string }) {
    const product = await this.prisma.product.upsert({
      where: { code: code },
      update: { marking: marking, name: name },
      create: {
        code: code,
        marking: marking,
        name: name,
      },
    });
    return product;
  }

  private async checkBatch(batchName: string) {
    const batch = await this.prisma.batch.upsert({
      where: { name: batchName },
      update: {},
      create: { name: batchName },
    });
    return batch;
  }
  private async checkSpecifications({ summaryId, value }: { summaryId: number; value: string }) {
    const res = parseAssemblies(value);
    if (res.length < 1) throw new HttpException("Ошибка спецификации", HttpStatus.BAD_REQUEST);
    for (let index = 0; index < res.length; index++) {
      const material = await this.prisma.material.upsert({
        where: { code: res[index].code },
        update: { name: res[index].name, post_number: Number(res[index].post) },
        create: {
          code: res[index].code,
          name: res[index].name,
          post_number: Number(res[index].post),
        },
      });
      await this.prisma.specification.create({
        data: {
          summary_id: summaryId,
          material_id: material.id,
        },
      });
    }
  }

  async deleteSummary(id: number) {
    await this.prisma.summary.delete({ where: { id: id } });
  }

  async getSummariesList(query: GetSummariesListDto) {
    const startDate = new Date(new Date(query.start_date).setHours(0));
    const endDate = new Date(new Date(query.end_date).setHours(23));

    let filter = {};

    if (query.conveyors) {
      filter = { ...filter, conveyor_id: { in: query.conveyors } };
    }

    if (query.states) {
      if (query.states.includes(2)) {
        filter = { ...filter, isFinished: true };
      }
      if (query.states.includes(1)) {
        filter = { ...filter, isActive: true };
      }

      // if (query.states.includes(2)) {
      //   filter = { ...filter, isActive: false, isFinished: true };
      // }
    }

    const count = await this.prisma.summary.count({
      where: { AND: [{ date: { gte: startDate } }, { date: { lte: endDate } }, { ...filter }] },
    });

    const summaries = await this.prisma.summary.findMany({
      where: { AND: [{ date: { gte: startDate } }, { date: { lte: endDate } }, { ...filter }] },
      include: {
        product: true,
        batch: true,
        conveyor: true,
        _count: {
          select: { extrusion_statuses: true, varnish_statuses: true, offset_statuses: true, sealant_statuses: true },
        },
      },
      orderBy: [{ date: "asc" }, { conveyor: { name: "asc" } }, { shift: "asc" }],
      take: query.limit,
      skip: query.limit * (query.page - 1),
    });

    return { total: count, rows: summaries };
  }

  async bulkCreateSummaries(dto: CreateSummaryDto) {
    if (dto.rows.length < 1) throw new HttpException("Нет строк!", HttpStatus.BAD_REQUEST);
    const parsedDate = new Date(`${dto.summaryDate} 12:00:00:000`);
    for (let index = 0; index < dto.rows.length; index++) {
      const item = dto.rows[index];
      const conveyor = await this.checkConveyor(item.conveyor);
      const product = await this.checkProduct({
        code: item.code1C,
        marking: item.product_marking,
        name: item.product_name,
      });
      const batch = await this.checkBatch(item.batch);
      const shift = item.shift === "day" ? 1 : item.shift === "night" ? 2 : null;
      if (!shift) throw new HttpException("Ошибка парсинга смены!", HttpStatus.BAD_REQUEST);
      const existsSummary = await this.prisma.summary.findFirst({
        where: { date: parsedDate, batch: { name: item.batch }, product: { code: item.code1C }, shift: shift },
      });
      if (existsSummary) throw new HttpException("Уже есть!", HttpStatus.BAD_REQUEST);
      const summary = await this.prisma.summary.create({
        data: {
          date: parsedDate,
          product_id: product.id,
          conveyor_id: conveyor.id,
          batch_id: batch.id,
          plan: Number(item.plan),
          shift: shift,
        },
      });

      await this.checkSpecifications({ summaryId: summary.id, value: item.specification });
    }
  }

  private async getConsumedMaterial({ id, date }: { id: number; date: Date }) {
    const material = await this.prisma.consumedMaterial.findMany({
      include: { lot: true, material: true },
      where: {
        material_id: id,
        createdAt: { lte: date },
      },
      orderBy: { id: "desc" },
      take: 1,
    });
    if (!material.length) Promise.reject;
    return { code: material[0].material.code, name: material[0].material.name, lot: material[0].lot.value };
  }

  private async getPostSpecification({ summary_id, post_number }: { summary_id: number; post_number: number }) {
    return await this.prisma.specification.findMany({
      select: { material_id: true },
      where: { summary_id: summary_id, material: { post_number: post_number } },
    });
  }

  async getSummaryById(id: number) {
    const record = await this.prisma.summary.findUnique({
      where: { id: id },
      include: {
        batch: true,
        product: true,
        conveyor: true,
        // consumed_materials: true,
        // extrusion_params: {
        //   orderBy: { id: "asc" },
        //   include: { rondel: true },
        // },
      },
    });

    if (!record) throw new HttpException("Активная сводка не найдена", HttpStatus.NOT_FOUND);

    const data = mappedSummaryReportData({
      summary: record,
      batch: record.batch,
      product: record.product,
      conveyor: record.conveyor,
    });

    const extrusionSpecification = await this.getPostSpecification({ summary_id: record.id, post_number: 1 });
    const varnishSpecification = await this.getPostSpecification({ summary_id: record.id, post_number: 2 });
    const offsetSpecification = await this.getPostSpecification({ summary_id: record.id, post_number: 3 });
    const sealantSpecification = await this.getPostSpecification({ summary_id: record.id, post_number: 4 });

    const extrusionParams = await this.prisma.extrusionParam.findMany({
      where: { summary_id: record.id },
      include: { employee: true, rondel: true },
    });

    const varnishParams = await this.prisma.varnishParam.findMany({
      where: { summary_id: record.id },
      include: { employee: true },
    });

    const offsetParams = await this.prisma.offsetParam.findMany({
      where: { summary_id: record.id },
      include: { employee: true },
    });

    const sealantParams = await this.prisma.sealantParam.findMany({
      where: { summary_id: record.id },
      include: { employee: true },
    });

    const extrusionParamsResult = await Promise.all(
      await extrusionParams.map(async (item) => {
        return {
          id: item.id,
          summary_id: item.summary_id,
          counter_value: item.counter_value,
          press_speed: item.press_speed,
          blow_time: item.blow_time,
          turning_machine_speed: item.turning_machine_speed,
          annealing_furnace_temp: item.annealing_furnace_temp,
          rondel: item.rondel ? item.rondel.value : null,
          tube_cilindrical_section_length: item.tube_cilindrical_section_length,
          membrane_thickness: item.membrane_thickness,
          tube_diameter: item.tube_diameter,
          tube_cilindrical_section_thickness: item.tube_cilindrical_section_thickness,
          tube_rigidity: item.tube_rigidity,
          tube_cutting_quality: item.tube_cutting_quality,
          tightness: item.tightness,
          external_thread_quality: item.external_thread_quality,
          employee: item.employee ? item.employee.name : null,
          createdAt: item.createdAt,
          consumed_materials: extrusionSpecification.length
            ? await Promise.all(
                extrusionSpecification.map(
                  async (it) => await this.getConsumedMaterial({ id: it.material_id, date: item.createdAt })
                )
              )
            : [],
        };
      })
    );

    const varnishParamsResult = await Promise.all(
      await varnishParams.map(async (item) => {
        return {
          id: item.id,
          summary_id: item.summary_id,
          counter_value: item.counter_value,
          varnish_machine_speed: item.varnish_machine_speed,
          total_air_pressure: item.total_air_pressure,
          feed_can_air_pressure: item.feed_can_air_pressure,
          nozzle_regulator_air_pressure: item.nozzle_regulator_air_pressure,
          cells_speed: item.cells_speed,
          injection_a_start_position: item.injection_a_start_position,
          injection_b_start_position: item.injection_b_start_position,
          injection_c_start_position: item.injection_c_start_position,
          injection_d_start_position: item.injection_d_start_position,
          injection_a_end_position: item.injection_a_end_position,
          injection_b_end_position: item.injection_b_end_position,
          injection_c_end_position: item.injection_c_end_position,
          injection_d_end_position: item.injection_d_end_position,
          tube_molding_start_position: item.tube_molding_start_position,
          tube_molding_end_position: item.tube_molding_end_position,
          polimerization_furnace_temp: item.polimerization_furnace_temp,
          internal_varnish_porosity: item.internal_varnish_porosity,
          internal_sectional_view: item.internal_sectional_view,
          aluminium_clearance_lack: item.aluminium_clearance_lack,
          unpainting_lack: item.unpainting_lack,
          employee: item.employee ? item.employee.name : null,
          createdAt: item.createdAt,
          consumed_materials: varnishSpecification.length
            ? await Promise.all(
                varnishSpecification.map(
                  async (it) => await this.getConsumedMaterial({ id: it.material_id, date: item.createdAt })
                )
              )
            : [],
        };
      })
    );

    const offsetParamsResult = await Promise.all(
      await offsetParams.map(async (item) => {
        return {
          id: item.id,
          summary_id: item.summary_id,
          counter_value: item.counter_value,
          printing_machine_speed: item.printing_machine_speed,
          total_air_pressure: item.total_air_pressure,
          padding_furnace_temp: item.padding_furnace_temp,
          offset_furnace_temp: item.offset_furnace_temp,
          printer_motor: item.printer_motor,
          base_covers_holders_motor: item.base_covers_holders_motor,
          base_covers_station_motor: item.base_covers_station_motor,
          imprint_quantity_printed_box_1: item.imprint_quantity_printed_box_1
            ? item.imprint_quantity_printed_box_1
            : null,
          imprint_quantity_printed_box_2: item.imprint_quantity_printed_box_2
            ? item.imprint_quantity_printed_box_2
            : null,
          imprint_quantity_printed_box_3: item.imprint_quantity_printed_box_3
            ? item.imprint_quantity_printed_box_3
            : null,
          imprint_quantity_printed_box_4: item.imprint_quantity_printed_box_4
            ? item.imprint_quantity_printed_box_4
            : null,
          imprint_quantity_printed_box_5: item.imprint_quantity_printed_box_5
            ? item.imprint_quantity_printed_box_5
            : null,
          imprint_quantity_printed_box_6: item.imprint_quantity_printed_box_6
            ? item.imprint_quantity_printed_box_6
            : null,
          ink_supply_time: item.ink_supply_time,
          design_match: item.design_match,
          tube_apperarance: item.tube_apperarance,
          tube_edge_deformation_lack: item.tube_edge_deformation_lack,
          aluminium_clearance_lack: item.aluminium_clearance_lack,
          drips_lack: item.drips_lack,

          employee: item.employee ? item.employee.name : null,
          createdAt: item.createdAt,
          consumed_materials: offsetSpecification.length
            ? await Promise.all(
                offsetSpecification.map(
                  async (it) => await this.getConsumedMaterial({ id: it.material_id, date: item.createdAt })
                )
              )
            : [],
        };
      })
    );

    const sealantParamsResult = await Promise.all(
      await sealantParams.map(async (item) => {
        return {
          id: item.id,
          summary_id: item.summary_id,
          counter_value: item.counter_value,
          cap_machine_speed: item.cap_machine_speed,
          total_air_pressure: item.total_air_pressure,
          holders_forward: item.holders_forward,
          holders_opening_left: item.holders_opening_left,
          holders_opening_right: item.holders_opening_right,
          holders_closing: item.holders_closing,
          injection_a_start: item.injection_a_start,
          injection_b_start: item.injection_b_start,
          injection_a_end: item.injection_a_end,
          injection_b_end: item.injection_b_end,
          injection_tube_orientation_start: item.injection_tube_orientation_start,
          injection_tube_orientation_end: item.injection_tube_orientation_end,
          is_cap_surface_smooth: item.is_cap_surface_smooth,
          latex_ring_padding: item.latex_ring_padding,
          latex_ring_width: item.latex_ring_width,
          tube_rigidity: item.tube_rigidity,
          cap_unscrewing_torque: item.cap_unscrewing_torque,
          employee: item.employee ? item.employee.name : null,
          createdAt: item.createdAt,
          consumed_materials: sealantSpecification.length
            ? await Promise.all(
                sealantSpecification.map(
                  async (it) => await this.getConsumedMaterial({ id: it.material_id, date: item.createdAt })
                )
              )
            : [],
        };
      })
    );

    const extrusionOperations = await this.prisma.extrusionStatus.findMany({
      where: { summary_id: record.id, idle: true },
      include: { employee: true, operation: true },
    });
    const varnishOperations = await this.prisma.varnishStatus.findMany({
      where: { summary_id: record.id, idle: true },
      include: { employee: true, operation: true },
    });
    const offsetOperations = await this.prisma.offsetStatus.findMany({
      where: { summary_id: record.id, idle: true },
      include: { employee: true, operation: true },
    });
    const sealantOperations = await this.prisma.sealantStatus.findMany({
      where: { summary_id: record.id, idle: true },
      include: { employee: true, operation: true },
    });

    const extrusionStatus = await this.prisma.extrusionStatus.findFirst({
      where: { summary_id: record.id },
      orderBy: { id: "desc" },
      take: 1,
    });
    const varnishStatus = await this.prisma.varnishStatus.findFirst({
      where: { summary_id: record.id },
      orderBy: { id: "desc" },
      take: 1,
    });
    const offsetStatus = await this.prisma.offsetStatus.findFirst({
      where: { summary_id: record.id },
      orderBy: { id: "desc" },
      take: 1,
    });
    const sealantStatus = await this.prisma.sealantStatus.findFirst({
      where: { summary_id: record.id },
      orderBy: { id: "desc" },
      take: 1,
    });

    const extrusionOperationsResult = await Promise.all(
      await extrusionOperations.map(async (item) => {
        return {
          id: item.id,
          counter_value: item.counter_value,
          idle_time: item.idle_time,
          createdAt: item.createdAt,
          employee: item.employee ? item.employee.name : null,
          operation_value: item.operation ? item.operation.value : null,
          operation_description: item.operation ? item.operation.description : null,
        };
      })
    );

    const varnishOperationsResult = await Promise.all(
      await varnishOperations.map(async (item) => {
        return {
          id: item.id,
          counter_value: item.counter_value,
          idle_time: item.idle_time,
          createdAt: item.createdAt,
          employee: item.employee ? item.employee.name : null,
          operation_value: item.operation ? item.operation.value : null,
          operation_description: item.operation ? item.operation.description : null,
        };
      })
    );
    const offsetOperationsResult = await Promise.all(
      await offsetOperations.map(async (item) => {
        return {
          id: item.id,
          counter_value: item.counter_value,
          idle_time: item.idle_time,
          createdAt: item.createdAt,
          employee: item.employee ? item.employee.name : null,
          operation_value: item.operation ? item.operation.value : null,
          operation_description: item.operation ? item.operation.description : null,
        };
      })
    );
    const sealantOperationsResult = await Promise.all(
      await sealantOperations.map(async (item) => {
        return {
          id: item.id,
          counter_value: item.counter_value,
          idle_time: item.idle_time,
          createdAt: item.createdAt,
          employee: item.employee ? item.employee.name : null,
          operation_value: item.operation ? item.operation.value : null,
          operation_description: item.operation ? item.operation.description : null,
        };
      })
    );

    const extrusionDefect = await this.prisma.extrusionDefect.findUnique({ where: { summary_id: record.id } });
    const varnishDefect = await this.prisma.varnishDefect.findUnique({ where: { summary_id: record.id } });
    const offsetDefect = await this.prisma.offsetDefect.findUnique({ where: { summary_id: record.id } });
    const sealantDefect = await this.prisma.sealantDefect.findUnique({ where: { summary_id: record.id } });

    const extrusionTresholds = await this.prisma.extrusionTreshold.findMany({
      where: { conveyor_id: record.conveyor_id, product_id: record.product_id },
      include: { rondel: true },
      orderBy: { id: "desc" },
      take: 1,
    });

    const varnishTresholds = await this.prisma.varnishTreshold.findMany({
      where: { conveyor_id: record.conveyor_id, product_id: record.product_id },
      orderBy: { id: "desc" },
      take: 1,
    });

    const offsetTresholds = await this.prisma.offsetTreshold.findMany({
      where: { conveyor_id: record.conveyor_id, product_id: record.product_id },
      orderBy: { id: "desc" },
      take: 1,
    });

    const sealantTresholds = await this.prisma.sealantTreshold.findMany({
      where: { conveyor_id: record.conveyor_id, product_id: record.product_id },
      orderBy: { id: "desc" },
      take: 1,
    });

    return {
      data: data,
      extrusion: {
        params: extrusionParamsResult.length ? extrusionParamsResult : [],
        tresholds: extrusionTresholds.length ? extrusionTresholds[0] : null,
        operations: extrusionOperationsResult.length ? extrusionOperationsResult : [],
        defect: extrusionDefect ? extrusionDefect.value : null,
        status: extrusionStatus
          ? extrusionStatus.finished === true
            ? "finished"
            : extrusionStatus.idle === true
              ? "idle"
              : "working"
          : null,
      },
      varnish: {
        params: varnishParamsResult.length ? varnishParamsResult : [],
        tresholds: varnishTresholds.length ? varnishTresholds[0] : null,
        operations: varnishOperationsResult.length ? varnishOperationsResult : [],
        defect: varnishDefect ? varnishDefect.value : null,
        status: varnishStatus
          ? varnishStatus.finished === true
            ? "finished"
            : varnishStatus.idle === true
              ? "idle"
              : "working"
          : null,
      },
      offset: {
        params: offsetParamsResult.length ? offsetParamsResult : [],
        tresholds: offsetTresholds.length ? offsetTresholds[0] : null,
        operations: offsetOperationsResult.length ? offsetOperationsResult : [],
        defect: offsetDefect ? offsetDefect.value : null,
        status: offsetStatus
          ? offsetStatus.finished === true
            ? "finished"
            : offsetStatus.idle === true
              ? "idle"
              : "working"
          : null,
      },
      sealant: {
        params: sealantParamsResult.length ? sealantParamsResult : [],
        tresholds: sealantTresholds.length ? sealantTresholds[0] : null,
        operations: sealantOperationsResult.length ? sealantOperationsResult : [],
        defect: sealantDefect ? sealantDefect.value : null,
        status: sealantStatus
          ? sealantStatus.finished === true
            ? "finished"
            : sealantStatus.idle === true
              ? "idle"
              : "working"
          : null,
      },
    };
  }

  async getActiveSummaryRecordByConveyorId(conveyor_id: number) {
    const activeRecord = await this.prisma.summary.findFirst({
      where: { conveyor_id: conveyor_id, isActive: true },
      include: {
        batch: true,
        notes: true,
        extrusion_defects: true,
        extrusion_statuses: {
          include: {
            operation: true,
          },
          orderBy: { id: "desc" },
          take: 1,
        },
        varnish_statuses: {
          include: {
            operation: true,
          },
          orderBy: { id: "desc" },
          take: 1,
        },
        offset_statuses: {
          include: {
            operation: true,
          },
          orderBy: { id: "desc" },
          take: 1,
        },
        sealant_statuses: {
          include: {
            operation: true,
          },
          orderBy: { id: "desc" },
          take: 1,
        },

        product: {
          include: {
            extrusion_tresholds: {
              where: { conveyor_id: conveyor_id },
              orderBy: { createdAt: "desc" },
              take: 1,
              include: { rondel: true },
            },
            varnish_tresholds: { where: { conveyor_id: conveyor_id }, orderBy: { createdAt: "desc" }, take: 1 },
            offset_tresholds: { where: { conveyor_id: conveyor_id }, orderBy: { createdAt: "desc" }, take: 1 },
            sealant_tresholds: { where: { conveyor_id: conveyor_id }, orderBy: { createdAt: "desc" }, take: 1 },
          },
        },
        extrusion_params: {
          orderBy: { id: "desc" },
          include: { rondel: true },
        },
        varnish_params: {
          orderBy: { id: "desc" },
        },
        offset_params: {
          orderBy: { id: "desc" },
        },
        sealant_params: {
          orderBy: { id: "desc" },
        },
        specifications: {
          include: {
            material: {
              include: {
                consumed_materials: {
                  where: { summary: { conveyor_id: conveyor_id, isActive: true } },
                  orderBy: { id: "desc" },
                  take: 1,
                },
              },
            },
          },
        },
      },
    });
    if (!activeRecord) throw new HttpException("Активная сводка не найдена", HttpStatus.NOT_FOUND);

    const data = mappedSummary({ summary: activeRecord, batch: activeRecord.batch, product: activeRecord.product });

    const extrusionTreholds = mappedExtrusionTreshold({
      tresholds: activeRecord.product.extrusion_tresholds.length ? activeRecord.product.extrusion_tresholds[0] : null,
      rondel: activeRecord.product.extrusion_tresholds.length
        ? activeRecord.product.extrusion_tresholds[0].rondel
          ? activeRecord.product.extrusion_tresholds[0].rondel
          : null
        : null,
    });

    const varnishTreholds = mappedVarnishTresholds({
      tresholds: activeRecord.product.varnish_tresholds.length ? activeRecord.product.varnish_tresholds[0] : null,
    });

    const offsetTreholds = mappedOffsetTresholds({
      tresholds: activeRecord.product.offset_tresholds.length ? activeRecord.product.offset_tresholds[0] : null,
    });

    const sealantTreholds = mappedSealantTresholds({
      tresholds: activeRecord.product.sealant_tresholds.length ? activeRecord.product.sealant_tresholds[0] : null,
    });

    const extrusionParams = mappedExtrusionParams({
      params: activeRecord.extrusion_params.length ? activeRecord.extrusion_params[0] : null,
      rondel: activeRecord.extrusion_params.length
        ? activeRecord.extrusion_params[0].rondel
          ? activeRecord.extrusion_params[0].rondel
          : null
        : null,
    });
    const varnishParams = mappedVarnishParams({
      params: activeRecord.varnish_params.length ? activeRecord.varnish_params[0] : null,
    });
    const offsetParams = mappedOffsetParams({
      params: activeRecord.offset_params.length ? activeRecord.offset_params[0] : null,
    });
    const sealantParams = mappedSealantParams({
      params: activeRecord.sealant_params.length ? activeRecord.sealant_params[0] : null,
    });
    const extrusionStatuses = await this.prisma.extrusionStatus.findMany({
      where: { summary_id: activeRecord.id },
    });
    const varnishStatuses = await this.prisma.varnishStatus.findMany({
      where: { summary_id: activeRecord.id },
    });
    const offsetStatuses = await this.prisma.offsetStatus.findMany({
      where: { summary_id: activeRecord.id },
    });
    const sealantStatuses = await this.prisma.sealantStatus.findMany({
      where: { summary_id: activeRecord.id },
    });
    const extrusionStatusCounters = mappedStatusCounters(extrusionStatuses.length ? extrusionStatuses : null);
    const varnishStatusCounters = mappedStatusCounters(varnishStatuses.length ? varnishStatuses : null);
    const offsetStatusCounters = mappedStatusCounters(offsetStatuses.length ? offsetStatuses : null);
    const sealantStatusCounters = mappedStatusCounters(sealantStatuses.length ? sealantStatuses : null);

    const extrusionStatus = mappedStatus({
      status: activeRecord.extrusion_statuses ? activeRecord.extrusion_statuses[0] : null,
      operation: activeRecord.extrusion_statuses.length ? activeRecord.extrusion_statuses[0].operation : null,
    });
    const varnishStatus = mappedStatus({
      status: activeRecord.varnish_statuses ? activeRecord.varnish_statuses[0] : null,
      operation: activeRecord.varnish_statuses.length ? activeRecord.varnish_statuses[0].operation : null,
    });
    const offsetStatus = mappedStatus({
      status: activeRecord.offset_statuses ? activeRecord.offset_statuses[0] : null,
      operation: activeRecord.offset_statuses.length ? activeRecord.offset_statuses[0].operation : null,
    });
    const sealantStatus = mappedStatus({
      status: activeRecord.sealant_statuses ? activeRecord.sealant_statuses[0] : null,
      operation: activeRecord.sealant_statuses.length ? activeRecord.sealant_statuses[0].operation : null,
    });

    const extrusionOperations = await this.prisma.extrusionOperation.findMany({ orderBy: { id: "asc" } });
    const varnishOperations = await this.prisma.varnishOperation.findMany();
    const offsetOperations = await this.prisma.offsetOperation.findMany();
    const sealantOperations = await this.prisma.sealantOperation.findMany();

    const extrusionIdleTime = extrusionParams
      ? await this.prisma.extrusionStatus.aggregate({
          _sum: {
            idle_time: true,
          },
          where: {
            idle_time: { not: null },
            createdAt: { gt: extrusionParams.createdAt },
          },
        })
      : null;

    const varnishIdleTime = varnishParams
      ? await this.prisma.varnishStatus.aggregate({
          _sum: {
            idle_time: true,
          },
          where: {
            idle_time: { not: null },
            createdAt: { gt: varnishParams.createdAt },
          },
        })
      : null;

    const offsetIdleTime = offsetParams
      ? await this.prisma.offsetStatus.aggregate({
          _sum: {
            idle_time: true,
          },
          where: {
            idle_time: { not: null },
            createdAt: { gt: offsetParams.createdAt },
          },
        })
      : null;

    const sealantIdleTime = sealantParams
      ? await this.prisma.sealantStatus.aggregate({
          _sum: {
            idle_time: true,
          },
          where: {
            idle_time: { not: null },
            createdAt: { gt: sealantParams.createdAt },
          },
        })
      : null;
    const extrusion_defects = activeRecord.extrusion_defects.length ? activeRecord.extrusion_defects[0].value : null;
    return {
      data: data,
      materials: activeRecord.specifications,
      extrusionTresholds: extrusionTreholds,
      varnishTresholds: varnishTreholds,
      offsetTresholds: offsetTreholds,
      sealantTresholds: sealantTreholds,
      extrusionParams: extrusionParams,
      varnishParams: varnishParams,
      offsetParams: offsetParams,
      sealantParams: sealantParams,
      extrusionStatusCounters: extrusionStatusCounters,
      varnishStatusCounters: varnishStatusCounters,
      offsetStatusCounters: offsetStatusCounters,
      sealantStatusCounters: sealantStatusCounters,

      extrusion_note: activeRecord.notes.filter((x) => x.post_id === 1).length
        ? activeRecord.notes.filter((x) => x.post_id === 1)[0].note
        : null,
      varnish_note: activeRecord.notes.filter((x) => x.post_id === 1).length
        ? activeRecord.notes.filter((x) => x.post_id === 2)[0].note
        : null,
      offset_note: activeRecord.notes.filter((x) => x.post_id === 1).length
        ? activeRecord.notes.filter((x) => x.post_id === 3)[0].note
        : null,
      sealant_note: activeRecord.notes.filter((x) => x.post_id === 1).length
        ? activeRecord.notes.filter((x) => x.post_id === 4)[0].note
        : null,

      extrusion_materials: activeRecord.specifications
        .filter((x) => x.material.post_number === 1)
        .map((item) => ({
          code: item.material.code,
          name: item.material.name,
          scanned: item.material.consumed_materials.length === 0 ? false : true,
        })),
      varnish_materials: activeRecord.specifications
        .filter((x) => x.material.post_number === 2)
        .map((item) => ({
          code: item.material.code,
          name: item.material.name,
          scanned: item.material.consumed_materials.length === 0 ? false : true,
        })),

      offset_materials: activeRecord.specifications
        .filter((x) => x.material.post_number === 3)
        .map((item) => ({
          code: item.material.code,
          name: item.material.name,
          scanned: item.material.consumed_materials.length === 0 ? false : true,
        })),
      sealant_materials: activeRecord.specifications
        .filter((x) => x.material.post_number === 4)
        .map((item) => ({
          code: item.material.code,
          name: item.material.name,
          scanned: item.material.consumed_materials.length === 0 ? false : true,
        })),
      extrusionStatus: extrusionStatus,
      varnishStatus: varnishStatus,
      offsetStatus: offsetStatus,
      sealantStatus: sealantStatus,

      extrusionOperations: extrusionOperations,
      varnishOperations: varnishOperations,
      offsetOperations: offsetOperations,
      sealantOperations: sealantOperations,

      extrusionIdleTime: extrusionIdleTime ? extrusionIdleTime._sum.idle_time : 0,
      varnishIdleTime: varnishIdleTime ? varnishIdleTime._sum.idle_time : 0,
      offsetIdleTime: offsetIdleTime ? offsetIdleTime._sum.idle_time : 0,
      sealantIdleTime: sealantIdleTime ? sealantIdleTime._sum.idle_time : 0,
      extrusionDefects: extrusion_defects,
    };
  }

  async getAvailableSummariesRecordByConveyorId(conveyor_id: number) {
    // Не отображать записи с датой меньше сегодняшней?
    const curDate = new Date(new Date(new Date().getTime()).setHours(12, 0, 0, 0));
    const summaries = await this.prisma.summary.findMany({
      where: { conveyor_id: conveyor_id, isActive: false, isFinished: false, date: { gte: curDate } },
      include: { product: true, batch: true },
      orderBy: [{ date: "asc" }, { shift: "asc" }],
    });
    return { summaries: summaries };
  }

  async finishSummary(dto: ChangeSummaryStateDto) {
    const summary = await this.prisma.summary.update({
      where: { id: dto.id },
      data: {
        isActive: false,
        isFinished: true,
      },
    });
    return summary;
  }

  async startSummary(dto: ChangeSummaryStateDto) {
    const summary = await this.prisma.summary.update({
      where: { id: dto.id },
      data: {
        isActive: true,
        isFinished: false,
      },
    });
    return summary;
  }
}
