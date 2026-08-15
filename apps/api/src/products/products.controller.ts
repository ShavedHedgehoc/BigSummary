import { Body, Controller, Get, Post } from "@nestjs/common";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { ProductsService } from "./products.service";
import Product from "./products.model";
import { CreateProductDto } from "./dto/create-product.dto";

@ApiTags("Продукты")
@Controller("products")
export class ProductsController {
  constructor(private productService: ProductsService) {}

  @ApiOperation({ summary: "Получить все продукты" })
  @ApiResponse({ status: 200, type: [Product] })
  //   @Roles("USER")
  //   @UseGuards(RoleGuard)
  @Get()
  getAll() {
    return this.productService.getAllProducts();
  }

  @ApiOperation({ summary: "Создание нового продукта" })
  @ApiResponse({ status: 201, type: Product })
  @Post()
  create(@Body() productDto: CreateProductDto) {
    return this.productService.createProduct(productDto);
  }
}
