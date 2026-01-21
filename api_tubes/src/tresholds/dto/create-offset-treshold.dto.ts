import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { Transform, Type } from "class-transformer";
import { IsInt, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

export class CreateOffsetTresholdDto {
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
  printing_machine_speed_min: number;
  @ApiProperty({ description: "id конвейера", example: 1 })
  @IsNotEmpty()
  @Type(() => Number)
  @IsInt()
  printing_machine_speed_max: number;

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
  padding_furnace_temp_min: number;
  @ApiProperty({ description: "id конвейера", example: 1 })
  @IsNotEmpty()
  @Type(() => Number)
  @IsInt()
  padding_furnace_temp_max: number;
  @ApiProperty({ description: "id конвейера", example: 1 })
  @IsNotEmpty()
  @Type(() => Number)
  @IsInt()
  offset_furnace_temp_min: number;
  @ApiProperty({ description: "id конвейера", example: 1 })
  @IsNotEmpty()
  @Type(() => Number)
  @IsInt()
  offset_furnace_temp_max: number;
  @ApiProperty({ description: "id конвейера", example: 1 })
  @IsNotEmpty()
  @Type(() => Number)
  @IsInt()
  printer_motor_min: number;
  @ApiProperty({ description: "id конвейера", example: 1 })
  @IsNotEmpty()
  @Type(() => Number)
  @IsInt()
  printer_motor_max: number;
  @ApiProperty({ description: "id конвейера", example: 1 })
  @IsNotEmpty()
  @Type(() => Number)
  @IsInt()
  base_covers_holders_motor_min: number;
  @ApiProperty({ description: "id конвейера", example: 1 })
  @IsNotEmpty()
  @Type(() => Number)
  @IsInt()
  base_covers_holders_motor_max: number;
  @ApiProperty({ description: "id конвейера", example: 1 })
  @IsNotEmpty()
  @Type(() => Number)
  @IsInt()
  base_covers_station_motor_min: number;
  @ApiProperty({ description: "id конвейера", example: 1 })
  @IsNotEmpty()
  @Type(() => Number)
  @IsInt()
  base_covers_station_motor_max: number;
  @IsOptional()
  @IsInt()
  @Transform(({ value }) => {
    if (value === "" || value === "null" || value === null) {
      return null;
    }
    return Number.isInteger(Number(value)) ? parseInt(value, 10) : value;
  })
  imprint_quantity_printed_box_1_min: number | null;
  @IsOptional()
  @IsInt()
  @Transform(({ value }) => {
    if (value === "" || value === "null" || value === null) {
      return null;
    }
    return Number.isInteger(Number(value)) ? parseInt(value, 10) : value;
  })
  imprint_quantity_printed_box_1_max: number | null;
  @IsOptional()
  @IsInt()
  @Transform(({ value }) => {
    if (value === "" || value === "null" || value === null) {
      return null;
    }
    return Number.isInteger(Number(value)) ? parseInt(value, 10) : value;
  })
  imprint_quantity_printed_box_2_min: number | null;
  @IsOptional()
  @IsInt()
  @Transform(({ value }) => {
    if (value === "" || value === "null" || value === null) {
      return null;
    }
    return Number.isInteger(Number(value)) ? parseInt(value, 10) : value;
  })
  imprint_quantity_printed_box_2_max: number | null;
  @IsOptional()
  @IsInt()
  @Transform(({ value }) => {
    if (value === "" || value === "null" || value === null) {
      return null;
    }
    return Number.isInteger(Number(value)) ? parseInt(value, 10) : value;
  })
  imprint_quantity_printed_box_3_min: number | null;
  @IsOptional()
  @IsInt()
  @Transform(({ value }) => {
    if (value === "" || value === "null" || value === null) {
      return null;
    }
    return Number.isInteger(Number(value)) ? parseInt(value, 10) : value;
  })
  imprint_quantity_printed_box_3_max: number | null;
  @IsOptional()
  @IsInt()
  @Transform(({ value }) => {
    if (value === "" || value === "null" || value === null) {
      return null;
    }
    return Number.isInteger(Number(value)) ? parseInt(value, 10) : value;
  })
  imprint_quantity_printed_box_4_min: number | null;
  @IsOptional()
  @IsInt()
  @Transform(({ value }) => {
    if (value === "" || value === "null" || value === null) {
      return null;
    }
    return Number.isInteger(Number(value)) ? parseInt(value, 10) : value;
  })
  imprint_quantity_printed_box_4_max: number | null;
  @IsOptional()
  @IsInt()
  @Transform(({ value }) => {
    if (value === "" || value === "null" || value === null) {
      return null;
    }
    return Number.isInteger(Number(value)) ? parseInt(value, 10) : value;
  })
  imprint_quantity_printed_box_5_min: number | null;
  @IsOptional()
  @IsInt()
  @Transform(({ value }) => {
    if (value === "" || value === "null" || value === null) {
      return null;
    }
    return Number.isInteger(Number(value)) ? parseInt(value, 10) : value;
  })
  imprint_quantity_printed_box_5_max: number | null;
  @IsOptional()
  @IsInt()
  @Transform(({ value }) => {
    if (value === "" || value === "null" || value === null) {
      return null;
    }
    return Number.isInteger(Number(value)) ? parseInt(value, 10) : value;
  })
  imprint_quantity_printed_box_6_min: number | null;

  @IsOptional()
  @IsInt()
  @Transform(({ value }) => {
    if (value === "" || value === "null" || value === null) {
      return null;
    }
    return Number.isInteger(Number(value)) ? parseInt(value, 10) : value;
  })
  imprint_quantity_printed_box_6_max?: number | null;

  @ApiProperty({ description: "id конвейера", example: 1 })
  @ApiProperty({ description: "id конвейера", example: 1 })
  @IsNotEmpty()
  @Type(() => Number)
  @IsNumber()
  ink_supply_time_min: number;
  @ApiProperty({ description: "id конвейера", example: 1 })
  @IsNotEmpty()
  @Type(() => Number)
  @IsNumber()
  ink_supply_time_max: number;
}
