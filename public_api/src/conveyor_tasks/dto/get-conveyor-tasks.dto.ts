import { ApiProperty } from '@nestjs/swagger';

export class GetConveyorTasksDto {
  @ApiProperty({ example: '101', description: 'Наименование конвейера' })
  readonly value: string;
}
