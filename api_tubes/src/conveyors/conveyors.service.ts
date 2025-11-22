import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";

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
}
