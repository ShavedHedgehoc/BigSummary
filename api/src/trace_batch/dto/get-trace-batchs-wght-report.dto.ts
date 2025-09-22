import { ApiProperty } from "@nestjs/swagger";
interface ITraceBatchsWghtReportFilter {
  batchName: string;
  productId: string;
  batchDate: string;
  compare: boolean;
  sortByBatch: boolean;
  plants: string[] | [];
}

export class GetTraceBatchsWghtReportDto {
  @ApiProperty({
    example: `{"batchName":"", "productId":"", "batchDate":"2022-02-01 00:00:00.000", "compare":false, "plants":[]}`,
    description: "Фильтр",
  })
  readonly filter: ITraceBatchsWghtReportFilter;
  @ApiProperty({ example: 10, description: "На странице" })
  readonly limit: number;
  @ApiProperty({ example: 1, description: "Страница" })
  readonly page: number;
}
