import { ApiProperty } from "@nestjs/swagger";

interface IInventoryDocsFilter {
  startDate: string;
  endDate: string;
  plants: number[];
}

export class GetInventoryDocsDto {
  @ApiProperty({ example: `{"startDate":"2025-09-02", "endDate":"2025-09-30", "plants":[1,2]}`, description: "Фильтр" })
  readonly filter: IInventoryDocsFilter;
  @ApiProperty({ example: 10, description: "На странице" })
  readonly limit: number;
  @ApiProperty({ example: 1, description: "Страница" })
  readonly page: number;
}
