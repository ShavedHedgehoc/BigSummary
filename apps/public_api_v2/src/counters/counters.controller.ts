import { Body, Controller, Post } from '@nestjs/common';
import { CountersService } from './counters.service';
import { createZodDto } from 'nestjs-zod';
import {
  publicApiCounterCreateInputSchema,
  publicApiCounterCreateOutputSchema,
  TPublicApiCreateCounterResponse,
} from '@repo/schemas';
import { ApiBody, ApiCreatedResponse, ApiOperation } from '@nestjs/swagger';
import z from 'zod';

const swaggerCompatibleSchema = publicApiCounterCreateOutputSchema.extend({
  createdAt: z.string().datetime({ message: 'Дата создания' }),
  updatedAt: z.string().datetime({ message: 'Дата обновления' }),
});

export class PublicApiCounterCreateDto extends createZodDto(publicApiCounterCreateInputSchema) {}
class PublicApiCounterCreateResponse extends createZodDto(swaggerCompatibleSchema) {}

@Controller('counters')
export class CountersController {
  constructor(private readonly countersService: CountersService) {}
  @Post()
  @ApiOperation({ summary: 'Отправить показания счетчиков' })
  @ApiBody({
    type: PublicApiCounterCreateDto,
    examples: {
      Payload: {
        value: {
          record_id: 105,
          task_uid: '3c32378f-e8f3-421b-908a-91f55a600979',
          counter_value: 350,
          finished: false,
        },
      },
    },
  })
  @ApiCreatedResponse({
    description: 'Записанный счетчик',
    type: PublicApiCounterCreateResponse,
    isArray: false,
  })
  createCouтterRecord(
    @Body() dto: PublicApiCounterCreateDto,
  ): Promise<TPublicApiCreateCounterResponse> {
    return this.countersService.addCounterRecord(dto);
  }
}
