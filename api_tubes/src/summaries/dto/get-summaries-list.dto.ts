import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { Transform, Type } from "class-transformer";
import { IsArray, IsDate, IsInt, IsNotEmpty, IsNumber, IsOptional } from "class-validator";

export class GetSummariesListDto {
  @ApiProperty({ description: "Дата начала", example: "2025-12-19" })
  @Type(() => Date)
  @IsDate()
  @IsNotEmpty()
  readonly start_date: Date;

  @ApiProperty({ description: "Дата окончания", example: "2025-12-19" })
  @Type(() => Date)
  @IsDate()
  @IsNotEmpty()
  readonly end_date: Date;

  @ApiPropertyOptional({ description: "Конвейеры" })
  @IsOptional()
  @IsArray()
  @IsInt({ each: true })
  @Transform(({ value }) => {
    const stringArray = Array.isArray(value) ? value : value.split(",");
    return stringArray.map((item: string) => parseInt(item, 10));
  })
  readonly conveyors?: number[];

  @ApiPropertyOptional({ description: "Статусы" })
  @IsOptional()
  @IsArray()
  @IsInt({ each: true })
  @Transform(({ value }) => {
    const stringArray = Array.isArray(value) ? value : value.split(",");
    return stringArray.map((item: string) => parseInt(item, 10));
  })
  readonly states?: number[];

  @ApiProperty({ description: "На странице", example: 10 })
  @IsNotEmpty()
  @Type(() => Number)
  @IsNumber()
  readonly limit: number;

  @ApiProperty({ description: "Страница", example: 1 })
  @IsNotEmpty()
  @Type(() => Number)
  @IsNumber()
  readonly page: number;
}
