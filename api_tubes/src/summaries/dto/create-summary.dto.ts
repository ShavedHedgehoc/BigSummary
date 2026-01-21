interface CreateSummaryRow {
  code1C: string;
  product_marking: string;
  product_name: string;
  batch: string;
  plan: string;
  conveyor: string;
  specification: string;
}
export class CreateSummaryDto {
  summaryDate: string;
  update: boolean;
  rows: CreateSummaryRow[];
}
