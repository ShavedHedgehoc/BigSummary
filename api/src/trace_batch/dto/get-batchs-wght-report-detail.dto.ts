import { ApiProperty } from "@nestjs/swagger";

export class GetTraceBatchsWghtReportDetailDto {
  @ApiProperty({ example: "123A5", description: "Партия" })
  readonly batchName: string;
  @ApiProperty({ example: "000334", description: "Код продукта" })
  readonly productId: string;
}
