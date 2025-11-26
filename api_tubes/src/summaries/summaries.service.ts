import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { ApiMessages } from "src/resources/api-messages";
import {
  mappedCounters,
  mappedExtrusionParams,
  mappedExtrusionTreshold,
  mappedOffsetParams,
  mappedOffsetTresholds,
  // mappedOperations,
  // mappedOperationStatus,
  mappedSealantParams,
  mappedSealantTresholds,
  mappedStatus,
  mappedSummary,
  mappedVarnishParams,
  mappedVarnishTresholds,
} from "./mapper";

@Injectable()
export class SummariesService {
  constructor(private prisma: PrismaService) {}

  async getActiveSummary(conveyor_id: number) {
    const summary = await this.prisma.summary.findFirst({
      where: { conveyor_id: conveyor_id, isActive: true },
    });
    if (!summary) throw new HttpException(ApiMessages.ACTIVE_SUMMARY_NOT_FOUND, HttpStatus.NOT_FOUND);
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

    // counters
    const extrusionCounters = mappedCounters(
      activeRecord.extrusion_params.length ? activeRecord.extrusion_params : null
    );
    const varnishCounters = mappedCounters(activeRecord.varnish_params.length ? activeRecord.varnish_params : null);
    const offsetCounters = mappedCounters(activeRecord.offset_params.length ? activeRecord.offset_params : null);
    const sealantCounters = mappedCounters(activeRecord.sealant_params.length ? activeRecord.sealant_params : null);

    const extrusionStatus = mappedStatus({
      status: activeRecord.extrusion_statuses ? activeRecord.extrusion_statuses[0] : null,
      operation: activeRecord.extrusion_statuses.length ? activeRecord.extrusion_statuses[0].operation : null,
    });

    const extrusionOperations = await this.prisma.extrusionOperation.findMany();

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
      extrusionCounters: extrusionCounters,
      varnishCounters: varnishCounters,
      offsetCounters: offsetCounters,
      sealantCounters: sealantCounters,

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
      extrusionOperations: extrusionOperations,
    };
  }
}
