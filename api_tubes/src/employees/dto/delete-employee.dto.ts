import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsNotEmpty, IsNumber } from "class-validator";

export class DeleteEmployeeDto {
  @ApiProperty({ example: 1, description: "id сотрудника" })
  @IsNotEmpty()
  @Type(() => Number)
  @IsNumber()
  readonly id: number;
}
