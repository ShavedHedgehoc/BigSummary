import { Body, Controller, Delete, Get, Param, Post, Put } from "@nestjs/common";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { ConveyorsService } from "./conveyors.service";
import Conveyor from "./conveyor.model";
import { CreateConveyorDto } from "./dto/create-conveyor.dto";
import { UpdateConveyorDto } from "./dto/update-conveyor.dto";
import { GetConveyorsDto } from "./dto/get-conveyors.dto";

@ApiTags("Конвейеры")
@Controller("conveyors")
export class ConveyorsController {
  constructor(private conveyorsService: ConveyorsService) {}

  // Поменять на запрос с параметрами, мб добавить площадку в модель
  @ApiOperation({ summary: "Получить все конвейера" })
  @ApiResponse({ status: 200, type: [Conveyor] })
  @Get()
  getAll() {
    return this.conveyorsService.getAllConveyors();
  }

  @ApiOperation({ summary: "Получить все конвейера" })
  @ApiResponse({ status: 200, type: [Conveyor] })
  @Post()
  getAllWithParams(@Body() dto: GetConveyorsDto) {
    return this.conveyorsService.getAllConveyorsWithParams(dto);
  }

  // Нужно для рабочей станции
  @ApiOperation({ summary: "Получить конвейер по штрихкоду" })
  @ApiResponse({ status: 200, type: [Conveyor] })
  @Get("/barcode/:barcode")
  getbyBarcode(@Param("barcode") barcode: string) {
    return this.conveyorsService.getByBarcode(barcode);
  }
  //Нужно?
  @ApiOperation({ summary: "Создание нового конвейера" })
  @ApiResponse({ status: 201, type: Conveyor })

  //   @ApiResponse({ status: 400, type: Error })
  @Post()
  create(@Body() dto: CreateConveyorDto) {
    return this.conveyorsService.createConveyor(dto);
  }
  // Для внесения шк из приложения
  @ApiOperation({ summary: "Изменить конвейер" })
  @ApiResponse({ status: 201 })
  @Put()
  updateEmploee(@Body() dto: UpdateConveyorDto) {
    return this.conveyorsService.updateConveyor(dto);
  }

  @ApiOperation({ summary: "Удалить конвейер по id" })
  @ApiResponse({ status: 201 })
  @Delete("/:id")
  deleteConveyorById(@Param("id") id: string) {
    return this.conveyorsService.deleteConveyor(Number(id));
  }
}
