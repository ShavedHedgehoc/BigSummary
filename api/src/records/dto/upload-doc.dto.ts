import { ApiProperty } from "@nestjs/swagger";

export interface UploadDocRow {
  code1C: string;
  product: string;
  serie: string;
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
  semi_product: string;
  org_base_min_weight: string;
  org_base_max_weight: string;
  water_base_min_weight: string;
  water_base_max_weight: string;
  per_box: string;
  box_per_row: string;
  row_on_pallet: string;
  gasket: string;
  seal: string;
  technician_note: string;
  packaging_note: string;
  marking_sample: string;
  marking_feature: string;
  ink_color: string;
}

export class UploadDocDto {
  //   @ApiProperty({ example: "Колпино", description: "Наименование площадки" })

  readonly plantId: string;
  readonly summaryDate: string;
  readonly update: boolean;
  readonly rows: UploadDocRow[];
}
