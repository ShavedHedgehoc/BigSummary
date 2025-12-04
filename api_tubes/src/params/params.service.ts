import { PrismaService } from "src/prisma/prisma.service";
import { ApiMessages } from "src/resources/api-messages";
import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { CreateExtrusionEntryDto } from "./dto/create-extrusion-entry.dto";
import { CreateVarnishEntryDto } from "./dto/create-varnish-entry.dto";
import { CreateSealantEntryDto } from "./dto/create-sealant-entry.dto";
import { CreateOffsetEntryDto } from "./dto/create-offset-entry.dto";

@Injectable()
export class ParamsService {
  constructor(private prisma: PrismaService) {}

  async createExtrusionEntry(dto: CreateExtrusionEntryDto) {
    const lastEntry = await this.prisma.extrusionParam.findFirst({
      where: { summary_id: dto.summary_id },
      orderBy: { createdAt: "desc" },
    });

    if (lastEntry && lastEntry.counter_value > dto.counter_value)
      throw new HttpException(ApiMessages.COUNTER_LESS_THEN_LAST_VALUE, HttpStatus.BAD_REQUEST);

    await this.prisma.extrusionStatus.create({
      data: { summary_id: dto.summary_id, employee_id: dto.employee_id, counter_value: dto.counter_value },
    });

    const extrusionEntry = await this.prisma.extrusionParam.create({
      data: { ...dto },
    });
    return extrusionEntry;
  }

  async createVarnishEntry(dto: CreateVarnishEntryDto) {
    const lastEntry = await this.prisma.varnishParam.findFirst({
      where: { summary_id: dto.summary_id },
      orderBy: { createdAt: "desc" },
    });

    if (lastEntry && lastEntry.counter_value > dto.counter_value)
      throw new HttpException(ApiMessages.COUNTER_LESS_THEN_LAST_VALUE, HttpStatus.BAD_REQUEST);

    await this.prisma.varnishStatus.create({
      data: { summary_id: dto.summary_id, employee_id: dto.employee_id, counter_value: dto.counter_value },
    });

    const varnishEntry = await this.prisma.varnishParam.create({
      data: { ...dto },
    });
    return varnishEntry;
  }

  async createOffsetEntry(dto: CreateOffsetEntryDto) {
    const lastEntry = await this.prisma.offsetParam.findFirst({
      where: { summary_id: dto.summary_id },
      orderBy: { createdAt: "desc" },
    });

    if (lastEntry && lastEntry.counter_value > dto.counter_value)
      throw new HttpException(ApiMessages.COUNTER_LESS_THEN_LAST_VALUE, HttpStatus.BAD_REQUEST);

    await this.prisma.offsetStatus.create({
      data: { summary_id: dto.summary_id, employee_id: dto.employee_id, counter_value: dto.counter_value },
    });

    const offsetEntry = await this.prisma.offsetParam.create({
      data: { ...dto },
    });
    return offsetEntry;
  }

  async createSealantEntry(dto: CreateSealantEntryDto) {
    const lastEntry = await this.prisma.sealantParam.findFirst({
      where: { summary_id: dto.summary_id },
      orderBy: { createdAt: "desc" },
    });

    if (lastEntry && lastEntry.counter_value > dto.counter_value)
      throw new HttpException(ApiMessages.COUNTER_LESS_THEN_LAST_VALUE, HttpStatus.BAD_REQUEST);

    await this.prisma.sealantStatus.create({
      data: { summary_id: dto.summary_id, employee_id: dto.employee_id, counter_value: dto.counter_value },
    });

    const sealantEntry = await this.prisma.sealantParam.create({
      data: { ...dto },
    });

    return sealantEntry;
  }
}
