import { ApiProperty } from "@nestjs/swagger";
export default class CreateExtrusionHardwareParamsRecordDto {
  @ApiProperty({ required: true, example: 1 })
  readonly summary_id: number;
  @ApiProperty({ required: true, example: 1000 })
  readonly press_speed: number;
  @ApiProperty({ required: true, example: 1000 })
  readonly blow_time: number;
  @ApiProperty({ required: true, example: 1000 })
  readonly turning_machine_speed: number;
  @ApiProperty({ required: true, example: 1000 })
  readonly annealing_furnace_temp: number;
  @ApiProperty({ required: true, example: 1000 })
  readonly employee_id: number;
}
