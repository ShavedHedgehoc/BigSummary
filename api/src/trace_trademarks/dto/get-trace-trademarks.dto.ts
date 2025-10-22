import { ApiProperty } from "@nestjs/swagger";
interface ITrademarkFilter {
  trademark: string;
  product_code: string;
  product_name: string;
}

export class GetTraceTrademarksDto {
  @ApiProperty({ example: `{"trademark":"", "product_code":"", "product_name":""}`, description: "Фильтр" })
  readonly filter: ITrademarkFilter;
  @ApiProperty({ example: 10, description: "На странице" })
  readonly limit: number;
  @ApiProperty({ example: 1, description: "Страница" })
  readonly page: number;
}
