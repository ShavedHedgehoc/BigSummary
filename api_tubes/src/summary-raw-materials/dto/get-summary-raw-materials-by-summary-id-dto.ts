import { ApiProperty } from "@nestjs/swagger";

export class GetSummaryRawMaterialsBySummaryIdDto {
  @ApiProperty({ example: 1, description: "id записи сводки" })
  readonly summary_id: number;
  @ApiProperty({ example: 1, description: "Номер поста" })
  readonly post_id: number;
}
