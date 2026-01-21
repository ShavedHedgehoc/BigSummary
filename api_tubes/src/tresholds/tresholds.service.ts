import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { GetTresholdsListDto } from "./dto/get-tresholds-list.dto";
import { CreateExtrusionTresholdDto } from "./dto/create-extrusion-treshold.dto";
import { CreateVarnishTresholdDto } from "./dto/create-varnish-treshold.dto";
import { CreateOffsetTresholdDto } from "./dto/create-offset-treshold.dto";
import { CreateSealantTresholdDto } from "./dto/create-sealant-treshold.dto";

export interface ResultRow {
  product_id: number;
  product_code: string;
  product_name: string;
  product_marking: string;
  conveyor_id: number;
  conveyor_name: string;
  count: number;
  last?: Object | null;
}

@Injectable()
export class TresholdsService {
  constructor(private prisma: PrismaService) {}

  async getExtrusionTresholdsList(dto: GetTresholdsListDto) {
    let conveyorFilter = {};
    if (dto.conveyors) {
      conveyorFilter = { ...conveyorFilter, id: { in: dto.conveyors } };
    }

    let productFilter = {};
    if (dto.code) {
      productFilter = { ...productFilter, code: { contains: dto.code, mode: "insensitive" } };
    }
    if (dto.marking) {
      productFilter = { ...productFilter, marking: { contains: dto.marking, mode: "insensitive" } };
    }

    const conveyors = await this.prisma.conveyor.findMany({ where: { ...conveyorFilter }, orderBy: { name: "asc" } });
    const products = await this.prisma.product.findMany({ where: { ...productFilter }, orderBy: { name: "asc" } });

    const count = await this.prisma.extrusionTreshold.groupBy({
      by: ["conveyor_id", "product_id"],
      _count: {
        _all: true,
      },
    });

    const last_distinct = await this.prisma.extrusionTreshold.findMany({
      distinct: ["conveyor_id", "product_id"],
      orderBy: { id: "desc" },
    });

    const tempResult: ResultRow[] = [];

    for (const product of products) {
      for (const conveyor of conveyors) {
        tempResult.push({
          product_id: product.id,
          product_marking: product.marking,
          product_name: product.name,
          product_code: product.code,
          conveyor_id: conveyor.id,
          conveyor_name: conveyor.name,
          count: count.filter((x) => x.conveyor_id === conveyor.id && x.product_id === product.id).length
            ? count.filter((x) => x.conveyor_id === conveyor.id && x.product_id === product.id)[0]._count._all
            : 0,
          last: last_distinct.filter((x) => x.conveyor_id === conveyor.id && x.product_id === product.id).length
            ? last_distinct.filter((x) => x.conveyor_id === conveyor.id && x.product_id === product.id)[0]
            : null,
        });
      }
    }

    let result: ResultRow[] = [];

    if (dto.empty && dto.empty.length > 0) {
      if (dto.empty[0] === 1) {
        result = tempResult.filter((x) => x.count !== 0);
      } else {
        result = tempResult.filter((x) => x.count === 0);
      }
    } else {
      result = tempResult;
    }

    return {
      rows: result.slice(dto.limit * (dto.page - 1), dto.limit * dto.page),
      total: result.length,
    };
  }
  async getVarnishTresholdsList(dto: GetTresholdsListDto) {
    let conveyorFilter = {};
    if (dto.conveyors) {
      conveyorFilter = { ...conveyorFilter, id: { in: dto.conveyors } };
    }

    let productFilter = {};
    if (dto.code) {
      productFilter = { ...productFilter, code: { contains: dto.code, mode: "insensitive" } };
    }
    if (dto.marking) {
      productFilter = { ...productFilter, marking: { contains: dto.marking, mode: "insensitive" } };
    }

    const conveyors = await this.prisma.conveyor.findMany({ where: { ...conveyorFilter }, orderBy: { name: "asc" } });
    const products = await this.prisma.product.findMany({ where: { ...productFilter }, orderBy: { name: "asc" } });

    const count = await this.prisma.varnishTreshold.groupBy({
      by: ["conveyor_id", "product_id"],
      _count: {
        _all: true,
      },
    });

    const last_distinct = await this.prisma.varnishTreshold.findMany({
      distinct: ["conveyor_id", "product_id"],
      orderBy: { id: "desc" },
    });

    const tempResult: ResultRow[] = [];

    for (const product of products) {
      for (const conveyor of conveyors) {
        tempResult.push({
          product_id: product.id,
          product_marking: product.marking,
          product_name: product.name,
          product_code: product.code,
          conveyor_id: conveyor.id,
          conveyor_name: conveyor.name,
          count: count.filter((x) => x.conveyor_id === conveyor.id && x.product_id === product.id).length
            ? count.filter((x) => x.conveyor_id === conveyor.id && x.product_id === product.id)[0]._count._all
            : 0,
          last: last_distinct.filter((x) => x.conveyor_id === conveyor.id && x.product_id === product.id).length
            ? last_distinct.filter((x) => x.conveyor_id === conveyor.id && x.product_id === product.id)[0]
            : null,
        });
      }
    }

    let result: ResultRow[] = [];

    if (dto.empty && dto.empty.length > 0) {
      if (dto.empty[0] === 1) {
        result = tempResult.filter((x) => x.count !== 0);
      } else {
        result = tempResult.filter((x) => x.count === 0);
      }
    } else {
      result = tempResult;
    }

    return { rows: result.slice(dto.limit * (dto.page - 1), dto.limit * dto.page), total: result.length };
  }

