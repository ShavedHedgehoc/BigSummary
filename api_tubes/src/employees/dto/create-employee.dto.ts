import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsNotEmpty, IsNumber, IsString, MaxLength, MinLength } from "class-validator";

export class CreateEmployeeDto {
  @ApiProperty({ example: "Иванов А.В.", description: "Имя" })
  @IsString()
  readonly name: string;

  @ApiProperty({ example: "1234567890123", description: "Штрихкод" })
  @IsString()
  @IsNotEmpty()
  @MinLength(13)
  @MaxLength(13)
  readonly barcode: string;

  @ApiProperty({ example: 2, description: "id разряда" })
  @IsNotEmpty()
  @Type(() => Number)
  @IsNumber()
  readonly rank_id: number;
}
