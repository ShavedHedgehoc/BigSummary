import { ApiProperty } from "@nestjs/swagger";
export class FetchRelatedRecordsDto {
  @ApiProperty({ example: 1, description: "plant_id" })
  readonly plant_id: number;
  @ApiProperty({ example: "123A4", description: "boil_value" })
  readonly boil_value: string;
  @ApiProperty({ example: "000334", description: "product code" })
  readonly code: string;
}
