import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { Transform, Type } from "class-transformer";
import { IsArray, IsInt, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

export class GetTresholdsListDto {
  @ApiPropertyOptional({
    description: "Код 1С",
  })
  @IsString()
  @IsOptional()
  readonly code?: string;

  @ApiPropertyOptional({
    description: "Артикул",
  })
  @IsString()
  @IsOptional()
  readonly marking?: string;

  @ApiPropertyOptional({
    description: "Только пустые",
  })
  @IsOptional()
  @IsArray()
  @IsInt({ each: true })
  @Transform(({ value }) => {
    const stringArray = Array.isArray(value) ? value : value.split(",");
    return stringArray.map((item: string) => parseInt(item, 10));
  })
  readonly empty?: number[];

  @ApiPropertyOptional({
    description: "Конвейеры",
  })
  @IsOptional()
  @IsArray()
  @IsInt({ each: true })
  @Transform(({ value }) => {
    const stringArray = Array.isArray(value) ? value : value.split(",");
    return stringArray.map((item: string) => parseInt(item, 10));
  })
  readonly conveyors?: number[];

  @ApiProperty({
    description: "На странице",
  })
  @IsNotEmpty()
  @Type(() => Number)
  @IsNumber()
  readonly limit: number;

  @ApiProperty({
    description: "Страница",
  })
  @IsNotEmpty()
  @Type(() => Number)
  @IsNumber()
  readonly page: number;
}
