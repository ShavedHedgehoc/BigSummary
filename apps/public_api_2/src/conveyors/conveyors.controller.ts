import { Controller, Get } from '@nestjs/common';
import { ConveyorsService } from './conveyors.service';

@Controller('conveyors')
export class ConveyorsController {
  constructor(private readonly conveyorsService: ConveyorsService) {}
  @Get()
  findAll() {
    return this.conveyorsService.findAll();
  }
}
