import { Type } from "class-transformer";
import { IsDate, IsNotEmpty, IsNumber } from "class-validator";

export class CreateProductionBoxDto {
  @IsNotEmpty()
  uuid: string;

  @IsNotEmpty()
  @Type(() => Number)
  @IsNumber()
  summary_id: number;

  @IsNotEmpty()
  @Type(() => Number)
  @IsNumber()
  box_number: number;

  @IsNotEmpty()
  @Type(() => Number)
  @IsNumber()
  employee_id: number;

  @IsNotEmpty()
  @Type(() => Number)
  @IsNumber()
  quantity: number;

  @IsNotEmpty()
  @Type(() => Date)
  @IsDate()
  createdAt: Date;
}
