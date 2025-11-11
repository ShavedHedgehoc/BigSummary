import { ApiProperty } from "@nestjs/swagger";
export class GetSummaryRawMaterialCurrentDto {
  @ApiProperty({ example: 3, description: "id записи сводки" })
  readonly summary_id: number;
  @ApiProperty({ example: 1, description: "Номер поста" })
  readonly post_id: number;
  @ApiProperty({ example: 1, description: "Страница" })
  readonly page: number;
  @ApiProperty({ example: 10, description: "На странице" })
  readonly limit: number;
}
