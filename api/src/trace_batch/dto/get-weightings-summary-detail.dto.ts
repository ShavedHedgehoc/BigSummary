import { ApiProperty } from "@nestjs/swagger";

export class GetWeightingsSummaryDetailDto {
  @ApiProperty({ example: "2025-10-06 00:00:00.000", description: "Начальная дата" })
  readonly startDate: string;
  @ApiProperty({ example: "2025-10-31 00:00:00.000", description: "Конечная дата" })
  readonly endDate: string;
  @ApiProperty({ example: 28538, description: "id работника" })
  readonly author_id: number;
  @ApiProperty({ example: 10, description: "На странице" })
  readonly limit: number;
  @ApiProperty({ example: 1, description: "Страница" })
  readonly page: number;
}
