export class CreateRecordRegulationDto {
  readonly record_id: number;
  readonly org_base_min_weight: number;
  readonly org_base_max_weight: number;
  readonly water_base_min_weight: number;
  readonly water_base_max_weight: number;
  readonly per_box: number;
  readonly box_per_row: number;
  readonly row_on_pallet: number;
  readonly gasket: string;
  readonly seal: boolean;
  readonly technician_note: string;
  readonly packaging_note: string;
  readonly marking_sample_id: number;
  readonly inc_color: string;
  readonly marking_feature: string;
}
