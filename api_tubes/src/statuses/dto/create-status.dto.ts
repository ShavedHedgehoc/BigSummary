export class CreateStatusDto {
  readonly summary_id: number;
  readonly operation_id: number | null;
  readonly idle: boolean;
  readonly finished: boolean;
  readonly employee_id: number;
  readonly defect_value?: string;
}
