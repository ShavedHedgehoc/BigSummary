import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { mappedConveyors } from "./mapper";

@Injectable()
export class ConveyorsService {
  constructor(private prisma: PrismaService) {}

  // used in dashboard conveyor service
  async getConveyorByName(name: string) {
    const conveyor = await this.prisma.conveyor.findUnique({ where: { name: name } });
    return conveyor;
  }
  async getConveyorById(id: number) {
    return this.prisma.conveyor.findUnique({ where: { id: id } });
  }
  async getAllConveyors() {
    const conveyors = await this.prisma.conveyor.findMany();
    if (!conveyors) {
      throw new HttpException("Conveyors not found", HttpStatus.NOT_FOUND);
    }
    return conveyors;
  }

  async getConveyorsData() {
    const conveyors = await this.prisma.conveyor.findMany({
      include: {
        summaries: {
          where: { isActive: true },
          include: {
            batch: true,
            product: true,
            extrusion_statuses: { include: { employee: true }, orderBy: { id: "desc" }, take: 1 },
            varnish_statuses: { include: { employee: true }, orderBy: { id: "desc" }, take: 1 },
            offset_statuses: { include: { employee: true }, orderBy: { id: "desc" }, take: 1 },
            sealant_statuses: { include: { employee: true }, orderBy: { id: "desc" }, take: 1 },
          },
        },
      },
    });
    return {
      conveyors: conveyors.map((item) =>
        mappedConveyors({
          conveyor: item,
          summary: item.summaries.length ? item.summaries[0] : null,
          product: item.summaries.length && item.summaries[0].product ? item.summaries[0].product : null,
          batch: item.summaries.length && item.summaries[0].batch ? item.summaries[0].batch : null,
          extrusion_status:
            item.summaries.length && item.summaries[0].extrusion_statuses.length
              ? item.summaries[0].extrusion_statuses[0]
              : null,
          extrusion_employee:
            item.summaries.length &&
            item.summaries[0].extrusion_statuses.length &&
            item.summaries[0].extrusion_statuses[0].employee
              ? item.summaries[0].extrusion_statuses[0].employee
              : null,
          varnish_status:
            item.summaries.length && item.summaries[0].varnish_statuses.length
              ? item.summaries[0].varnish_statuses[0]
              : null,
          varnish_employee:
            item.summaries.length &&
            item.summaries[0].varnish_statuses.length &&
            item.summaries[0].varnish_statuses[0].employee
              ? item.summaries[0].varnish_statuses[0].employee
              : null,
          offset_status:
            item.summaries.length && item.summaries[0].offset_statuses.length
              ? item.summaries[0].offset_statuses[0]
              : null,
          offset_employee:
            item.summaries.length &&
            item.summaries[0].offset_statuses.length &&
            item.summaries[0].offset_statuses[0].employee
              ? item.summaries[0].offset_statuses[0].employee
              : null,
          sealant_status:
            item.summaries.length && item.summaries[0].sealant_statuses.length
              ? item.summaries[0].sealant_statuses[0]
              : null,
          sealant_employee:
            item.summaries.length &&
            item.summaries[0].sealant_statuses.length &&
            item.summaries[0].sealant_statuses[0].employee
              ? item.summaries[0].sealant_statuses[0].employee
              : null,
        })
      ),
    };
  }
}
