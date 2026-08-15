export interface BulkUpdateRegulationsDto {
  readonly code: string;
  readonly serie: string;
  readonly marking: string;
  readonly name: string;
  readonly water_base_min_weight: string;
  readonly water_base_max_weight: string;
  readonly per_box: string;
  readonly box_per_row: string;
  readonly row_on_pallet: string;
  readonly gasket: string;
  readonly seal: boolean;
  readonly technician_note: string;
  readonly packaging_note: string;
  readonly marking_sample: string;
}
