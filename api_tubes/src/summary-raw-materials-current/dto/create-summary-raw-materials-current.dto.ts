import { ApiProperty } from "@nestjs/swagger";

export class CreateSummaryRawMaterialCurrentDto {
  @ApiProperty({ example: 3, description: "id записи сводки" })
  readonly summary_id: number;
  @ApiProperty({ example: 1, description: "id сотрудника" })
  readonly employee_id: number;
  @ApiProperty({ example: "067792", description: "Код 1С комплектуюшей" })
  readonly code: string;
  @ApiProperty({ example: "07286593690910202501", description: "Партия комплектующей" })
  readonly lot: string;
}
