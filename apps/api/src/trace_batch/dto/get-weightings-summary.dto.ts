import { ApiProperty } from "@nestjs/swagger";
interface ITraceWeightingsSummaryFilter {
  startDate: string;
  endDate: string;
  author: string;
  plants: string[] | [];
}

export class GetWeightingsSummaryDto {
  @ApiProperty({
    example: `{ "startDate":"2025-10-06 00:00:00.000", "endDate":"2025-10-31 00:00:00.000", "author":"", "plants":[]}`,
    description: "Фильтр",
  })
  readonly filter: ITraceWeightingsSummaryFilter;
  @ApiProperty({ example: 10, description: "На странице" })
  readonly limit: number;
  @ApiProperty({ example: 1, description: "Страница" })
  readonly page: number;
}
