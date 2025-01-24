import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import Conveyor from "./conveyor.model";
import { CreateConveyorDto } from "./dto/create-conveyor.dto";
import { UpdateConveyorDto } from "./dto/update-conveyor.dto";

@Injectable()
export class ConveyorsService {
  constructor(
    @InjectModel(Conveyor)
    private conveyorsRepository: typeof Conveyor
  ) {}

  async getAllConveyors() {
    const conveyors = await this.conveyorsRepository.findAll();
    return conveyors;
  }

  async getByBarcode(barcode: string) {
    const conveyor = await this.conveyorsRepository.findOne({ where: { barcode: barcode } });
    return conveyor;
  }

  async getOrCreateByValue(value: string) {
    const [conveyors, _] = await this.conveyorsRepository.findOrCreate({ where: { value: value } });
    return conveyors;
  }

  async createConveyor(dto: CreateConveyorDto) {
    const conveyors = await this.conveyorsRepository.create(dto);
    return conveyors;
  }

  async updateConveyor(dto: UpdateConveyorDto) {
    const conveyor = await this.conveyorsRepository.findByPk(dto.id);
    if (!conveyor) {
      throw new HttpException("Конвейер не найден", HttpStatus.NOT_FOUND);
    }
    try {
      conveyor.set({
        value: dto.value,
        barcode: dto.barcode,
      });
      await conveyor.save();
      return conveyor;
    } catch (error) {
      if (error instanceof Error && error.name === "SequelizeUniqueConstraintError") {
        throw new HttpException("Конвейер с таким наименованием или штрихкодом уже существует", HttpStatus.BAD_REQUEST);
      } else {
        throw new HttpException("Неизвестная ошибка", HttpStatus.BAD_REQUEST);
      }
    }
  }

  async deleteConveyor(id: number) {
    const conveyor = await this.conveyorsRepository.findByPk(id);
    if (!conveyor) {
      throw new HttpException("Конвейер не найден", HttpStatus.NOT_FOUND);
    }
    try {
      await conveyor.destroy();
    } catch (error) {
      if (error instanceof Error && error.name === "SequelizeForeignKeyConstraintError") {
        throw new HttpException(
          "Существуют записи, связанные с этим конвейером. Удаление невозможно...",
          HttpStatus.BAD_REQUEST
        );
      } else {
        throw new HttpException("Неизвестная ошибка", HttpStatus.BAD_REQUEST);
      }
    }
  }

  async getByValue(value: string) {
    const conveyor = await this.conveyorsRepository.findOne({ where: { value: value } });
    return conveyor;
  }
}
