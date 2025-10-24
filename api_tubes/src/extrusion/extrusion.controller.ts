import { Controller, Get, Param } from '@nestjs/common';
import { ExtrusionService } from './extrusion.service';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags("'Экструзия и токарная обработка'")
@Controller('extrusion')
export class ExtrusionController {
  constructor(private readonly extrusionService: ExtrusionService) {}

  @ApiOperation({
    summary: 'Получить параметры работы оборудования по id продукции',
  })
  @Get('trehsholds_by_product_id/:product_id')
  getTresholdsByProductID(@Param('product_id') product_id: string) {
    return this.extrusionService.findExtrusionHardwareTresholdsByProductionId(
      Number(product_id),
    );
  }
}
