import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { CreateStatusDto } from "./dto/create-status.dto";
import { ApiMessages } from "src/resources/api-messages";

@Injectable()
export class StatusesService {
  constructor(private prisma: PrismaService) {}

  async createExtrusionStatus(dto: CreateStatusDto) {
    const lastStatusEntry = await this.prisma.extrusionStatus.findFirst({
      orderBy: {
        id: "desc",
      },
    });

    if (!lastStatusEntry) throw new HttpException(ApiMessages.PREVISIOUS_STATUS_NOT_FOUND, HttpStatus.BAD_REQUEST);

    if (lastStatusEntry.idle) {
      const timeDelta = await (new Date().getTime() - new Date(lastStatusEntry.createdAt).getTime());
      await this.prisma.extrusionStatus.update({
        where: {
          id: lastStatusEntry.id,
        },
        data: {
          idle_time: timeDelta,
        },
      });
    }

    const extrusionEntry = await this.prisma.extrusionStatus.create({
      data: { ...dto, counter_value: lastStatusEntry.counter_value },
    });

    return extrusionEntry;
  }

  async createVarnishStatus(dto: CreateStatusDto) {
    const lastStatusEntry = await this.prisma.varnishStatus.findFirst({
      orderBy: {
        id: "desc",
      },
    });

    if (!lastStatusEntry) throw new HttpException(ApiMessages.PREVISIOUS_STATUS_NOT_FOUND, HttpStatus.BAD_REQUEST);

    if (lastStatusEntry.idle) {
      const timeDelta = await (new Date().getTime() - new Date(lastStatusEntry.createdAt).getTime());
      await this.prisma.varnishStatus.update({
        where: {
          id: lastStatusEntry.id,
        },
        data: {
          idle_time: timeDelta,
        },
      });
    }

    const varnishEntry = await this.prisma.varnishStatus.create({
      data: { ...dto, counter_value: lastStatusEntry.counter_value },
    });

    return varnishEntry;
  }

  async createOffsetStatus(dto: CreateStatusDto) {
    const lastStatusEntry = await this.prisma.offsetStatus.findFirst({
      orderBy: {
        id: "desc",
      },
    });

    if (!lastStatusEntry) throw new HttpException(ApiMessages.PREVISIOUS_STATUS_NOT_FOUND, HttpStatus.BAD_REQUEST);

    if (lastStatusEntry.idle) {
      const timeDelta = await (new Date().getTime() - new Date(lastStatusEntry.createdAt).getTime());
      await this.prisma.offsetStatus.update({
        where: {
          id: lastStatusEntry.id,
        },
        data: {
          idle_time: timeDelta,
        },
      });
    }

    const offsetEntry = await this.prisma.offsetStatus.create({
      data: { ...dto, counter_value: lastStatusEntry.counter_value },
    });

    return offsetEntry;
  }

  async createSealantStatus(dto: CreateStatusDto) {
    const lastStatusEntry = await this.prisma.sealantStatus.findFirst({
      orderBy: {
        id: "desc",
      },
    });

    if (!lastStatusEntry) throw new HttpException(ApiMessages.PREVISIOUS_STATUS_NOT_FOUND, HttpStatus.BAD_REQUEST);

    if (lastStatusEntry.idle) {
      const timeDelta = await (new Date().getTime() - new Date(lastStatusEntry.createdAt).getTime());
      await this.prisma.sealantStatus.update({
        where: {
          id: lastStatusEntry.id,
        },
        data: {
          idle_time: timeDelta,
        },
      });
    }

    const sealantEntry = await this.prisma.sealantStatus.create({
      data: { ...dto, counter_value: lastStatusEntry.counter_value },
    });

    return sealantEntry;
  }
}
