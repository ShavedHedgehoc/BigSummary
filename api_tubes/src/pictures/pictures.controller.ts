import { Controller, Get, Query } from "@nestjs/common";
import { ApiOperation, ApiTags } from "@nestjs/swagger";
import { PicturesService } from "./pictures.service";
@ApiTags("Изображения")
@Controller("pictures")
export class PicturesController {
  constructor(private pictureService: PicturesService) {}
  @ApiOperation({ summary: "Получить изображения по id продукта" })
  @Get()
  getConveyorByName(@Query("product_id") product_id: string) {
    return this.pictureService.getPicturesByProductId(Number(product_id));
  }
}
