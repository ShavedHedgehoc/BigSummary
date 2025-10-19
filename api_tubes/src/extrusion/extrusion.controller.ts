import { Controller, Get, Param } from '@nestjs/common';
import { ExtrusionService } from './extrusion.service';

@Controller('extrusion')
export class ExtrusionController {
  constructor(private readonly extrusionService: ExtrusionService) {}
  @Get('trehsholds_by_product_id/:product_id')
  getTresholdsByProductID(@Param('product_id') product_id: string) {
    return this.extrusionService.findExtrusionHardwareTresholdsByProductionId(
      Number(product_id),
    );
  }
}
