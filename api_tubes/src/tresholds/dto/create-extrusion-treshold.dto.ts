import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { Transform, Type } from "class-transformer";
import { IsArray, IsInt, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

export class CreateExtrusionTresholdDto {
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
  press_speed_min: number;

  @ApiProperty({ description: "id конвейера", example: 1 })
  @IsNotEmpty()
  @Type(() => Number)
  @IsInt()
  press_speed_max: number;

  @ApiProperty({ description: "id конвейера", example: 1 })
  @IsNotEmpty()
  @Type(() => Number)
  @IsInt()
  blow_time_min: number;

  @ApiProperty({ description: "id конвейера", example: 1 })
  @IsNotEmpty()
  @Type(() => Number)
  @IsInt()
  blow_time_max: number;

  @ApiProperty({ description: "id конвейера", example: 1 })
  @IsNotEmpty()
  @Type(() => Number)
  @IsInt()
  turning_machine_speed_min: number;

  @ApiProperty({ description: "id конвейера", example: 1 })
  @IsNotEmpty()
  @Type(() => Number)
  @IsInt()
  turning_machine_speed_max: number;

  @ApiProperty({ description: "id конвейера", example: 1 })
  @IsNotEmpty()
  @Type(() => Number)
  @IsInt()
  annealing_furnace_temp_min: number;

  @ApiProperty({ description: "id конвейера", example: 1 })
  @IsNotEmpty()
  @Type(() => Number)
  @IsInt()
  annealing_furnace_temp_max: number;

  @ApiProperty({ description: "id рондоли", example: 1 })
  @IsNotEmpty()
  @IsInt()
  rondel_id: number;

  @ApiProperty({ description: "id конвейера", example: 1 })
  @IsNotEmpty()
  @Type(() => Number)
  @IsInt()
  tube_cilindrical_section_length_min: number;

  @ApiProperty({ description: "id конвейера", example: 1 })
  @IsNotEmpty()
  @Type(() => Number)
  @IsInt()
  tube_cilindrical_section_length_max: number;

  @ApiProperty({ description: "id конвейера", example: 1 })
  @IsNotEmpty()
  @Type(() => Number)
  @IsNumber()
  membrane_thickness_min: number;

  @ApiProperty({ description: "id конвейера", example: 1 })
  @IsNotEmpty()
  @Type(() => Number)
  @IsNumber()
  membrane_thickness_max: number;

  @ApiProperty({ description: "id конвейера", example: 1 })
  @IsNotEmpty()
  @Type(() => Number)
  @IsNumber()
  tube_diameter_min: number;

  @ApiProperty({ description: "id конвейера", example: 1 })
  @IsNotEmpty()
  @Type(() => Number)
  @IsNumber()
  tube_diameter_max: number;

  @ApiProperty({ description: "id конвейера", example: 1 })
  @IsNotEmpty()
  @Type(() => Number)
  @IsNumber()
  tube_cilindrical_section_thickness_min: number;

  @ApiProperty({ description: "id конвейера", example: 1 })
  @IsNotEmpty()
  @Type(() => Number)
  @IsNumber()
  tube_cilindrical_section_thickness_max: number;

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
  @IsString()
  external_thread_value: string;
}
