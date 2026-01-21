import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsNotEmpty, IsNumber } from "class-validator";

export class DeleteSummaryDto {
  @ApiProperty({ example: 1, description: "id записи" })
  @IsNotEmpty()
  @Type(() => Number)
  @IsNumber()
  readonly id: number;
}
