import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsInt, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

export class CreateVarnishTresholdDto {
  @ApiProperty({ description: "id продукта", example: 1 })
  @IsNotEmpty()
  @IsInt()
  product_id: number;

  @ApiProperty({ description: "id конвейера", example: 1 })
  @IsNotEmpty()
  @IsInt()
  conveyor_id: number;

  @ApiProperty({ description: "id конвейера", example: 1 })
  @IsNotEmpty()
  @Type(() => Number)
  @IsInt()
  varnish_machine_speed_min: number;

  @ApiProperty({ description: "id конвейера", example: 1 })
  @IsNotEmpty()
  @Type(() => Number)
  @IsInt()
  varnish_machine_speed_max: number;

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
  @IsNumber()
  feed_can_air_pressure_min: number;

  @ApiProperty({ description: "id конвейера", example: 1 })
  @IsNotEmpty()
  @Type(() => Number)
  @IsNumber()
  feed_can_air_pressure_max: number;

  @ApiProperty({ description: "id конвейера", example: 1 })
  @IsNotEmpty()
  @Type(() => Number)
  @IsNumber()
  nozzle_regulator_air_pressure_min: number;

  @ApiProperty({ description: "id конвейера", example: 1 })
  @IsNotEmpty()
  @Type(() => Number)
  @IsNumber()
  nozzle_regulator_air_pressure_max: number;

  @ApiProperty({ description: "id конвейера", example: 1 })
  @IsNotEmpty()
  @Type(() => Number)
  @IsInt()
  cells_speed_min: number;

  @ApiProperty({ description: "id конвейера", example: 1 })
  @IsNotEmpty()
  @Type(() => Number)
  @IsInt()
  cells_speed_max: number;

  @ApiProperty({ description: "id конвейера", example: 1 })
  @IsNotEmpty()
  @Type(() => Number)
  @IsInt()
  injection_a_start_position_min: number;

  @ApiProperty({ description: "id конвейера", example: 1 })
  @IsNotEmpty()
  @Type(() => Number)
  @IsInt()
  injection_a_start_position_max: number;

  @ApiProperty({ description: "id конвейера", example: 1 })
  @IsNotEmpty()
  @Type(() => Number)
  @IsInt()
  injection_b_start_position_min: number;

  @ApiProperty({ description: "id конвейера", example: 1 })
  @IsNotEmpty()
  @Type(() => Number)
  @IsInt()
  injection_b_start_position_max: number;
  @ApiProperty({ description: "id конвейера", example: 1 })
  @IsNotEmpty()
  @Type(() => Number)
  @IsInt()
  injection_c_start_position_min: number;

  @ApiProperty({ description: "id конвейера", example: 1 })
  @IsNotEmpty()
  @Type(() => Number)
  @IsInt()
  injection_c_start_position_max: number;

  @ApiProperty({ description: "id конвейера", example: 1 })
  @IsNotEmpty()
  @Type(() => Number)
  @IsInt()
  injection_d_start_position_min: number;

  @ApiProperty({ description: "id конвейера", example: 1 })
  @IsNotEmpty()
  @Type(() => Number)
  @IsInt()
  injection_d_start_position_max: number;

  @ApiProperty({ description: "id конвейера", example: 1 })
  @IsNotEmpty()
  @Type(() => Number)
  @IsInt()
  injection_a_end_position_min: number;

  @ApiProperty({ description: "id конвейера", example: 1 })
  @IsNotEmpty()
  @Type(() => Number)
  @IsInt()
  injection_a_end_position_max: number;

  @ApiProperty({ description: "id конвейера", example: 1 })
  @IsNotEmpty()
  @Type(() => Number)
  @IsInt()
  injection_b_end_position_min: number;

  @ApiProperty({ description: "id конвейера", example: 1 })
  @IsNotEmpty()
  @Type(() => Number)
  @IsInt()
  injection_b_end_position_max: number;
  @ApiProperty({ description: "id конвейера", example: 1 })
  @IsNotEmpty()
  @Type(() => Number)
  @IsInt()
  injection_c_end_position_min: number;

  @ApiProperty({ description: "id конвейера", example: 1 })
  @IsNotEmpty()
  @Type(() => Number)
  @IsInt()
  injection_c_end_position_max: number;

  @ApiProperty({ description: "id конвейера", example: 1 })
  @IsNotEmpty()
  @Type(() => Number)
  @IsInt()
  injection_d_end_position_min: number;

  @ApiProperty({ description: "id конвейера", example: 1 })
  @IsNotEmpty()
  @Type(() => Number)
  @IsInt()
  injection_d_end_position_max: number;

  @ApiProperty({ description: "id конвейера", example: 1 })
  @IsNotEmpty()
  @Type(() => Number)
  @IsInt()
  tube_molding_start_position_min: number;

  @ApiProperty({ description: "id конвейера", example: 1 })
  @IsNotEmpty()
  @Type(() => Number)
  @IsInt()
  tube_molding_start_position_max: number;

  @ApiProperty({ description: "id конвейера", example: 1 })
  @IsNotEmpty()
  @Type(() => Number)
  @IsInt()
  tube_molding_end_position_min: number;

  @ApiProperty({ description: "id конвейера", example: 1 })
  @IsNotEmpty()
  @Type(() => Number)
  @IsInt()
  tube_molding_end_position_max: number;

  @ApiProperty({ description: "id конвейера", example: 1 })
  @IsNotEmpty()
  @Type(() => Number)
  @IsInt()
  polimerization_furnace_temp_min: number;

  @ApiProperty({ description: "id конвейера", example: 1 })
  @IsNotEmpty()
  @Type(() => Number)
  @IsInt()
  polimerization_furnace_temp_max: number;

  @ApiProperty({ description: "id конвейера", example: 1 })
  @IsNotEmpty()
  @Type(() => Number)
  @IsInt()
  internal_varnish_porosity_min: number;

  @ApiProperty({ description: "id конвейера", example: 1 })
  @IsNotEmpty()
  @Type(() => Number)
  @IsInt()
  internal_varnish_porosity_max: number;
}
