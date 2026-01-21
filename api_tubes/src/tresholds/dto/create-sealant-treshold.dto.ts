import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsNotEmpty, IsInt, IsNumber } from "class-validator";

export class CreateSealantTresholdDto {
  @ApiProperty({ description: "id продукта", example: 1 })
  @IsNotEmpty()
  @IsInt()
  product_id: number;
  @ApiProperty({ description: "id продукта", example: 1 })
  @IsNotEmpty()
  @IsInt()
  conveyor_id: number;
  @ApiProperty({ description: "id конвейера", example: 1 })
  @IsNotEmpty()
  @Type(() => Number)
  @IsInt()
  cap_machine_speed_min: number;
  @ApiProperty({ description: "id конвейера", example: 1 })
  @IsNotEmpty()
  @Type(() => Number)
  @IsInt()
  cap_machine_speed_max: number;
  @ApiProperty({ description: "id конвейера", example: 1 })
  @IsNotEmpty()
  @Type(() => Number)
  @IsNumber()
  total_air_pressure_min: number;
  @ApiProperty({ description: "id конвейера", example: 1 })
  @IsNotEmpty()
  @Type(() => Number)
  @IsNumber()
  total_air_pressure_max: number;
  @ApiProperty({ description: "id конвейера", example: 1 })
  @IsNotEmpty()
  @Type(() => Number)
  @IsInt()
  holders_forward_min: number;
  @ApiProperty({ description: "id конвейера", example: 1 })
  @IsNotEmpty()
  @Type(() => Number)
  @IsInt()
  holders_forward_max: number;
  @ApiProperty({ description: "id конвейера", example: 1 })
  @IsNotEmpty()
  @Type(() => Number)
  @IsInt()
  holders_opening_left_min: number;
  @ApiProperty({ description: "id конвейера", example: 1 })
  @IsNotEmpty()
  @Type(() => Number)
  @IsInt()
  holders_opening_left_max: number;
  @ApiProperty({ description: "id конвейера", example: 1 })
  @IsNotEmpty()
  @Type(() => Number)
  @IsInt()
  holders_opening_right_min: number;
  @ApiProperty({ description: "id конвейера", example: 1 })
  @IsNotEmpty()
  @Type(() => Number)
  @IsInt()
  holders_opening_right_max: number;
  @ApiProperty({ description: "id конвейера", example: 1 })
  @IsNotEmpty()
  @Type(() => Number)
  @IsInt()
  holders_closing_min: number;
  @ApiProperty({ description: "id конвейера", example: 1 })
  @IsNotEmpty()
  @Type(() => Number)
  @IsInt()
  holders_closing_max: number;
  @ApiProperty({ description: "id конвейера", example: 1 })
  @IsNotEmpty()
  @Type(() => Number)
  @IsInt()
  injection_a_start_min: number;
  @ApiProperty({ description: "id конвейера", example: 1 })
  @IsNotEmpty()
  @Type(() => Number)
  @IsInt()
  injection_a_start_max: number;
  @ApiProperty({ description: "id конвейера", example: 1 })
  @IsNotEmpty()
  @Type(() => Number)
  @IsInt()
  injection_b_start_min: number;
  @ApiProperty({ description: "id конвейера", example: 1 })
  @IsNotEmpty()
  @Type(() => Number)
  @IsInt()
  injection_b_start_max: number;
  @ApiProperty({ description: "id конвейера", example: 1 })
  @IsNotEmpty()
  @Type(() => Number)
  @IsInt()
  injection_a_end_min: number;
  @ApiProperty({ description: "id конвейера", example: 1 })
  @IsNotEmpty()
  @Type(() => Number)
  @IsInt()
  injection_a_end_max: number;
  @ApiProperty({ description: "id конвейера", example: 1 })
  @IsNotEmpty()
  @Type(() => Number)
  @IsInt()
  injection_b_end_min: number;
  @ApiProperty({ description: "id конвейера", example: 1 })
  @IsNotEmpty()
  @Type(() => Number)
  @IsInt()
  injection_b_end_max: number;
  @ApiProperty({ description: "id конвейера", example: 1 })
  @IsNotEmpty()
  @Type(() => Number)
  @IsInt()
  injection_tube_orientation_start_min: number;
  @ApiProperty({ description: "id конвейера", example: 1 })
  @IsNotEmpty()
  @Type(() => Number)
  @IsInt()
  injection_tube_orientation_start_max: number;
  @ApiProperty({ description: "id конвейера", example: 1 })
  @IsNotEmpty()
  @Type(() => Number)
  @IsInt()
  injection_tube_orientation_end_min: number;
  @ApiProperty({ description: "id конвейера", example: 1 })
  @IsNotEmpty()
  @Type(() => Number)
  @IsInt()
  injection_tube_orientation_end_max: number;
  @ApiProperty({ description: "id конвейера", example: 1 })
  @IsNotEmpty()
  @Type(() => Number)
  @IsInt()
  latex_ring_padding_min: number;
  @ApiProperty({ description: "id конвейера", example: 1 })
  @IsNotEmpty()
  @Type(() => Number)
  @IsInt()
  latex_ring_padding_max: number;
  @ApiProperty({ description: "id конвейера", example: 1 })
  @IsNotEmpty()
  @Type(() => Number)
  @IsInt()
  latex_ring_width_min: number;
  @ApiProperty({ description: "id конвейера", example: 1 })
  @IsNotEmpty()
  @Type(() => Number)
  @IsInt()
  latex_ring_width_max: number;
  @ApiProperty({ description: "id конвейера", example: 1 })
  @IsNotEmpty()
  @Type(() => Number)
  @IsInt()
  tube_rigidity_min: number;
  @ApiProperty({ description: "id конвейера", example: 1 })
  @IsNotEmpty()
  @Type(() => Number)
  @IsInt()
  tube_rigidity_max: number;
  @ApiProperty({ description: "id конвейера", example: 1 })
  @IsNotEmpty()
  @Type(() => Number)
  @IsInt()
  cap_unscrewing_torque_min: number;
  @ApiProperty({ description: "id конвейера", example: 1 })
  @IsNotEmpty()
  @Type(() => Number)
  @IsInt()
  cap_unscrewing_torque_max: number;
}
