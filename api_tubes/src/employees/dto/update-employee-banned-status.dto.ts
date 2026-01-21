import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class UpdateEmployeeBannedStatusDto {
  @ApiProperty({ example: 1, description: "id сотрудника" })
  @IsNotEmpty()
  @Type(() => Number)
  @IsNumber()
  id: number;
}