  async getOffsetTresholdsList(dto: GetTresholdsListDto) {
    let conveyorFilter = {};
    if (dto.conveyors) {
      conveyorFilter = { ...conveyorFilter, id: { in: dto.conveyors } };
    }

    let productFilter = {};
    if (dto.code) {
      productFilter = { ...productFilter, code: { contains: dto.code, mode: "insensitive" } };
    }
    if (dto.marking) {
      productFilter = { ...productFilter, marking: { contains: dto.marking, mode: "insensitive" } };
    }

    const conveyors = await this.prisma.conveyor.findMany({ where: { ...conveyorFilter }, orderBy: { name: "asc" } });
    const products = await this.prisma.product.findMany({ where: { ...productFilter }, orderBy: { name: "asc" } });

    const count = await this.prisma.offsetTreshold.groupBy({
      by: ["conveyor_id", "product_id"],
      _count: {
        _all: true,
      },
    });

    const last_distinct = await this.prisma.offsetTreshold.findMany({
      distinct: ["conveyor_id", "product_id"],
      orderBy: { id: "desc" },
    });

    const tempResult: ResultRow[] = [];

    for (const product of products) {
      for (const conveyor of conveyors) {
        tempResult.push({
          product_id: product.id,
          product_marking: product.marking,
          product_name: product.name,
          product_code: product.code,
          conveyor_id: conveyor.id,
          conveyor_name: conveyor.name,
          count: count.filter((x) => x.conveyor_id === conveyor.id && x.product_id === product.id).length
            ? count.filter((x) => x.conveyor_id === conveyor.id && x.product_id === product.id)[0]._count._all
            : 0,
          last: last_distinct.filter((x) => x.conveyor_id === conveyor.id && x.product_id === product.id).length
            ? last_distinct.filter((x) => x.conveyor_id === conveyor.id && x.product_id === product.id)[0]
            : null,
        });
      }
    }

    let result: ResultRow[] = [];

    if (dto.empty && dto.empty.length > 0) {
      if (dto.empty[0] === 1) {
        result = tempResult.filter((x) => x.count !== 0);
      } else {
        result = tempResult.filter((x) => x.count === 0);
      }
    } else {
      result = tempResult;
    }

    return { rows: result.slice(dto.limit * (dto.page - 1), dto.limit * dto.page), total: result.length };
  }

