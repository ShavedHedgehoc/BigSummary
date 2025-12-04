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
  mappedVarnishParams,
  mappedVarnishTresholds,
} from "./mapper";
import { CreateSummaryDto } from "./dto/create-summary.dto";
import { parseAssemblies } from "src/helpers/parse-assemblies";

@Injectable()
export class SummariesService {
  constructor(private prisma: PrismaService) {}

  private async checkConveyor(conveyorName: string) {
    const conveyor = await this.prisma.conveyor.findUnique({ where: { name: conveyorName } });
    if (!conveyor) {
      throw new HttpException("Conveyor not found", HttpStatus.NOT_FOUND);
    }
    return conveyor;
  }

  private async checkProduct(productCode: string) {
    const product = await this.prisma.product.findUnique({
      where: { code: productCode },
    });
    if (!product) {
      throw new HttpException("product not found", HttpStatus.NOT_FOUND);
    }
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

  async bulkCreateSummaries(dto: CreateSummaryDto) {
    if (dto.rows.length < 1) throw new HttpException("Нет строк!", HttpStatus.BAD_REQUEST);
    const parsedDate = new Date(`${dto.summaryDate} 12:00:00:000`);
    for (let index = 0; index < dto.rows.length; index++) {
      const item = dto.rows[index];
      const conveyor = await this.checkConveyor(item.conveyor);
      const product = await this.checkProduct(item.code1C);
      const batch = await this.checkBatch(item.batch);
      const existsSummary = await this.prisma.summary.findFirst({
        where: { batch: { name: item.batch }, product: { code: item.code1C } },
      });
      if (existsSummary) throw new HttpException("Уже есть!", HttpStatus.BAD_REQUEST);
      const summary = await this.prisma.summary.create({
        data: {
          date: parsedDate,
          product_id: product.id,
          conveyor_id: conveyor.id,
          batch_id: batch.id,
          plan: Number(item.plan),
        },
      });

      await this.checkSpecifications({ summaryId: summary.id, value: item.specification });
    }
  }

  async getActiveSummaryRecordByConveyorId(conveyor_id: number) {
    const activeRecord = await this.prisma.summary.findFirst({
      where: { conveyor_id: conveyor_id, isActive: true },
      include: {
        batch: true,
        notes: true,
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
            extrusion_tresholds: { orderBy: { createdAt: "desc" }, take: 1, include: { rondel: true } },
            varnish_tresholds: { orderBy: { createdAt: "desc" }, take: 1 },
            offset_tresholds: { orderBy: { createdAt: "desc" }, take: 1 },
            sealant_tresholds: { orderBy: { createdAt: "desc" }, take: 1 },
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
                  // orderBy: { id: "desc" },
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
    };
  }
}
