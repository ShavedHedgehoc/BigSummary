import { ApiProperty } from "@nestjs/swagger";
interface ITraceBatchsFilter {
  batch: string;
  marking: string;
  startDate: string;
  endDate: string;
  month: string;
  year: string;
  plants: string[] | [];
}

export class GetTraceBatchsDto {
  @ApiProperty({
    example: `{"batch":"", "marking":"", "startDate":"", "endDate":"", "month":"","year":"", "plants":[]}`,
    description: "Фильтр",
  })
  readonly filter: ITraceBatchsFilter;
  @ApiProperty({ example: 10, description: "На странице" })
  readonly limit: number;
  @ApiProperty({ example: 1, description: "Страница" })
  readonly page: number;
}
