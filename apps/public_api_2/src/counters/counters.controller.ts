import { Body, Controller, Post } from '@nestjs/common';
import { CountersService } from './counters.service';
import { AddCounterValueDto } from './dto/add-counter-value.dto';

@Controller('counters')
export class CountersController {
  constructor(private readonly countersService: CountersService) {}
  @Post()
  createCoouterRecord(@Body() dto: AddCounterValueDto) {
    return this.countersService.addCounterRecord(dto);
  }
}
