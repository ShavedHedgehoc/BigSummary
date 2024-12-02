import { ApiProperty } from "@nestjs/swagger";

export interface Row {
  code1C: string;
  product: string;
  serie: string;
  // boil: string;
  batch: string;
  apparatus: string;
  can: string;
  conveyor: string;
  plan: number;
  bbf: string;
  note: string;
  workshop: string;
  boil1: string;
  boil2: string;
}

export class BulkCreateRecordsDto {
  //   @ApiProperty({ example: "Колпино", description: "Наименование площадки" })

  readonly plantId: string;
  readonly summaryDate: string;
  readonly rows: Row[];
}
