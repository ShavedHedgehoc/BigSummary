import { ApiProperty } from "@nestjs/swagger";

export interface GetInventoryRowsFilter {
  readonly productCode: string;
  readonly dayToExpire: number;
  readonly toFilter: boolean;
}

export class GetInventoryRowsByIdWithFilterDto {
  @ApiProperty({ example: 1 })
  readonly inventoryId: number;
  @ApiProperty({ example: `{"productCode":"000334", "dayToExpire":15, "toFilter":true}` })
  readonly filter: GetInventoryRowsFilter;
}
