import { ApiProperty } from '@nestjs/swagger';
export class AddCounterValueDto {
  @ApiProperty({ example: 1, description: 'id строки сводки' })
  readonly record_id: number;
  @ApiProperty({ example: 'c4a40b9a-a608-4a38-832b-6b16d0cc8a72', description: 'uid задачи маркировки' })
  readonly task_uid: string;
  @ApiProperty({ example: 100, description: 'значение счетчика' })
  readonly counter_value: number;
  @ApiProperty({ example: false, description: 'признак окончания фасовки' })
  readonly finished: boolean;
}
