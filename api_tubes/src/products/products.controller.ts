import { Controller, Get, Param } from "@nestjs/common";
import { ProductsService } from "./products.service";
import { ApiOperation, ApiTags } from "@nestjs/swagger";

@ApiTags("Номенклатура")
@Controller("products")
export class ProductsController {
  constructor(private readonly productService: ProductsService) {}
  @ApiOperation({ summary: "Получить номенклатуру по id" })
  @Get("/:id")
  getConveyorById(@Param("id") id: string) {
    return this.productService.getProductById(Number(id));
  }
}
