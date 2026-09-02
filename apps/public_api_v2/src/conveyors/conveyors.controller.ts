import { Controller, Get } from '@nestjs/common';
import { ConveyorsService } from './conveyors.service';
import { TPublicApiConveyorListResponse, publicApiConveyorListItemSchema } from '@repo/schemas';
import { ApiOkResponse } from '@nestjs/swagger';
import { createZodDto } from 'nestjs-zod';

class PublicApiConveyorListItemDto extends createZodDto(publicApiConveyorListItemSchema) {}

@Controller('conveyors')
export class ConveyorsController {
  constructor(private readonly conveyorsService: ConveyorsService) {}

  @Get()
  @ApiOkResponse({
    description: 'Список конвейеров',
    type: PublicApiConveyorListItemDto,
    isArray: true,
  })
  findAll(): Promise<TPublicApiConveyorListResponse> {
    return this.conveyorsService.findAll();
  }
}
