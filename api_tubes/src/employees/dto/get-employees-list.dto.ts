import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { Transform, Type } from "class-transformer";
import { IsArray, IsBoolean, IsInt, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

export class GetEmployeesListDto {
  @ApiPropertyOptional({
    description: "Имя",
  })
  @IsString()
  @IsOptional()
  readonly name?: string;

  @ApiPropertyOptional({
    description: "Запрет входа",
  })
  @IsOptional()
  @IsArray()
  @IsInt({ each: true })
  @Transform(({ value }) => {
    const stringArray = Array.isArray(value) ? value : value.split(",");
    return stringArray.map((item: string) => parseInt(item, 10));
  })
  readonly banned?: number[];

  @ApiPropertyOptional({
    description: "Разряды",
  })
  @IsOptional()
  @IsArray()
  @IsInt({ each: true })
  @Transform(({ value }) => {
    const stringArray = Array.isArray(value) ? value : value.split(",");
    return stringArray.map((item: string) => parseInt(item, 10));
  })
  readonly ranks?: number[];

  @ApiProperty({
    description: "Сортировать ФИО по возрастанию",
  })
  @IsBoolean()
  @Transform(({ value }) => {
    return value === "true";
  })
  readonly name_asc: boolean;

  @ApiProperty({
    description: "На странице",
  })
  @IsNotEmpty()
  @Type(() => Number)
  @IsNumber()
  readonly limit: number;

  @ApiProperty({
    description: "На странице",
  })
  @IsNotEmpty()
  @Type(() => Number)
  @IsNumber()
  readonly page: number;
}