  async getSealantTresholdsList(dto: GetTresholdsListDto) {
    let conveyorFilter = {};
    if (dto.conveyors) {
      conveyorFilter = { ...conveyorFilter, id: { in: dto.conveyors } };
    }

    let productFilter = {};
    if (dto.code) {
      productFilter = { ...productFilter, code: { contains: dto.code, mode: "insensitive" } };
    }
    if (dto.marking) {
      productFilter = { ...productFilter, marking: { contains: dto.marking, mode: "insensitive" } };
    }

    const conveyors = await this.prisma.conveyor.findMany({ where: { ...conveyorFilter }, orderBy: { name: "asc" } });
    const products = await this.prisma.product.findMany({ where: { ...productFilter }, orderBy: { name: "asc" } });

    const count = await this.prisma.sealantTreshold.groupBy({
      by: ["conveyor_id", "product_id"],
      _count: {
        _all: true,
      },
    });

    const last_distinct = await this.prisma.sealantTreshold.findMany({
      distinct: ["conveyor_id", "product_id"],
      orderBy: { id: "desc" },
    });

    const tempResult: ResultRow[] = [];

    for (const product of products) {
      for (const conveyor of conveyors) {
        tempResult.push({
          product_id: product.id,
          product_marking: product.marking,
          product_name: product.name,
          product_code: product.code,
          conveyor_id: conveyor.id,
          conveyor_name: conveyor.name,
          count: count.filter((x) => x.conveyor_id === conveyor.id && x.product_id === product.id).length
            ? count.filter((x) => x.conveyor_id === conveyor.id && x.product_id === product.id)[0]._count._all
            : 0,
          last: last_distinct.filter((x) => x.conveyor_id === conveyor.id && x.product_id === product.id).length
            ? last_distinct.filter((x) => x.conveyor_id === conveyor.id && x.product_id === product.id)[0]
            : null,
        });
      }
    }

    let result: ResultRow[] = [];

    if (dto.empty && dto.empty.length > 0) {
      if (dto.empty[0] === 1) {
        result = tempResult.filter((x) => x.count !== 0);
      } else {
        result = tempResult.filter((x) => x.count === 0);
      }
    } else {
      result = tempResult;
    }

    return { rows: result.slice(dto.limit * (dto.page - 1), dto.limit * dto.page), total: result.length };
  }

  async createExtrusionTreshold(dto: CreateExtrusionTresholdDto) {
    const treshold = await this.prisma.extrusionTreshold.create({ data: { ...dto } });
    return treshold;
  }

  async createVarnishTreshold(dto: CreateVarnishTresholdDto) {
    const treshold = await this.prisma.varnishTreshold.create({ data: { ...dto } });
    return treshold;
  }

  async createOffsetTreshold(dto: CreateOffsetTresholdDto) {
    if (!dto.imprint_quantity_printed_box_1_min) {
      dto = { ...dto, imprint_quantity_printed_box_1_max: null };
    }
    if (!dto.imprint_quantity_printed_box_1_max) {
      dto = { ...dto, imprint_quantity_printed_box_1_min: null };
    }
    if (!dto.imprint_quantity_printed_box_2_min) {
      dto = { ...dto, imprint_quantity_printed_box_2_max: null };
    }
    if (!dto.imprint_quantity_printed_box_2_max) {
      dto = { ...dto, imprint_quantity_printed_box_2_min: null };
    }
    if (!dto.imprint_quantity_printed_box_3_min) {
      dto = { ...dto, imprint_quantity_printed_box_3_max: null };
    }
    if (!dto.imprint_quantity_printed_box_3_max) {
      dto = { ...dto, imprint_quantity_printed_box_3_min: null };
    }
    if (!dto.imprint_quantity_printed_box_4_min) {
      dto = { ...dto, imprint_quantity_printed_box_4_max: null };
    }
    if (!dto.imprint_quantity_printed_box_4_max) {
      dto = { ...dto, imprint_quantity_printed_box_4_min: null };
    }
    if (!dto.imprint_quantity_printed_box_5_min) {
      dto = { ...dto, imprint_quantity_printed_box_5_max: null };
    }
    if (!dto.imprint_quantity_printed_box_5_max) {
      dto = { ...dto, imprint_quantity_printed_box_5_min: null };
    }
    if (!dto.imprint_quantity_printed_box_6_min) {
      dto = { ...dto, imprint_quantity_printed_box_6_max: null };
    }
    if (!dto.imprint_quantity_printed_box_6_max) {
      dto = { ...dto, imprint_quantity_printed_box_6_min: null };
    }

    const treshold = await this.prisma.offsetTreshold.create({ data: { ...dto } });
    return treshold;
  }

  async createSealantTreshold(dto: CreateSealantTresholdDto) {
    const treshold = await this.prisma.sealantTreshold.create({ data: { ...dto } });
    return treshold;
  }
}
