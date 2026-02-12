import { Body, Controller, Get, Post, Query, ValidationPipe } from "@nestjs/common";
import { ApiOperation, ApiQuery, ApiTags } from "@nestjs/swagger";
import { ProductionBoxService } from "./production-box.service";
import { CreateProductionBoxDto } from "./dto/create-production-box.dto";

@ApiTags("Короба продукции")
@Controller("production-box")
export class ProductionBoxController {
  constructor(private readonly productionBoxService: ProductionBoxService) {}

  @ApiOperation({ summary: "Создать короб" })
  @Post()
  createProductionBox(@Body(new ValidationPipe({ transform: true, whitelist: true })) dto: CreateProductionBoxDto) {
    return this.productionBoxService.createProductionBox(dto);
  }

  @Get()
  @ApiOperation({ summary: "Получить короба" })
  @ApiQuery({ name: "batch_id", required: false, type: String })
  //   @ApiQuery({ name: "record_id", required: false, type: Number })
  //   @ApiQuery({ name: "barcode", required: false, type: String })
  getTasks(
    @Query("batch_id") batch_id?: string
    // @Query("record_id") record_id?: number,
    // @Query("barcode") barcode?: string
  ) {
    return this.productionBoxService.getProductionBoxes({ batch_id: batch_id });
  }
}
